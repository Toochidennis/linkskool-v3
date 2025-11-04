
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  gradient?: boolean;
}

export default function Card({ children, className = '', onClick, hover = false, gradient = false }: CardProps) {
  return (
    <div className="relative">
      {/* Background gradient if enabled */}
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-60 rounded-2xl"></div>
      )}
      
      <div 
        className={`relative bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 transition-all duration-300 ${
          hover ? 'hover:shadow-lg hover:-translate-y-1 hover:bg-white/90' : ''
        } ${onClick ? 'cursor-pointer' : ''} ${className}`}
        onClick={onClick}
      >
        {children}
      </div>
    </div>
  );
}
