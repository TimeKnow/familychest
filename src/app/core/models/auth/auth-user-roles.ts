export enum AuthUserRoles {
  Child = 'CHILD',
  Parent = 'PARENT',
  Admin = 'ADMIN'
}

export const AuthUserRolesArray = [AuthUserRoles.Child, AuthUserRoles.Parent, AuthUserRoles.Admin];
export const AuthUserRolesDict = {Child: AuthUserRoles.Child, Parent: AuthUserRoles.Parent, Admin: AuthUserRoles.Admin};
