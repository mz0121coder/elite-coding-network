import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import mainUrl from "../utils/mainUrl";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { Segment, Header, Divider, Comment, Grid } from "semantic-ui-react";
import Chat from "../components/Chats/Chat";
import SearchChat from "../components/Chats/SearchChat";
import { NoMsg } from "../components/Layout/NoData";
import Banner from "../components/Messages/Banner";
import MsgInput from "../components/Messages/MsgInput";
import Message from "../components/Messages/Message";
import getUserInfo from "../utils/getUserInfo";
import newMsgSound from "../utils/newMsgSound";
import cookie from "js-cookie";

const scrollDivToBottom = (divRef) =>
  divRef.current !== null &&
  divRef.current.scrollIntoView({ behaviour: "smooth" });

function Messages({ chatsData, user }) {
  const [chats, setChats] = useState(chatsData || []);
  const router = useRouter();

  const socket = useRef();
  const [activeChats, setactiveChats] = useState([]);

  const [messages, setMessages] = useState([]);
  const [bannerInfo, setBannerInfo] = useState({ name: "", dpLink: "" });

  const divRef = useRef();

    // This ref is for persisting the state of query string in url throughout re-renders. This ref is the value of query string inside url
    const openChatId = useRef("");

    //CONNECTION useEffect
    useEffect(() => {
      if (!socket.current) {
        socket.current = io(mainUrl);
      }
  
      if (socket.current) {
        socket.current.emit("join", { userId: user._id });
  
        socket.current.on("activeChats", ({ users }) => {
          users.length > 0 && setactiveChats(users);
        });
  
        if (chats.length > 0 && !router.query.message) {
          router.push(`/messages?message=${chats[0].msgsWithUser}`, undefined, {
            shallow: true,
          });
        }
      }
    }, []);

    // LOAD MESSAGES useEffect
  useEffect(() => {
    const loadMessages = () => {
      socket.current.emit("loadMessages", {
        userId: user._id,
        msgsWithUser: router.query.message,
      });

      socket.current.on("messagesLoaded", async ({ chat }) => {
        setMessages(chat.messages);
        setBannerInfo({
          name: chat.msgsWithUser.name,
          dpLink: chat.msgsWithUser.dpLink,
        });

        openChatId.current = chat.msgsWithUser._id;
        divRef.current && scrollDivToBottom(divRef);
      });

      socket.current.on("noChatFound", async () => {
        const { name, dpLink } = await getUserInfo(router.query.message);

        setBannerInfo({ name, dpLink });
        setMessages([]);

        openChatId.current = router.query.message;
      });
    };

    if (socket.current && router.query.message) loadMessages();
  }, [router.query.message]);

  const sendMsg = (msg) => {
    if (socket.current) {
      socket.current.emit("sendNewMsg", {
        userId: user._id,
        msgSendToUserId: openChatId.current,
        msg,
      });
    }
  };

    // Confirming msg is sent and receving the messages useEffect
    useEffect(() => {
        if (socket.current) {
          socket.current.on("msgSent", ({ newMsg }) => {
            if (newMsg.receiver === openChatId.current) {
              setMessages((prev) => [...prev, newMsg]);
    
              setChats((prev) => {
                const previousChat = prev.find(
                  (chat) => chat.msgsWithUser === newMsg.receiver
                );
                previousChat.lastMessage = newMsg.msg;
                previousChat.date = newMsg.date;
    
                return [...prev];
              });
            }
          });
    
          socket.current.on("newMsgReceived", async ({ newMsg }) => {
            let senderName;
    
                    // WHEN CHAT WITH SENDER IS CURRENTLY OPENED INSIDE YOUR BROWSER
        if (newMsg.sender === openChatId.current) {
            setMessages((prev) => [...prev, newMsg]);
  
            setChats((prev) => {
              const previousChat = prev.find(
                (chat) => chat.msgsWithUser === newMsg.sender
              );
              previousChat.lastMessage = newMsg.msg;
              previousChat.date = newMsg.date;
  
              senderName = previousChat.name;
  
              return [...prev];
            });
          }
          //
          else {
            const ifPreviouslyMessaged =
              chats.filter((chat) => chat.msgsWithUser === newMsg.sender).length >
              0;
  
            if (ifPreviouslyMessaged) {
              setChats((prev) => {
                const previousChat = prev.find(
                  (chat) => chat.msgsWithUser === newMsg.sender
                );
                previousChat.lastMessage = newMsg.msg;
                previousChat.date = newMsg.date;
  
                senderName = previousChat.name;
  
                return [
                  previousChat,
                  ...prev.filter((chat) => chat.msgsWithUser !== newMsg.sender),
                ];
              });
            }
  
  
    
  

