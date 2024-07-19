import { createContext, useReducer } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
    loading: true,
    error: null,
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'USER_LOADED':
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload,
            };
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false,
            };
        case 'AUTH_ERROR':
        case 'LOGIN_FAIL':
        case 'LOGOUT':
        case 'REGISTER_FAIL':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        try {
            const res = await axios.get('/api/auth');
            dispatch({ type: 'USER_LOADED', payload: res.data });
        } catch (err) {
            dispatch({ type: 'AUTH_ERROR' });
        }
    };

    const register = async (formData) => {
        try {
            const res = await axios.post('/api/auth/register', formData);
            dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
            loadUser();
        } catch (err) {
            dispatch({ type: 'REGISTER_FAIL', payload: err.response.data.msg });
        }
    };

    const login = async (formData) => {
        try {
            const res = await axios.post('/api/auth/login', formData);
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
            loadUser();
        } catch (err) {
            dispatch({ type: 'LOGIN_FAIL', payload: err.response.data.msg });
        }
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <AuthContext.Provider value={{ ...state, loadUser, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
