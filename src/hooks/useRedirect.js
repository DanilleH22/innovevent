import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
/**
 * Redirect users if not logged in 
 * Redirect users if not authorrised to find that page
 * Variables & function code provided in Moments walkthrough.
 */
export const useRedirect = (userAuthStatus) => {
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        await axios.post("/dj-rest-auth/token/refresh/");
        if (userAuthStatus === "loggedIn") {
          history.push("/not-found");
        }
      } catch (err) {
        if (userAuthStatus === "loggedOut") {
          history.push("/signin");
        }
      }
    };
    handleMount();
  }, [history, userAuthStatus]);
};