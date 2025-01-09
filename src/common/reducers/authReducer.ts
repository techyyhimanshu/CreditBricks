import { loginSuccess, logout } from "../actions/authActions";

interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
  }
  
  const initialState: AuthState = {
    isAuthenticated: localStorage.getItem("token")?true:false,
    token: localStorage.getItem("token")||null,
  };
  
  type AuthAction = ReturnType<typeof loginSuccess | typeof logout>;
  
  const authReducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          isAuthenticated: true,
          token: action.payload.token,
        };
      case 'LOGOUT':
        return {
          isAuthenticated: false,
          token: null,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  