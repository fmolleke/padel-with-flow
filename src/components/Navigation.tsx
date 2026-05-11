'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { useTheme } from '@/context/ThemeContext';

export function Navigation() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const nextLocale = locale === 'de' ? 'en' : 'de';
    router.replace(pathname, { locale: nextLocale });
  };

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { href: '/' as const, label: t('nav.home') },
    { href: '/about' as const, label: t('nav.about') },
    { href: '/services' as const, label: t('nav.services') },
    { href: '/contact' as const, label: t('nav.contact') },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg" style={{ background: 'color-mix(in srgb, var(--bg) 80%, transparent)' }}>
      <div className="px-8 py-[18px] md:px-5 md:py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <div className="w-[9px] h-[9px] bg-accent rounded-full animate-pulse"></div>
            <span className="font-display font-semibold text-base tracking-tight">padel with flow</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex gap-1 items-center">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-[14px] py-2 text-sm font-medium rounded ${isActive(link.href) ? 'nav-link-active' : 'nav-link'}`}
              >
                {isActive(link.href) && (
                  <span className="absolute bottom-0.5 left-[14px] right-[14px] h-[1.5px] bg-accent"></span>
                )}
                <span>{link.label}</span>
              </Link>
            ))}
            <div className="flex gap-1.5 items-center ml-2 pl-3 border-l border-line-soft">
              <button
                onClick={toggleLanguage}
                className="px-2.5 h-[34px] text-xs font-medium tracking-wider rounded transition-all hover:bg-bg-muted"
                aria-label="Toggle language"
              >
                <span style={{ color: 'var(--fg)' }}>{locale.toUpperCase()}</span>
                <span className="opacity-40 mx-1">/</span>
                <span style={{ color: 'var(--fg-muted)' }}>{locale === 'de' ? 'EN' : 'DE'}</span>
              </button>
              <button
                onClick={toggleTheme}
                className="w-[34px] h-[34px] flex items-center justify-center rounded transition-all hover:bg-bg-muted nav-link"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? '☀' : '☾'}
              </button>
            </div>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={toggleTheme}
              className="w-[34px] h-[34px] flex items-center justify-center rounded transition-all hover:bg-bg-muted nav-link"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀' : '☾'}
            </button>
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="w-[34px] h-[34px] flex items-center justify-center rounded transition-all hover:bg-bg-muted nav-link"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <line x1="2" y1="5" x2="16" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="2" y1="9" x2="16" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="2" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-line-soft">
          <div className="px-8 py-3 flex flex-col max-w-7xl mx-auto">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`px-3 py-3 text-sm font-medium rounded ${isActive(link.href) ? 'nav-link-active' : 'nav-link'}`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 mt-1 border-t border-line-soft">
              <button
                onClick={toggleLanguage}
                className="px-3 py-2 text-xs font-medium tracking-wider rounded transition-all hover:bg-bg-muted"
                aria-label="Toggle language"
              >
                <span style={{ color: 'var(--fg)' }}>{locale.toUpperCase()}</span>
                <span className="opacity-40 mx-1">/</span>
                <span style={{ color: 'var(--fg-muted)' }}>{locale === 'de' ? 'EN' : 'DE'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
