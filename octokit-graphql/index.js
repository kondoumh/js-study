const { graphql } = require("@octokit/graphql");

(async () => {
  const graphqlWithAuth = graphql.defaults({
    headers: {
      authorization: `token ${process.env.GH_TOKEN}`,
    },
  });
  const { repository } = await graphqlWithAuth(`
    {
      repository(owner: "kondoumh", name: "sbe") {
        pullRequests(first: 10) {
          nodes {
            title
          }
        }
      }
    }
  `);
  console.log(repository.pullRequests);
})();
