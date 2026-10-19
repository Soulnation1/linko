export interface UserAccount {
  id: string;
  name: string;
  email: string;
  businessId: string | null;
  createdAt: string;
}

export interface AuthSession {
  userId: string;
  createdAt: string;
}
