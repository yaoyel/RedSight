import  {Schema} from "prosemirror-model";
import {addListNodes} from "prosemirror-schema-list";
const {schema: base} = require ("prosemirror-schema-basic");

export  default new Schema({
    nodes: addListNodes(base.spec.nodes, "paragraph block*", "block"),
    marks: base.spec.marks
});
