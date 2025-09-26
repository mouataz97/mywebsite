import { useEffect, useRef } from 'react';

export function AnimatedBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const x = (clientX / innerWidth - 0.5) * 20; // -10 to 10
        const y = (clientY / innerHeight - 0.5) * 20; // -10 to 10
        
        ref.current.style.setProperty('--x', `${x}px`);
        ref.current.style.setProperty('--y', `${y}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={ref}
      className="fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(
              circle at center,
              rgba(var(--primary) / 0.15) 0%,
              transparent 50%
            )
          `,
          transform: 'translate(calc(var(--x, 0) * 1px), calc(var(--y, 0) * 1px))',
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
    </div>
  );
}
