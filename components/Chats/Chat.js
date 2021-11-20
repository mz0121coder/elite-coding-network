import React from "react";
import {Divider, Comment, Icon, List } from "semantic-ui-react";
import {useRouter} from "next/router";
import calcTime from "../..utils/calcTime";

function Chat ({ chat, activeChats, deleteChats }) {
    const router = useRouter();

    const isOnline = 
    activeChats.length > 0 &&
    activeChats.filter((user) => user.userId === chat.msgsWithUser).length > 0;

    return (
    <>
 <List selection>
         <List.Item
         active={router.query.message === chat.msgsWithUser}
         onClick = {() =>
         router.push(`/messages?messages=${chat.msgWithUser}`, undefined, {
             shallow: true,
         })
        }
    >
        <Comment>
            <Comment.Avatar src={chat.dp.Link} />
            <Comment.Content>
                <Comment.Author as="a">
                    {chat.name}{" "}
                    {isOnline && < Icon name= "circle" size= "small" colour="green"/>}
                </Comment.Author>

                <Comment.Metadata>
                    <div>{calcTime(chat.date)}</div>
                    <div
                    style = {{
                        position:"absolute",
                        right: "10px",
                        cursor: "pointer",
                    }}
                </Comment.Metadata>
            </Comment.Content>
            </Comment></List.Item>    

}