import { createContext, useState, useEffect } from 'react';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');


    if (storedUser && token && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing user from localStorage", e);

        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);


  const login = (authData) => {

    localStorage.setItem('token', authData.token);


    const userDetails = {
      _id: authData._id,
      name: authData.name,
      email: authData.email
    };


    localStorage.setItem('user', JSON.stringify(userDetails));
    setUser(userDetails);
  };


  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null); 
  };

  return (

    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};