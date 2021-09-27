import fetch from "node-fetch";

(async() => {
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/todos/1',
    {
      headers: {
        cookie: 'awsome cookie'
      }
    }
  );
  if (res.ok) {
    const data = await res.json();
    console.log(data);
  } else {
    const errorBody = await res.text();
    console.error(`Error body: ${errorBody}`);
  }
})();
