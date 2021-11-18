import React, { useState, useEffect, useRef } from "react";
import {
  List,
  Divider,
  Message,
  Checkbox,
  Form,
  Button,
} from "semantic-ui-react";
import { pwUpdate, toggleMsgAlert } from "../../utils/profileMethods";

function Settings({ newMessageAlert }) {
    const [passwordFields, showPasswordFields] = useState(false);
  
    const [newMessageSettings, showNewMessageSettings] = useState(false);
  
    const isFirstRun = useRef(true);
    const [popupSetting, setPopupSetting] = useState(newMessageAlert);
  
    const [success, setSuccess] = useState(false);
  
    function Settings({ newMessageAlert }) {
        const [passwordFields, showPasswordFields] = useState(false);
      
        const [newMessageSettings, showNewMessageSettings] = useState(false);
      
        const isFirstRun = useRef(true);
        const [popupSetting, setPopupSetting] = useState(newMessageAlert);
      
        const [success, setSuccess] = useState(false);
      
      