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
  const data = await res.json();
  console.log(data);
})();
