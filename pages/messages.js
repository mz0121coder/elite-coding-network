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

