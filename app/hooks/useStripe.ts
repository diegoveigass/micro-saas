import { loadStripe, type Stripe } from '@stripe/stripe-js'
import { useEffect, useState } from 'react'

export function useStripe() {
  const [stripe, setStripe] = useState<Stripe | null>(null)

  useEffect(() => {
    async function loadStripeAsync() {
      if (!process.env.NEXT_PUBLIC_STRIPE_PUB_KEY) {
        throw new Error('NEXT_PUBLIC_STRIPE_PUB_KEY not found!')
      }
      const stripeInstance = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUB_KEY
      )

      setStripe(stripeInstance)
    }

    loadStripeAsync()
  }, [])

  async function createPaymentStripeCheckout(checkoutData: any) {
    if (!stripe) return

    try {
      const response = await fetch('/api/stripe/create-pay-checkout', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(checkoutData),
      })

      const data = await response.json()

      await stripe.redirectToCheckout({ sessionId: data.sessionId })
    } catch (error) {
      console.error(error)
    }
  }

  async function createSubscriptionStripeCheckout(checkoutData: any) {
    if (!stripe) return

    try {
      const response = await fetch('/api/stripe/create-subscription-checkout', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(checkoutData),
      })

      const data = await response.json()

      await stripe.redirectToCheckout({ sessionId: data.sessionId })
    } catch (error) {
      console.error(error)
    }
  }

  async function handleCreateStripePortal() {
    try {
      const response = await fetch('/api/stripe/create-portal', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
      })

      const data = await response.json()

      window.location.href = data.url
    } catch (error) {
      console.error(error)
    }
  }

  return {
    stripe,
    createPaymentStripeCheckout,
    createSubscriptionStripeCheckout,
    handleCreateStripePortal,
  }
}
