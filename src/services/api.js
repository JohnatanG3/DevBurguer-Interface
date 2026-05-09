import axios from 'axios';

export const api = axios.create({
	baseURL: 'http://localhost:3001',
});

api.interceptors.request.use((config) => {
	let token = null;

	try {
		const raw = localStorage.getItem('devburger:userData');
		token = raw ? JSON.parse(raw).token : null;
	} catch {
		token = null;
	}

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	} else {
		delete config.headers.Authorization;
	}

	return config;
});

// Se der erro 401, desloga e manda pro login
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			localStorage.removeItem('devburger:userData');

			// Evita loop se já estiver no login
			if (window.location.pathname !== '/login') {
				window.location.href = '/login?expired=1';
			}
		}

		return Promise.reject(error);
	},
);
