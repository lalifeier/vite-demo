export interface UserResponse {
  user_id: string | number;
  access_token: string;
  refresh_token: string;
  role: [];
}

export interface UserInfoResponse {
  user_id: string | number;
  username: string;
  avatar: string;
  desc?: string;
  role: [];
}
