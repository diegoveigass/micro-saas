'use client'

import { useStripe } from '@/app/hooks/useStripe'

export default function Payments() {
  const {
    createPaymentStripeCheckout,
    createSubscriptionStripeCheckout,
    handleCreateStripePortal,
  } = useStripe()

  return (
    <div className="flex items-center justify-center h-screen flex-col gap-4">
      <h1 className="text-5xl">Pagamentos</h1>
      <button
        type="button"
        className="border rounded-md px-1"
        onClick={() =>
          createPaymentStripeCheckout({
            testeId: '123',
            userEmail: 'sdiegoveiga@gmail.com',
          })
        }
      >
        Criar pagamento stripe
      </button>
      <button
        type="button"
        className="border rounded-md px-1"
        onClick={() =>
          createSubscriptionStripeCheckout({
            testeId: '123',
            userEmail: 'sdiegoveiga@gmail.com',
          })
        }
      >
        Criar assinatura stripe
      </button>
      <button
        type="button"
        className="border rounded-md px-1"
        onClick={handleCreateStripePortal}
      >
        Criar portal de pagamento
      </button>
    </div>
  )
}
