import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="site-header">
      <div className="header-inner wrap">
        <Link to="/" className="brand" aria-label="Nexora home"><img src="/nexora-logo.svg" alt="Nexora" /></Link>
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
        <Link to="/" className="brand footer-brand"><img src="/nexora-logo.svg" alt="Nexora" /></Link>
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
