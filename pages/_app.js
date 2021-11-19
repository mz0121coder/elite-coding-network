import axios from "axios";
import { parseCookies, destroyCookie } from "nookies";
import mainUrl from "../utils/mainUrl";
import { redirectUser } from "../utils/authUser";
import Layout from "../components/Layout/Layout";
import "react-toastify/dist/ReactToastify.css";
import "semantic-ui-css/semantic.min.css";
import "cropperjs/dist/cropper.css";
