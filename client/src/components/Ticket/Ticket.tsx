import React, { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Ticket.module.css';

import { Field } from '../Field';
import { FIELD_ONE_NUMBERS, WIN_TEXT, LOOSE_TEXT } from '../../const';
import { checkResult, getResults } from '../../helpers';
import { fetchResponse } from '../../api';

const cx = classNames.bind(styles);

const Ticket = () => {
    const [isWin, setIsWin] = useState(false);
    const [isCheat, setIsCheat] = useState(false);
    const [isSubmitted, setIsSubmited] = useState(false);
    const [selectedFieldOne, setSelectedFieldOne] = useState<number[]>([]);
    const [selectedFieldTwo, setSelectedFieldTwo] = useState<number[]>([]);

    const handleCheckResult = () => {
        const isTicketWon = checkResult(
            selectedFieldOne,
            selectedFieldTwo,
            isCheat
        );

        const requestBody = {
            selectedNumber: {
                firstField: selectedFieldOne,
                secondField: selectedFieldTwo
            },
            isTicketWon
        };

        const response = fetchResponse(requestBody);

        if (response) {
            setIsWin(isTicketWon);
            setIsSubmited(true);
        }
    };

    const handleCheat = () => {
        setIsCheat(true);
        const [resultOne, resultTwo] = getResults();
        setSelectedFieldOne(resultOne);
        setSelectedFieldTwo(resultTwo);
    };

    const handleRandomFill = () => {
        const [resultOne, resultTwo] = getResults();
        setSelectedFieldOne(resultOne);
        setSelectedFieldTwo(resultTwo);
    };

    const handleReset = () => {
        setSelectedFieldOne([]);
        setSelectedFieldTwo([]);
    };

    const handleRestart = () => {
        handleReset();
        setIsSubmited(false);
    };

    const resultText = isWin ? WIN_TEXT : LOOSE_TEXT;
    const isAllSelected =
        selectedFieldOne.length === 8 && selectedFieldTwo.length === 1;
    const isSomeSelected = selectedFieldOne.length || selectedFieldTwo.length;

    return (
        <div
            className={cx('container', {
                ticketHidden: isSubmitted,
                resultsHidden: !isSubmitted
            })}
        >
            <header className={cx('header')}>Билет 1</header>
            {isSubmitted ? (
                <section className={cx('resultContainer')}>
                    <div className={cx('resultText')}>{resultText}</div>
                    <div
                        className={cx('button', 'restartButton')}
                        onClick={handleRestart}
                    >
                        Заново
                    </div>
                </section>
            ) : (
                <section className={cx('ticket')}>
                    <div className={cx('topButtons')}>
                        <div
                            title="Случайно"
                            className={cx('button', 'icon', 'magicWandButton')}
                            onClick={handleRandomFill}
                        />
                        <div
                            title="Читерство"
                            className={cx('button', 'icon', 'cheatButton')}
                            onClick={handleCheat}
                        />
                        <div
                            title="Заново"
                            className={cx('button', 'icon', 'resetButton', {
                                disabled: !isSomeSelected
                            })}
                            onClick={handleReset}
                        />
                    </div>
                    <Field
                        title="Поле 1"
                        numSelect={8}
                        numArray={FIELD_ONE_NUMBERS}
                        selected={selectedFieldOne}
                        setSelected={setSelectedFieldOne}
                    />
                    <Field
                        title="Поле 2"
                        numSelect={1}
                        numArray={[1, 2]}
                        selected={selectedFieldTwo}
                        setSelected={setSelectedFieldTwo}
                    />
                    <div
                        className={cx('button', 'resultButton', {
                            disabled: !isAllSelected
                        })}
                        onClick={isAllSelected ? handleCheckResult : () => null}
                    >
                        Показать результат
                    </div>
                </section>
            )}
        </div>
    );
};

export { Ticket };