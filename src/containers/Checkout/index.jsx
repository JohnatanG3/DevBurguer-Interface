import { Elements } from '@stripe/react-stripe-js';
import { Navigate, useLocation } from 'react-router-dom';
import { CheckoutForm } from '../../components/Stripe/CheckoutForm';
import stripePromise from '../../config/stripeConfig';

export function Checkout() {
	const { state } = useLocation();
	const clientSecret = state?.clientSecret;

	if (!clientSecret) {
		// se a pessoa entrar direto na rota /checkout (F5, link, etc)
		return <Navigate to="/cart" replace />;
	}

	return (
		<Elements stripe={stripePromise} options={{ clientSecret }}>
			<CheckoutForm />
		</Elements>
	);
}
