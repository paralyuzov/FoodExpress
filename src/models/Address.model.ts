import { User } from './User.model';
import type { Order } from './Order.model';

export interface Address {
  id: string;
  userId: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
  instructions?: string;
  user?: User;
  orders?: Order[];
}
