import { Link, createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Asterisk, BookOpen, Check, Clock3, Code2, Layers3, Search, Sparkles, Zap } from 'lucide-react'
import products from '@/data/products'
import { CourseArtwork } from '@/components/CourseArtwork'

export const Route = createFileRoute('/')({ component: Home })

const categories = ['All programs', 'AI essentials', 'Automation', 'Development', 'Creator & business'] as const

function HeroArtwork() {
  return <div className="hero-art" aria-label="Abstract illustration of practical AI systems" role="img">
    <div className="hero-art-top"><span><span className="status-dot" /> IDEAS INTO SYSTEMS</span><ArrowUpRight size={20} /></div>
    <div className="orbit"><span className="orbit-ring ring-one" /><span className="orbit-ring ring-two" /><svg viewBox="0 0 320 320" className="hero-flower" aria-hidden="true">{Array.from({ length: 18 }, (_, index) => <ellipse key={index} cx="160" cy="101" rx="32" ry="78" fill="none" stroke="currentColor" strokeWidth="1.5" transform={`rotate(${index * 20} 160 160)`} />)}<circle cx="160" cy="160" r="28" fill="currentColor" /></svg><div className="orbit-chip chip-one"><Sparkles size={18} /> Think clearly</div><div className="orbit-chip chip-two"><Code2 size={18} /> Build systems</div><span className="orbit-plus plus-one">+</span><span className="orbit-plus plus-two">+</span></div>
    <div className="hero-note"><span className="note-icon"><ArrowUpRight size={30} strokeWidth={1.5} /></span><div>From “I should”<br /><strong>to “it works.”</strong></div><span className="note-number">01 — ∞</span></div>
  </div>
}

