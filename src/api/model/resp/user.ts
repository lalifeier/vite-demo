export interface RoleInfo {
  roleName: string
  value: string
}

export interface UserResponse {
  userId: string | number
  accessToken: string
  refreshToken: string
  role: RoleInfo
}

export interface UserInfoResponse {
  roles: RoleInfo[]
  userId: string | number
  username: string
  realName: string
  avatar: string
  desc?: string
}
