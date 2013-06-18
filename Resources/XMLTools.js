var doc = null, obj = null;

var XMLTools = function(inputXml) {
    "string" == typeof inputXml && (doc = Ti.XML.parseString(inputXml).documentElement);
    "object" == typeof inputXml && (doc = inputXml.documentElement);
};

XMLTools.prototype.getDocument = function() {
    return doc;
};

var addToObject = function(obj, key, value) {
    if (null == obj[key]) obj[key] = value; else if (obj[key] instanceof Array) obj[key].push(value); else {
        var tmp = obj[key];
        var arr = [ tmp, value ];
        obj[key] = arr;
    }
    return obj;
};

var traverseTree = function(node) {
    var textOnly = true;
    var part = {};
    if (node.hasChildNodes()) {
        for (var ch_index = 0; node.childNodes.length > ch_index; ch_index++) {
            var ch = node.childNodes.item(ch_index);
            if ("#text" == ch.nodeName && "" == ch.textContent.replace(/\n/g, "").replace(/ /g, "")) continue;
            if (3 === ch.nodeType || ch.nodeType === ch.CDATA_SECTION_NODE) {
                if (1 === node.childNodes.length && !node.hasAttributes()) return ch.textContent;
                part.text = ch.textContent;
            } else part = addToObject(part, ch.tagName, traverseTree(ch));
        }
        textOnly = false;
    }
    if (node.hasAttributes()) {
        for (var att_index = 0; node.attributes.length > att_index; att_index++) {
            var att = node.attributes.item(att_index);
            part[att.nodeName] = att.nodeValue;
        }
        textOnly = false;
    }
    return part;
};

XMLTools.prototype.toObject = function() {
    if (null == doc) return null;
    obj = traverseTree(doc);
    return obj;
};

XMLTools.prototype.toJSON = function() {
    if (null == doc) return null;
    null == obj && (obj = traverseTree(doc));
    return JSON.stringify(obj);
};

module.exports = XMLTools;