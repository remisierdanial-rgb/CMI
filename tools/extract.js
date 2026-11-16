// Load an episode file in Node and print its narration segments as JSON.
const path = require('path');
globalThis.EP = x => (globalThis.EPISODE = x);
require(path.resolve(process.argv[2]));
const E = globalThis.EPISODE;
const out = { num: E.num, title: E.title, short: E.short, scenes: E.scenes.map((s, k) => ({ label: s.label || '', tpl: s.tpl, say: s.say.map(x => ({ en: x[0], ms: x[1], p: (x[2] && x[2].p) || 0 })) })) };
process.stdout.write(JSON.stringify(out));
