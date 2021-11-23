import React, { useState } from "react";
import { Icon, Popup } from "semantic-ui-react";
import calcTime from "../../utils/calcTime";

function Message({ message, user, deleteMsg, bannerPic, divRef }) {
  const [deleteIcon, showDeleteIcon] = useState(false);

  const ifSending = message.sender === user._id;

  return (
    <div className="bubbleWrapper" ref={divRef}>
      <div
        className={ifSending ? "inlineContainer own" : "inlineContainer"}
        onClick={() => ifSending && showDeleteIcon(!deleteIcon)}
      >
        <img className="inlineIcon" src={ifSending ? user.dpLink : bannerPic} />

        <div className={ifSending ? "ownBubble own" : "otherBubble other"}>
          {message.msg}
        </div>

        {deleteIcon && (
          <Popup
            trigger={
              <Icon
                name="trash"
                color="red"
                style={{ cursor: "pointer" }}
                onClick={() => deleteMsg(message._id)}
              />
            }
            content="This will only delete the message from your inbox!"
            position="top right"
          />
        )}
      </div>

      <span className={ifSending ? "own" : "other"}>
        {calcTime(message.date)}
      </span>
    </div>
  );
}

export default Message;
