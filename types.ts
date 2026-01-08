export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Dashboard: undefined;
  Home: undefined;
  Detail: {
    plant: {
      name: string;
      info: string;
      image: string;
      icon: string;
    };
  };
  Result: {
    photo: any;
    crop: string;
  };
  Community: undefined;
  Settings: undefined;
};
