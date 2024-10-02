import axios from 'axios';
import fs from 'fs';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const ORG_NAME = process.env.GITHUB_ORG_NAME;

async function getOrganizationMembers(orgName) {
    try {
        let members = [];
        let page = 1;
        let perPage = 30;
        let hasMore = true;
        while (hasMore) {
            const response = await axios.get(`https://api.github.com/orgs/${orgName}/members`, {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`,
                },
                params: {
                    per_page: perPage,
                    page: page,
                },
            });

            const basicMembers = response.data;
            for (const member of basicMembers) {
                const detailedMember = await getUserDetails(member.login);
                members.push(detailedMember);
            }

            if (basicMembers.length < perPage) {
                hasMore = false;
            } else {
                page++;
            }
        }
        return members;
    } catch (error) {
        console.error('Error fetching organization members:', error);
        return [];
    }
}

async function getUserDetails(username) {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error(`Error fetching details for user ${username}:`, error);
        return null;
    }
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
await saveMembersToFile(members, 'members.json');
