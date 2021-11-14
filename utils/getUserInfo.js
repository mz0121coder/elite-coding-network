import axios from "axios";
import mainUrl from "./mainUrl";
import cookie from "js-cookie";

const getUserInfo = async (userToFindId) => {
  try {
    const res = await axios.get(`${mainUrl}/api/chats/user/${userToFindId}`, {
      headers: { Authorization: cookie.get("token") },
    });

    return { name: res.data.name, dpLink: res.data.dpLink };
  } catch (error) {
    console.error(error);
  }
};

export default getUserInfo;