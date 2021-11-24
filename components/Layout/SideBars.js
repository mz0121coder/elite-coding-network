import React from "react";
import { List, Icon } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { logoutUser } from "../../utils/authUser";

function SideBars({
    user: { unreadNotification, email, unreadMsg, username },
    pc = true,
  }) {
    const router = useRouter();
  
    const isActive = (route) => router.pathname === route;
  