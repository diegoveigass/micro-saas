import { db } from '@/app/lib/firebase'
import 'server-only'

import type Stripe from 'stripe'

export async function handleStripeSubscription(
  event: Stripe.CheckoutSessionCompletedEvent
) {
  if (event.data.object.payment_status === 'paid') {
    console.log('Pagamento realizado com sucesso. Enviar email liberar acesso')

    const metadata = event.data.object.metadata

    const userId = metadata?.userId

    if (!userId) {
      console.error('User not found')
      return
    }

    await db.collection('users').doc(userId).update({
      stripeSubscriptionId: event.data.object.subscription,
      subscriptionStatus: 'active',
    })
  }
}
