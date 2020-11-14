const { Octokit} = require("@octokit/rest");

(async () => {
  const octokit = new Octokit();
  const content = await octokit.repos.getContent({
    owner: "kondoumh",
    repo: "mtwe",
    path: "README.md"
  });
  const data = new Buffer.from(content.data.content, content.data.encoding).toString();
  console.log(data);
})();
