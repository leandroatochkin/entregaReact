import { createContext, useEffect, useState } from "react";
import { clientUser, adminUser } from "../utils/Models";
import { notify } from "../utils/Hooks";

export const Auth = createContext();

const LOCAL_STORAGE_KEY = "auth_user";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: null,
    password: null,
    id: null,
    role: null,
    isLoggedIn: false
  });


  useEffect(() => {//check for stored users
    const savedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);


  useEffect(() => {//if user isnt logged in remove creds
    if (user.isLoggedIn) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, [user]);

  const handleLogin = (email, password) => {
    if (email === clientUser.mail && password === clientUser.password) {
      const newUser = {
        email,
        id: clientUser.id,
        role: clientUser.role,
        isLoggedIn: true
      };
      setUser(newUser);
    } else if (email === adminUser.mail && password === adminUser.password) {
      const newUser = {
        email,
        id: adminUser.id,
        role: adminUser.role,
        isLoggedIn: true
      };
      setUser(newUser);
    } else {
      notify("Invalid credentials", true);
    }
  };

  const logout = () => {
    setUser({
      email: null,
      id: null,
      role: null,
      isLoggedIn: false
    });
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  return (
    <Auth.Provider value={{ user, handleLogin, logout }}>
      {children}
    </Auth.Provider>
  );
};
