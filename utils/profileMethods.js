import axios from "axios";
import mainUrl from "./mainUrl";
import catchErrors from "./catchErrors";
import cookie from "js-cookie";
import Router from "next/router";

const Axios = axios.create({
  mainUrl: `${mainUrl}/api/profile`,
  headers: { Authorization: cookie.get("token") },
});
