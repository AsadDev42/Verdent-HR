const fs=require('fs'),path=require('path');
const css=fs.readFileSync('dist/style.css','utf8');
const js=fs.readFileSync('dist/app.js','utf8');
const html=fs.readFileSync('dist/index.html','utf8').replace('<link rel="stylesheet" href="style.css">',()=>'<style>'+css+'</style>').replace('<script src="app.js"></script>',()=>'<script>'+js.replace(/<\/script/gi,'<\\/script')+'</script>');
const output=path.resolve('../outputs/Verdant-HR-Demo.html');
fs.mkdirSync(path.dirname(output),{recursive:true});fs.writeFileSync(output,html);console.log(output);
