"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prosemirror_model_1 = require("prosemirror-model");
const prosemirror_schema_list_1 = require("prosemirror-schema-list");
const { schema: base } = require("prosemirror-schema-basic");
exports.default = new prosemirror_model_1.Schema({
    nodes: prosemirror_schema_list_1.addListNodes(base.spec.nodes, "paragraph block*", "block"),
    marks: base.spec.marks
});
//# sourceMappingURL=Schema.js.map