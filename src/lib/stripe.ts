import Stripe from 'stripe';

// Server-side Stripe client
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Price IDs for Dr. Ogonna proposal
export const STRIPE_PRICES = {
  setup: 'price_1T2mqDDBP8PEYySSaiiVWwWD', // $1,500 one-time
  base: 'price_1T2mqDDBP8PEYySS3PWb0urx', // $1,200/mo
  addons: {
    'seo-blog': 'price_1T2mqEDBP8PEYySSjZ6dslCB', // $597/mo
    'reputation': 'price_1T2mqEDBP8PEYySSAbFGVXeC', // $297/mo
    'social-media': 'price_1T2mqEDBP8PEYySSsgfdxPjM', // $497/mo
    'email-marketing': 'price_1T2mqFDBP8PEYySSufP6WlIc', // $297/mo
    'video-reels': 'price_1T2mqFDBP8PEYySSlyRGo0Qv', // $497/mo
  },
} as const;

export type AddonId = keyof typeof STRIPE_PRICES.addons;
