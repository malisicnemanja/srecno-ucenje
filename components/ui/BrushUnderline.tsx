'use client';

import React, { useEffect, useRef, useState } from 'react';

export type BrandColor = 'sky' | 'sun' | 'grass' | 'heart' | 'night';
export type UnderlineStyle = 'smooth' | 'rough' | 'double' | 'wavy' | 'zigzag';
export type Thickness = 'thin' | 'medium' | 'thick';

interface BrushUnderlineProps {
  color?: BrandColor;
  style?: UnderlineStyle;
  duration?: number;
  delay?: number;
  thickness?: Thickness;
  animate?: boolean;
  className?: string;
}

const brandColors: Record<BrandColor, string> = {
  sky: '#5DBFDB',
  sun: '#F4C950',
  grass: '#91C733',
  heart: '#E53935',
  night: '#1E293B'
};

const thicknessValues: Record<Thickness, number> = {
  thin: 2,
  medium: 3,
  thick: 4
};

const BrushUnderline: React.FC<BrushUnderlineProps> = ({
  color = 'sun',
  style = 'smooth',
  duration = 1200,
  delay = 0,
  thickness = 'medium',
  animate = true,
  className = ''
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [svgWidth, setSvgWidth] = useState(100);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && animate) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (svgRef.current) {
      observer.observe(svgRef.current);
    }

    return () => observer.disconnect();
  }, [animate, delay]);

  useEffect(() => {
    const updateWidth = () => {
      if (svgRef.current?.parentElement) {
        const parentWidth = svgRef.current.parentElement.offsetWidth;
        setSvgWidth(parentWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const generatePath = (width: number, height: number): string => {
    const strokeWidth = thicknessValues[thickness];
    const y = height / 2;
    
    switch (style) {
      case 'smooth':
        return `M 2 ${y} Q ${width/4} ${y-2} ${width/2} ${y} T ${width-2} ${y}`;
      
      case 'rough':
        const points = [];
        const numPoints = Math.max(8, Math.floor(width / 15));
        for (let i = 0; i <= numPoints; i++) {
          const x = (i / numPoints) * (width - 4) + 2;
          const yOffset = (Math.random() - 0.5) * 3;
          points.push(`${x} ${y + yOffset}`);
        }
        return `M ${points.join(' L ')}`;
      
      case 'double':
        return `M 2 ${y-2} Q ${width/4} ${y-4} ${width/2} ${y-2} T ${width-2} ${y-2} M 2 ${y+2} Q ${width/4} ${y} ${width/2} ${y+2} T ${width-2} ${y+2}`;
      
      case 'wavy':
        const waveHeight = 4;
        const waveLength = width / 6;
        let path = `M 2 ${y}`;
        for (let x = 0; x < width - 4; x += 2) {
          const waveY = y + Math.sin((x / waveLength) * Math.PI) * waveHeight;
          path += ` L ${x + 2} ${waveY}`;
        }
        return path;
      
      case 'zigzag':
        const zigHeight = 3;
        const zigWidth = 12;
        let zigPath = `M 2 ${y}`;
        for (let x = 0; x < width - 4; x += zigWidth) {
          const isUp = Math.floor(x / zigWidth) % 2 === 0;
          zigPath += ` L ${Math.min(x + zigWidth/2 + 2, width-2)} ${y + (isUp ? -zigHeight : zigHeight)}`;
          zigPath += ` L ${Math.min(x + zigWidth + 2, width-2)} ${y}`;
        }
        return zigPath;
      
      default:
        return `M 2 ${y} L ${width-2} ${y}`;
    }
  };

  const svgHeight = style === 'double' ? 16 : 12;
  const path = generatePath(svgWidth, svgHeight);
  const pathLength = pathRef.current?.getTotalLength() || svgWidth;

  return (
    <svg
      ref={svgRef}
      className={`absolute bottom-0 left-0 w-full overflow-visible ${className}`}
      width={svgWidth}
      height={svgHeight}
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      preserveAspectRatio="none"
      style={{ 
        transform: 'translateY(2px)',
        zIndex: -1
      }}
    >
      <defs>
        <filter id={`rough-${color}-${style}`} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence 
            baseFrequency="0.04" 
            numOctaves="3" 
            result="noise"
          />
          <feDisplacementMap 
            in="SourceGraphic" 
            in2="noise" 
            scale={style === 'rough' ? '1' : '0.5'}
          />
        </filter>
      </defs>
      
      <path
        ref={pathRef}
        d={path}
        stroke={brandColors[color]}
        strokeWidth={thicknessValues[thickness]}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={style === 'rough' ? `url(#rough-${color}-${style})` : undefined}
        style={{
          strokeDasharray: animate ? pathLength : 'none',
          strokeDashoffset: animate ? (isVisible ? 0 : pathLength) : 0,
          transition: animate ? `stroke-dashoffset ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)` : 'none',
          opacity: animate ? (isVisible ? 1 : 0.3) : 1,
        }}
      />
    </svg>
  );
};

export default BrushUnderline;