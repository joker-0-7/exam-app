"use client";
import { createContext, useState, useEffect } from "react";
import Loader from "../components/Loader";
import axios from "axios";

const UserContext = createContext();
const UserProvider = ({ children }) => {
  const [client, setClient] = useState(false);
  const [state, setState] = useState({
    user: {},
    token: "",
  });
  useEffect(() => {
    setState(JSON.parse(window.localStorage.getItem("auth")));
  }, []);
  useEffect(() => {
    setClient(true);
  }, []);
  const token = state && state.token ? state.token : "";
  axios.defaults.headers.common["Authorization"] = token;
  return client ? (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  ) : (
    <Loader />
  );
};
export { UserContext, UserProvider };
