import { ArrowUpRight, Braces, Check, Command, Sparkles } from 'lucide-react'
import type { Product } from '@/data/products'

export function CourseArtwork({ product }: { product: Product }) {
  return (
    <div className={`course-art art-${product.theme}`} aria-hidden="true">
      <span className="art-grid" />
      <span className="art-index">NEXORA / 0{product.id}</span>
      {product.artwork === 'prompt' && <div className="prompt-art"><div className="prompt-window"><div className="window-dots"><i /><i /><i /></div><span className="prompt-line">Clear intent.</span><span className="prompt-line">Better output<span className="cursor">▌</span></span><div className="prompt-bottom"><Command size={15} /><span>Build the system</span><ArrowUpRight size={18} /></div></div><span className="sparkle-tile"><Sparkles size={30} strokeWidth={1.5} /></span></div>}
      {product.artwork === 'workflow' && <div className="workflow-art"><div className="flow-node node-one"><span className="node-icon"><Command size={20} /></span><span>Input</span></div><span className="flow-connector connector-one" /><div className="flow-node node-two"><span className="node-icon"><Sparkles size={20} /></span><span>AI layer</span></div><span className="flow-connector connector-two" /><div className="flow-node node-three"><span className="node-icon"><Check size={20} /></span><span>Outcome</span></div></div>}
      {product.artwork === 'code' && <div className="code-art"><div className="code-window"><div className="code-title"><span className="window-dots"><i /><i /><i /></span><span>build-something.ts</span></div><div className="code-lines"><p><span>const</span> idea = <em>yourGoal</em>;</p><p><span>const</span> system = <em>await</em> build({'{'}</p><p>&nbsp;&nbsp;input: idea,</p><p>&nbsp;&nbsp;model: <b>'useful'</b>,</p><p>{'}'});</p><p className="code-comment">// Ship a useful first version.</p></div></div><span className="braces-tile"><Braces size={27} /></span></div>}
      <span className="art-caption">PRACTICAL. FOCUSED. USEFUL.</span>
    </div>
  )
}
