const fs = require("fs");
const meta = require("./meta.json");

exports.saveUp = (name, type) => {

    if (!meta[type]) {
        meta[type] = [name]
    } else {
        meta[type].push(name)
    }

    fs.writeFileSync("./meta.json", JSON.stringify(meta, null, 2))
}

exports.saveDown = (name, type) => {
    const index = meta[type].indexOf(name);
    if (index > -1) {
        meta[type].splice(index, 1);
    }

    fs.writeFileSync("./meta.json", JSON.stringify(meta, null, 2))

}