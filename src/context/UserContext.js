// UserContext.js
import { createContext } from 'react';

const UserContext = createContext({
  isLoggedIn: false,
  setLoggedIn: () => {}
});

export default UserContext;
