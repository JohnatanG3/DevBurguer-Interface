import { loadStripe } from '@stripe/stripe-js';

const stripePromise = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

if (!stripePromise) {
	throw new Error('VITE_STRIPE_PUBLIC_KEY não definida no .env');
}

console.log(
	'[Stripe] publishable key prefix:',
	import.meta.env.VITE_STRIPE_PUBLIC_KEY?.slice(0, 16),
);

export default loadStripe(stripePromise);
