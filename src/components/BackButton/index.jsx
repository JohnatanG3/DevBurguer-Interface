import { useNavigate } from 'react-router-dom';
import { Button } from './styles';

export function BackButton({ to = -1, children = 'Voltar' }) {
	const navigate = useNavigate();

	return (
		<Button type="button" onClick={() => navigate(to)}>
			← {children}
		</Button>
	);
}
