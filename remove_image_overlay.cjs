const fs = require('fs');
const path = 'src/pages/About.jsx';

if (fs.existsSync(path)) {
    let code = fs.readFileSync(path, 'utf8');

    // ছবির ওপরের পুরাতন সোশ্যাল ওভারলে ব্লকটিকে টার্গেট করে রিমুভ করার লজিক
    const oldOverlay = `{/* Social icons overlay */}
                <div style={{ position:"absolute", bottom:14, left:12, right:12, display:"flex", gap:7, justifyContent:"center" }}>
                  <SocialLink type="facebook" size={34} url={profile.facebookUrl || profile.facebook || "#"} />
                  <SocialLink type="instagram" size={34} url={profile.instagramUrl || profile.instagram || "#"} />
                  <SocialLink type="linkedin" size={34} url={profile.linkedinUrl || profile.linkedin || "#"} />
                  <SocialLink type="github" size={34} url={profile.githubUrl || profile.github || "#"} />
                </div>`;

    // কোডে থাকা স্পেস ও ফরম্যাটিং ভেদাভেদ দূর করে নিখুঁতভাবে রিমুভ করার জন্য রেগুলার এক্সপ্রেশন
    const overlayRegex = /\{\/\*\s*Social icons overlay\s*\*\/\}\s*<div[^>]*bottom:14[^>]*>[\s\S]*?<\/div>/;

    if (code.match(overlayRegex)) {
        let updatedCode = code.replace(overlayRegex, '');
        fs.writeFileSync(path, updatedCode, 'utf8');
        console.log('✅ Success: ছবির ওপরের এক্সট্রা আইকনগুলো সফলভাবে মুছে গেছে!');
    } else {
        console.log('💡 Note: প্যাটার্ন ম্যাচ করেনি, অল্টারনেটিভ ক্লিনআপ চালানো হচ্ছে...');
        // ফলব্যাক: সরাসরি কমেন্ট ও তার ভেতরের ৩৪ সাইজের SocialLink ব্লক ডিটেক্ট করা
        let cleanFallback = code.replace(/<div[^>]*bottom:14[^>]*>[\s\S]*?<\/div>/g, '');
        fs.writeFileSync(path, cleanFallback, 'utf8');
    }
} else {
    console.log('❌ Error: src/pages/About.jsx ফাইলটি পাওয়া যায়নি।');
}
