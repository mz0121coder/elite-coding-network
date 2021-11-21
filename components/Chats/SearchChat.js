import React, {useState, UseEffect, useEffect} from "react";
import {List, Image, Search } from "semantic-ui-react";
import axios from "axios";
import cookie from "js-cookie";
import {useRouter} from "next/router";
import mainUrl from "../..utils.mainUrl";
let cancel;

function SearchChat ({chats, setChats}) {
    const [text, setText] = useState ("");
    const [loading, setLoading] = useState (false);
    const [results, setResults] = useState ([]);
    
    const router = useRouter ();

    const handleChange =async (e) => {
        const{ value } = e.target;
        setText (value);
        if (value.length === 0 ) return ;
        if (value.trim().length ===0) return;

        setLoading (true);

    try {
        cancel && cancel ();
        const CancelToken = axios.CanelToken;
        const token =cookie.get("token");

        const res = await axios.get (`${mainUrl}/api/search$value`, {
            headers: {Authorization: token},
            cancelToken: new CancelToken((canceler) => {
                cancel = canceler;
            }),
        });

        if (res.data.length === 0) {
            results.length > 0 && setResults ([]);

            return setLoading (false);
        }

        setResults (res.data);
    } catch (error) {
        console.log (error);
    }
    setLoading (false);
};

const addChat = (result) => {
    const alreadyInChat =
    chats.length > 0 &&
    chats.filter ((chat) => chat.msgWithUser === result._id). length > 0;

    if (alreadyInChat) {
        return router.push (`/messages?message=${result._id}`);
    }
    else {
        const newChat = {
        msgWithUser: result._id,
        name:result.name,
        dpLink: result.dpLink,
        lastMessage:"",
        date: Date.now(),
        };

        setChats ((prev) => [newChat, ...prev]);

        return router.push (`/messages?message=${result._id}`);
    }

    };

    useEffect (() => {
        if (text.length === 0 & loading) setLoading (false);
    }, [text]);

    return (
    <Search
    onBlur={() => {
        results.length > 0 && setResults ([]);
        loading && setLoading (false);
        setText ("");
    }}

    loading = {loading}
    value={text}
    resultRenderer={resultRenderer}
    results={results}
    onSearchChange={handleChange}
    minCharacters={1}
    onResultSelect={(e,data) => addChat (data.result)}
    
    />
    );
}

const resultRenderer =({_id, dpLink, name }) => {
    return (
        <List key = {_id}>
            <List.item>
                <Image src={dpLink} alt="ProfilePic" avatar/>
                <List.Content header={name} as ="a"/>
            </List.item>
        </List>
    );
};



