import React, { useState, useEffect } from "react";
import { Button, Image, List } from "semantic-ui-react";
import SpinEffect from "../Layout/SpinEffect";
import { NoFollowInfo } from "../Layout/NoData";
import { follow, unfollow } from "../../utils/profileMethods";
import axios from "axios";
import mainUrl from "../../utils/mainUrl";
import cookie from "js-cookie";

const Followers = ({
    user,
    loggedUserFollowers,
    setUserFollowers,
    profileId,
  }) => {
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadFollowInfo, setLoadFollowInfo] = useState(false);
  
    useEffect(() => {
      const getFollowers = async () => {
        setLoading(true);
        try {
          const res = await axios.get(
            `${mainUrl}/api/profile/followers/${profileId}`,
            {
              headers: { Authorization: cookie.get("token") },
            }
          );
  
          setFollowers(res.data);
        } catch (error) {
          alert("Error Loading Followers");
        }
        setLoading(false);
      };
  
      getFollowers();
    }, []);

    return (
        <>
          {loading ? (
            <SpinEffect />
          ) : followers.length > 0 ? (
            followers.map((profileFollower) => {
              /*  */
    
              const isFollowingUser =
                loggedUserFollowers.following.length > 0 &&
                loggedUserFollowers.following.filter(
                  (following) => following.user === profileFollower.user._id
                ).length > 0;
    
              return (
                <List key={profileFollower.user._id} divided verticalAlign="middle">
                  <List.Item>
                    <List.Content floated="right">
                      {profileFollower.user._id !== user._id && (
                        <Button
                          color={isFollowingUser ? "linkify" : "connectdevelop"}
                          icon={isFollowingUser ? "check" : "add user"}
                          content={isFollowingUser ? "Following" : "Follow"}
                          disabled={loadFollowInfo}
                          onClick={() => {
                            setLoadFollowInfo(true);
    
                            isFollowingUser
                              ? unfollow(profileFollower.user._id, setUserFollowers)
                              : follow(profileFollower.user._id, setUserFollowers);
    
                            setLoadFollowInfo(false);
                          }}
                        />
                      )}
                    </List.Content>
                    <Image avatar src={profileFollower.user.dpLink} />
                    <List.Content as="a" href={`/${profileFollower.user.username}`}>
                      {profileFollower.user.name}
                    </List.Content>
                  </List.Item>
                </List>
              );
            })
          ) : (
            <NoFollowInfo followersTab={true} />
          )}
        </>
      );
    };
    
    export default Followers;
    
  