import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
	const [cartProducts, setCartProducts] = useState([]);

	const updatedLocalStorageCart = (products) => {
		localStorage.setItem('devburger:cartProducts', JSON.stringify(products));
	};

	const putProductsInCart = (product) => {
		const cartIndex = cartProducts.findIndex((item) => item.id === product.id);

		let newCartProducts = [];

		if (cartIndex >= 0) {
			newCartProducts = cartProducts.map((item, index) =>
				index === cartIndex ? { ...item, quantity: item.quantity + 1 } : item,
			);

			toast.success(`+1 ${product.name} no carrinho`, {
				toastId: 'cart-add',
				autoClose: 1200,
				pauseOnHover: false,
			});
		} else {
			newCartProducts = [...cartProducts, { ...product, quantity: 1 }];

			toast.success(`${product.name} adicionado ao carrinho`, {
				toastId: 'cart-add',
				autoClose: 1200,
				pauseOnHover: false,
			});
		}

		setCartProducts(newCartProducts);
		updatedLocalStorageCart(newCartProducts);
	};

	const clearCart = () => {
		setCartProducts([]);
		updatedLocalStorageCart([]);

		toast.info('Carrinho limpo', { toastId: 'cart-clear', autoClose: 1200 });
	};

	const deleteProduct = (productId) => {
		const newCart = cartProducts.filter((item) => item.id !== productId);
		setCartProducts(newCart);
		updatedLocalStorageCart(newCart);

		toast.info('Item removido do carrinho', {
			toastId: 'cart-remove',
			autoClose: 1200,
		});
	};

	const increaseProduct = (productId) => {
		const newCart = cartProducts.map((item) =>
			item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
		);

		setCartProducts(newCart);
		updatedLocalStorageCart(newCart);
	};

	const decreaseProduct = (productId) => {
		const product = cartProducts.find((item) => item.id === productId);
		if (!product) return;

		if (product.quantity > 1) {
			const newCart = cartProducts.map((item) =>
				item.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
			);

			setCartProducts(newCart);
			updatedLocalStorageCart(newCart);
		} else {
			deleteProduct(productId);
		}
	};

	useEffect(() => {
		const clientCartData = localStorage.getItem('devburger:cartProducts');
		if (clientCartData) setCartProducts(JSON.parse(clientCartData));
	}, []);

	return (
		<CartContext.Provider
			value={{
				cartProducts,
				putProductsInCart,
				clearCart,
				deleteProduct,
				increaseProduct,
				decreaseProduct,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	const context = useContext(CartContext);
	if (context === null)
		throw new Error('useCart must be used within a CartProvider!');
	return context;
};
