export const getNumArray = (start: number, end: number) =>
    Array.from(Array(end + 1).keys()).slice(start);

export const shuffleArray = (array: Array<any>) => {
    // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
        // same as let t = array[i]; array[i] = array[j]; array[j] = t
        [array[i], array[j]] = [array[j], array[i]];
    }
};

export const getRandomNumArray = (options: {
    start: number;
    end: number;
    length?: number;
}) => {
    const { start, end, length = end } = options;
    const array = getNumArray(start, end);
    shuffleArray(array);

    return array.slice(0, length);
};

export const inflectFieldNumber = (num: number) => {
    const numString = num.toString();
    const lastNum = numString.slice(numString.length - 1);
    switch (lastNum) {
        case '1':
            return 'число';
        case '2':
        case '3':
        case '4':
            return 'числа';
        default:
            return 'чисел';
    }
};

export const getCorrectCount = (input: number[], result: number[]) =>
    input.reduce<number>((acc, current) => {
        if (result.includes(current)) {
            acc += 1;
        }

        return acc;
    }, 0);

export const getResults = (): [number[], number[]] => {
    const resultOne = getRandomNumArray({ start: 1, end: 19, length: 8 });
    const resultTwo = getRandomNumArray({ start: 1, end: 2, length: 1 });

    return [resultOne, resultTwo];
};

export const checkResult = (
    selectedFieldOne: number[],
    selectedFieldTwo: number[],
    isCheat?: boolean
) => {
    if (isCheat) {
        return true;
    }

    const [resultOne, resultTwo] = getResults();
    const correctCountOne = getCorrectCount(selectedFieldOne, resultOne);
    const correctCountTwo = getCorrectCount(selectedFieldTwo, resultTwo);

    return correctCountOne > 3 || (correctCountOne > 2 && correctCountTwo > 0);
};
