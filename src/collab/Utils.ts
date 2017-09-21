import {readFileSync, writeFile} from "fs";
import schema from "./Schema";
import {Comments, Comment} from "./Comment";
import {Instance} from "./Instance";

let instances = Object.create(null);
let instanceCount = 0;
let maxCount = 20;

let saveFile = __dirname + "/demo-instances.json", json: any;
let saveTimeout: any = null, saveEvery = 0;

function getDocs() {
    if (process.argv.indexOf("--fresh") === -1) {
        try {
            json = JSON.parse(readFileSync(saveFile, "utf8"));
        } catch (e) {
        }
    }

    if (json) {
        for (let prop in json)
            newInstance(prop, schema.nodeFromJSON(json[prop].doc),
                new Comments(json[prop].comments.map((c: any) => Comment.fromJson(c))));
    }

}

function scheduleSave(instance: Instance) {
    if (saveTimeout != null) return
    saveTimeout = setTimeout(doSave, saveEvery, instance);
}
function doSave(instance: Instance) {

    saveTimeout = null;
    let out: any = {};

    for (let prop in Instance)
        out[prop] = {
            doc: instances[prop].doc.toJSON(),
            comments: instances[prop].comments
        };
    writeFile(saveFile, JSON.stringify(out));
}

function getInstance(id: string, ip: string) {
    getDocs();
    let inst = instances[id] || newInstance(id);
    if (ip) inst.registerUser(ip)
    inst.lastActive = new Date();
    return inst;

}

function newInstance(id: string, doc?: any, comments?: any) {
    if (++instanceCount > maxCount) {
        let oldest = null;
        for (let id in instances) {
            let inst = instances[id];
            if (!oldest || inst.lastActive < oldest.lastActive) oldest = inst;
        }

        // instances[oldest.id];
        delete instances[oldest.id];

        --instanceCount;
    }
    return instances[id] = new Instance(id, doc, comments);
}

function instanceInfo() {
    getDocs();
    let found = [];
    for (let id in instances)
        found.push({id: id, users: instances[id].userCount});
    return found;
}

export {getDocs, getInstance, instanceInfo, scheduleSave};