import React, { useEffect, useState } from "react";
import { Form, Button, Message, Segment } from "semantic-ui-react";
import mainUrl from "../../utils/mainUrl";
import catchErrors from "../../utils/catchErrors";
import axios from "axios";

function ResetPage() {
    const [email, setEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState(null);
  
    const [emailChecked, setEmailChecked] = useState(false);
  
    const [loading, setLoading] = useState(false);
  
    const resetPassword = async (e) => {
      e.preventDefault();
  
      setLoading(true);
  
      try {
        await axios.post(`${mainUrl}/api/reset`, { email });
  
        setEmailChecked(true);
      } catch (error) {
        setErrorMsg(catchErrors(error));
      }
  
      setLoading(false);
    };
  