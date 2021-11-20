import React from "react";
import { Modal, Grid, Image, Card, Icon, Divider } from "semantic-ui-react";
import AddComments from "./AddComments";
import CommentTab from "./CommentTab";
import calcTime from "../../utils/calcTime";
import Link from "next/link";
import { likePost } from "../../utils/postMethods";
import LikesList from "./LikesList";

function ImageModal({
  post,
  user,
  setLikes,
  likes,
  isLiked,
  comments,
  setComments,
}) {
