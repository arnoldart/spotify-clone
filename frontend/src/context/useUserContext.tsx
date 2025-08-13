import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import toast, { Toaster } from "react-hot-toast";

const server = "https://spotify-user-service-zeta.vercel.app"

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  playlist: string[];
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  isAuth: boolean;
  btnLoading: boolean;
  loginUser: (
    email: string,
    password: string,
    navigate: (path: string) => void
  ) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined)

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  async function loginUser(
    email: string,
    password: string,
    navigate: (path: string) => void
  ) {
    setBtnLoading(true);
    try {
      const res = await fetch(`${server}/api/v1/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();

      localStorage.setItem("token", data.token);
      setUser(data.user);
      toast.success(data.message);
      setIsAuth(true);
      setBtnLoading(false);
      navigate("/");
    } catch (error:any) {
      toast.error(error.response?.data?.message || "An error occured");
      setBtnLoading(false);
    }
  }

  async function fetchUser() {
    try {
      const token = localStorage.getItem("token") || "";
      const res = await fetch(`${server}/api/v1/user/me`, {
        method: "GET",
        headers: {
          token,
        },
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();
      setUser(data);
      setIsAuth(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ 
      user,
      loading,
      isAuth,
      btnLoading,
      loginUser
    }}>
      {children}
      <Toaster />
    </UserContext.Provider>
  )
}


export const useUserData = ():UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserProvider");
  }
  return context;
}