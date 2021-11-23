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

            socket.current.on ("msgSentFromAlert", () => {
                showNewMsgModal (false);
            });
        }
    };

    return (
        <>
          <Modal
            size="small"
            open={newMsgModal}
            onClose={onModalClose}
            closeIcon
            closeOnDimmerClick
          >
            <ModalHeader
            content={`New Message from ${newMsgRecievedAlert.sendName}`}
            />

            <Modal.Content>
                <div className="bubbleWrapper">
                <div className="inlineContainer">
                    <img 
                    className ="inlineIcon"
                    src = {newMsgRecievedAlert.senderProfilePicture
                    />
                </div> 
   

    )
}















