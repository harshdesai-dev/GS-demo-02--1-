import type { ReactNode } from 'react';

interface ContentSectionProps {
  id?: string;
  tone?: 'obsidian' | 'surface';
  bordered?: boolean;
  className?: string;
  children: ReactNode;
}

export function ContentSection({
  id,
  tone = 'obsidian',
  bordered = true,
  className = '',
  children,
}: ContentSectionProps) {
  const bgClass = tone === 'surface' ? 'bg-[#121418]' : 'bg-[#090A0C]';
  const borderClass = bordered ? 'border-b border-white/10' : '';

  return (
    <section id={id} className={`${bgClass} ${borderClass} ${className}`}>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">{children}</div>
    </section>
  );
}
