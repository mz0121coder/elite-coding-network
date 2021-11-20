import React, { useState } from "react";
import {
  Card,
  Icon,
  Image,
  Divider,
  Segment,
  Button,
  Popup,
  Header,
  Modal,
} from "semantic-ui-react";
import AddComments from "./AddComments";
import CommentTab from "./CommentTab";
import calcTime from "../../utils/calcTime";
import Link from "next/link";
import { deletePost, likePost } from "../../utils/postMethods";
import LikesList from "./LikesList";
import ImageModal from "./ImageModal";
import NoImage from "./NoImage";
