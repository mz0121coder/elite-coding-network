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

