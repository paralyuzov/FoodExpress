import { OrderStatus } from "./Order.model";

export interface DashboardStats {
  todayRevenue: number;
  todayOrders: number;
  totalUsers: number;
  activeRestaurants: number;
  revenueGrowth: number;
  ordersGrowth: number;
  newUsersToday: number;
  totalRestaurants: number;
}

export interface OrderTrend {
  date: string;
  orders: number;
  revenue: number;
}

export interface TopDish {
  id: string;
  name: string;
  orders: number;
  revenue: number;
  restaurant: string;
  restaurantId: string;
}

export interface RecentOrder {
  id: string;
  customerName: string;
  status: OrderStatus
  total: number;
  createdAt: string;
  restaurantName: string;
}

export interface DashboardData {
  stats: DashboardStats;
  orderTrend: OrderTrend[];
  topDishes: TopDish[];
  recentOrders: RecentOrder[];
}
