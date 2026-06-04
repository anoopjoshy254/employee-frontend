export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  dateOfJoining: string;
  salary: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
