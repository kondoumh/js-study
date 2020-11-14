const { graphql } = require("@octokit/graphql");

async function query1() {
  const query = `
  {
    repository(owner: "kondoumh", name: "sbe") {
      pullRequests(last: 10) {
        nodes {
          number
          title
        }
      }
    }
  }
  `
  const repo = await request(query);
  console.log(repo.pullRequests);
}

//query1();

async function query2() {
  const query = `
  {
    repository(owner: "kondoumh", name: "sbe") {
      url
      pullRequest(number: 13){
          number
          url
          author {
            avatarUrl
            login
            resourcePath
            url
          }
          commits(last: 10){
            nodes{
              commit{
                commitUrl
                oid
                message
              }
            }
          }
      }
    }
  }
  `
  const repo = await request(query);
  console.log(repo.pullRequest.numer);
  console.log(repo.pullRequest.url);
  console.log(repo.pullRequest.author);
  console.log(repo.pullRequest.commits.nodes);
}

query2();

async function request(query) {
  const graphqlWithAuth = graphql.defaults({
    headers: {
      authorization: `token ${process.env.GH_TOKEN}`,
    },
  });
  const { repository } = await graphqlWithAuth(query);
  return repository;
}

