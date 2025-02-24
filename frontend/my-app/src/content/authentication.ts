export interface AuthField {
    name: string;
    title: string;
    type: string;
  }
  
  export const loginFields: AuthField[] = [
    { name: 'username', title: 'Username', type: 'text' },
    { name: 'password', title: 'Password', type: 'password' }
  ];
  
  export const signupFields: AuthField[] = [
    { name: 'username', title: 'Username', type: 'text' },
    { name: 'password', title: 'Password', type: 'password' }
  ];
  