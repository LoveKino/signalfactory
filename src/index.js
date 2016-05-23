'use strict';

let signalHandlerManage = require('./signalHandlerManage');
let util = require('./util');
let shadowClone = util.shadowClone;
let checkType = util.checkType;
let isFunction = util.isFunction;
let isJson = util.isJson;

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
    let sfIndex = signalMatrix.length;
    signalMatrix.push(signals);

    // generate signal function
    return (converter) => {
        checkType(converter, isFunction, 'function');
        let manage = signalHandlerManage();
        let signal = (e) => {
            let signalData = converter(e);
            return dispatch(signalData);
        };

        let dispatch = (signalData) => {
            if(SignalFactory.mode === 'development') {
                checkType(signalData, isJson, 'json');
            }
            // only shadow clone
            let clonedSignalData = shadowClone(signalData);
            // TODO handleInfos
            let rets = manage.pass(clonedSignalData);
            // handle process
            // promise to indicate that finished or not, and a special event to indicate time point (recovery point)
            return rets;
        };

        let sIndex = signals.length;
        let getCoord = () => {
            return [sfIndex, sIndex];
        };

        signal.subscribe = manage.push;
        signal.dispatch = dispatch;
        signal.getCoord = getCoord;

        // serialization
        signals.push(signal);
        return signal;
    };
};

SignalFactory.mode = 'production';

module.exports = SignalFactory;
