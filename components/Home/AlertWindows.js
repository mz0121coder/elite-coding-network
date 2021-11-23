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

    

        
            })
        }
    }
}