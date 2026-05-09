import { loadStripe } from '@stripe/stripe-js';

const publishableKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

if (!publishableKey) {
	throw new Error('VITE_STRIPE_PUBLIC_KEY não definida no .env');
}

export const stripePromise = loadStripe(publishableKey);
