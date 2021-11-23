import React, { createRef } from "react";
import HeadTags from "./HeadTags";
import Navbar from "./Navbar";
import {
  Container,
  Visibility,
  Grid,
  Sticky,
  Ref,
  Segment,
} from "semantic-ui-react";
import nprogress from "nprogress";
import Router, { useRouter } from "next/router";
import SideBars from "./SideBars";
import Search from "./Search";
import ResponsiveHeader from "./ResponsiveHeader";
import { createMedia } from "@artsy/fresnel";

const AppMedia = createMedia({
    breakpoints: { zero: 0, mobile: 549, tablet: 850, computer: 1080 },
  });
  
  const mediaStyles = AppMedia.createMediaStyle();
  const { Media, MediaContextProvider } = AppMedia;

  function Layout({ children, user }) {
    const contextRef = createRef();
    const router = useRouter();
  
    const messagesRoute = router.pathname === "/messages";
  
    Router.onRouteChangeStart = () => nprogress.start();
    Router.onRouteChangeComplete = () => nprogress.done();
    Router.onRouteChangeError = () => nprogress.done();