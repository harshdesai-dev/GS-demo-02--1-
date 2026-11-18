import type { TrainerProfile } from '../data/gymContent';
import { MediaFrame } from './MediaFrame';

interface TrainerCardProps {
  trainer: TrainerProfile;
}

export function TrainerCard({ trainer }: TrainerCardProps) {
  return (
    <article className="flex h-full flex-col border border-white/10 bg-[#121418]">
      <MediaFrame
        src={trainer.image}
        alt={trainer.imageAlt}
        aspectClass="aspect-[3/4]"
        className="border-0 border-b border-white/10"
        imgClassName="object-top"
      />
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <p className="text-xs font-medium text-[#C8F135]">{trainer.role}</p>
          <h3 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-[#F4F5F7]">
            {trainer.name}
          </h3>
          <p className="mt-2 text-xs text-[#A1A7B3]">
            {trainer.specialties.join(' · ')}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[#A1A7B3]">{trainer.bio}</p>
        </div>

        <p className="mt-5 border-t border-white/10 pt-4 text-xs text-[#717886]">
          {trainer.credentialsNote}
        </p>
      </div>
    </article>
  );
}
