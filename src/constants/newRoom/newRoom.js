export const newRoomTextField = [
  {
    id: 1,
    title: 'Name',
    model: 'name',
    required: true,
    placeholder: 'Enter room\'s name',
    onlyRegister: true,
    type: 'text',
  },
  {
    id: 2,
    title: 'Address',
    model: 'publicAddress',
    required: true,
    placeholder: 'Enter room\'s address',
    onlyRegister: true,
    type: 'text',
  },
  {
    id: 3,
    title: 'City',
    model: 'city',
    required: true,
    placeholder: 'Enter your city',
    onlyRegister: true,
    type: 'text',
  },
];

export const newRoomAmountField = [
  {
    id: 4,
    title: 'Amount',
    model: 'amount',
    required: true,
    placeholder: 'Enter room\'s price',
    onlyRegister: true,
    type: 'number',
  },
  {
    id: 5,
    title: 'Bedrooms count',
    model: 'bedroomsCount',
    required: true,
    placeholder: 'Enter room\'s bedrooms',
    onlyRegister: true,
    type: 'number',
  },
];
