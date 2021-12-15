import { UserInterface } from '../../../../interfaces/user.interface';

export interface AuthStateInterface {
  user: UserInterface | null;
  isLoading: boolean;
  isSubmitting: boolean;
}
