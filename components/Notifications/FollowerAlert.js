import React, { useState } from "react";
import { Feed, Button, Divider } from "semantic-ui-react";
import calcTime from "../../utils/calcTime";
import { follow, unfollow } from "../../utils/profileMethods";

function FollowerAlert({
  notification,
  loggedUserFollowers,
  setUserFollowers,
}) {
  const [disabled, setDisabled] = useState(false);

  const isFollowingUser =
    loggedUserFollowers.following.length > 0 &&
    loggedUserFollowers.following.filter(
      (following) => following.user === notification.user._id
    ).length > 0;

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
              started following you.
              <Feed.Date>{calcTime(notification.date)}</Feed.Date>
            </>
          </Feed.Summary>

          <div style={{ position: "absolute", right: "5px" }}>
            <Button
              size="small"
              compact
              icon={isFollowingUser ? "check circle" : "add user"}
              color={isFollowingUser ? "linkify" : "connectdevelop"}
              disabled={disabled}
              onClick={async () => {
                setDisabled(true);

                isFollowingUser
                  ? await unfollow(notification.user._id, setUserFollowers)
                  : await follow(notification.user._id, setUserFollowers);

                setDisabled(false);
              }}
            />
          </div>
        </Feed.Content>
      </Feed.Event>
      <Divider />
    </>
  );
}

export default FollowerAlert;
