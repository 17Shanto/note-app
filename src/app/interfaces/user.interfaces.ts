export interface IUser {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  role: "user" | "admin";
  address: {
    city: string;
    street: string;
    zip: number;
  };
}
