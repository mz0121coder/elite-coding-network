import React from "react";
import { Menu, Container, Icon, Dropdown } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";
import { logoutUser } from "../../utils/authUser";

function ResponsiveHeader({
    user: { unreadNotification, email, unreadMsg, username },
  }) {
    const router = useRouter();
    const isActive = (route) => router.pathname === route;
  