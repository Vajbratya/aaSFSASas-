'use server';

import { stripe } from './stripe';
import { cache } from 'react';

export type StripePrice = {
  id: string;
  productId: string;
  unitAmount: number | null;
  interval?: string;
  trialPeriodDays?: number | null;
};

export type StripeProduct = {
  id: string;
  name: string;
  description: string | null;
};

export const getStripePrices = cache(async () => {
  try {
    const prices = await stripe.prices.list({
      active: true,
      expand: ['data.product'],
      type: 'recurring',
    });

    return prices.data.map((price) => ({
      id: price.id,
      productId: typeof price.product === 'string' ? price.product : price.product.id,
      unitAmount: price.unit_amount,
      interval: price.recurring?.interval,
      trialPeriodDays: price.recurring?.trial_period_days,
    })) as StripePrice[];
  } catch (error) {
    console.error('Error fetching Stripe prices:', error);
    return [];
  }
});

export const getStripeProducts = cache(async () => {
  try {
    const products = await stripe.products.list({
      active: true,
    });

    return products.data.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
    })) as StripeProduct[];
  } catch (error) {
    console.error('Error fetching Stripe products:', error);
    return [];
  }
});
