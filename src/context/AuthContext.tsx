import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext({ isLoggedOut: false, logout: () => {} });

export const AuthProvider = ({ children }) => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const logout = () => {
    setIsLoggedOut(true);
  };

  return (
    <AuthContext.Provider value={{ isLoggedOut, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);