'use strict';

let SignalFactory = require('../index');

describe('base', () => {
    it('base', () => {
        let ret = null;

        let sf = SignalFactory();
        let s0 = sf(e => e);
        s0.subscribe(v => ret = v + 1);

        s0(10);

        console.log(ret);
    });
});
