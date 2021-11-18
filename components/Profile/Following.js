import React, { useState, useEffect } from "react";
import { Button, Image, List } from "semantic-ui-react";
import SpinEffect from "../Layout/SpinEffect";
import { NoFollowInfo } from "../Layout/NoData";
import { follow, unfollow } from "../../utils/profileMethods";
import axios from "axios";
import mainUrl from "../../utils/mainUrl";
import cookie from "js-cookie";

const Following = ({
  user,
  loggedUserFollowers,
  setUserFollowers,
  profileId,
}) => {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadFollowInfo, setLoadFollowInfo] = useState(false);
