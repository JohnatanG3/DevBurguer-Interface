import { yupResolver } from '@hookform/resolvers/yup';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Button } from '../../components/Button';
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

export function Register() {
	const schema = yup
		.object({
			name: yup.string().required('O nome é obrigatório!'),
			email: yup
				.string()
				.email('Digite um e-mail válido!')
				.required('E-mail obrigatório!'),
			password: yup
				.string()
				.min(6, 'A senha deve ter pelo menos 6 caracteres!')
				.required('Senha obrigatória!'),
			confirmPassword: yup
				.string()
				.oneOf([yup.ref('password')], 'As senhas devem ser iguais!')
				.required('Confirme sua senha!'),
		})
		.required();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const navigate = useNavigate();

	const onSubmit = async (data) => {
		try {
			const { status } = await api.post(
				'/users',
				{
					name: data.name,
					email: data.email,
					password: data.password,
				},
				{
					validateStatus: () => true,
				},
			);

			if (status === 200 || status === 201) {
				toast.success('Conta Criada com Sucesso! 👌');

				reset(); // ✅ limpa todos os campos

				setTimeout(() => {
					navigate('/login');
				}, 2500);

				return;
			}

			if (status === 409 || status === 400) {
				toast.error('E-mail já Cadastrado! Faça o Login para Continuar!');

				setTimeout(() => {
					navigate('/login');
				}, 2500);

				return;
			}

			toast.error('Algo deu Errado! Tente Novamente! 🤯');
		} catch (_error) {
			toast.error('Falha no Sistema! Tente novamente mais tarde!');
		}
	};

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	return (
		<Container>
			<LeftContainer />
			<RightContainer>
				<Title>Criar Conta</Title>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<InputContainer>
						<label htmlFor="name">Nome</label>
						<input
							id="name"
							type="text"
							// biome-ignore lint/a11y/noAutofocus: colocar auto focus
							autoFocus
							autoComplete="username"
							{...register('name')}
						/>
						<p>{errors?.name?.message}</p>
					</InputContainer>

					<InputContainer>
						<label htmlFor="email">E-mail</label>
						<input
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
								autoComplete="new-password"
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

					<InputContainer>
						<label htmlFor="confirmPassword">Confirmar Senha</label>
						<PasswordWrapper>
							<input
								id="confirmPassword"
								type={showConfirmPassword ? 'text' : 'password'}
								autoComplete="new-password"
								{...register('confirmPassword')}
							/>

							<TogglePasswordButton
								type="button"
								onClick={() => setShowConfirmPassword((prev) => !prev)}
								aria-label={
									showConfirmPassword ? 'Ocultar senha' : 'Mostrar senha'
								}
							>
								{showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
							</TogglePasswordButton>
						</PasswordWrapper>
						<p>{errors?.confirmPassword?.message}</p>
					</InputContainer>
					<Button type="submit">Criar Conta</Button>
				</Form>
				<p>
					Já possui conta? <Link to="/login">Clique aqui!</Link>
				</p>
			</RightContainer>
		</Container>
	);
}
