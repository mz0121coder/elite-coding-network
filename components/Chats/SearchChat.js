import React, {useState, UseEffect, useEffect} from "react";
import {List, Image, Search } from "semantic-ui-react";
import axios from "axios";
import cookie from "js-cookie";
import {useRouter} from "next/router";
import mainUrl from "../..utils.mainUrl";

function SearchChat ({chats, setChats}) {
    const [text, setText] = useState ("");
    const [loading, setLoading] = useState (false);
    const [results, setResults] = useState ([]);
    
    const Router = useRouter ();

    const handleChange =async (e) => {
        const{ value } = e.target;
        setText (value);
        if (value.length === 0 ) return ;

        setLoading (true);

    try {
        cancel && cancel ();
        const CancelToken = axios.get(`${mainUrl}/api/search$(value}`, {
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
}

    }
     }
    }
}

useEffect (() => {
    <Search
    onBlur={()} => {
        results.length > 0 && setResults ([]);
        loading && setLoading (false);
        setText ("");
    }}
    
    }
}