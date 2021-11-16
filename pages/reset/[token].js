import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Form, Button, Message, Segment, Divider } from "semantic-ui-react";
import mainUrl from "../../utils/mainUrl";
import catchErrors from "../../utils/catchErrors";
import axios from "axios";

function TokenPage() {
    const router = useRouter();
  
    const [newPassword, setNewPassword] = useState({ field1: "", field2: "" });
  
    const { field1, field2 } = newPassword;
  
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [success, setSuccess] = useState(false);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      setNewPassword((prev) => ({ ...prev, [name]: value }));
    };
  
    useEffect(() => {
        errorMsg !== null && setTimeout(() => setErrorMsg(null), 5000);
      }, [errorMsg]);
    
      const resetPassword = async (e) => {
        e.preventDefault();
    
        setLoading(true);
        try {
          if (field1 !== field2) {
            return setErrorMsg("Passwords do not match");
          }
    
          await axios.post(`${mainUrl}/api/reset/token`, {
            password: field1,
            token: router.query.token,
          });
    
          setSuccess(true);
        } catch (error) {
          setErrorMsg(catchErrors(error));
        }
    
        setLoading(false);
      };
    