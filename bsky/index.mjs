import { BskyAgent } from "@atproto/api";
import dotenv from "dotenv";

dotenv.config();
const PASSWORD = process.env.BSKY_PASSWORD;

const agent = new BskyAgent({
  service: "https://bsky.social"
});

const res = await agent.login({
  identifier: "mamezoudev.bsky.social",
  password: PASSWORD
});

const post = await agent.post({
  text: "投稿テスト",
  createdAt: new Date().toISOString()
});

console.log(post.uri);
