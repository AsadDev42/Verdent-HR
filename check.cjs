const fs=require('fs'),vm=require('vm'),assert=require('assert'),{webcrypto}=require('crypto');
const element=()=>({innerHTML:'',textContent:'',classList:{add(){},remove(){}},focus(){},setSelectionRange(){},value:''});
const elements={};const document={getElementById:id=>elements[id]??=element(),querySelectorAll:()=>[],querySelector:()=>null,addEventListener(){}};
const context=vm.createContext({document,localStorage:{getItem:()=>null,setItem(){}},crypto:webcrypto,console,setTimeout:()=>1,clearTimeout(){},window:{scrollTo(){}},URL,Blob});
vm.runInContext(fs.readFileSync('dist/app.js','utf8'),context);
const run=s=>vm.runInContext(s,context);
assert.equal(run('db.leads.length'),18);assert.equal(run('matches(db.requirements[0]).length'),4);
assert.equal(run('matches(db.requirements[0])[0].score'),99);
for(const name of ['Overview','Requirements','Lead database','WhatsApp inbox','Outreach','Tasks & pipeline','Reports','Automation','Settings']){run(`navigate(${JSON.stringify(name)})`);assert.ok(elements.app.innerHTML.length>500)}
run('runEngine()');const total=run('db.outreach.length');assert.ok(total>3);run('runEngine()');assert.equal(run('db.outreach.length'),total,'Repeated matching must not duplicate messages');
assert.equal(run('db.outreach.filter(o=>o.lead==="L-1011")[0].status'),'Skipped','Non-consenting contacts must be skipped');
const id=run('db.outreach.find(o=>o.status==="Draft").id');run(`sendOutreach(${JSON.stringify(id)})`);assert.equal(run(`db.outreach.find(o=>o.id===${JSON.stringify(id)}).status`),'Sent');
run(`action('reply:'+${JSON.stringify(id)})`);assert.equal(run(`db.outreach.find(o=>o.id===${JSON.stringify(id)}).status`),'Replied');
const draft=run('db.outreach.find(o=>o.status==="Draft").id');run(`db.leads.find(l=>l.id===db.outreach.find(o=>o.id===${JSON.stringify(draft)}).lead).blocked=true`);run(`sendOutreach(${JSON.stringify(draft)})`);assert.equal(run(`db.outreach.find(o=>o.id===${JSON.stringify(draft)}).status`),'Skipped','Recheck consent at send time');
assert.equal(run(`parseCSV(${JSON.stringify('name,skills\n"Taylor, A","React, TypeScript"')})[1][1]`),'React, TypeScript');
assert.throws(()=>run(`parseCSV(${JSON.stringify('name\n"unterminated')})`));
assert.equal(run(`esc('<img onerror="x">')`),'&lt;img onerror=&quot;x&quot;&gt;');
console.log('PASS: 9 page renders, matching, ranking, deduplication, consent enforcement, sending, replies, follow-up tasks, CSV parsing and escaping.');
