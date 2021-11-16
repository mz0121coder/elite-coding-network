import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Message, Segment, Divider } from "semantic-ui-react";
import CommonFields from "../components/Common/CommonFields";
import ImageFormat from "../components/Common/ImageFormat";
import { HeaderMessage, FooterMessage } from "../components/Common/WelcomeMsg";
import axios from "axios";
import mainUrl from "../utils/mainUrl";
import { registerUser } from "../utils/authUser";
import uploadPic from "../utils/Cloudinary";
const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
let cancel;

function Signup() {
    const [user, setUser] = useState({
      name: "",
      email: "",
      password: "",
      bio: "",
      github: "",
      at: "",
      connectdevelop: "",
      linkify: "",
    });
  
    const handleChange = (e) => {
        const { name, value, files } = e.target;
    
        if (name === "media") {
          setMedia(files[0]);
          setMediaPreview(URL.createObjectURL(files[0]));
        }
    
        setUser((prev) => ({ ...prev, [name]: value }));
      };
    
      const [displayLinks, setDisplayLinks] = useState(false);
      const [showPassword, setShowPassword] = useState(false);
      const [errorMsg, setErrorMsg] = useState(null);
      const [formLoading, setFormLoading] = useState(false);
      const [submitDisabled, setSubmitDisabled] = useState(true);
    
      const [username, setUsername] = useState("");
      const [usernameLoading, setUsernameLoading] = useState(false);
      const [usernameAvailable, setUsernameAvailable] = useState(false);
    
      const [media, setMedia] = useState(null);
      const [mediaPreview, setMediaPreview] = useState(null);
      const [highlight, setHighlight] = useState(false);
      const inputRef = useRef();
    
  