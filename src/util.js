'use strict';

let isFunction = v => typeof v === 'function';

let isObject = v => v && typeof v === 'object';

// TODO stack pop
let checkType = (value, type, typeName) => {
    if (!type(value)) {
        throw new TypeError('Expected type ' + typeName + '. but got value ' + value);
    }
};

let shadowClone = v => {
    if (!isObject(v)) {
        return v;
    }
    let newV = {};
    for (let name in v) {
        newV[name] = v[name];
    }
    return newV;
};

module.exports = {
    isFunction,
    checkType,
    isObject,
    shadowClone
};
