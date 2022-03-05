// hardcoded url for testing purposes...
const url = `${process.env.REACT_APP_API_ENDPOINT}/rooms?roomIds=${process.env.REACT_APP_ROOM_ID1},${process.env.REACT_APP_ROOM_ID2}`;

export function fetchDashboard() {
  return fetch(url, {
    method: "GET",
    // @ts-ignore
    headers: {
      "Content-Type": "application/json",
      "x-functions-key": process.env.REACT_APP_API_KEY,
    },
  }).then((r) => {
    return r.json();
  });
}
