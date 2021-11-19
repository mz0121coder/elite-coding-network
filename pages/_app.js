import axios from "axios";
import { parseCookies, destroyCookie } from "nookies";
import mainUrl from "../utils/mainUrl";
import { redirectUser } from "../utils/authUser";
import Layout from "../components/Layout/Layout";
import "react-toastify/dist/ReactToastify.css";
import "semantic-ui-css/semantic.min.css";
import "cropperjs/dist/cropper.css";

function MyApp({ Component, pageProps }) {
    return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    );
  }
  
  MyApp.getInitialProps = async ({ Component, ctx }) => {
    const { token } = parseCookies(ctx);
    let pageProps = {};
  
    const protectedRoutes =
    ctx.pathname === "/" ||
    ctx.pathname === "/[username]" ||
    ctx.pathname === "/notifications" ||
    ctx.pathname === "/post/[postId]" ||
    ctx.pathname === "/messages" ||
    ctx.pathname === "/search";
