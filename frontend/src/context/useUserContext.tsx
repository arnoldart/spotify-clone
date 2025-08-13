import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import toast, { Toaster } from "react-hot-toast";

const server = import.meta.env.VITE_USER_SERVICE_URL

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
  registerUser: (
    name: string,
    email: string,
    password: string,
    navigate: (path: string) => void
  ) => Promise<void>;
  logoutUser: () => void;
  addToPlaylist: (id: string) => void;
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

  async function registerUser(
    name: string,
    email: string,
    password: string,
    navigate: (path: string) => void
  ) {
    setBtnLoading(true);
    try {
      const res = await fetch(`${server}/api/v1/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();

      toast.success(data.message);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setIsAuth(true);
      setBtnLoading(false);
      navigate("/");
    } catch (error: any) {
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

  async function logoutUser() {
    localStorage.clear();
    setUser(null);
    setIsAuth(false);

    toast.success("User Logged Out");
  }

  async function addToPlaylist(id: string) {
    try {
      const token = localStorage.getItem("token") || "";
      const res = await fetch(`${server}/api/v1/song/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({}),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();
      toast.success(data.message);
      fetchUser();
    } catch (error: any) {
      toast.error(error?.message || "An Error Occured");
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
      loginUser,
      registerUser,
      logoutUser,
      addToPlaylist
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