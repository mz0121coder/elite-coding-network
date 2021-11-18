import React, { useState } from "react";
import {
  Segment,
  Image,
  Grid,
  Divider,
  Header,
  Button,
  List,
} from "semantic-ui-react";
import { follow, unfollow } from "../../utils/profileMethods";

function ProfileHeader({
    profile,
    userAccount,
    loggedUserFollowers,
    setUserFollowers,
  }) {
    const [loading, setLoading] = useState(false);
  
    const isFollowingUser =
      loggedUserFollowers.following.length > 0 &&
      loggedUserFollowers.following.filter(
        (following) => following.user === profile.user._id
      ).length > 0;
  
      return (
        <>
          <Segment>
            <Grid stackable>
              <Grid.Column width={11}>
                <Grid.Row>
                  <Header
                    as="h2"
                    content={profile.user.name}
                    style={{ marginBottom: "5px" }}
                  />
                </Grid.Row>
    
                <Grid.Row stretched>
                  {profile.bio}
                  <Divider hidden />
                </Grid.Row>
    
                <Grid.Row>
                  {profile.social ? (
                    <List>
                      <List.Item>
                        <List.Icon name="mail" />
                        <List.Content content={profile.user.email} />
                      </List.Item>
    
                      {profile.social.github && (
                        <List.Item>
                          <List.Icon name="github" color="blue" />
                          <List.Content
                            style={{ color: "blue" }}
                            content={profile.social.github}
                          />
                        </List.Item>
                      )}
    
                      {profile.social.linkify && (
                        <List.Item>
                          <List.Icon name="linkify" color="red" />
                          <List.Content
                            style={{ color: "blue" }}
                            content={profile.social.linkify}
                          />
                        </List.Item>
                      )}
    
                      {profile.social.at && (
                        <List.Item>
                          <List.Icon name="at" color="red" />
                          <List.Content
                            style={{ color: "blue" }}
                            content={profile.social.at}
                          />
                        </List.Item>
                      )}
    
    {profile.social.connectdevelop && (
                    <List.Item>
                      <List.Icon name="connectdevelop" color="blue" />
                      <List.Content
                        style={{ color: "blue" }}
                        content={profile.social.connectdevelop}
                      />
                    </List.Item>
                  )}
                </List>
              ) : (
                <>No Social Media Links </>
              )}
            </Grid.Row>
          </Grid.Column>

          <Grid.Column width={5} stretched style={{ textAlign: "center" }}>
            <Grid.Row>
              <Image size="large" avatar src={profile.user.dpLink} />
            </Grid.Row>
            <br />

            {!userAccount && (
              <Button
                compact
                loading={loading}
                disabled={loading}
                content={isFollowingUser ? "Following" : "Follow"}
                icon={isFollowingUser ? "check circle" : "add user"}
                color={isFollowingUser ? "linkify" : "connectdevelop"}
                onClick={async () => {
                  setLoading(true);
                  isFollowingUser
                    ? await unfollow(profile.user._id, setUserFollowers)
                    : await follow(profile.user._id, setUserFollowers);
                  setLoading(false);
                }}
              />
            )}
          </Grid.Column>
        </Grid>
      </Segment>
    </>
  );
}

export default ProfileHeader;

      