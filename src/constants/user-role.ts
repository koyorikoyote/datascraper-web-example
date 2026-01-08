export const UserRoleConst = {
    USER: 'sales_rep',
    ADMIN: 'sales_manager',
    SUPER_ADMIN: 'system',
  } as const;
  
  export type UserRoleConst = typeof UserRoleConst[keyof typeof UserRoleConst];