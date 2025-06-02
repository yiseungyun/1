type User = {
  id: number;
  name: string;
  email: string;
  phone?: string;
};

type UpdateUser = Partial<Omit<User, "id">>;

function updateUser(user: User, updates: UpdateUser) {
  return { ...user, ...updates };
}
