import React, { useState } from "react";
import { List, Popup, Image } from "semantic-ui-react";
import catchErrors from "../../utils/catchErrors";
import Router from "next/router";
import { placeholderForLikes } from "../Layout/PlaceHolders";
import { Axios } from "../../utils/postMethods";

function LikesList({ postId, trigger }) {
  const [likesList, setLikesList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getLikesList = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(`/like/${postId}`);
      setLikesList(res.data);
    } catch (error) {
      alert(catchErrors(error));
    }
    setLoading(false);
  };
