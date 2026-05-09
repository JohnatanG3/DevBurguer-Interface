import { Elements } from '@stripe/react-stripe-js';
import { Route, Routes } from 'react-router-dom';
import { Cart, Home, Login, Menu, Register } from '../containers';
import { EditProduct } from '../containers/Admin/EditProduct';
import { NewProduct } from '../containers/Admin/NewProduct';
import { Orders } from '../containers/Admin/Orders';
import { Products } from '../containers/Admin/Products';
import { Checkout } from '../containers/Checkout';
import { CompletePayment } from '../containers/CompletePayment';
import { AdminLayout } from '../layout/AdminLayout';
import { UserLayout } from '../layout/UserLayout';
import { stripePromise } from '../services/stripe';

export function Router() {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/cadastro" element={<Register />} />

			<Route path="/" element={<UserLayout />}>
				<Route index element={<Home />} />
				<Route path="cardapio" element={<Menu />} />
				<Route path="carrinho" element={<Cart />} />

				{/* Stripe Routes */}
				<Route
					path="checkout"
					element={
						<Elements stripe={stripePromise}>
							<Checkout />
						</Elements>
					}
				/>
				<Route
					path="complete"
					element={
						<Elements stripe={stripePromise}>
							<CompletePayment />
						</Elements>
					}
				/>
			</Route>

			{/* Admin Routes */}
			<Route path="/admin" element={<AdminLayout />}>
				<Route path="/admin/pedidos" element={<Orders />} />
				<Route path="/admin/novo-produto" element={<NewProduct />} />
				<Route path="/admin/editar-produto" element={<EditProduct />} />
				<Route path="/admin/produtos" element={<Products />} />
			</Route>
		</Routes>
	);
}
