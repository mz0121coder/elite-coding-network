import React, { useState, useRef } from "react";
import { Form, Button, Image, Divider, Message, Icon } from "semantic-ui-react";
import uploadPic from "../../utils/Cloudinary";
import { submitNewPost } from "../../utils/postMethods";
import CropImage from "./CropImage";

function AddPost({ user, setPosts }) {
  const [newPost, setNewPost] = useState({ text: "", location: "" });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const [error, setError] = useState(null);
  const [highlight, setHighlight] = useState(false);

  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "media") {
      if (files && files.length > 0) {
        setMedia(files[0]);
        setMediaPreview(URL.createObjectURL(files[0]));
      }
    }

    setNewPost((prev) => ({ ...prev, [name]: value }));
};

const addStyles = () => ({
  textAlign: "center",
  height: "150px",
  width: "150px",
  border: "dotted",
  paddingTop: media === null && "60px",
  cursor: "pointer",
  borderColor: highlight ? "green" : "black",
});

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  let picUrl;

  if (media !== null) {
    picUrl = await uploadPic(media);
    if (!picUrl) {
      setLoading(false);
      return setError("Error Uploading Image");
    }
  }

  await submitNewPost(
    newPost.text,
    newPost.location,
    picUrl,
    setPosts,
    setNewPost,
    setError
  );

  setMedia(null);
  mediaPreview && URL.revokeObjectURL(mediaPreview);
  setTimeout(() => setMediaPreview(null), 3000);
  setLoading(false);
};
