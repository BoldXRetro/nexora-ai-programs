import { ArrowUpRight, LockKeyhole } from 'lucide-react'
import products from '@/data/products'

export function BuyButton({ productId }: { productId: number; billingInterval?: 'month' }) {
  const product = products.find(item => item.id === productId)
  if (!product) return null

  if (!product.whopUrl) {
    return (
      <div>
        <button className="button button-orange checkout-button" type="button" disabled>
          Enrollment link being connected
        </button>
        <p className="checkout-helper"><LockKeyhole size={12} /> Secure Whop checkout will appear here when this program is configured.</p>
      </div>
    )
  }

  return (
    <div>
      <a className="button button-orange checkout-button" href={product.whopUrl}>
        Enroll on Whop <ArrowUpRight size={18} />
      </a>
      <p className="checkout-helper"><LockKeyhole size={12} /> Secure checkout powered by Whop</p>
    </div>
  )
}
