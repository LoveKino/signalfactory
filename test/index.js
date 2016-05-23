'use strict';

let SignalFactory = require('../index');
let assert = require('assert');

describe('base', () => {
    it('base', () => {
        let sf = SignalFactory();
        let s0 = sf(e => e);
        s0.subscribe(v => v + 1);
        s0.subscribe(v => v + 2);

        let rets = s0(10);

        assert.deepEqual(rets, [11, 12]);
    });
});
