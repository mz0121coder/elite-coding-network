import React, { useEffect, useState } from "react";
import { List, Image, Search } from "semantic-ui-react";
import axios from "axios";
import cookie from "js-cookie";
import Router from "next/router";
import mainUrl from "../../utils/mainUrl";
let cancel;
