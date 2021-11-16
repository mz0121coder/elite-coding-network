import React, { useState } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import {
  Card,
  Icon,
  Image,
  Divider,
  Segment,
  Container,
} from "semantic-ui-react";
import AddComments from "../../components/Post/AddComments";
import CommentTab from "../../components/Post/CommentTab";
import LikesList from "../../components/Post/LikesList";
import Link from "next/link";
import { likePost } from "../../utils/postMethods";
import calcTime from "../../utils/calcTime";
import mainUrl from "../../utils/mainUrl";
import { NoPostListed } from "../../components/Layout/NoData";
