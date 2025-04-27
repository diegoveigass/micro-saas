import { auth } from '@/app/lib/auth'
import stripe from '@/app/lib/stripe'
import { getOrCreateCustomerId } from '@/app/server/stripe/get-or-create-customer-id'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { testeId, userEmail } = await req.json()

  const price = process.env.STRIPE_PRODUCT_PRICE_ID

  if (!price) {
    return NextResponse.json({ error: 'Price not found' }, { status: 500 })
  }

  const session = await auth()
  const userId = session?.user?.id

  if (!userId || !userEmail) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const customerId = await getOrCreateCustomerId(userId, userEmail)

  const metadata = {
    testeId,
    price,
  }

  // We need to create a client in stripe to get this reference when create portal

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price, quantity: 1 }],
      mode: 'payment',
      payment_method_types: ['card', 'boleto'],
      success_url: `${req.headers.get('origin')}/success`,
      cancel_url: `${req.headers.get('origin')}/`,
      metadata,
      customer: customerId,
    })

    if (!session.url) {
      return NextResponse.json(
        { error: 'Session URL not found!' },
        { status: 500 }
      )
    }

    return NextResponse.json({ sessionId: session.id }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.error()
  }
}
