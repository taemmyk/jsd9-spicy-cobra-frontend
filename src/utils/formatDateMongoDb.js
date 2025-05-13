export const formatDateDDMMYYYY = (dateString) => {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const formatDateDDMMMMYYYY = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const year = date.getFullYear();
  const monthIndex = date.getMonth();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[monthIndex];

  // let dayWithSuffix = day;
  // if (day === 1 || day === 21 || day === 31) {
  //   dayWithSuffix = `${day}st`;
  // } else if (day === 2 || day === 22) {
  //   dayWithSuffix = `${day}nd`;
  // } else if (day === 3 || day === 23) {
  //   dayWithSuffix = `${day}rd`;
  // } else {
  //   dayWithSuffix = `${day}th`;
  // }

  return `${day} ${month} ${year}`;
};
