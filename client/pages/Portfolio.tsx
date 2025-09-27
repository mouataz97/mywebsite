import React from 'react';
import { useThemeContext } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

export default function Portfolio() {
  const { theme } = useThemeContext();

  return (
    <div className={cn(
      "min-h-screen w-full py-16 px-4 sm:px-6 lg:px-8",
      theme === 'light' ? 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40' : 'bg-gradient-to-br from-slate-900 via-blue-900/30 to-indigo-900/40'
    )}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Portfolio
        </h1>
        
        {/* Portfolio items grid will go here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder for portfolio items */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl shadow-slate-200/20 dark:shadow-slate-900/20 h-64 flex items-center justify-center">
            <p className="text-slate-700 dark:text-slate-300">Portfolio Item 1</p>
          </div>
        </div>
      </div>
    </div>
  );
}
