import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryPhoto } from '../data/gymContent';
import { MediaFrame } from './MediaFrame';

interface GalleryGridProps {
  photos: GalleryPhoto[];
  showFilters?: boolean;
}

type GalleryFilter = 'All' | GalleryPhoto['category'];

const CATEGORIES: GalleryFilter[] = [
  'All',
  'Strength Floor',
  'Conditioning',
  'Amenities',
  'Coaching',
];

export function GalleryGrid({ photos, showFilters = true }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryFilter>('All');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const filteredPhotos =
    activeCategory === 'All'
      ? photos
      : photos.filter((photo) => photo.category === activeCategory);
  const isLightboxOpen = activeIndex !== null;

  useEffect(() => {
    if (!isLightboxOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveIndex(null);
      } else if (event.key === 'ArrowRight') {
        setActiveIndex((current) =>
          current === null ? null : (current + 1) % filteredPhotos.length,
        );
      } else if (event.key === 'ArrowLeft') {
        setActiveIndex((current) =>
          current === null
            ? null
            : (current - 1 + filteredPhotos.length) % filteredPhotos.length,
        );
      } else if (event.key === 'Tab') {
        const focusableElements = lightboxRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusableElements?.length) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      previouslyFocused?.focus();
    };
  }, [isLightboxOpen, filteredPhotos.length]);

  const activePhoto = activeIndex !== null ? filteredPhotos[activeIndex] : null;

  return (
    <div className="space-y-8">
      {showFilters ? (
        <div
          role="group"
          aria-label="Filter gallery photos by zone"
          className="flex flex-wrap gap-2"
        >
          {CATEGORIES.map((category) => {
            const isSelected = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={isSelected}
                onClick={() => {
                  setActiveCategory(category);
                  setActiveIndex(null);
                }}
                className={`min-h-[40px] shrink-0 cursor-pointer whitespace-nowrap px-4 py-2 text-xs font-medium transition-colors sm:text-sm ${
                  isSelected
                    ? 'bg-[#C8F135] text-[#090A0C]'
                    : 'border border-white/15 bg-[#121418] text-[#A1A7B3] hover:border-white/30 hover:text-[#F4F5F7]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPhotos.map((photo, index) => (
          <figure
            key={photo.id}
            className="group flex flex-col border border-white/10 bg-[#121418]"
          >
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View larger image: ${photo.title}`}
              className="block w-full cursor-pointer overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-[#C8F135]"
            >
              <MediaFrame
                src={photo.image}
                alt={photo.alt}
                aspectClass="aspect-[4/3]"
                className="border-0"
                imgClassName="transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </button>
            <figcaption className="flex flex-1 flex-col justify-between gap-2 border-t border-white/10 p-5">
              <div>
                <p className="text-xs text-[#C8F135]">{photo.category}</p>
                <h3 className="mt-1 font-display text-xl font-bold text-[#F4F5F7]">
                  {photo.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-[#A1A7B3]">{photo.caption}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Lightweight Accessible Lightbox Modal */}
      {activePhoto && activeIndex !== null ? (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
        >
          <div
            className="fixed inset-0"
            onClick={() => setActiveIndex(null)}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-4xl border border-white/15 bg-[#121418]">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
              <div>
                <p className="text-xs text-[#C8F135]">{activePhoto.category}</p>
                <p className="font-display text-xl font-bold text-[#F4F5F7]">
                  {activePhoto.title}
                </p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Close image viewer"
                className="inline-flex h-10 w-10 cursor-pointer items-center justify-center border border-white/15 bg-[#181B20] text-[#F4F5F7] hover:border-white/30"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="bg-[#090A0C]">
              <MediaFrame
                src={activePhoto.image}
                alt={activePhoto.alt}
                aspectClass="aspect-[16/10]"
                className="border-0"
                imgClassName="bg-[#090A0C] object-contain"
                priority
              />
            </div>

            <div className="flex flex-col gap-4 border-t border-white/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p className="text-sm text-[#A1A7B3]">{activePhoto.caption}</p>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex(
                      (activeIndex - 1 + filteredPhotos.length) % filteredPhotos.length,
                    )
                  }
                  aria-label="Previous photo"
                  className="inline-flex h-10 w-10 cursor-pointer items-center justify-center border border-white/15 bg-[#181B20] text-[#F4F5F7] hover:border-white/30"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <span className="px-2 font-mono text-xs tabular-nums text-[#A1A7B3]">
                  {activeIndex + 1} / {filteredPhotos.length}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveIndex((activeIndex + 1) % filteredPhotos.length)}
                  aria-label="Next photo"
                  className="inline-flex h-10 w-10 cursor-pointer items-center justify-center border border-white/15 bg-[#181B20] text-[#F4F5F7] hover:border-white/30"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
