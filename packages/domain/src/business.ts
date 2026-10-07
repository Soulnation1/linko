export interface Business {
  id: string;
  name: string;
  motto?: string;
  location: string;
  logoUrl?: string | null;
  coverUrl?: string | null;
  accentColor?: string;
  whatsappNumber?: string;
}

export interface MenuItem {
  id: string;
  category: string;
  name: string;
  price: number;
  imageUrl?: string | null;
  available: boolean;
}

export interface CartLine {
  itemId: string;
  quantity: number;
}