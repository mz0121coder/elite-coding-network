import React, {useState, UseEffect, useEffect} from "react";
import {List, Image, Search } from "semantic-ui-react";
import axios from "axios";
import cookie from "js-cookie";
import {useRouter} from "next/router";
import mainUrl from "../..utils.mainUrl";



useEffect (() => {
    <Search
    onBlur={()} => {
        results.length > 0 && setResults ([]);
        loading && setLoading (false);
        setText ("");
    }}
    
    }
}