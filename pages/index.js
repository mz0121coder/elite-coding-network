import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import mainUrl from "../utils/mainUrl";
import AddPost from "../components/Post/AddPost";
import CardForPosts from "../components/Post/CardForPosts";
import { Segment } from "semantic-ui-react";
import { parseCookies } from "nookies";
import { NoPosts } from "../components/Layout/NoData";
import { PostDeleteToastr } from "../components/Layout/Toastr";
import InfiniteScroll from "react-infinite-scroll-component";
import { phPosts, EndMsg } from "../components/Layout/PlaceHolders";
import cookie from "js-cookie";
import getUserInfo from "../utils/getUserInfo";
import MsgAlertModal from "../components/Home/MsgAlertModal";
import newMsgSound from "../utils/newMsgSound";
import AlertWindows from "../components/Home/AlertWindows";

function Index({ user, postsData, errorLoading }) {
    const [posts, setPosts] = useState(postsData || []);
    const [showToastr, setShowToastr] = useState(false);
    const [hasMore, setHasMore] = useState(true);
  
    const [pageNumber, setPageNumber] = useState(2);
  
    const socket = useRef();
  
    const [newMsgReceivedAlert, setNewMsgReceived] = useState(null);
    const [newMsgModal, showNewMsgModal] = useState(false);
  
    const [newAlert, setNewNotification] = useState(null);
    const [alertPopup, showAlertPopup] = useState(false);
  
    useEffect(() => {
      if (!socket.current) {
        socket.current = io(mainUrl);
      }
  
      if (socket.current) {
        socket.current.emit("join", { userId: user._id });
  
        socket.current.on("newMsgReceived", async ({ newMsg }) => {
          const { name, dpLink } = await getUserInfo(newMsg.sender);
  