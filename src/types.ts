export type User = {
  _id: string;
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
}

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
};

export type Restaurant = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  imageUrl: string;
  lastUpdated: string;
};

// This is how enum types work
export type OrderStatus = "placed" | "paid" | "inProgress" | "outForDelivery" | "delivered"

export type Order ={
  _id: string,
  restaurant: Restaurant
  user: User
  cartItems: {
    menuItemId: string
    name: string
    quantity: string
  }[]
  deliveryDetails:{
    email: string
    name: string
    addressLine1: string
    city: string
    country: string
  }
  totalAmount: number
  status: OrderStatus
  createdAt: string
  restaurantId: string
}
// This is the type of the data that will come back as a response in search
export type RestaurantSearchResponse = {
  data: Restaurant[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  }
}