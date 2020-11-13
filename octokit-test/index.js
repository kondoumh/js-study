const { Octokit} = require("@octokit/rest");

const octokit = new Octokit({
  auth: "your_access_token",
  baseUrl: "https://api.github.com",
});

(async () => {
  const content = await octokit.repos.getContent({
    owner: "kondoumh",
    repo: "mtwe",
    path: "README.md"
  });
  const data = new Buffer.from(content.data.content, content.data.encoding).toString();
  console.log(data);
})();

