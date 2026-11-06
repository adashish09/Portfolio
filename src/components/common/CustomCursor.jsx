import React, { useEffect, useState, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * Cinematic Jumping Ball Custom Cursor
 * Physics-based spring momentum, dynamic velocity squash/stretch,
 * click-bounce jumping dynamics, and hover magnetism.
 * 
 * DEVICE SAFETY:
 * Strictly disabled on touchscreens, phones, tablets, and reduced-motion environments.
 * Pointer-events are strictly none to ensure zero interference with native touch or mouse events.
 */
export function CustomCursor() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const cursorDotRef = useRef(null);
  const jumpingBallRef = useRef(null);

  // Physics simulation references
  const mousePos = useRef({ x: -200, y: -200 });
  const ballPos = useRef({ x: -200, y: -200 });
  const ballVel = useRef({ x: 0, y: 0 });
  const ballScale = useRef({ x: 1, y: 1 });
  const jumpBounce = useRef(1);
  const jumpVelocity = useRef(0);
  const animFrameId = useRef(null);

  useEffect(() => {
    // 1. Device check: detect coarse pointer or non-hover devices
    const coarseMedia = window.matchMedia('(pointer: coarse)');
    const hoverMedia = window.matchMedia('(hover: none)');

    if (prefersReducedMotion || coarseMedia.matches || hoverMedia.matches) {
      setIsTouch(true);
      return;
    }

    // 2. Dynamic touch listener to instantly disarm cursor on hybrid touch interactions
    const handleTouchStart = () => {
      setIsTouch(true);
      setVisible(false);
    };

    const handleMouseMove = (e) => {
      // Guard against synthetic touch-to-mouse events
      if (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) {
        setIsTouch(true);
        return;
      }

      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!visible) {
        setVisible(true);
        // Teleport ball on initial entry so it doesn't fly in from corner
        if (ballPos.current.x === -200) {
          ballPos.current.x = e.clientX;
          ballPos.current.y = e.clientY;
        }
      }
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    // 3. Click jumping dynamics
    const handleMouseDown = () => {
      setIsClicking(true);
      // Squash before the jump
      jumpBounce.current = 0.65;
      jumpVelocity.current = -0.3;
    };

    const handleMouseUp = () => {
      setIsClicking(false);
      // Energetic upward bounce / jump recoil
      jumpBounce.current = 1.45;
      jumpVelocity.current = 0.4;
    };

    // 4. Interactive element detection (hover state)
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

    // 5. High-performance physics rendering loop (Spring Physics + Squash/Stretch)
    const render = () => {
      // Spring force towards mouse coordinates
      const springStiffness = isHovering ? 0.22 : 0.16;
      const damping = isHovering ? 0.65 : 0.72;

      const dx = mousePos.current.x - ballPos.current.x;
      const dy = mousePos.current.y - ballPos.current.y;

      ballVel.current.x += dx * springStiffness;
      ballVel.current.y += dy * springStiffness;

      ballVel.current.x *= damping;
      ballVel.current.y *= damping;

      ballPos.current.x += ballVel.current.x;
      ballPos.current.y += ballVel.current.y;

      // Calculate speed and velocity angle for squash and stretch
      const speed = Math.sqrt(
        ballVel.current.x * ballVel.current.x + ballVel.current.y * ballVel.current.y
      );
      const angle = Math.atan2(ballVel.current.y, ballVel.current.x) * (180 / Math.PI);

      // Spring oscillation for jump bounce
      const jumpDelta = 1 - jumpBounce.current;
      jumpVelocity.current += jumpDelta * 0.25;
      jumpVelocity.current *= 0.68;
      jumpBounce.current += jumpVelocity.current;

      // Stretch along velocity vector proportional to speed
      const stretchAmount = Math.min(speed * 0.02, 0.45);
      const baseScaleX = (1 + stretchAmount) * jumpBounce.current;
      const baseScaleY = (1 - stretchAmount * 0.6) * jumpBounce.current;

      // Precision central point
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      // Jumping ball transform
      if (jumpingBallRef.current) {
        const hoverScale = isHovering ? 1.7 : 1;
        const clickScale = isClicking ? 0.75 : 1;
        const finalScaleX = baseScaleX * hoverScale * clickScale;
        const finalScaleY = baseScaleY * hoverScale * clickScale;

        jumpingBallRef.current.style.transform = `translate3d(${ballPos.current.x}px, ${ballPos.current.y}px, 0) rotate(${angle}deg) scale(${finalScaleX}, ${finalScaleY})`;
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
  }, [prefersReducedMotion, visible, isHovering, isClicking]);

  // Zero-render guard for mobile, touch screens, and reduced motion
  if (prefersReducedMotion || isTouch) return null;

  return (
    <div
      aria-hidden="true"
      className={`cinematic-cursor-root hidden md:block pointer-events-none select-none fixed inset-0 z-[9999] transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Precision Center Target Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-[#F5A14B] pointer-events-none shadow-[0_0_8px_#E87524]"
      />

      {/* Dynamic Jumping Ball / Glowing Companion Orb */}
      <div
        ref={jumpingBallRef}
        className="fixed top-0 left-0 -ml-3.5 -mt-3.5 w-7 h-7 rounded-full pointer-events-none flex items-center justify-center transition-[background-color,border-color,filter] duration-150 ease-out"
        style={{
          willChange: 'transform',
          transformOrigin: 'center center',
        }}
      >
        {/* Core Glowing Ball with warm amber gradient */}
        <div
          className={`w-full h-full rounded-full transition-all duration-200 ${
            isHovering
              ? 'bg-gradient-to-br from-[#F5A14B]/35 via-[#E87524]/20 to-transparent border border-[#F5A14B]/80 shadow-[0_0_25px_rgba(232,117,36,0.5)] backdrop-blur-[1px]'
              : 'bg-gradient-to-br from-[#F5A14B] via-[#E87524] to-[#C25A12] border border-[#F5A14B]/40 shadow-[0_0_15px_rgba(232,117,36,0.6)] opacity-75'
          }`}
        >
          {/* Subtle Inner Specular Highlight on the Ball */}
          <div className="w-1.5 h-1.5 rounded-full bg-white/70 absolute top-1 left-1 blur-[0.4px]" />
        </div>
      </div>
    </div>
  );
}

export default CustomCursor;
