import axios from "axios";
import mainUrl from "./mainUrl";
import catchErrors from "./catchErrors";
import cookie from "js-cookie";

export const Axios = axios.create({
  mainUrl: `${mainUrl}/api/posts`,
  headers: { Authorization: cookie.get("token") },
});