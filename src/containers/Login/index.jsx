import { yupResolver } from '@hookform/resolvers/yup';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Button } from '../../components/Button';
import { useUser } from '../../hooks/UserContext';
import { api } from '../../services/api';
import {
	Container,
	Form,
	InputContainer,
	LeftContainer,
	Link,
	PasswordWrapper,
	RightContainer,
	Title,
	TogglePasswordButton,
} from './styles';

export function Login() {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const { putUserData } = useUser();

	const schema = yup
		.object({
			email: yup
				.string()
				.email('Digite um e-mail válido!')
				.required('E-mail obrigatório!'),
			password: yup
				.string()
				.min(6, 'A senha deve ter pelo menos 6 caracteres!')
				.required('Senha obrigatória!'),
		})
		.required();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data) => {
		try {
			const response = await toast.promise(
				api.post('/sessions', {
					email: data.email,
					password: data.password,
				}),
				{
					pending: 'Verificando seus Dados!',
					success: 'Seja Bem-vindo(a)! 👌',
					error: 'E-mail ou Senha Incorretos! 🤯',
				},
			);

			putUserData(response.data);

			setTimeout(() => {
				if (response.data?.admin) {
					navigate('/admin/pedidos');
				} else {
					navigate('/');
				}
			}, 2000);
		} catch (_error) {
			toast.error('Falha no Sistema! Tente novamente mais tarde!');
		}
	};

	return (
		<Container>
			<LeftContainer></LeftContainer>
			<RightContainer>
				<Title>
					Olá, seja bem vindo ao <span>Dev Burguer!</span>
					<br />
					Acesse com seu <span>Login e senha.</span>
				</Title>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<InputContainer>
						<label htmlFor="email">E-mail</label>
						<input
							// biome-ignore lint/a11y/noAutofocus: colocar auto focus
							autoFocus
							id="email"
							type="email"
							autoComplete="username"
							{...register('email')}
						/>
						<p>{errors?.email?.message}</p>
					</InputContainer>

					<InputContainer>
						<label htmlFor="password">Senha</label>
						<PasswordWrapper>
							<input
								id="password"
								type={showPassword ? 'text' : 'password'}
								autoComplete="current-password"
								{...register('password')}
							/>

							<TogglePasswordButton
								type="button"
								onClick={() => setShowPassword((prev) => !prev)}
								aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
							>
								{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
							</TogglePasswordButton>
						</PasswordWrapper>
						<p>{errors?.password?.message}</p>
					</InputContainer>
					<Link to="/esqueci-senha">Esqueci minha senha.</Link>
					<Button type="submit">Entrar</Button>
				</Form>
				<p>
					Não possui conta? <Link to="/cadastro">Clique aqui!</Link>
				</p>
			</RightContainer>
		</Container>
	);
}
