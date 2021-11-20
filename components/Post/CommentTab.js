import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { postComment } from "../../utils/postMethods";

function CommentTab({ postId, user, setComments }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
