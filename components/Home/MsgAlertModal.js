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
    const [loading, setloading] = useState(false);

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
                    src = {newMsgRecievedAlert.senderProfilePicture}
                    />
                </div> 

                
                <div className="otherBubble other">{newMsgReceivedAlert.msg}</div>

                <span className="other">{calcTime(newMsgReceivedAlert.date)}</span>
          </div>
   
                <div style={{ position: "sticky", bottom: "0px" }}>
                <Segment secondary color="teal" attached="bottom">
                  <Form reply onSubmit={formSubmit}>
                    <Form.Input
                      size="large"
                      placeholder="Send New Message"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      action={{
                        color: "blue",
                        icon: "telegram plane",
                        disabled: text === "",
                        loading: loading,
                      }}
                    />
                  </Form>
                </Segment>
              </div>
    
              <div style={{ marginTop: "5px" }}>
                <Link href={`/messages?message=${newMsgReceivedAlert.sender}`}>
                  <a>View All Messages</a>
                </Link>
    
                <br />
    
                <Instructions username={user.username} />
              </div>
            </Modal.Content>
          </Modal>
        </>
      );
    }

    const Instructions =({ Username}) = (
      <List>
        <List.Item>
          <Icon name="help" />
          <List.Content>
            <List.Header>
              If you do not like this popup tp appear when you recieve a new message:
            </List.Header>
          </List.Content>
        </List.Item>

        <List.Item>
          <Icon name = "hand point right" />
          <List.Content>You can disable it by going to <Link href={`${username}`}>
            <a> Account </a>
            </Link>
            Page and clicking on Setting Tab.
            </List.Content> 
        </List.Item>

        <List.Item>
          <Icon name ="hand point right" />
          Inside the menu, there is a setting named...............
        </List.Item>

        <List.Item>
          <Icon name ="hand point right" />
          Just toggle ddddddddddddddddddddddddddddddddddddddddd.
        </List.Item>
        

      </List>

    );

    export default MsgAlertModal;
    













s
