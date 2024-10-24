import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: true,
});

interface CreateCheckoutSessionOptions {
  priceId: string;
  userId: number;
  userEmail: string;
}

export async function createCheckoutSession({
  priceId,
  userId,
  userEmail,
}: CreateCheckoutSessionOptions) {
  const session = await stripe.checkout.sessions.create({
    customer_email: userEmail,
    billing_address_collection: 'auto',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    allow_promotion_codes: true,
    subscription_data: {
      trial_period_days: 7,
      payment_behavior: 'default_incomplete',
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
    metadata: {
      userId: userId.toString(),
    },
  });

  if (!session.url) {
    throw new Error('Failed to create checkout session');
  }

  return session.url;
}
