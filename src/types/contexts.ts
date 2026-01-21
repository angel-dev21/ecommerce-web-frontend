export interface IAuthContext {
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
  username: string;
  setUsername: (username: string) => void;
  handleLogin: () => void;
  handleLogout: () => void;
}
