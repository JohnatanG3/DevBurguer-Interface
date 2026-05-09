import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
	const [userInfo, setUserInfo] = useState(null);

	const putUserData = useCallback((userData) => {
		setUserInfo(userData);
		localStorage.setItem('devburger:userData', JSON.stringify(userData));
	}, []);

	const logout = useCallback(() => {
		setUserInfo(null);
		localStorage.removeItem('devburger:userData');
	}, []);

	useEffect(() => {
		const stored = localStorage.getItem('devburger:userData');

		if (!stored) {
			logout();
			return;
		}

		putUserData(JSON.parse(stored));
	}, [putUserData, logout]);

	const value = useMemo(
		() => ({ userInfo, isLogged: !!userInfo?.token, putUserData, logout }),
		[userInfo, putUserData, logout],
	);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
	const context = useContext(UserContext);

	if (context === null)
		throw new Error('useUser must be used within a UserProvider!');

	return context;
};
