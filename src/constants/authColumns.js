export const authColumn = [
  {
    id: 1,
    title: 'First Name',
    model: 'firstName',
    required: true,
    placeholder: 'Enter First Name',
    onlyRegister: true,
    type: 'text',
  },
  {
    id: 2,
    title: 'Last name',
    model: 'lastName',
    onlyRegister: true,
    placeholder: 'Enter Last Name',
    required: true,
    type: 'text',
  },
  {
    id: 3,
    title: 'Email',
    model: 'email',
    onlyRegister: true,
    onlyLogin: true,
    placeholder: 'Enter email',
    required: true,
    type: 'text',
  },
  {
    id: 4,
    title: 'Password',
    model: 'password',
    onlyRegister: true,
    onlyLogin: true,
    placeholder: 'Password',
    required: true,
    type: 'password',
  },
  {
    id: 5,
    title: 'Repeat password',
    model: 'repeatPassword',
    onlyRegister: true,
    placeholder: 'Repeat Password',
    required: true,
    type: 'password',
  },
];
