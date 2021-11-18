import React, { useState } from "react";
import {
  Segment,
  Image,
  Grid,
  Divider,
  Header,
  Button,
  List,
} from "semantic-ui-react";
import { follow, unfollow } from "../../utils/profileMethods";

function ProfileHeader({
    profile,
    userAccount,
    loggedUserFollowers,
    setUserFollowers,
  }) {
    const [loading, setLoading] = useState(false);
  
    const isFollowingUser =
      loggedUserFollowers.following.length > 0 &&
      loggedUserFollowers.following.filter(
        (following) => following.user === profile.user._id
      ).length > 0;
  
  