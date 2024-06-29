export interface RegisterForm {
  email: string;
  username: string;
  password: string;
  confirmedPassword: string;
}

export interface LoginForm {
  email: string;
  username: string;
  password: string;
}

export interface InputProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name: string;
}
