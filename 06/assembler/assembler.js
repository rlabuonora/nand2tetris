exports.preprocess = function(str) {
    var re = /\/\/.*$/;
    return str.replace(re, "").trim();
};
