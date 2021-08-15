import fs from "fs";

function main() {
  const source = fs.readFileSync(__dirname + "/package.json").toString('utf-8');
  const sourceObj = JSON.parse(source);
  sourceObj.scripts = {};
  sourceObj.devDependencies = {};
  const startFiles = ['main', 'typings', 'module']
  startFiles.forEach(name => {
    sourceObj[name] = (sourceObj[name] as string).replace(/^dist\//, '')
  })
  sourceObj['size-limit'].forEach((obj: any) => {
    obj.path = (obj.path as string).replace(/^dist\//, '')
  })
  sourceObj.files = ['*']
  fs.writeFileSync(__dirname + "/dist/package.json", Buffer.from(JSON.stringify(sourceObj, null, 2), "utf-8") );

  fs.copyFileSync(__dirname + "/.npmignore", __dirname + "/dist/.npmignore");
}

main();
