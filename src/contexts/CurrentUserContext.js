import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosRes.get("/dj-rest-auth/user/");
        setCurrentUser(data);
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();

    const setupInterceptors = () => {
      const reqInterceptor = axiosReq.interceptors.request.use(
        (config) => {
          return config;
        },
        (error) => Promise.reject(error),
      );

      const resInterceptor = axiosRes.interceptors.response.use(
        (response) => response,
        async (error) => {
          if (error.response?.status === 401) {
            try {
              await axios.post("/dj-rest-auth/token/refresh/");
            } catch (refreshErr) {
              setCurrentUser(null);
              history.push("/signin");
            }
          }
          return Promise.reject(error);
        },
      );

      return () => {
        axiosReq.interceptors.request.eject(reqInterceptor);
        axiosRes.interceptors.response.eject(resInterceptor);
      };
    };

    return setupInterceptors();
  }, [history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
