import axios from "axios";
import mainUrl from "./mainUrl";
import catchErrors from "./catchErrors";
import cookie from "js-cookie";
import Router from "next/router";

const Axios = axios.create({
  mainUrl: `${mainUrl}/api/profile`,
  headers: { Authorization: cookie.get("token") },
});

export const follow = async (followUserId, setUserFollowers) => {
    try {
      await Axios.post(`/follow/${followUserId}`);
  
      setUserFollowers((prev) => ({
        ...prev,
        following: [...prev.following, { user: followUserId }],
      }));
    } catch (error) {
      alert(catchErrors(error));
    }
  };

  export const unfollow = async (unfollowUserId, setUserFollowers) => {
    try {
      await Axios.put(`/unfollow/${unfollowUserId}`);
  
      setUserFollowers((prev) => ({
        ...prev,
        following: prev.following.filter(
          (following) => following.user !== unfollowUserId
        ),
      }));
    } catch (error) {
      alert(catchErrors(error));
    }
  };

  export const profileUpdate = async (profile, setLoading, setError, dpLink) => {
    try {
      const { bio, github, at, connectdevelop, linkify } = profile;
  
      await Axios.post(`/update`, {
        bio,
        github,
        at,
        connectdevelop,
        linkify,
        dpLink,
      });
  
      setLoading(false);
      Router.reload();
    } catch (error) {
      setError(catchErrors(error));
      setLoading(false);
    }
  };

  export const pwUpdate = async (setSuccess, userPasswords) => {
    const { currentPassword, newPassword } = userPasswords;
    try {
      await Axios.post(`/settings/password`, { currentPassword, newPassword });
  
      setSuccess(true);
    } catch (error) {
      alert(catchErrors(error));
    }
  };

  export const toggleMsgAlert = async (
    popupSetting,
    setPopupSetting,
    setSuccess
  ) => {
    try {
      await Axios.post(`/settings/messageAlert`);
  
      setPopupSetting(!popupSetting);
      setSuccess(true);
    } catch (error) {
      alert(catchErrors(error));
    }
  };