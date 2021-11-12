import axios from "axios";
import mainUrl from "./mainUrl";
import catchErrors from "./catchErrors";
import Router from "next/router";
import cookie from "js-cookie";

export const registerUser = async (user, dpLink, setError, setLoading) => {
    try {
      const res = await axios.post(`${mainUrl}/api/signup`, { user, dpLink });
  
      setToken(res.data);
    } catch (error) {
      const errorMsg = catchErrors(error);
      setError(errorMsg);
    }
    setLoading(false);
  };
  
  export const loginUser = async (user, setError, setLoading) => {
    setLoading(true);
    try {
      const res = await axios.post(`${mainUrl}/api/auth`, { user });
  
      setToken(res.data);
    } catch (error) {
      const errorMsg = catchErrors(error);
      setError(errorMsg);
    }
    setLoading(false);
  };
  
  export const redirectUser = (ctx, location) => {
    if (ctx.req) {
      ctx.res.writeHead(302, { Location: location });
      ctx.res.end();
    } else {
      Router.push(location);
    }
  };
  
  const setToken = (token) => {
    cookie.set("token", token);
    Router.push("/");
  };
  
  export const logoutUser = (email) => {
    cookie.set("userEmail", email);
    cookie.remove("token");
    Router.push("/login");
    Router.reload();
  };
  