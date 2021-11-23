import { Segment, TransitionWindow, Icon, Feed} from "semantic-ui-react";
import newMsgSound from "../../utils/newMsgSound";
import { useRouter } from "next/router";
import calcTime from "../../utils/calcTime";
import MsgAlertModal from "./MsgAlertModal";

function MsgAlertModal ({
    socket,
    showNewMsgModal,
    newMsgModal,
    newMsgRecievedAlert,
    user,

})  {
    const [text, setText] = useState ("");
    const [loading, setLoading] =useState (false);

    const onModalClose = ()=> showNewMsgModal (false);

    const formSumbit = (e) => {
        e.preventDefault ();

        if (socket.current) {
            socket.current.emit("sendMsgFromAlert", {
                userId: user._id,
                msgSendToUserId: newMsgRecievedAlert.sender,
                msg: text,
            });

            socket.current.on("msgSentFromAlert", () =>{
                showNewMsgModal(false);
            });
        }
    };

    return (
        <> 
        <Modal
        size = "small"
        open= {newMsgModal}
        onClose={onModalClose}
        closeIcon
        closeOnDimmerClick
        >
            <Modal.Header
            content = {`New Message from $newMsgReceivedAlert.senderName}`}
            />

            <Modal.Content>
                <div className="bubbleWrapper">
                    <div className="inlineContainer">
                        <img
                        className="inlineIcon">
                            src={newMsgReceivedAlert.senderProfilePicture}
                            />
                </div>
                
                <div className="otherBubble other">{newMsgReceivedAlert.msg}</div>
                <span className="other"> {calcTime(newMsgReceivedAlert.date)}</span>
                </div>

                <div style= {{ position: "sticky", bottom: "0px"}}>
                    <Segment secondary color="teal" attached="bottom">
                        <Form reply onSubmit={formSubmit}>
                            <Form.Input
                            size="large"
                            placeholder="Send New Message"
                            value = {text}
                            onChange = { (e) => setText (e.target.value)}
                            action={{
                                color: "blue",
                                icon: "telegram plane",
                                disabled: text ==="",
                                loading:loading,
                            }}
                            />
                            </Form>
                            </Segment>
                                </div>

                                <br/>

                                <Instructions username={user.username} />
                                </div>
            </Modal.Content>
            <Modal>
                </>
                );
}

const Instructions = ({ username }) => (
    <List>
        <List.Item>
            <Icon name="help" />
            <List.Content>
                <List.Header>
                    If you do not like this popup to appear when you recieve a new message:

                </List.Header>
            </List.Content>
        </List.Item>

        <List.Item>
            <Icon name="hand point right"/>
            <List.content>
                You can disable it by going to <Link href={`/username}`}>
                    <a>Account</a>
                </Link>
                Page and clicking on Setting Tab.
                </List.Content>
        </List.Item>

        <List.Item>
            <Icon name="hand point right"/>
            Just toggle the setting to disable/enable the Message Popup to appear.
        </List.Item>
    </List>
);

export default MsgAlertModal;
