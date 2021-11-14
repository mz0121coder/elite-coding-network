import moment from "moment";
import Moment from "react-moment";

const calcTime = (createdAt) => {
  const today = moment(Date.now());
  const datePosted = moment(createdAt);
  const timeDiffHrs = today.diff(datePosted, "hours");

  if (timeDiffHrs < 24) {
    return (
      <>
        Today <Moment format="hh:mm A">{createdAt}</Moment>
      </>
    );
  } else if (timeDiffHrs > 24 && timeDiffHrs < 36) {
    return (
      <>
        Yesterday <Moment format="hh:mm A">{createdAt}</Moment>
      </>
    );
  } else if (timeDiffHrs > 36) {
    return <Moment format="DD/MM/YYYY hh:mm A">{createdAt}</Moment>;
  }
};

export default calcTime;