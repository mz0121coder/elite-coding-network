import React, { useState, useRef } from "react";
import { Form, Button, Message, Divider } from "semantic-ui-react";
import ImageFormat from "../Common/ImageFormat";
import CommonFields from "../Common/CommonFields";
import uploadPic from "../../utils/Cloudinary";
import { profileUpdate } from "../../utils/profileMethods";
