import React, { Fragment, useEffect, useState } from "react";
import { Feed, Segment, Divider, Container } from "semantic-ui-react";
import axios from "axios";
import mainUrl from "../utils/mainUrl";
import { parseCookies } from "nookies";
import cookie from "js-cookie";
import { NoNotifications } from "../components/Layout/NoData";
import LikeAlert from "../components/Notifications/LikeAlert";
import CommentAlert from "../components/Notifications/CommentAlert";
import FollowerAlert from "../components/Notifications/FollowerAlert";

function Notifications({ notifications, errorLoading, user, userFollowers }) {
    const [loggedUserFollowers, setUserFollowers] = useState(userFollowers);
  
    useEffect(() => {
      const notificationRead = async () => {
        try {
          await axios.post(
            `${mainUrl}/api/notifications`,
            {},
            { headers: { Authorization: cookie.get("token") } }
          );
        } catch (error) {
          console.log(error);
        }
      };
  