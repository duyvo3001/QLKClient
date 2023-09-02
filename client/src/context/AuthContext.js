import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();// dùng để lây giá trị 

const AuthProvider = ({ children }) => {// dùng để lấy giá trị trong vùng code nào
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const storedAuth = sessionStorage.getItem('isAuthenticated');
    if (storedAuth) {
      setIsAuthenticated(JSON.parse(storedAuth));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };