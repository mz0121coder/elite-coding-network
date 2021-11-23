import React from "react";
import { Divider, Feed } from "semantic-ui-react";
import calcTime from "../../utils/calcTime";

function CommentAlert({ notification }) {
  return (
    <>
      <Feed.Event>
        <Feed.Label image={notification.user.dpLink} />
        <Feed.Content>
          <Feed.Summary>
            <>
              <Feed.User as="a" href={`/${notification.user.username}`}>
                {notification.user.name}
              </Feed.User>{" "}
              commented on your{" "}
              <a href={`/post/${notification.post._id}`}>post.</a>
              <Feed.Date>{calcTime(notification.date)}</Feed.Date>
            </>
          </Feed.Summary>

          {notification.post.picUrl && (
            <Feed.Extra images>
              <a href={`/post/${notification.post._id}`}>
                <img src={notification.post.picUrl} />
              </a>
            </Feed.Extra>
          )}
          <Feed.Extra text>
            <strong>{notification.text}</strong>
          </Feed.Extra>
        </Feed.Content>
      </Feed.Event>
      <Divider />
    </>
  );
}

export default CommentAlert;
