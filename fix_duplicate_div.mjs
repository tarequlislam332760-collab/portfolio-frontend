import fs from "fs";

const blogPath = "src/pages/Blog.jsx";
let blog = fs.readFileSync(blogPath, "utf8");

const before = blog;

// Remove the duplicate `<div key={p._id}` line that the previous script accidentally created
blog = blog.replace(
  /<div key=\{p\._id\}\s*\n\s*onClick=\{\(\) => setSelectedPost\(p\)\}\s*\n\s*<div key=\{p\._id\}\s*\n/,
  `<div key={p._id}\n                  onClick={() => navigate('blog/' + p._id)}\n`
);

if (blog === before) {
  console.log("⚠️  Pattern match হয়নি, manual check প্রয়োজন।");
} else {
  fs.writeFileSync(blogPath, blog, "utf8");
  console.log("✅ Duplicate <div> fix হয়েছে এবং onClick এখন navigate('blog/' + p._id) করে।");
}
