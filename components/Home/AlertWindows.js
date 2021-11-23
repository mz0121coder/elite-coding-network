import { Segment, TransitionWindow, Icon, Feed } from "semantic-ui-react";
import newMsgSound from "../../utils/newMsgSound";
import { useRouter } from "next/router";
import calcTime from "../../utils/calcTime";

function AlertWindows({ newAlert, alertPopup, showAlertPopup }) {
  const router = useRouter();

  const { name, dpLink, username, postId } = newAlert;

  return (
    <TransitionWindow
      transition={{ animation: "fade left", duration: "500" }}
      onClose={() => alertPopup && showAlertPopup(false)}
      onOpen={newMsgSound}
      open={alertPopup}
    >
      <Segment
        style={{ right: "5%", position: "fixed", top: "10%", zIndex: 1000 }}
      >
        <Icon
          name="close"
          size="large"
          style={{ float: "right", cursor: "pointer" }}
          onClick={() => showAlertPopup(false)}
        />

        <Feed>
          <Feed.Event>
            <Feed.Label>
              <img src={dpLink} />
            </Feed.Label>
            <Feed.Content>
              <Feed.Summary>
                <Feed.User onClick={() => router.push(`/${username}`)}>
                  {name}{" "}
                </Feed.User>{" "}
                liked your{" "}
                <a onClick={() => router.push(`/post/${postId}`)}> post</a>
                <Feed.Date>{calcTime(Date.now())}</Feed.Date>
              </Feed.Summary>
            </Feed.Content>
          </Feed.Event>
        </Feed>
      </Segment>
    </TransitionWindow>
  );
}

export default AlertWindows;
