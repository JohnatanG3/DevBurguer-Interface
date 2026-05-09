import {
	PaymentElement,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../../../hooks/CartContext';
import { api } from '../../../services/api';
import './styles.css';

export function CheckoutForm() {
	const stripe = useStripe();
	const elements = useElements();

	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const { cartProducts, clearCart } = useCart();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) {
			console.error('Stripe ou Elements com Falha, tente Novamente!');
			return;
		}

		setIsLoading(true);

		const { error, paymentIntent } = await stripe.confirmPayment({
			elements,
			redirect: 'if_required',
		});

		// 1) Se pagou, salva o pedido e limpa carrinho
		if (paymentIntent?.status === 'succeeded') {
			try {
				const products = cartProducts.map((product) => ({
					id: product.id,
					quantity: product.quantity,
					price: product.price,
				}));

				const { status } = await api.post(
					'/orders',
					{ products, paymentIntentId: paymentIntent.id }, // Manda o id do pagamento
					{ validateStatus: () => true },
				);

				if (status === 200 || status === 201) {
					toast.success('Pedido Realizado com Sucesso! 👌');
					clearCart();
					navigate(
						`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`,
					);
					return;
				}

				toast.error('Pagamento aprovado, mas falha ao salvar pedido.');
			} catch {
				toast.error(
					'Pagamento aprovado, mas erro no servidor ao salvar pedido.',
				);
			} finally {
				setIsLoading(false);
			}
			return;
		}

		// 2) Se deu erro, mostra mensagem
		if (error) {
			if (error.type === 'card_error' || error.type === 'validation_error') {
				setMessage(error.message);
			} else {
				setMessage('An unexpected error occurred.');
			}
		}

		setIsLoading(false);
	};

	return (
		<div className="container">
			<form id="payment-form" onSubmit={handleSubmit}>
				<PaymentElement
					id="payment-element"
					options={{ layout: 'accordion' }}
				/>
				<button
					className="button"
					type="submit"
					disabled={isLoading || !stripe || !elements}
					id="submit"
				>
					<span id="button-text">
						{isLoading ? (
							<div className="spinner" id="spinner" />
						) : (
							'Pagar Agora'
						)}
					</span>
				</button>

				{message && <div id="payment-message">{message}</div>}
			</form>
		</div>
	);
}
