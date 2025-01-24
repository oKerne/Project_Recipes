import { createContext, Dispatch } from "react";

export type UserType = {
    token: any;
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: string;
    phone: string;
}

type Action = {
    type: 'SIGNUP';
    data: Pick<UserType, 'id' | 'email' | `password`>;
} |{
    type: 'LOGIN';
    data: UserType;
} | {
    type: 'LOGOUT';
} | {
    type: 'UPDATE';
    data: Partial<UserType>;
}

const userReducer = (state: UserType, action: Action): UserType => {
    switch (action.type) {
        case 'SIGNUP':
            return { ...state, ...action.data };
        case 'LOGIN':
            console.log('in reducer'+ action.data);
            
            return { ...state, ...action.data };
        case 'LOGOUT':
            return {} as UserType;
        case 'UPDATE':
            return { ...state, ...action.data };
        default:
            return state;
    }
}

export default userReducer;

export const initialState: UserType = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    token: null,
}

export const UserContext = createContext<{
    state: UserType;
    dispatch: Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => null,
})