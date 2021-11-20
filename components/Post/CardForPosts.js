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

function CardForPosts({ post, user, setPosts, setShowToastr, socket }) {
    const [likes, setLikes] = useState(post.likes);
  
    const isLiked =
      likes.length > 0 &&
      likes.filter((like) => like.user === user._id).length > 0;
  
    const [comments, setComments] = useState(post.comments);
  
    const [error, setError] = useState(null);
  
    const [showModal, setShowModal] = useState(false);
  
    const addPropsToModal = () => ({
      post,
      user,
      setLikes,
      likes,
      isLiked,
      comments,
      setComments,
    });
  