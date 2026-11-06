import React, { useEffect, useState, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const TRAIL_LENGTH = 8;

/**
 * Cinematic Ball Cursor with Particle Trail & Click Interaction
 * 
 * Replaces default system pointer on desktop with an organic glowing amber ball.
 * Features a dynamic inertia-based trailing tail, energetic click bounce,
 * expanding click shockwaves, and hover magnetism.
 * 
 * DEVICE SAFETY:
 * Strictly disabled on touch devices and coarse pointers to ensure standard
 * mobile touch gestures are 100% native and unobstructed.
 */
export function CustomCursor() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [ripples, setRipples] = useState([]);

  const mainBallRef = useRef(null);
  const trailRefs = useRef([]);

  // Coordinate references
  const mousePos = useRef({ x: -200, y: -200 });
  const trailPositions = useRef(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: -200, y: -200 }))
  );

  // Ball dynamics
  const ballScale = useRef(1);
  const ballVelocity = useRef(0);
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
        // Teleport trail points on entry to avoid streaks across screen
        trailPositions.current.forEach((pt) => {
          pt.x = e.clientX;
          pt.y = e.clientY;
        });
      }
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    // 3. Click interaction: energetic squash, bounce, and ripple shockwave
    const handleMouseDown = (e) => {
      setIsClicking(true);
      ballScale.current = 0.65; // Squash on press
      ballVelocity.current = -0.15;

      // Spawn an expanding click ripple shockwave at click coordinates
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };

      setRipples((prev) => [...prev.slice(-4), newRipple]);

      // Auto-cleanup ripple
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
      ballScale.current = 1.45; // Energetic upward bounce recoil
      ballVelocity.current = 0.35;
    };

    // 4. Interactive hover detection
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.closest('[role="tab"]') ||
        target.classList?.contains('cursor-pointer');

      setIsHovering(Boolean(isInteractive));
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    // 5. Physics rendering loop: Primary ball + dynamic trailing tail
    const render = () => {
      // Smooth spring bounce recovery for main ball
      const delta = 1 - ballScale.current;
      ballVelocity.current += delta * 0.28;
      ballVelocity.current *= 0.65;
      ballScale.current += ballVelocity.current;

      // Render primary ball directly at mouse position
      if (mainBallRef.current) {
        const hoverMultiplier = isHovering ? 1.6 : 1;
        const currentScale = ballScale.current * hoverMultiplier;
        mainBallRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) scale(${currentScale})`;
      }

      // Update trail segments with linear interpolation
      let prevX = mousePos.current.x;
      let prevY = mousePos.current.y;

      trailPositions.current.forEach((point, index) => {
        // Trailing interpolation factor (closer points follow faster)
        const factor = 0.38 - index * 0.025;
        point.x += (prevX - point.x) * Math.max(factor, 0.12);
        point.y += (prevY - point.y) * Math.max(factor, 0.12);

        const el = trailRefs.current[index];
        if (el) {
          el.style.transform = `translate3d(${point.x}px, ${point.y}px, 0)`;
        }

        prevX = point.x;
        prevY = point.y;
      });

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
  }, [prefersReducedMotion, visible, isHovering, isClicking]);

  if (prefersReducedMotion || isTouch) return null;

  return (
    <div
      aria-hidden="true"
      className={`cinematic-cursor-root hidden md:block pointer-events-none select-none fixed inset-0 z-[9999] transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Dynamic Trailing Particle Tail */}
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => {
        // Trail size and opacity decay progressively
        const sizePx = Math.max(16 - i * 1.6, 4);
        const opacity = Math.max(0.45 - i * 0.05, 0.08);

        return (
          <div
            key={i}
            ref={(el) => (trailRefs.current[i] = el)}
            className="fixed top-0 left-0 rounded-full pointer-events-none"
            style={{
              width: `${sizePx}px`,
              height: `${sizePx}px`,
              marginLeft: `-${sizePx / 2}px`,
              marginTop: `-${sizePx / 2}px`,
              backgroundColor: '#E87524',
              opacity: opacity,
              boxShadow: '0 0 10px rgba(232, 117, 36, 0.5)',
              willChange: 'transform',
            }}
          />
        );
      })}

      {/* Primary Glowing Ball Cursor (Replaces the system pointer) */}
      <div
        ref={mainBallRef}
        className="fixed top-0 left-0 -ml-3.5 -mt-3.5 w-7 h-7 rounded-full pointer-events-none flex items-center justify-center"
        style={{
          willChange: 'transform',
        }}
      >
        <div
          className={`w-full h-full rounded-full transition-[background-color,border-color,box-shadow] duration-200 ${
            isHovering
              ? 'bg-[#E87524]/20 border-2 border-[#F5A14B] shadow-[0_0_25px_rgba(232,117,36,0.7)] backdrop-blur-[1px]'
              : 'bg-gradient-to-br from-[#F5A14B] via-[#E87524] to-[#C25A12] border border-[#F5A14B]/70 shadow-[0_0_16px_rgba(232,117,36,0.8),0_0_30px_rgba(232,117,36,0.35)]'
          }`}
        >
          {/* Specular Light Dot for 3D sphere feel */}
          <div className="w-1.5 h-1.5 rounded-full bg-white/80 absolute top-1.5 left-1.5 blur-[0.3px]" />
        </div>
      </div>

      {/* Interactive Click Ripple Shockwaves */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="fixed top-0 left-0 pointer-events-none -ml-6 -mt-6 w-12 h-12 rounded-full border border-[#F5A14B] animate-ping"
          style={{
            transform: `translate3d(${ripple.x}px, ${ripple.y}px, 0)`,
            boxShadow: '0 0 15px rgba(232, 117, 36, 0.6)',
          }}
        />
      ))}
    </div>
  );
}

export default CustomCursor;
