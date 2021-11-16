import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Form, Button, Message, Segment, Divider } from "semantic-ui-react";
import mainUrl from "../../utils/mainUrl";
import catchErrors from "../../utils/catchErrors";
import axios from "axios";
