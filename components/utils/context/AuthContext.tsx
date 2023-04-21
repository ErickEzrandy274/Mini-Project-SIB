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
import { CREATE_USER, GET_USER_BY_ID, auth } from "@utils";
import { ProviderType } from "./interface";
import { LayoutProps } from "@elements";
import { useMutation, useLazyQuery } from "@apollo/client";
import toast from "react-hot-toast";
import Router from "next/router";

const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider: React.FC<LayoutProps> = ({ children }) => {
	const [user, setUser] = useState<any>(null);
	const [errorAuth, setErrorAuth] = useState<string>("");
	const [loading, setLoading] = useState(true);
	const [getUserById] = useLazyQuery(GET_USER_BY_ID);
	const [createUser] = useMutation(CREATE_USER);
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
					.then(async ({ user }) => {
						const { uid: id, displayName: name, email } = user;
						toast.success("Successfully login!");
						const { data } = await getUserById({ variables: { id } });

						if (!data.user_by_pk) {
							await createUser({
								variables: { object: { id, name, email } },
							});
						}
					})
					.catch((err: any) => {
						toast.error(err.message);
					});
			});
		},
		[provider, createUser, getUserById]
	);

	const logout = useCallback(async () => {
		setUser(null);
		await signOut(auth);
		Router.push("/");
	}, []);

	const contextValue = useMemo(() => {
		return {
			user,
			loginWithProviders,
			logout,
			errorAuth,
			setErrorAuth,
		};
	}, [user, loginWithProviders, logout, errorAuth, setErrorAuth]);

	return (
		<AuthContext.Provider value={contextValue}>
			{loading ? null : children}
		</AuthContext.Provider>
	);
};
