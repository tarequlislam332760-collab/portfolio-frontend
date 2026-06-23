import fs from "fs";

const filePath = "src/pages/Home.jsx";
let content = fs.readFileSync(filePath, "utf8");

// 1. Add import for TestimonialsSection if not present
if (!content.includes('import TestimonialsSection')) {
  // Insert after the first import line
  content = content.replace(
    /(import .+ from ['"]framer-motion['"];?\n)/,
    `$1import TestimonialsSection from '../components/TestimonialsSection';\n`
  );
  // fallback: if framer-motion import line not found, add after first import
  if (!content.includes('import TestimonialsSection')) {
    content = content.replace(
      /^(import .+\n)/,
      `$1import TestimonialsSection from '../components/TestimonialsSection';\n`
    );
  }
}

// 2. Replace the entire static TESTIMONIALS section block with the dynamic component
const sectionRegex = /\{\/\*\s*══+\s*TESTIMONIALS\s*══+\s*\*\/\}[\s\S]*?<\/section>/;

if (sectionRegex.test(content)) {
  content = content.replace(sectionRegex, `<TestimonialsSection navigate={navigate} />`);
  fs.writeFileSync(filePath, content, "utf8");
  console.log("✅ Home.jsx আপডেট হয়েছে — static TESTIMONIALS section সরিয়ে dynamic TestimonialsSection বসানো হয়েছে।");
} else {
  console.log("⚠️  Testimonials section regex match হয়নি — manual check প্রয়োজন।");
  console.log("সম্ভবত section এর comment marker ভিন্ন। নিচের command চালিয়ে exact line number বলুন:");
  console.log("grep -n 'TESTIMONIALS' src/pages/Home.jsx");
}
