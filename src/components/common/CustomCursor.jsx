import React, { useEffect, useState, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * Cinematic Interactive Magnetic Reticle Cursor
 * 
 * Replaces default system pointer on desktop with an interactive fluid reticle:
 * - Precision center target dot
 * - Smooth magnetic outer halo with velocity-driven aerodynamic morphing
 * - Hover state expansion with dynamic interactive icons (↗ for links, | for text inputs)
 * - Click contraction and radial shockwave burst
 * 
 * DEVICE SAFETY:
 * Strictly disabled on touchscreens, tablets, and reduced motion to preserve
 * 100% native mobile touch gestures and zero obstruction.
 */
export function CustomCursor() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const [hoverType, setHoverType] = useState('none'); // 'none' | 'clickable' | 'input'
  const [isClicking, setIsClicking] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [ripples, setRipples] = useState([]);

  const cursorDotRef = useRef(null);
  const cursorHaloRef = useRef(null);

  // Position and physics references
  const mousePos = useRef({ x: -200, y: -200 });
  const haloPos = useRef({ x: -200, y: -200 });
  const haloVel = useRef({ x: 0, y: 0 });
  const haloScale = useRef(1);
  const haloBounceVel = useRef(0);
  const animFrameId = useRef(null);

  useEffect(() => {
    // 1. Device check: coarse pointer or touch screen
    const coarseMedia = window.matchMedia('(pointer: coarse)');
    const hoverMedia = window.matchMedia('(hover: none)');

    if (prefersReducedMotion || coarseMedia.matches || hoverMedia.matches) {
      setIsTouch(true);
      return;
    }

    // 2. Disarm immediately on touch interactions
    const handleTouchStart = () => {
      setIsTouch(true);
      setVisible(false);
    };

    const handleMouseMove = (e) => {
      if (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) {
        setIsTouch(true);
        return;
      }

      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!visible) {
        setVisible(true);
        haloPos.current.x = e.clientX;
        haloPos.current.y = e.clientY;
      }
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    // 3. Click interaction: snappy contraction and radial shockwave
    const handleMouseDown = (e) => {
      setIsClicking(true);
      haloScale.current = 0.55;
      haloBounceVel.current = -0.2;

      // Spawn click shockwave
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };

      setRipples((prev) => [...prev.slice(-3), newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 550);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
      haloScale.current = 1.35; // Spring recoil
      haloBounceVel.current = 0.3;
    };

    // 4. Interactive hover type detection
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA';

      if (isInput) {
        setHoverType('input');
        return;
      }

      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'SELECT' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.closest('[role="tab"]') ||
        target.classList?.contains('cursor-pointer');

      if (isClickable) {
        setHoverType('clickable');
      } else {
        setHoverType('none');
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    // 5. High-performance physics rendering loop
    const render = () => {
      // Spring lerp for magnetic follower halo
      const stiffness = hoverType !== 'none' ? 0.22 : 0.16;
      const damping = 0.72;

      const dx = mousePos.current.x - haloPos.current.x;
      const dy = mousePos.current.y - haloPos.current.y;

      haloVel.current.x += dx * stiffness;
      haloVel.current.y += dy * stiffness;

      haloVel.current.x *= damping;
      haloVel.current.y *= damping;

      haloPos.current.x += haloVel.current.x;
      haloPos.current.y += haloVel.current.y;

      // Velocity angle and speed for aerodynamic stretch
      const speed = Math.sqrt(
        haloVel.current.x * haloVel.current.x + haloVel.current.y * haloVel.current.y
      );
      const angle = Math.atan2(haloVel.current.y, haloVel.current.x) * (180 / Math.PI);

      // Bounce scale spring
      const bounceDelta = 1 - haloScale.current;
      haloBounceVel.current += bounceDelta * 0.25;
      haloBounceVel.current *= 0.65;
      haloScale.current += haloBounceVel.current;

      const stretch = Math.min(speed * 0.015, 0.35);
      const scaleX = (1 + stretch) * haloScale.current;
      const scaleY = (1 - stretch * 0.5) * haloScale.current;

      // Update center target dot
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      // Update outer magnetic halo
      if (cursorHaloRef.current) {
        cursorHaloRef.current.style.transform = `translate3d(${haloPos.current.x}px, ${haloPos.current.y}px, 0) rotate(${angle}deg) scale(${scaleX}, ${scaleY})`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [prefersReducedMotion, visible, hoverType, isClicking]);

  if (prefersReducedMotion || isTouch) return null;

  return (
    <div
      aria-hidden="true"
      className={`cinematic-cursor-root hidden md:block pointer-events-none select-none fixed inset-0 z-[9999] transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Precision Center Target Dot (Replaces cursor pointer) */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-[#F5A14B] pointer-events-none shadow-[0_0_8px_#E87524]"
      />

      {/* Interactive Magnetic Follower Halo */}
      <div
        ref={cursorHaloRef}
        className={`fixed top-0 left-0 pointer-events-none rounded-full flex items-center justify-center transition-[width,height,margin,border-color,background-color] duration-200 ease-out ${
          hoverType === 'clickable'
            ? 'w-12 h-12 -ml-6 -mt-6 border-2 border-[#F5A14B] bg-[#E87524]/15 shadow-[0_0_25px_rgba(232,117,36,0.5)] backdrop-blur-[1px]'
            : hoverType === 'input'
            ? 'w-6 h-10 -ml-3 -mt-5 rounded-md border border-[#F5A14B] bg-[#E87524]/10 shadow-[0_0_15px_rgba(232,117,36,0.3)]'
            : 'w-8 h-8 -ml-4 -mt-4 border border-[#E87524]/50 bg-[#E87524]/5 shadow-[0_0_12px_rgba(232,117,36,0.2)]'
        }`}
        style={{
          willChange: 'transform',
          transformOrigin: 'center center',
        }}
      >
        {/* Interactive Subtle Reticle Crosshair Marks */}
        {hoverType === 'clickable' && (
          <div className="text-[10px] font-mono text-[#F5A14B] font-bold select-none">
            ↗
          </div>
        )}
        {hoverType === 'input' && (
          <div className="w-[1.5px] h-4 bg-[#F5A14B] animate-pulse" />
        )}
      </div>

      {/* Interactive Click Radial Shockwaves */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="fixed top-0 left-0 pointer-events-none -ml-7 -mt-7 w-14 h-14 rounded-full border border-[#F5A14B] animate-ping"
          style={{
            transform: `translate3d(${ripple.x}px, ${ripple.y}px, 0)`,
            boxShadow: '0 0 20px rgba(232, 117, 36, 0.7)',
          }}
        />
      ))}
    </div>
  );
}

export default CustomCursor;
