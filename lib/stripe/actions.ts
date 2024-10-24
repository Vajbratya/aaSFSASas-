'use server';

import { redirect } from 'next/navigation';
import { getUser } from '@/lib/db/queries';
import { createCheckoutSession } from './stripe';

export async function checkoutAction(formData: FormData) {
  try {
    const user = await getUser();
    if (!user) {
      redirect('/sign-in?redirect=checkout');
    }

    const priceId = formData.get('priceId') as string;
    if (!priceId) {
      throw new Error('Price ID is required');
    }

    const checkoutUrl = await createCheckoutSession({
      priceId,
      userId: user.id,
      userEmail: user.email,
    });

    redirect(checkoutUrl);
  } catch (error) {
    console.error('Checkout error:', error);
    redirect('/pricing?error=checkout-failed');
  }
}
