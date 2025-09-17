import { User } from './User.model';
import { Menu } from './Menu.model';
import { Order } from './Order.model';
import { RestaurantRating } from './Rating.model';

export interface Restaurant {
  id: string;
  name: string;
  description?: string;
  address: string;
  phone: string;
  email?: string;
  imageUrl?: string;
  isActive: boolean;
  managerId: string;
  createdAt: Date;
  updatedAt: Date;
  avgRating: number;
  manager?: User;
  menus?: Menu[];
  orders?: Order[];
  ratings: RestaurantRating[];
}
