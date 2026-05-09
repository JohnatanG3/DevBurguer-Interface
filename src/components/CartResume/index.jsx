import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '../../components/Button';
import { useCart } from '../../hooks/CartContext';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/formatPrice';
import { Container } from './styles';

export function CartResume() {
	const [finalPrice, setFinalPrice] = useState(0);
	const deliveryTax = 500;

	const navigate = useNavigate();
	const { cartProducts } = useCart();

	useEffect(() => {
		const sumAllItems = cartProducts.reduce(
			(acc, current) => current.price * current.quantity + acc,
			0,
		);
		setFinalPrice(sumAllItems);
	}, [cartProducts]);

	const submitOrder = async () => {
		if (!cartProducts.length) {
			toast.warning('Seu carrinho está vazio.');
			return;
		}

		const products = cartProducts.map((p) => ({
			id: p.id,
			quantity: p.quantity,
			price: p.price,
		}));

		try {
			const { data } = await api.post('/create-payment-intent', { products });
			navigate('/checkout', { state: data });
		} catch {
			toast.error('Erro, tente Novamente!');
		}
	};

	return (
		<div>
			<Container>
				<div className="container-top">
					<h2 className="title">Resumo do Pedido</h2>
					<p className="items">Itens</p>
					<p className="items-price">{formatPrice(finalPrice)}</p>
					<p className="delivery-tax">Taxa de Entrega</p>
					<p className="delivery-tax-price">{formatPrice(deliveryTax)}</p>
				</div>
				<div className="container-bottom">
					<p>Total</p>
					<p>{formatPrice(finalPrice + deliveryTax)}</p>
				</div>
			</Container>

			<Button onClick={submitOrder}>Finalizar Pedido</Button>
		</div>
	);
}
