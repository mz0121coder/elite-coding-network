import React from "react";
import { Menu } from "semantic-ui-react";

function ProfileTabs({
    activeComponent,
    handleComponent,
    numberOfFollowers,
    numberFollowing,
    userAccount,
    loggedUserFollowers,
  }) {
  