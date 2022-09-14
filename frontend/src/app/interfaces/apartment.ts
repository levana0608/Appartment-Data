export interface Apartment {
  id?: string;
  city: string;
  street: string;
  price: number;
  status: boolean;
  phone: string;
  userId: number;
  imagePath?: File;
}
