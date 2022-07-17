export const dateToLocaleString = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return (
    date.toISOString().split(".")[0].split("T")[0] +
    "T" +
    (hours < 10 ? "0" + hours.toString() : hours.toString()) +
    ":" +
    (minutes < 10 ? "0" + minutes.toString() : minutes.toString()) +
    ":" +
    (seconds < 10 ? "0" + seconds.toString() : seconds.toString())
  );
};

export const dateToDateString = (date) => {
  return date.toISOString().split(".")[0].split("T")[0] + "T00:00:00";
};

export function toISOLocal(date) {
  let offsetMins = date.getTimezoneOffset();
  let d = new Date(date - offsetMins * 6e4);
  let offsetSign = offsetMins > 0 ? "-" : "+";
  offsetMins = Math.abs(offsetMins);
  let offsetHr = String((offsetMins / 60) | 0).padStart(2, "0");
  let offsetMin = String(offsetMins % 60).padStart(2, "0");
  return d.toISOString().replace("Z", `${offsetSign}${offsetHr}:${offsetMin}`);
}
export function toISOLocalWithoutOffset(date) {
  let offsetMins = date.getTimezoneOffset();
  let d = new Date(date - offsetMins * 6e4);
  return d.toISOString().replace("Z", "");
}
