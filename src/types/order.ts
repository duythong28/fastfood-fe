import { OrderStatus } from "@/common/enums";
import { Meta } from "./api";
import { ResProductDetail } from "./product";

export interface OrderItem {
  product: ResProductDetail;
  product_id: string;
  id: string;
  order_id: string;
  price: number;
  quantity: number;
  total_price: number;
}

export interface Order {
  total_price: number;
  status: OrderStatus;
  id: string;
  address: string;
  full_name: string;
  phone_number: string;
  user_id: string;
  OrderItems: Array<OrderItem>;
  user: {
    email: string;
    full_name: string;
    id: string;
  };
  review_state: string;
  payment_url: string | null;
  payment_method: string;
}

export interface ResGetOrdersByUser {
  data: {
    data: Array<Order>;
    meta: Meta;
  };
}

export interface ResGetOrderById {
  data: {
    data: Order;
  };
}

export interface CreateOrder {
  fullName: string;
  phoneNumber: number | undefined;
  address: string;
  items: { productId: string; quantity: number }[];
  paymentMethod: string;
}

export interface ResPayment {
  data: {
    data: {
      orderId: string;
      payUrl?: string;
    };
  };
}
