import React, { createContext, useState, useEffect } from 'react';
const AuthContext = createContext();// dùng để lây giá trị 

const AuthProvider = ({ children }) => {// dùng để lấy giá trị trong vùng code nào
  const [isAuthenticated, setIsAuthenticated] = useState(true);// set null

  useEffect(() => {
    const storedAuth = sessionStorage.getItem('isAuthenticated');
    if (storedAuth) {
      setIsAuthenticated(JSON.parse(storedAuth));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));// set value token o day 
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };