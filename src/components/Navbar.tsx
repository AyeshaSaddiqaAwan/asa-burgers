import React, { useState, useEffect } from 'react';
import { Flame, Menu as MenuIcon, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'THE STACK', href: '#story-experience' },
    { name: 'MENU', href: '#menu' },
    { name: 'COMBOS', href: '#featured' },
    { name: 'CONCEPT', href: '#story' },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-16 lg:h-18 flex items-center ${isScrolled
        ? 'bg-[#0d0d0f]/95 backdrop-blur-md border-b border-zinc-800 shadow-2xl'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between w-full">
        {/* Brand Logo - ASA BURGERS */}
        <a href="#" id="brand-logo" className="flex items-center gap-2.5 group">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <img
              src="/asa-burgers.png"
              alt="ASA Burgers Logo"
              className="h-12 md:h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />

            {/* Brand Text */}
            <div className="flex flex-col">
              <span className="font-stencil text-2xl md:text-3xl font-bold tracking-wider text-white group-hover:text-orange-500 transition-colors leading-none">
                ASA <span className="text-orange-500">∞</span>BURGERS
              </span>

              <span className="text-[10px] tracking-[0.25em] uppercase text-zinc-400 font-athletic mt-1">
                Premium Burgers
              </span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-athletic text-sm uppercase tracking-widest text-zinc-300 hover:text-orange-500 transition-colors py-1 relative"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Toggle Button */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-zinc-200 hover:text-orange-500 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-7 h-7" /> : <MenuIcon className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="lg:hidden fixed inset-x-0 top-17.5 bg-[#121215]/98 backdrop-blur-xl border-b border-zinc-800 px-6 py-8 shadow-2xl flex flex-col gap-6 animate-in slide-in-from-top duration-300"
        >
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-athletic text-lg uppercase tracking-wider text-zinc-100 hover:text-orange-500 py-2 border-b border-zinc-800/80"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
