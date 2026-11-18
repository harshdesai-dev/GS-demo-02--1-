import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { ActionLink } from './ActionButton';
import { WhatsAppCta } from './WhatsAppCta';
import { trackPhoneCtaClick } from '../lib/analytics';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#090A0C]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single clean brand wordmark */}
        <Link
          to="/"
          className="font-display text-2xl font-extrabold tracking-tight text-[#F4F5F7] transition-colors hover:text-[#C8F135] whitespace-nowrap shrink-0"
        >
          {SITE_CONFIG.brand.name}
        </Link>

        {/* Zone 2: Desktop navigation across all 8 pages */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-5 xl:gap-7"
        >
          {SITE_CONFIG.navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `relative py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  isActive
                    ? 'text-[#C8F135]'
                    : 'text-[#A1A7B3] hover:text-[#F4F5F7]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{item.label}</span>
                  {isActive ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-px h-0.5 bg-[#C8F135]"
                    />
                  ) : null}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: Single primary CTA + Mobile Drawer Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <ActionLink
            to="/contact#enquiry-form"
            variant="primary"
            className="hidden sm:inline-flex min-h-[40px] px-4 py-2 text-xs sm:text-sm"
          >
            Enquire Now
          </ActionLink>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label="Open navigation menu"
            className="inline-flex lg:hidden h-11 w-11 items-center justify-center border border-white/15 bg-[#121418] text-[#F4F5F7] hover:border-white/30 hover:bg-[#181B20] active:bg-[#22262D] transition-colors cursor-pointer"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Accessible Mobile Navigation Drawer */}
      {mobileMenuOpen ? (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          id="mobile-navigation-drawer"
        >
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <div className="fixed inset-y-0 right-0 flex w-full max-w-xs flex-col border-l border-white/10 bg-[#090A0C] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="font-display text-xl font-bold text-[#F4F5F7]">
                {SITE_CONFIG.brand.name}
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  menuButtonRef.current?.focus();
                }}
                aria-label="Close navigation menu"
                className="inline-flex h-11 w-11 items-center justify-center border border-white/15 bg-[#121418] text-[#F4F5F7] hover:border-white/30 cursor-pointer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile links" className="mt-4 flex flex-1 flex-col gap-1 overflow-y-auto">
              {SITE_CONFIG.navigation.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex min-h-[44px] items-center justify-between px-3 py-2.5 text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-[#181B20] text-[#C8F135]'
                        : 'text-[#F4F5F7] hover:bg-[#121418]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{item.label}</span>
                      {isActive ? (
                        <span className="text-xs font-medium text-[#C8F135]">Current</span>
                      ) : null}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="mt-6 space-y-3 border-t border-white/10 pt-5">
              <WhatsAppCta
                source="mobile_drawer"
                label="WhatsApp Enquiry"
                className="w-full"
              />
              <a
                href={SITE_CONFIG.contact.phoneHref}
                onClick={() => trackPhoneCtaClick('mobile_drawer')}
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 border border-white/20 px-4 py-2.5 text-sm font-medium text-[#F4F5F7] hover:bg-white/5 transition-colors"
              >
                <Phone className="h-4 w-4 text-[#C8F135]" aria-hidden="true" />
                <span>Call {SITE_CONFIG.contact.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
