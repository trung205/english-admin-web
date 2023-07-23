export interface IUserRegister {
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface IUserLogin {
    email: string;
    password: string;
}