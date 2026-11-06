import React, { useEffect, useState, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const TRAIL_COUNT = 7;

/**
 * Small Jumping Rubber Ball Custom Cursor with Trail
 * 
 * - Small luminous amber rubber ball replacing default system pointer on desktop
 * - Fluid decaying particle trail on cursor movement
 * - Authentic physics-based rubber ball jump on click (squashes on press, springs high into the air, and bounces with gravity damping)
 * - Safe on all devices: completely disabled on touchscreens
 */
export function CustomCursor() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [impactRipples, setImpactRipples] = useState([]);

  const ballRef = useRef(null);
  const trailRefs = useRef([]);

  // Coordinates
  const mousePos = useRef({ x: -200, y: -200 });
  const trailPos = useRef(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: -200, y: -200 }))
  );

  // Rubber ball physics state
  const isMouseDown = useRef(false);
  const jumpOffsetY = useRef(0);
  const jumpVelocityY = useRef(0);
  const squashX = useRef(1);
  const squashY = useRef(1);
  const isJumping = useRef(false);

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
        trailPos.current.forEach((pt) => {
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

    // 3. Rubber ball click dynamics:
    // On press: squashes flat like rubber on impact
    const handleMouseDown = (e) => {
      isMouseDown.current = true;
      squashX.current = 1.45;
      squashY.current = 0.55;
      jumpOffsetY.current = 0;
      jumpVelocityY.current = 0;
      isJumping.current = false;
    };

    // On release/click: launches upward like an elastic rubber ball and rebounds
    const handleMouseUp = (e) => {
      if (!isMouseDown.current) return;
      isMouseDown.current = false;

      // Launch rubber ball upward into the air
      jumpVelocityY.current = -14; // Initial upward impulse
      isJumping.current = true;
      squashX.current = 0.7; // Stretches vertically as it shoots upward
      squashY.current = 1.45;

      // Contact ripple at impact floor
      const ripple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };
      setImpactRipples((prev) => [...prev.slice(-3), ripple]);
      setTimeout(() => {
        setImpactRipples((prev) => prev.filter((r) => r.id !== ripple.id));
      }, 450);
    };

    // 4. Interactive element detection
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

    // 5. Physics simulation loop
    const gravity = 0.85;
    const restitution = 0.58; // Rubber bounciness factor

    const render = () => {
      // --- A. Rubber Ball Jump Physics ---
      if (isJumping.current) {
        jumpVelocityY.current += gravity;
        jumpOffsetY.current += jumpVelocityY.current;

        // When the ball reaches ground (offset >= 0)
        if (jumpOffsetY.current >= 0) {
          jumpOffsetY.current = 0;

          // If velocity is still significant, bounce!
          if (Math.abs(jumpVelocityY.current) > 1.2) {
            jumpVelocityY.current = -jumpVelocityY.current * restitution;
            // Squash on ground hit
            squashX.current = 1.3;
            squashY.current = 0.7;
          } else {
            // Ball comes to rest
            jumpOffsetY.current = 0;
            jumpVelocityY.current = 0;
            isJumping.current = false;
          }
        } else {
          // In the air: stretch vertically while ascending, squash as it turns
          if (jumpVelocityY.current < -2) {
            squashX.current += (0.8 - squashX.current) * 0.18;
            squashY.current += (1.25 - squashY.current) * 0.18;
          } else {
            squashX.current += (1.0 - squashX.current) * 0.2;
            squashY.current += (1.0 - squashY.current) * 0.2;
          }
        }
      }

      // Smooth recovery to spherical shape when at rest
      if (!isMouseDown.current && !isJumping.current) {
        squashX.current += (1.0 - squashX.current) * 0.22;
        squashY.current += (1.0 - squashY.current) * 0.22;
      }

      // Calculate total ball position (mouse + rubber jump offset)
      const currentBallX = mousePos.current.x;
      const currentBallY = mousePos.current.y + jumpOffsetY.current;

      // Update main rubber ball transform
      if (ballRef.current) {
        const hoverScale = isHovering ? 1.35 : 1.0;
        const finalScaleX = squashX.current * hoverScale;
        const finalScaleY = squashY.current * hoverScale;

        ballRef.current.style.transform = `translate3d(${currentBallX}px, ${currentBallY}px, 0) scale(${finalScaleX}, ${finalScaleY})`;
      }

      // --- B. Trail Movement ---
      let prevX = mousePos.current.x;
      let prevY = mousePos.current.y;

      trailPos.current.forEach((point, index) => {
        const factor = 0.42 - index * 0.035;
        point.x += (prevX - point.x) * Math.max(factor, 0.14);
        point.y += (prevY - point.y) * Math.max(factor, 0.14);

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
  }, [prefersReducedMotion, visible, isHovering]);

  if (prefersReducedMotion || isTouch) return null;

  return (
    <div
      aria-hidden="true"
      className={`cinematic-cursor-root hidden md:block pointer-events-none select-none fixed inset-0 z-[9999] transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Decaying Trail Droplets */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => {
        const sizePx = Math.max(8 - i * 0.9, 2);
        const opacity = Math.max(0.38 - i * 0.045, 0.04);

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
              boxShadow: '0 0 6px rgba(232, 117, 36, 0.45)',
              willChange: 'transform',
            }}
          />
        );
      })}

      {/* Small Jumping Rubber Ball (Cursor Core) */}
      <div
        ref={ballRef}
        className="fixed top-0 left-0 -ml-2 -mt-2 w-4 h-4 rounded-full pointer-events-none flex items-center justify-center"
        style={{
          willChange: 'transform',
          transformOrigin: 'center bottom',
        }}
      >
        {/* Luminous Rubber Ball Surface */}
        <div
          className={`w-full h-full rounded-full transition-[background-color,box-shadow] duration-150 relative ${
            isHovering
              ? 'bg-gradient-to-br from-[#FFB366] via-[#F5A14B] to-[#E87524] shadow-[0_0_14px_rgba(232,117,36,0.85),0_0_4px_#FFF]'
              : 'bg-gradient-to-br from-[#F5A14B] via-[#E87524] to-[#B34B0B] shadow-[0_0_10px_rgba(232,117,36,0.7),0_0_2px_rgba(255,255,255,0.4)]'
          }`}
        >
          {/* Specular 3D Rubber Shine Highlight */}
          <div className="w-1 h-1 rounded-full bg-white/90 absolute top-0.5 left-0.5 blur-[0.2px]" />
        </div>
      </div>

      {/* Contact Ground Ripples on Click */}
      {impactRipples.map((ripple) => (
        <div
          key={ripple.id}
          className="fixed top-0 left-0 pointer-events-none -ml-4 -mt-4 w-8 h-8 rounded-full border border-[#E87524] animate-ping"
          style={{
            transform: `translate3d(${ripple.x}px, ${ripple.y}px, 0)`,
            boxShadow: '0 0 10px rgba(232, 117, 36, 0.6)',
          }}
        />
      ))}
    </div>
  );
}

export default CustomCursor;
