const { Octokit } = require("@octokit/rest");
const jq = require("node-jq");

//getContent();
getLargeContent();

async function getContent() {
  const octokit = new Octokit();
  const content = await octokit.repos.getContent({
    owner: "kondoumh",
    repo: "mtwe",
    path: "README.md"
  });
  const data = new Buffer.from(content.data.content, content.data.encoding).toString();
  console.log(data);
}

async function getLargeContent() {
  const octokit = new Octokit();
  const files = await octokit.repos.getContent({
    owner: "kondoumh",
    repo: "sbe",
    path: "src"
  });
  const data = await jq.run('.data | map(select(.name == "renderer.js")) | .[0].sha', files, {input: 'json'});
  const sha = data.replace(/['"]+/g, '');
  console.log(sha);
  const blob = await octokit.git.getBlob({
    owner: "kondoumh",
    repo: "sbe",
    file_sha: sha
  });
  const content = new Buffer.from(blob.data.content, blob.data.encoding).toString();
  console.log(content);
}
