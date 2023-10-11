const fs = require("fs");
const args = process.argv.slice(2);
const isFileName = args.length == 3;
const meta = require("./meta.json");

let updown = args[1];
let type = args[0];
let fileName;

if (isFileName) {
    updown = args[2];
    fileName = args[1];
}

if (!["seeders", "migrations"].includes(type)) {
    return console.log("Please enter valid option like 'seeders' or 'migrations'");
}

if (!["up", "down"].includes(updown)) {
    return console.log("Please enter valid type like 'up' or 'down'")
}

const { saveUp, saveDown } = require("./common");

if (["up", "down"].includes(updown) && ["seeders", "migrations"].includes(type) && !isFileName) {

    const directoryFiles = fs.readdirSync("./" + type);

    directoryFiles.forEach(file => {
        if (file.endsWith(".js") && (!meta[type].includes(file) || updown == "down")) {
            const seeder_migration = require("./" + type + "/" + file);
            seeder_migration[updown]().then(() => {
                console.log(`${file} ${type} ${updown} run successfully`);
                updown == "up" ? saveUp(file, type) : saveDown(file, type)
            })
        }
    });
}

else {
    if (!fs.existsSync("./" + type + "/" + fileName)) {
        return console.log("file " + fileName + " does not exist");
    }

    const seeder_migration = require("./" + type + "/" + fileName);
    if ((!meta[type].includes(fileName) || updown == "down")) {
        seeder_migration[updown]().then(() => {
            console.log(`${fileName} ${type} ${updown} run successfully`);
            updown == "up" ? saveUp(fileName, type) : saveDown(fileName, type);
        })
    }
}