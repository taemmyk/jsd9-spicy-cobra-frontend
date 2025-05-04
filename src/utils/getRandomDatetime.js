export function generateRandomDateAndTime() {
  // Generate a random date
  const startYear = new Date().getFullYear() - 3;
  const endYear = new Date().getFullYear();
  const randomYear =
    Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
  const randomMonth = Math.floor(Math.random() * 12);
  const randomDay = Math.floor(Math.random() * 28) + 1;

  // Generate random time components
  const randomHours = Math.floor(Math.random() * 24);
  const randomMinutes = Math.floor(Math.random() * 60);
  const randomSeconds = Math.floor(Math.random() * 60);

  const randomDate = new Date(
    randomYear,
    randomMonth,
    randomDay,
    randomHours,
    randomMinutes,
    randomSeconds
  );
  return randomDate;
}

export function formatDateWithTime(date) {
  const day = date.getDate();
  const monthNames = [
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
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
}

export function generateDatetimeTransaction(datetimeObject) {
  const delayInSeconds = Math.random() * (3 * 60);
  const newDateTime = new Date(
    datetimeObject.getTime() + delayInSeconds * 1000
  );
  return newDateTime;
}
