import { ReactNode, createContext, useCallback, useContext, useState } from "react";
import api from "../services/api";

interface AuthState {
	token: string;
	user: object;
}

interface SignInCredentials{
  email: string;
  password: string
}

interface AuthContextData {
	user: object;
	signIn(credentials: SignInCredentials): Promise<void>;
	signOut(): void
}

type AuthContextProviderProps = {
	children?: ReactNode | undefined;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData );


export function AuthProvider({
	children
}: AuthContextProviderProps){
	
	//States
	const [data, setData] = useState<AuthState>(() => {
		const token = localStorage.getItem('@GoBarber:token')
		const user = localStorage.getItem('@GoBarber:user')

		if(token && user) {
			return {token, user: JSON.parse(user)};
		}

		return {} as AuthState
	})

	//UseCallback------------------------//
	const signIn = useCallback(async({ email, password }: SignInCredentials) => {
		const response = await api.post('sessions', {
			email,
			password
		});

		const { token, user } = response.data;

		//localStorage
		localStorage.setItem('@GoBarber:token', token)
		localStorage.setItem('@GoBarber:user', JSON.stringify(user));

		setData({ token, user })
		// console.log(response.data)
	}, [])

	const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');
  
    setData({} as  AuthState)
  }, [])
	//---------------------------------//

	return (
		<AuthContext.Provider value={{user: data.user, signIn, signOut}}>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth(): AuthContextData {
	const context = useContext(AuthContext)

	if(!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
	
	return context;
}