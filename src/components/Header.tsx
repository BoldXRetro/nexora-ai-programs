import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useState } from 'react'

function NexoraLogo({ footer = false }: { footer?: boolean }) {
  return (
    <span className={footer ? 'nexora-logo footer-logo' : 'nexora-logo'} aria-label="Nexora">
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <defs><linearGradient id={footer ? 'nexora-grad-footer' : 'nexora-grad'} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#65E7FF"/><stop offset=".48" stopColor="#5D7CFF"/><stop offset="1" stopColor="#A65CFF"/></linearGradient></defs>
        <rect x="2" y="2" width="60" height="60" rx="16" fill="#0B1020"/>
        <path d="M17 47V17l30 30V17" fill="none" stroke={`url(#${footer ? 'nexora-grad-footer' : 'nexora-grad'})`} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="49" cy="13" r="2.5" fill="#65E7FF"/>
      </svg>
      <strong>NEXORA</strong>
    </span>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="site-header">
      <div className="header-inner wrap">
        <Link to="/" className="brand" aria-label="Nexora home"><NexoraLogo /></Link>
        <nav aria-label="Main navigation" className={open ? 'main-nav is-open' : 'main-nav'}>
          <a href="/#courses" onClick={() => setOpen(false)}>Programs</a>
          <a href="/#approach" onClick={() => setOpen(false)}>How it works</a>
          <a href="/#faq" onClick={() => setOpen(false)}>FAQs</a>
        </nav>
        <a href="/#courses" className="button button-dark header-cta">Explore programs <ArrowUpRight size={16} /></a>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="site-footer wrap">
      <div className="footer-top">
        <Link to="/" className="brand footer-brand"><NexoraLogo footer /></Link>
        <p>Practical AI skills for the next version of your work.</p>
        <a href="/#courses">Explore programs <ArrowUpRight size={16} /></a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Nexora. All rights reserved.</span>
        <span>Support: <a href="mailto:gcloudework07@gmail.com">gcloudework07@gmail.com</a></span>
      </div>
    </footer>
  )
}