function Home() {
  const [category, setCategory] = useState<string>('All programs')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('featured')

  const courses = useMemo(() => {
    const filtered = products.filter(product =>
      (category === 'All programs' || product.category === category) &&
      `${product.name} ${product.shortDescription} ${product.category}`.toLowerCase().includes(query.toLowerCase())
    )
    return sort === 'price' ? [...filtered].sort((first, second) => first.price - second.price) : filtered
  }, [category, query, sort])

  return <>
    <section className="hero wrap">
      <div className="hero-copy">
        <span className="eyebrow hero-eyebrow"><span className="status-dot" /> PRACTICAL AI. REAL OUTPUT.</span>
        <h1>Make AI<br />part of your<br /><em>advantage.</em></h1>
        <p>Learn the skills, systems, and workflows that turn AI from a chat window into something genuinely useful.</p>
        <div className="hero-actions"><a href="#courses" className="button button-orange">Explore programs <ArrowUpRight size={19} /></a><a href="#approach" className="text-link">See how it works <ArrowRight size={16} /></a></div>
        <div className="hero-footnote"><span className="small-icon"><BookOpen size={17} /></span><span>Learn at your pace. Build as you go.</span></div>
      </div>
      <HeroArtwork />
    </section>

    <div className="value-strip"><div className="wrap value-inner">
      <span><Sparkles size={20} /> Practical AI skills</span>
      <span><Layers3 size={20} /> Structured programs</span>
      <span><Clock3 size={20} /> Learn at your pace</span>
      <span><Zap size={20} /> Built for real work</span>
    </div></div>

    <section className="catalog wrap section-space" id="courses">
      <div className="section-heading"><div><span className="eyebrow">THE NEXORA COLLECTION</span><h2>Choose a skill.<br />Build a <em>system.</em></h2></div><p>Six focused programs, from AI fundamentals<br className="desktop-break" /> to advanced business systems.</p></div>
      <div className="catalog-controls">
        <div className="category-tabs" role="group" aria-label="Filter programs by category">{categories.map(item => <button key={item} className={category === item ? 'category-tab active' : 'category-tab'} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}{item === 'All programs' && <span>{products.length}</span>}</button>)}</div>
        <label className="search-box"><Search size={17} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Find a program" aria-label="Search programs" /></label>
      </div>
      <div className="catalog-meta"><span aria-live="polite">{courses.length} {courses.length === 1 ? 'program' : 'programs'} available</span><label>Sort by: <select aria-label="Sort programs" value={sort} onChange={event => setSort(event.target.value)}><option value="featured">Featured</option><option value="price">Price: low to high</option></select></label></div>

      <div className="course-grid">{courses.map(product => <article className="course-card" key={product.id}>
        <Link to="/products/$productId" params={{ productId: String(product.id) }} className="course-art-link" aria-label={`Explore ${product.name}`}><CourseArtwork product={product} /><span className="art-arrow"><ArrowUpRight size={21} /></span></Link>
        <div className="course-body">
          <div className="course-label"><span>{product.category}</span><span className="level-dot" />{product.level}</div>
          <Link to="/products/$productId" params={{ productId: String(product.id) }} className="course-title"><h3>{product.name}</h3></Link>
          <p>{product.shortDescription}</p>
          <div className="course-metadata"><span><Clock3 size={14} />{product.duration}</span><span><BookOpen size={14} />{product.lessons} lessons</span></div>
          <div className="course-bottom"><span className="course-price">${product.price}<small>USD · one-time</small></span><Link to="/products/$productId" params={{ productId: String(product.id) }} className="course-cta">View program <ArrowUpRight size={16} /></Link></div>
        </div>
      </article>)}</div>

      {courses.length === 0 && <div className="empty-state"><Search size={32} /><h3>No programs found.</h3><p>Try a different search or browse the full collection.</p><button className="button button-dark" onClick={() => { setQuery(''); setCategory('All programs') }}>Show all programs <ArrowRight size={16} /></button></div>}
      <div className="catalog-footnote"><Check size={16} /> All prices are clear, one-time USD payments.</div>
    </section>

    <section className="approach-section" id="approach"><div className="wrap approach-grid">
      <div className="approach-copy"><span className="eyebrow">A BETTER WAY TO LEARN AI</span><h2>Less noise.<br />More <em>useful<br />work.</em></h2><p>AI changes quickly. Instead of chasing every new tool, build fundamentals that transfer across models, apps, workflows, and business problems.</p><a href="#courses" className="button button-cream">Choose a program <ArrowUpRight size={18} /></a></div>
      <div className="approach-steps">
        {[{ number: '01', title: 'Understand the task.', copy: 'Start with the outcome. Learn to identify where AI adds leverage and where human judgment matters.', icon: <Sparkles /> }, { number: '02', title: 'Build the workflow.', copy: 'Turn concepts into practical systems with focused exercises, templates, and projects.', icon: <Layers3 /> }, { number: '03', title: 'Make it repeatable.', copy: 'Leave with a process you can adapt, improve, and use again across real work.', icon: <ArrowUpRight /> }].map(step => <div className="approach-step" key={step.number}><span className="step-number">{step.number}</span><div><h3>{step.title}</h3><p>{step.copy}</p></div><span className="step-icon">{step.icon}</span></div>)}
      </div>
    </div></section>

    <section className="faq-section wrap section-space" id="faq">
      <div><span className="eyebrow">QUESTIONS, ANSWERED</span><h2>Not sure?<br /><em>Start here.</em></h2><p>A few things worth knowing before you choose a program.</p><Asterisk className="faq-asterisk" size={85} strokeWidth={1} /></div>
      <div className="faq-list">
        {[
          { question: 'Do I need technical experience?', answer: 'No. AI Foundations, Prompt Systems, and AI Productivity OS are designed for beginners to intermediate learners. Build AI Tools and the advanced programs assume more technical or workflow experience, and each program page shows the expected level.' },
          { question: 'How should I choose a program?', answer: 'Start with AI Foundations if you want the basics. Choose Prompt Systems for stronger prompting, AI Productivity OS for everyday work systems, Build AI Tools for development, AI Automation Lab for connected workflows, or AI Business Systems for a broader business-level implementation.' },
          { question: 'Are these one-time purchases?', answer: 'Yes. Every program listed here is priced as a one-time USD purchase. There is no recurring subscription on this storefront.' },
          { question: 'How does access work after purchase?', answer: 'Checkout is handled through Whop. After your purchase, sign in with the same Whop account on the program page. The site checks your Whop access before showing protected curriculum materials.' },
          { question: 'Are the programs available immediately?', answer: 'Availability depends on the Whop enrollment link configured for each program. Once a program is connected to its Whop product, customers can purchase it there and use the same account to unlock their materials here.' },
          { question: 'How are payments handled?', answer: 'Payment takes place on Whop’s hosted checkout. This website does not collect or store your card details.' },
        ].map(item => <details key={item.question}><summary>{item.question}<span><ArrowDown size={17} /></span></summary><p>{item.answer}</p></details>)}
      </div>
    </section>

    <section className="closing-banner wrap"><div><span className="eyebrow">YOUR NEXT MOVE</span><h2>Pick one useful skill.</h2></div><a href="#courses" className="button button-dark">Explore programs <ArrowUpRight size={19} /></a></section>
  </>
}
