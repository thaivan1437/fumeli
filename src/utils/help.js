export function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}
export function convertObjectToQueryString(obj) {
  let queryString = "";
  for (let key in obj) {
    queryString += `${key}=${obj[key]}&`;
  }
  return queryString.slice(0, -1);
}

export function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function dateOfWeek() {
  const today = new Date();
  const firstDay = getFirstDayOfWeek(today);
  const lastDay = getLastDate(firstDay);
  const daysOfWeek = [];
  for (let index = firstDay; index <= lastDay; index = addDays(index,1)) {
    daysOfWeek.push(index);
  }
  return daysOfWeek;
}

export function getLastDate(firstDay) {
  const lastDay = new Date(firstDay);
  return lastDay.setDate(lastDay.getDate() + 6);
}

export function getFirstDayOfWeek(d) {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
}