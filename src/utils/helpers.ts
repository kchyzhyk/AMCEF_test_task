import moment from "moment";

export const dateFormat = (dateString: string) => {
  return moment(dateString).format("MMMM Do YYYY, h:mm a");
};
