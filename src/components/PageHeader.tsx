import type { ReactNode } from 'react';

interface PageHeaderProps {
  kicker: string;
  title: string;
  description: string;
  action?: ReactNode;
}

export function PageHeader({ kicker, title, description, action }: PageHeaderProps) {
  return (
    <section className="border-b border-white/10 bg-[#090A0C]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-medium tracking-wider text-[#C8F135] uppercase">
              {kicker}
            </p>
            <h1 className="font-display text-4xl font-bold tracking-tight text-[#F4F5F7] sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-[#A1A7B3] sm:text-lg">
              {description}
            </p>
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      </div>
    </section>
  );
}
