export interface SignupFormProps {
  onSwitch: () => void;
}

export interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
