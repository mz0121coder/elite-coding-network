import React, {useState} from "react";
import {Form, Modal, Segement, List, Icon} from "semantic-ui-react";
import Link from "next/link";
import calcTime from "../../utils/calcTime";


function MsgAlertModal({
    socket,
    showNewMsgModal,
    newMsgModal,
    newMsgRecievedAlert,
    user,
}) {
    const [text, setText] = useState("");
    const [loading,setloading] = useState(false);

    const onModalClose = () => showNewMsgModal (false);

    const formSubmit = (e) => {
        e.preventDefault();
        
        if (socket.current) {
            socket.current.emit ("sendMsgAlert", {
                userId: user._id,
                msgSendToUserId: newMsgRecievedAlert.sender,
                msg:text,
            });
        }
    }
}















