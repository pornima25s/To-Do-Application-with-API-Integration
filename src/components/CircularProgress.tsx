import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

interface CircularProgressProps {
  completed: number;
  total: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ completed, total }) => {
  const theme = useSelector((state: RootState) => state.auth.theme);
  const percentage = total === 0 ? 0 : (completed / total) * 100;
  const radius = 40;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative">
      <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
        <circle
          stroke={theme === 'dark' ? '#374151' : '#E5E7EB'}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#22C55E"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {Math.round(percentage)}%
        </div>
      </div>
    </div>
  );
};

export default CircularProgress;