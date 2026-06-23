import fs from "fs";

const blogPath = "src/pages/Blog.jsx";
let blog = fs.readFileSync(blogPath, "utf8");
const before = blog;

// 1. Remove the entire FALLBACK array (multi-line, from `const FALLBACK = [` to its closing `];`)
blog = blog.replace(
  /const FALLBACK = \[[\s\S]*?\n\];\n\n/,
  ""
);

// 2. Replace displayBlogs logic to use ONLY real blogs (no fallback)
blog = blog.replace(
  /const displayBlogs = blogs\.length > 0 \? blogs : FALLBACK;/,
  "const displayBlogs = blogs;"
);

if (blog !== before) {
  fs.writeFileSync(blogPath, blog, "utf8");
  console.log("✅ FALLBACK static data সরানো হয়েছে — এখন শুধু real database থেকে blog আসবে।");
} else {
  console.log("⚠️  Pattern match হয়নি, manual check প্রয়োজন।");
}
