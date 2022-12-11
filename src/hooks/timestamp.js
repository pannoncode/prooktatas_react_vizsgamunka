const TimeStamp = () => {
  const currentDate = new Date();
  const timeStamp =
    currentDate.getFullYear() +
    "." +
    (currentDate.getMonth() + 1) +
    "." +
    currentDate.getDate() +
    " " +
    currentDate.getHours() +
    ":" +
    currentDate.getMinutes() +
    ":" +
    currentDate.getSeconds();

  return timeStamp;
};

export default TimeStamp;
