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

