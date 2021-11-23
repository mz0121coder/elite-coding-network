import {Message, Button} from "semantic-ui-react";

export const NoPosts = () => (
    <>
    <Message
    info
    icon ="code"
    header ="No posts"
    content="User has not posted anything yet!"
    />
    <Button
    icon="long arrow alternate left"
    content="Go Back"
    as="a"
    href="/"

    />
    </>

);

export const NoFollowInfo = ({followersTab, followingTab}) => (
    <>
    {followersTab && (
        <Message
        icon="user outline"
        info
        content = {`User does not have any follower`}
        />
    )}

{followingTab && (
      <Message
        icon="user outline"
        info
        content={`User does not follow any users`}
      />
    )}
  </>
);


export const NoMsg = () => (
  <Message
    info
    icon="telegram plane"
    header="No messages"
    content="Search users above to message someone"
  />
);

export const NoPosts = () => (
    <Message
      info
      icon="code"
      header="Hey!"
      content="No Posts. Make sure you have followed someone."
    />
  );

  export const NoProfile = () => (
    <Message info icon="code" header="Hey!" content="No Profile Found." />
  );
  
  export const NoNotifications = () => (
    <Message content="No Notifications" icon="code" info />
  );
  
  export const NoPostListed = () => (
    <Message info icon="code" header="Hey!" content="No Post Found." />
  );
  