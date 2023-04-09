import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import {
	signInWithPopup,
	signOut,
	setPersistence,
	browserSessionPersistence,
	onAuthStateChanged,
	GoogleAuthProvider,
	GithubAuthProvider,
	FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "@utils";
import { ProviderType } from "./interface";
import { LayoutProps } from "@elements";
import toast from "react-hot-toast";
import Router from "next/router";

const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider: React.FC<LayoutProps> = ({ children }) => {
	const [user, setUser] = useState<any>(null);
	const [errorAuth, setErrorAuth] = useState<string>("");
	const [loading, setLoading] = useState(true);
	const provider = useMemo(() => {
		return {
			Google: new GoogleAuthProvider(),
			Github: new GithubAuthProvider(),
			Facebook: new FacebookAuthProvider(),
		};
	}, []);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				const { uid, email, displayName, refreshToken: token } = user;

				setUser({
					uid,
					email,
					token,
					displayName,
				});
			} else {
				setUser(null);
			}

			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	const loginWithProviders = useCallback(
		async (userProvider: ProviderType) => {
			setPersistence(auth, browserSessionPersistence).then(() => {
				signInWithPopup(auth, provider[userProvider])
					.then(() => {
						toast.success("Successfully login!");
					})
					.catch((err: any) => {
						toast.error(err.message);
					});
			});
		},
		[provider]
	);

	const logout = useCallback(async () => {
		setUser(null);
		await signOut(auth);
		Router.push("/");
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				loginWithProviders,
				logout,
				errorAuth,
				setErrorAuth,
			}}
		>
			{loading ? null : children}
		</AuthContext.Provider>
	);
};
