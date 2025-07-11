import {formatCurrency} from '../../scripts/utils/money.js';

//function which creates test-suite
describe('test suite: formatCurrency', () => {
    it('converts cents into dollars', () => {//function provided by jasmine which creates a test
        expect(formatCurrency(2095)).toEqual('20.95');//lets us compare a value to another(same as if-stmt)
    });

    it('works with 0', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });

    it('rounds up to the nearest cent', () => {
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });
});