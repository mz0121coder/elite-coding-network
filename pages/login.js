import React, { useState, useEffect } from "react";
import { Form, Button, Message, Segment, Divider } from "semantic-ui-react";
import { loginUser } from "../utils/authUser";
import { HeaderMessage, FooterMessage } from "../components/Common/WelcomeMsg";
import cookie from "js-cookie";
