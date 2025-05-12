import { loginSuccess, logout, setSociety } from "../actions/authActions";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  society: any 
}

const initialState: AuthState = {
  isAuthenticated: localStorage.getItem("token") ? true : false,
  token: localStorage.getItem("token") || null,
  society: localStorage.getItem("selectedSociety")
    ? JSON.parse(localStorage.getItem("selectedSociety")!)
    : null
};

type AuthAction = ReturnType<typeof loginSuccess | typeof logout | typeof setSociety>;

const authReducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
      };
    case 'SET_SOCIETY':
      return { 
        ...state,
        society: action.payload,
      };
    case 'LOGOUT':
      return {
        isAuthenticated: false,
        token: null,
        society: ""
      };
    default:
      return state;
  }
};

export default authReducer;
