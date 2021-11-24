import React, { useEffect, useState } from "react";
import { List, Image, Search } from "semantic-ui-react";
import axios from "axios";
import cookie from "js-cookie";
import Router from "next/router";
import mainUrl from "../../utils/mainUrl";
let cancel;

function SearchTab() {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
  
    const handleChange = async (e) => {
        const { value } = e.target;
        setText(value);
    
        if (value.length === 0) return;
        if (value.trim().length === 0) return;
    
        setText(value);
        setLoading(true);
    