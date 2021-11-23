import React, { useState } from "react";
import { Feed, Button, Divider } from "semantic-ui-react";
import calcTime from "../../utils/calcTime";
import { follow, unfollow } from "../../utils/profileMethods";
