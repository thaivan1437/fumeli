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
