import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { ArrowDown, ArrowLeft, ArrowUpRight, BookOpen, Check, Clock3, Layers3, ShieldCheck, LockKeyhole } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import products from '@/data/products'
import { BuyButton } from '@/components/BuyButton'
import { CourseArtwork } from '@/components/CourseArtwork'

export const Route = createFileRoute('/products/$productId')({
  component: CourseDetail,
  loader: ({ params }) => {
    const product = products.find(item => String(item.id) === params.productId)
    if (!product) throw notFound()
    return product
  },
  head: ({ loaderData }) => ({ meta: [{ title: loaderData ? `${loaderData.name} — Nexora` : 'Program not found — Nexora' }, { name: 'description', content: loaderData?.shortDescription || 'Explore practical AI programs.' }] }),
  notFoundComponent: () => <div className="checkout-page"><div className="checkout-panel"><h1>This program isn’t in the collection.</h1><p>Explore the programs to find your next useful skill.</p><Link to="/" className="button button-dark">Back to programs <ArrowUpRight size={18} /></Link></div></div>,
})

function AccessGate({ productId, whopProductId, whopUrl, children }: { productId: number; whopProductId: string; whopUrl: string; children: ReactNode }) {
  const [state, setState] = useState<'checking' | 'login' | 'locked' | 'granted' | 'setup'>('checking')

  useEffect(() => {
    if (!whopProductId) {
      setState('setup')
      return
    }

    let active = true
    fetch('/api/whop-auth?action=session', { credentials: 'include' })
      .then(response => response.json())
      .then((session: { authenticated?: boolean }) => {
        if (!active) return
        if (!session.authenticated) { setState('login'); return }
        return fetch(`/api/whop-access?productId=${encodeURIComponent(whopProductId)}`, { credentials: 'include' })
      })
      .then(response => response ? response.json() : null)
      .then((access: { hasAccess?: boolean } | null) => {
        if (!active || !access) return
        setState(access.hasAccess ? 'granted' : 'locked')
      })
      .catch(() => { if (active) setState('login') })
    return () => { active = false }
  }, [productId, whopProductId])

  if (state === 'granted') return <>{children}</>
  if (state === 'checking') return <section className="access-panel"><LockKeyhole size={24} /><h2>Checking your Whop access…</h2><p>Please wait while we verify your enrollment.</p></section>
  if (state === 'setup') return <section className="access-panel"><LockKeyhole size={24} /><h2>Enrollment is being connected</h2><p>This program is ready on the storefront. Its Whop enrollment link is being configured.</p></section>
  if (state === 'login') return <section className="access-panel"><LockKeyhole size={24} /><h2>Sign in to access this program</h2><p>Use the same Whop account you used to purchase this program. Your access is checked directly with Whop.</p><a className="button button-orange" href={`/api/whop-auth?action=login&return=${encodeURIComponent(`/products/${productId}`)}`}>Sign in with Whop <ArrowUpRight size={18} /></a><p className="checkout-helper">Already enrolled? Sign in to unlock your curriculum.</p></section>
  return <section className="access-panel"><LockKeyhole size={24} /><h2>Enrollment required</h2><p>Whop has not confirmed access for this account yet.</p>{whopUrl && <a className="button button-orange" href={whopUrl}>Enroll on Whop <ArrowUpRight size={18} /></a>}<p className="checkout-helper">After checkout, return here and sign in with the same Whop account.</p></section>
}

function CourseDetail() {
  const product = Route.useLoaderData()
  const related = products.filter(item => item.id !== product.id).slice(0, 2)

  return <section className="detail-page wrap">
    <Link to="/" hash="courses" className="back-link"><ArrowLeft size={15} /> Back to all programs</Link>
    <div className="detail-grid">
      <div className="detail-copy">
        <span className="eyebrow">{product.category.toUpperCase()} / {product.tag}</span>
        <h1>{product.name}</h1>
        <p className="detail-intro">{product.description}</p>
        <div className="course-metadata"><span><Clock3 size={15} />{product.duration}</span><span><BookOpen size={15} />{product.lessons} lessons</span><span><Layers3 size={15} />{product.level}</span></div>
        <AccessGate productId={product.id} whopProductId={product.whopProductId} whopUrl={product.whopUrl}>
          <h2>What you’ll build</h2>
          <ul className="outcomes">{product.outcomes.map(outcome => <li key={outcome}><Check size={18} />{outcome}</li>)}</ul>
          <h2>Inside the program</h2>
          <div className="curriculum-list">{product.curriculum.map((module, index) => <details key={module.title} open={index === 0}><summary><span>0{index + 1}</span>{module.title}<ArrowDown size={17} /></summary><ul>{module.topics.map(topic => <li key={topic}>{topic}</li>)}</ul></details>)}</div>
        </AccessGate>
      </div>

      <aside className="purchase-card" aria-label="Program enrollment">
        <CourseArtwork product={product} />
        <div className="purchase-body">
          <span className="eyebrow">START YOUR NEXT SYSTEM</span>
          <p className="detail-price">${product.price}<span>USD</span></p>
          <p className="purchase-subtitle">One program. One payment. No recurring subscription.</p>
          <BuyButton productId={product.id} />
          <ul className="purchase-features">
            <li><BookOpen size={16} />{product.lessons} focused lessons</li>
            <li><Clock3 size={16} />{product.duration} of structured learning</li>
            <li><Layers3 size={16} />Practical, project-based curriculum</li>
            <li><ShieldCheck size={16} />Access verified by Whop</li>
          </ul>
        </div>
      </aside>
    </div>

    <div className="related-heading"><h2>Keep building.</h2><Link to="/" hash="courses" className="text-link">All programs <ArrowUpRight size={16} /></Link></div>
    <div className="related-list">{related.map(item => <Link to="/products/$productId" params={{ productId: String(item.id) }} className="related-item" key={item.id}><div><h3>{item.name}</h3><p>{item.category} · {item.duration}</p></div><strong>${item.price}</strong><ArrowUpRight size={19} /></Link>)}</div>
  </section>
}
