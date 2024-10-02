import { request, gql } from 'graphql-request';
import fs from 'fs';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const ORG_NAME = process.env.GITHUB_ORG_NAME;

const endpoint = 'https://api.github.com/graphql';

const query = gql`
  query($orgName: String!, $cursor: String) {
    organization(login: $orgName) {
      membersWithRole(first: 30, after: $cursor) {
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            login
            name
            url
          }
          role
        }
      }
    }
  }
`;

async function getOrganizationMembers(orgName) {
  let members = [];
  let hasNextPage = true;
  let cursor = null;

  while (hasNextPage) {
    const variables = { orgName, cursor };

    const data = await request(endpoint, query, variables, {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    });

    const { edges, pageInfo } = data.organization.membersWithRole;
    const nodesWithRole = edges.map((edge) => ({
      ...edge.node,
      role: edge.role,
    }));

    members = members.concat(nodesWithRole);
    cursor = pageInfo.endCursor;
    hasNextPage = pageInfo.hasNextPage;
  }

  return members;
}

async function saveMembersToFile(members, filePath) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(members, null, 2));
    console.log(`Members saved to ${filePath}`);
  } catch (error) {
    console.error('Error saving members to file:', error);
  }
}

const members = await getOrganizationMembers(ORG_NAME);
await saveMembersToFile(members, "members.json");
