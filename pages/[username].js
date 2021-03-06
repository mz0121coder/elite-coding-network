import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { useRouter } from "next/router";
import axios from "axios";
import mainUrl from "../utils/mainUrl";
import { parseCookies } from "nookies";
import { Grid } from "semantic-ui-react";
import { NoPosts, NoProfile } from "../components/Layout/NoData";
import CardForPosts from "../components/Post/CardForPosts";
import cookie from "js-cookie";
import { phPosts } from "../components/Layout/PlaceHolders";
import ProfileTabs from "../components/Profile/ProfileTabs";
import ProfileHeader from "../components/Profile/ProfileHeader";
import Followers from "../components/Profile/Followers";
import Following from "../components/Profile/Following";
import UpdateProfile from "../components/Profile/UpdateProfile";
import Settings from "../components/Profile/Settings";
import { PostDeleteToastr } from "../components/Layout/Toastr";

function ProfilePage({
  errorLoading,
  profile,
  numberOfFollowers,
  numberFollowing,
  user,
  userFollowers,
}) {
  const router = useRouter();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showToastr, setShowToastr] = useState(false);

  const [activeComponent, setActiveComponent] = useState("profile");
  const handleComponent = (clickedTab) => setActiveComponent(clickedTab);

  const [loggedUserFollowers, setUserFollowers] = useState(userFollowers);

  const userAccount = profile.user._id === user._id;

  if (errorLoading) return <NoProfile />;

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);

      try {
        const { username } = router.query;
        const res = await axios.get(
          `${mainUrl}/api/profile/posts/${username}`,
          {
            headers: { Authorization: cookie.get("token") },
          }
        );

        setPosts(res.data);
      } catch (error) {
        alert("Error Loading Posts");
      }

      setLoading(false);
    };
    getPosts();
  }, [router.query.username]);

  useEffect(() => {
    showToastr && setTimeout(() => setShowToastr(false), 4000);
  }, [showToastr]);

  const socket = useRef();

  useEffect(() => {
    if (!socket.current) {
      socket.current = io(mainUrl);
    }

    if (socket.current) {
      socket.current.emit("join", { userId: user._id });
    }
  }, []);

  return (
    <>
      {showToastr && <PostDeleteToastr />}

      <Grid stackable>
        <Grid.Row>
          <Grid.Column>
            <ProfileTabs
              activeComponent={activeComponent}
              handleComponent={handleComponent}
              numberOfFollowers={numberOfFollowers}
              numberFollowing={numberFollowing}
              userAccount={userAccount}
              loggedUserFollowers={loggedUserFollowers}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            {activeComponent === "profile" && (
              <>
                <ProfileHeader
                  profile={profile}
                  userAccount={userAccount}
                  loggedUserFollowers={loggedUserFollowers}
                  setUserFollowers={setUserFollowers}
                />

                {loading ? (
                  <phPosts />
                ) : posts.length > 0 ? (
                  posts.map((post) => (
                    <CardForPosts
                      socket={socket}
                      key={post._id}
                      post={post}
                      user={user}
                      setPosts={setPosts}
                      setShowToastr={setShowToastr}
                    />
                  ))
                ) : (
                  <NoPosts />
                )}
              </>
            )}

            {activeComponent === "followers" && (
              <Followers
                user={user}
                loggedUserFollowers={loggedUserFollowers}
                setUserFollowers={setUserFollowers}
                profileId={profile.user._id}
              />
            )}

            {activeComponent === "following" && (
              <Following
                user={user}
                loggedUserFollowers={loggedUserFollowers}
                setUserFollowers={setUserFollowers}
                profileId={profile.user._id}
              />
            )}

            {activeComponent === "updateProfile" && (
              <UpdateProfile Profile={profile} />
            )}

            {activeComponent === "settings" && (
              <Settings newMessageAlert={user.newMessageAlert} />
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}

ProfilePage.getInitialProps = async (ctx) => {
  try {
    const { username } = ctx.query;
    const { token } = parseCookies(ctx);

    const res = await axios.get(`${mainUrl}/api/profile/${username}`, {
      headers: { Authorization: token },
    });

    const { profile, numberOfFollowers, numberFollowing } = res.data;

    return { profile, numberOfFollowers, numberFollowing };
  } catch (error) {
    return { errorLoading: true };
  }
};

export default ProfilePage;
