import React, { useState, useEffect } from "react";
import { Form, Button, Message, Segment, Divider } from "semantic-ui-react";
import { loginUser } from "../utils/authUser";
import { HeaderMessage, FooterMessage } from "../components/Common/WelcomeMsg";
import cookie from "js-cookie";

function Login() {
    const [user, setUser] = useState({
      email: "",
      password: "",
    });
  
    const { email, password } = user;
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [formLoading, setFormLoading] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(true);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      setUser((prev) => ({ ...prev, [name]: value }));
    };
  
    useEffect(() => {
        const isUser = Object.values({ email, password }).every((item) =>
          Boolean(item)
        );
        isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
      }, [user]);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        await loginUser(user, setErrorMsg, setFormLoading);
      };
    
      useEffect(() => {
        document.title = "Welcome Back";
        const userEmail = cookie.get("userEmail");
        if (userEmail) setUser((prev) => ({ ...prev, email: userEmail }));
      }, []);
     