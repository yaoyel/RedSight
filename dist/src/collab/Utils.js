"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const Schema_1 = require("./Schema");
const Comment_1 = require("./Comment");
const Instance_1 = require("./Instance");
let instances = Object.create(null);
let instanceCount = 0;
let maxCount = 20;
let saveFile = __dirname + "/demo-instances.json", json;
let saveTimeout = null, saveEvery = 0;
function getDocs() {
    if (process.argv.indexOf("--fresh") === -1) {
        try {
            json = JSON.parse(fs_1.readFileSync(saveFile, "utf8"));
        }
        catch (e) {
        }
    }
    if (json) {
        for (let prop in json)
            newInstance(prop, Schema_1.default.nodeFromJSON(json[prop].doc), new Comment_1.Comments(json[prop].comments.map((c) => Comment_1.Comment.fromJson(c))));
    }
}
exports.getDocs = getDocs;
function scheduleSave(instance) {
    if (saveTimeout != null)
        return;
    saveTimeout = setTimeout(doSave, saveEvery, instance);
}
exports.scheduleSave = scheduleSave;
function doSave(instance) {
    saveTimeout = null;
    let out = {};
    for (let prop in Instance_1.Instance)
        out[prop] = {
            doc: instances[prop].doc.toJSON(),
            comments: instances[prop].comments
        };
    fs_1.writeFile(saveFile, JSON.stringify(out));
}
function getInstance(id, ip) {
    getDocs();
    let inst = instances[id] || newInstance(id);
    if (ip)
        inst.registerUser(ip);
    inst.lastActive = new Date();
    return inst;
}
exports.getInstance = getInstance;
function newInstance(id, doc, comments) {
    if (++instanceCount > maxCount) {
        let oldest = null;
        for (let id in instances) {
            let inst = instances[id];
            if (!oldest || inst.lastActive < oldest.lastActive)
                oldest = inst;
        }
        // instances[oldest.id];
        delete instances[oldest.id];
        --instanceCount;
    }
    return instances[id] = new Instance_1.Instance(id, doc, comments);
}
function instanceInfo() {
    getDocs();
    let found = [];
    for (let id in instances)
        found.push({ id: id, users: instances[id].userCount });
    return found;
}
exports.instanceInfo = instanceInfo;
//# sourceMappingURL=Utils.js.map