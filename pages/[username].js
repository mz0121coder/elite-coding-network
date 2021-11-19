import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { useRouter } from "next/router";
import axios from "axios";
import mainUrl from "../utils/mainUrl";
import { parseCookies } from "nookies";
import { Grid } from "semantic-ui-react";
import { NoPosts, NoProfile } from "../components/Layout/NoData";
import CardForPosts from "../components/Post/CardForPosts";
import cookie from "js-cookie";
import { phPosts } from "../components/Layout/PlaceHolders";
import ProfileTabs from "../components/Profile/ProfileTabs";
import ProfileHeader from "../components/Profile/ProfileHeader";
import Followers from "../components/Profile/Followers";
import Following from "../components/Profile/Following";
import UpdateProfile from "../components/Profile/UpdateProfile";
import Settings from "../components/Profile/Settings";
import { PostDeleteToastr } from "../components/Layout/Toastr";

function ProfilePage({
    errorLoading,
    profile,
    numberOfFollowers,
    numberFollowing,
    user,
    userFollowers,
  }) {
    const router = useRouter();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showToastr, setShowToastr] = useState(false);
  
    const [activeComponent, setActiveComponent] = useState("profile");
    const handleComponent = (clickedTab) => setActiveComponent(clickedTab);
  
    const [loggedUserFollowers, setUserFollowers] = useState(userFollowers);
  
    const userAccount = profile.user._id === user._id;
  
    if (errorLoading) return <NoProfile />;
  
    useEffect(() => {
        const getPosts = async () => {
          setLoading(true);
    
          try {
            const { username } = router.query;
            const res = await axios.get(
              `${mainUrl}/api/profile/posts/${username}`,
              {
                headers: { Authorization: cookie.get("token") },
              }
            );
    
            setPosts(res.data);
          } catch (error) {
            alert("Error Loading Posts");
          }
    
          setLoading(false);
        };
        getPosts();
      }, [router.query.username]);
    
      useEffect(() => {
        showToastr && setTimeout(() => setShowToastr(false), 4000);
      }, [showToastr]);
    
      const socket = useRef();
    
      useEffect(() => {
        if (!socket.current) {
          socket.current = io(mainUrl);
        }
    
        if (socket.current) {
          socket.current.emit("join", { userId: user._id });
        }
      }, []);
    
    