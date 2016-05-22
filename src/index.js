'use strict';

let signalHandlerManage = require('./signalHandlerManage');
let util = require('./util');
let shadowClone = util.shadowClone;
let checkType = util.checkType;
let isFunction = util.isFunction;

/**
 * suggestion:
 *
 * (1) signal is a function, which handles the origin event to a serializable signal data.
 *
 * (2) define signal at first time (just once)
 *
 * generate a signal factory
 *
 * define signals under the factory
 *
 * define signal processor
 */

let signalMatrix = [];

// generate a signal factory
let SignalFactory = () => {
    let signals = [];
    signalMatrix.push(signals);

    return (converter) => {
        checkType(converter, isFunction, 'function');
        let signal = (e) => {
            let signalData = converter(e);
            // TODO check signalData
            let clonedSignalData = shadowClone(signalData);
            // TODO handleInfos
            manage.pass(clonedSignalData);
            // handle process
            // promise to indicate that finished or not, and a special event to indicate time point (recovery point)
        };
        let manage = signalHandlerManage();
        signal.subscribe = manage.push;

        signals.push(signal);
        return signal;
    };
};

// default system signal factory
let systemSignalFactory = SignalFactory();

// exports
SignalFactory.systemSignalFactory = systemSignalFactory;
SignalFactory.signalMatrix = signalMatrix;
module.exports = SignalFactory;
