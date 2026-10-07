import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Asterisk, Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="site-header">
      <div className="header-inner wrap">
        <Link to="/" className="wordmark" aria-label="Nexora home"><Asterisk aria-hidden="true" />nexora<span>.</span></Link>
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
        <Link to="/" className="wordmark"><Asterisk aria-hidden="true" />nexora<span>.</span></Link>
        <p>Practical AI skills for the next version of your work.</p>
        <a href="/#courses">Explore programs <ArrowUpRight size={16} /></a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Nexora. All rights reserved.</span>
        <span>Support: <a href="mailto:spammed.ccn.ccs@gmail.com">spammed.ccn.ccs@gmail.com</a></span>
      </div>
    </footer>
  )
}
