// Sets each blog post's cover to /Images/blog/<slug>.jpg when that file exists and the post has
// no cover yet (covers chosen in the admin panel are never overwritten).
// Usage: npm run blog:covers   (after node scripts/build-blog-covers.mjs)
import { existsSync } from "node:fs";
import mongoose from "mongoose";

const { MONGODB_URI } = process.env;
if (!MONGODB_URI) {
  console.error("Set MONGODB_URI in .env.local first.");
  process.exit(1);
}

await mongoose.connect(MONGODB_URI);
const posts = mongoose.connection.db.collection("posts");

let updated = 0;
for (const post of await posts.find({}, { projection: { slug: 1, coverImage: 1 } }).toArray()) {
  const path = `/Images/blog/${post.slug}.jpg`;
  if (post.coverImage) {
    console.log(`Kept existing cover: ${post.slug}`);
  } else if (!existsSync(`public${path}`)) {
    console.log(`No cover file for: ${post.slug}`);
  } else {
    await posts.updateOne({ _id: post._id }, { $set: { coverImage: path, updatedAt: new Date() } });
    console.log(`Cover set: ${post.slug}`);
    updated++;
  }
}

console.log(`Done. ${updated} cover(s) set.`);
await mongoose.disconnect();
