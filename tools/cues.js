// Print an episode's narration cues as JSON (used by build_audio.py)
global.L = require(require('path').join(__dirname, '../episodes/_lib.js'));
const ep = require(require('path').resolve(process.argv[2]));
console.log(JSON.stringify(ep.scenes.map(s => ({ label: s.label, hold: s.hold || 0, cues: s.cues.map(c => typeof c === 'string' ? { t: c, say: c } : { t: c.t, say: c.say || c.t }) }))));
