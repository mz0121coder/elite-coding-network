import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import mainUrl from "../utils/mainUrl";
import AddPost from "../components/Post/AddPost";
import CardForPosts from "../components/Post/CardForPosts";
import { Segment } from "semantic-ui-react";
import { parseCookies } from "nookies";
import { NoPosts } from "../components/Layout/NoData";
import { PostDeleteToastr } from "../components/Layout/Toastr";
import InfiniteScroll from "react-infinite-scroll-component";
import { phPosts, EndMsg } from "../components/Layout/PlaceHolders";
import cookie from "js-cookie";
import getUserInfo from "../utils/getUserInfo";
import MsgAlertModal from "../components/Home/MsgAlertModal";
import newMsgSound from "../utils/newMsgSound";
import AlertWindows from "../components/Home/AlertWindows";

function Index({ user, postsData, errorLoading }) {
  const [posts, setPosts] = useState(postsData || []);
  const [showToastr, setShowToastr] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [pageNumber, setPageNumber] = useState(2);

  const socket = useRef();

  const [newMsgReceivedAlert, setNewMsgReceived] = useState(null);
  const [newMsgModal, showNewMsgModal] = useState(false);

  const [newAlert, setNewNotification] = useState(null);
  const [alertPopup, showAlertPopup] = useState(false);

  useEffect(() => {
    if (!socket.current) {
      socket.current = io(mainUrl);
    }

    if (socket.current) {
      socket.current.emit("join", { userId: user._id });

      socket.current.on("newMsgReceived", async ({ newMsg }) => {
        const { name, dpLink } = await getUserInfo(newMsg.sender);

        if (user.newMessageAlert) {
          setNewMsgReceived({
            ...newMsg,
            senderName: name,
            senderProfilePic: dpLink,
          });
          showNewMsgModal(true);
        }
        newMsgSound(name);
      });
    }

    document.title = `Welcome, ${user.name.split(" ")[0]}`;
  }, []);

  useEffect(() => {
    showToastr && setTimeout(() => setShowToastr(false), 3000);
  }, [showToastr]);

  const fetchDataOnScroll = async () => {
    try {
      const res = await axios.get(`${mainUrl}/api/posts`, {
        headers: { Authorization: cookie.get("token") },
        params: { pageNumber },
      });

      if (res.data.length === 0) setHasMore(false);

      setPosts((prev) => [...prev, ...res.data]);
      setPageNumber((prev) => prev + 1);
    } catch (error) {
      alert("Error fetching Posts");
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on(
        "newNotificationReceived",
        ({ name, dpLink, username, postId }) => {
          setNewNotification({ name, dpLink, username, postId });

          showAlertPopup(true);
        }
      );
    }
  }, []);

  return (
    <>
      {alertPopup && newAlert !== null && (
        <AlertWindows
          newAlert={newAlert}
          alertPopup={alertPopup}
          showAlertPopup={showAlertPopup}
        />
      )}

      {showToastr && <PostDeleteToastr />}

      {newMsgModal && newMsgReceivedAlert !== null && (
        <MsgAlertModal
          socket={socket}
          showNewMsgModal={showNewMsgModal}
          newMsgModal={newMsgModal}
          newMsgReceivedAlert={newMsgReceivedAlert}
          user={user}
        />
      )}

      <Segment>
        <AddPost user={user} setPosts={setPosts} />

        {posts.length === 0 || errorLoading ? (
          <NoPosts />
        ) : (
          <InfiniteScroll
            hasMore={hasMore}
            next={fetchDataOnScroll}
            loader={<phPosts />}
            EndMsg={<EndMsg />}
            dataLength={posts.length}
          >
            {posts.map((post) => (
              <CardForPosts
                socket={socket}
                key={post._id}
                post={post}
                user={user}
                setPosts={setPosts}
                setShowToastr={setShowToastr}
              />
            ))}
          </InfiniteScroll>
        )}
      </Segment>
    </>
  );
}
