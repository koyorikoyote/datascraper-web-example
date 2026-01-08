export interface UserRole {
  id: number;
  role_name: string;
  typical_title: string | undefined | null;
  responsibilities: string | undefined | null;
}

export interface UserRoleCreate {
  name: string;
}

export interface UserRoleUpdate {
  name: string;
}
