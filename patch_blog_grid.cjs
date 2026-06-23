const fs = require('fs');
const f = 'src/pages/admin/AdminBlog.jsx';
let c = fs.readFileSync(f, 'utf8');

// Fix 1: grid → flex wrap
c = c.replace(
  'display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8',
  'display:"flex", flexWrap:"wrap", gap:6'
);

// Fix 2: tall column button → compact square
c = c.replace(
  'display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:5, padding:"10px 6px", borderRadius:12',
  'width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center", borderRadius:10'
);

// Fix 3: remove text label inside button
c = c.replace(
  '\n                      <span style={{ color: active ? cfg.color : "rgba(255,255,255,0.65)", fontSize:"0.68rem", fontWeight: active ? 700 : 500, fontFamily:"var(--font-body)", textAlign:"center", lineHeight:1.3 }}>{cat}</span>',
  ''
);

// Fix 4: emoji size
c = c.replace(
  'fontSize:"1.4rem", lineHeight:1',
  'fontSize:"1.3rem"'
);

// Fix 5: add label pills row after icon grid, before Extra emoji section
const AFTER_GRID = `              </div>\n            </div>\n\n            {/* Extra emoji */}`;
const WITH_PILLS = `              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginTop:7 }}>
                {CATS.map(cat => {
                  const cfg = CAT_CONFIG[cat];
                  const active = form.category === cat;
                  return (
                    <button key={cat+'-lbl'} onClick={() => selectCat(cat)}
                      style={{ padding:"3px 10px", borderRadius:99, cursor:"pointer",
                        border: active ? "1px solid "+cfg.border : "1px solid rgba(255,255,255,0.08)",
                        background: active ? cfg.bg : "transparent",
                        color: active ? cfg.color : "rgba(255,255,255,0.5)",
                        fontSize:"0.7rem", fontWeight: active ? 700 : 400,
                        fontFamily:"var(--font-body)", outline:"none", whiteSpace:"nowrap" }}>
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Extra emoji */}`;

c = c.replace(AFTER_GRID, WITH_PILLS);

fs.writeFileSync(f, c, 'utf8');
console.log('Done! npm run dev করুন।');
