'use strict';

// TODO type check
module.exports = () => {
    let handlers = [];

    // append only, so can reflect handler to  a unique index
    let push = (handler) => {
        handlers.push(handler);
    };

    // pass signal to handlers
    // TODO signal passing situation, which handler finished
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
