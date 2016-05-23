'use strict';

let util = require('./util');
let checkType = util.checkType;
let isFunction = util.isFunction;

module.exports = () => {
    let handlers = [];

    // append only, so can reflect handler to  a unique index
    let push = (handler) => {
        checkType(handler, isFunction, 'function');
        handlers.push(handler);
    };

    // pass signal to handlers
    let pass = (signalData) => {
        let rets = [];
        for (let i = 0; i < handlers.length; i++) {
            let handler = handlers[i];
            // TODO pass control command to handler
            rets.push(handler(signalData));
        }
        return rets;
    };

    return {
        push,
        pass
    };
};
