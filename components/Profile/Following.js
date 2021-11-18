import React, { useState, useEffect } from "react";
import { Button, Image, List } from "semantic-ui-react";
import SpinEffect from "../Layout/SpinEffect";
import { NoFollowInfo } from "../Layout/NoData";
import { follow, unfollow } from "../../utils/profileMethods";
import axios from "axios";
import mainUrl from "../../utils/mainUrl";
import cookie from "js-cookie";

const Following = ({
  user,
  loggedUserFollowers,
  setUserFollowers,
  profileId,
}) => {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadFollowInfo, setLoadFollowInfo] = useState(false);

  useEffect(() => {
    const getFollowing = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${mainUrl}/api/profile/following/${profileId}`,
          {
            headers: { Authorization: cookie.get("token") },
          }
        );

        setFollowing(res.data);
      } catch (error) {
        alert("Error Loading Followers");
      }
      setLoading(false);
    };

    getFollowing();
}, []);

return (
  <>
    {loading ? (
      <SpinEffect />
    ) : following.length > 0 ? (
      following.map((followingThisUser) => {
        /*  */

        const isFollowingUser =
          loggedUserFollowers.following.length > 0 &&
          loggedUserFollowers.following.filter(
            (following) => following.user === followingThisUser.user._id
          ).length > 0;

        return (
          <List
            key={followingThisUser.user._id}
            divided
            verticalAlign="middle"
          >
            <List.Item>
              <List.Content floated="right">
                {followingThisUser.user._id !== user._id && (
                  <Button
                    color={isFollowingUser ? "linkify" : "connectdevelop"}
                    icon={isFollowingUser ? "check" : "add user"}
                    content={isFollowingUser ? "Following" : "Follow"}
                    disabled={loadFollowInfo}
                    onClick={() => {
                      setLoadFollowInfo(true);

                      isFollowingUser
                        ? unfollow(
                            followingThisUser.user._id,
                            setUserFollowers
                          )
                        : follow(
                            followingThisUser.user._id,
                            setUserFollowers
                          );

                      setLoadFollowInfo(false);
                    }}
                  />
                )}
              </List.Content>
              <Image avatar src={followingThisUser.user.dpLink} />
              <List.Content
                as="a"
                href={`/${followingThisUser.user.username}`}
              >
                {followingThisUser.user.name}
              </List.Content>
            </List.Item>
          </List>
        );
      })
    ) : (
      <NoFollowInfo followingTab={true} />
    )}
  </>
);
};

export default Following;

