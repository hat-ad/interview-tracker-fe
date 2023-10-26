// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResponse<T = any, K = any> {
  code: boolean;
  result: T | K;
  message: string;
}
export interface IUser {
  email: string;
  userCode: string;
  password: string;
  token: string | null;
}

export interface TableRow {
  id: string;
  name: string;
  feedback: string;
  status: "PENDING" | "COMPLETED";
  rating: number;
  userCode: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StarRatingProps {
  rating: number;
  onRatingChange: (newRating: number) => void;
}

export interface QueryParamsType {
  limit?: number;
  page: number;
}

export interface Errors {
  email: string;
  password: string;
}
