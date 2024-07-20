export interface RegisterForm {
  email: string;
  username: string;
  password: string;
}

export interface LoginForm extends RegisterForm {}
