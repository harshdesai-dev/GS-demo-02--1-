
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
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
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMobileMenuOpen(false);
        return;
      }

      if (event.key !== 'Tab') return;

      const focusableElements =
        drawerRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );

      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      menuButtonRef.current?.focus();
    };
  }, [mobileMenuOpen]);

  const mobileDrawer = mobileMenuOpen
    ? createPortal(
        <div
          ref={drawerRef}
          className="fixed inset-0 z-[100] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          id="mobile-navigation-drawer"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <div className="absolute inset-y-0 right-0 flex w-full max-w-xs flex-col border-l border-white/10 bg-[#090A0C] p-6 shadow-2xl">
            {/* Drawer header */}
            <div className="flex shrink-0 items-center justify-between border-b border-white/10 pb-4">
              <span className="font-display text-xl font-bold text-[#F4F5F7]">
                {SITE_CONFIG.brand.name}
              </span>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="inline-flex h-11 w-11 cursor-pointer items-center justify-center border border-white/15 bg-[#121418] text-[#F4F5F7] hover:border-white/30"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Navigation links */}
            <nav
              aria-label="Mobile links"
              className="mt-4 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overscroll-contain"
            >
              {SITE_CONFIG.navigation.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex min-h-[44px] shrink-0 items-center justify-between px-3 py-2.5 text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-[#181B20] text-[#C8F135]'
                        : 'text-[#F4F5F7] hover:bg-[#121418]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="text-xs font-medium text-[#C8F135]">
                          Current
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Drawer CTA buttons */}
            <div className="mt-6 shrink-0 space-y-3 border-t border-white/10 pt-5">
              <WhatsAppCta
                source="mobile_drawer"
                label="WhatsApp Enquiry"
                className="w-full"
              />

              <a
                href={SITE_CONFIG.contact.phoneHref}
                onClick={() => trackPhoneCtaClick('mobile_drawer')}
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 border border-white/20 px-4 py-2.5 text-sm font-medium text-[#F4F5F7] transition-colors hover:bg-white/5"
              >
                <Phone
                  className="h-4 w-4 text-[#C8F135]"
                  aria-hidden="true"
                />
                <span>Call {SITE_CONFIG.contact.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#090A0C]/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <Link
            to="/"
            className="shrink-0 whitespace-nowrap font-display text-2xl font-extrabold tracking-tight text-[#F4F5F7] transition-colors hover:text-[#C8F135]"
          >
            {SITE_CONFIG.brand.name}
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-5 lg:flex xl:gap-7"
          >
            {SITE_CONFIG.navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `relative shrink-0 whitespace-nowrap py-2 text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? 'text-[#C8F135]'
                      : 'text-[#A1A7B3] hover:text-[#F4F5F7]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.label}</span>
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 -bottom-px h-0.5 bg-[#C8F135]"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Header actions */}
          <div className="flex shrink-0 items-center gap-3">
            <ActionLink
              to="/contact#enquiry-form"
              variant="primary"
              className="hidden min-h-[40px] px-4 py-2 text-xs sm:inline-flex sm:text-sm"
            >
              Enquire Now
            </ActionLink>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-haspopup="dialog"
              aria-label="Open navigation menu"
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center border border-white/15 bg-[#121418] text-[#F4F5F7] transition-colors hover:border-white/30 hover:bg-[#181B20] active:bg-[#22262D] lg:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {mobileDrawer}
    </>
  );
}
