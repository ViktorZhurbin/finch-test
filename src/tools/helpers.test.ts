import '@testing-library/jest-dom/extend-expect';
import {
    getNumArray,
    getRandomNumArray,
    inflectFieldNumber,
    getCorrectCount,
} from './helpers';

describe('#getNumArray', () => {
    test('get an array with numbers from 1 to 3', () => {
        expect(getNumArray(1, 3)).toEqual([1, 2, 3]);
    });
});

describe('#getRandomNumArray', () => {
    test('get a shuffled array of length 3', () => {
        const expected = 3;
        const arr = getRandomNumArray({ start: 1, end: 10, length: 3 });
        const actual = arr.length;

        expect(actual).toEqual(expected);
    });
});

describe('#inflectFieldNumber', () => {
    test('get inflected form for число', () => {
        expect(inflectFieldNumber(1)).toEqual('число');
        expect(inflectFieldNumber(2)).toEqual('числа');
        expect(inflectFieldNumber(6)).toEqual('чисел');
        expect(inflectFieldNumber(21)).toEqual('число');
        expect(inflectFieldNumber(133)).toEqual('числа');
    });
});

describe('#getCorrectCount', () => {
    test('get correctly selected numbers', () => {
        const result = [2, 1, 5];
        expect(getCorrectCount([1, 3], result)).toEqual(1);
        expect(getCorrectCount([5, 1], result)).toEqual(2);
        expect(getCorrectCount([1, 2, 5], result)).toEqual(3);
    });
});
