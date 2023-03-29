import React from 'react'
import { Session, User } from '@/domain/models';
import { authService } from '@/domain/services';
import { authClientRepository } from '@/infrastucture/repositories';
import { cookies } from '@/infrastucture/adapters';
import { useRouter } from 'next/router';

interface AuthContextState {
  isLoggedIn: boolean;
  user?: User | null;
  setState: React.Dispatch<React.SetStateAction<State>>;
  register: (credentials: Omit<User, 'id'>) => Promise<void>;
  login: (credentials: Omit<User, 'id' | 'name'>) => Promise<void>;
  logout: () => void;
}

interface State {
  user?: User | null;
  isLoggedIn: boolean;
}

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const AuthContext = React.createContext<AuthContextState>({} as AuthContextState);


const intialState: State = { user: null, isLoggedIn: false };
const service = authService(authClientRepository);

export const AuthProvider: React.FC<Props> = ({ children }) => {

  const [state, setState] = React.useState<State>(intialState);
  const { replace } = useRouter();

  const handleStateAndCookie = (session: Session) => {
    const { token, user } = session;
    cookies.setCookie('token', token);
    setState({ ...state, user, isLoggedIn: true });
    replace('/')
  }

  const register = (credentials: Omit<User, 'id'>) =>
    service.register(credentials)
      .then((session) => handleStateAndCookie(session))
      .catch(error => { throw error });

  const login = (credentials: Omit<User, 'id' | 'name'>) =>
    service.login(credentials)
      .then((session) => handleStateAndCookie(session))
      .catch(error => { throw error });

  const logout = () => {
    cookies.removeCookie('token');
    setState({ ...state, user: null, isLoggedIn: false })
    replace('/auth/login');
  }

  const checkToken = () =>
    service.checkToken()
      .then((session) => handleStateAndCookie(session))
      .catch(error => logout());

  React.useEffect(() => {
    checkToken();
  }, [])

  return (
    <AuthContext.Provider value={{
      ...state,
      setState,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider >
  )
}
