import { ShoppingCartIcon, UserCircleIcon } from '@phosphor-icons/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/UserContext';
import {
	Container,
	Content,
	HeaderLink,
	LinkContainer,
	Logout,
	Navigation,
	Options,
	Profile,
} from './styles';

export function Header() {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { logout, userInfo } = useUser();

	function logoutUser() {
		logout();
		navigate('/login');
	}

	return (
		<Container>
			<Content>
				<Navigation>
					<div>
						<HeaderLink to="/" $isActive={pathname === '/'}>
							Home
						</HeaderLink>
						<hr />
						<HeaderLink to="/cardapio" $isActive={pathname === '/cardapio'}>
							Cardápio
						</HeaderLink>
					</div>
				</Navigation>
				<Options>
					<Profile>
						<UserCircleIcon color="#FFF" size={32} />
						<div>
							<p>
								Olá, <span>{userInfo?.name}</span>!
							</p>
							<Logout onClick={logoutUser}>Sair</Logout>
						</div>
					</Profile>
					<LinkContainer>
						<ShoppingCartIcon color="#FFF" size={32} />
						<HeaderLink to="/carrinho">Carrinho</HeaderLink>
					</LinkContainer>
				</Options>
			</Content>
		</Container>
	);
}
