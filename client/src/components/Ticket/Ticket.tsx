import React, { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Ticket.module.css';

import { Field } from '../Field';
import {
    FIELD_ONE_NUMBERS,
    FIELD_ONE_REQUIRED_COUNT,
    FIELD_TWO_REQUIRED_COUNT,
    WIN_TEXT,
    LOOSE_TEXT,
} from '../../const';
import { getResults, checkResultAndPost } from '../../helpers';
import { Notification } from '../Notification';
import { ButtonIcon } from '../ButtonIcon';

const cx = classNames.bind(styles);

const Ticket = () => {
    const [isWin, setIsWin] = useState(false);
    const [isCheat, setIsCheat] = useState(false);
    const [showErrorNotification, setShowErrorNotification] = useState(false);
    const [isSubmitted, setIsSubmited] = useState(false);
    const [selectedFieldOne, setSelectedFieldOne] = useState<number[]>([]);
    const [selectedFieldTwo, setSelectedFieldTwo] = useState<number[]>([]);

    const handleCheckResult = async () => {
        const { isResponseSaved, isTicketWon } = await checkResultAndPost(
            selectedFieldOne,
            selectedFieldTwo,
            isCheat
        );

        if (!isResponseSaved) {
            setShowErrorNotification(true);
            return;
        }

        setIsWin(isTicketWon);
        setIsSubmited(true);
    };

    const hideNotification = () => setShowErrorNotification(false);

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
        selectedFieldOne.length === FIELD_ONE_REQUIRED_COUNT &&
        selectedFieldTwo.length === FIELD_TWO_REQUIRED_COUNT;
    const isSomeSelected = selectedFieldOne.length || selectedFieldTwo.length;

    return (
        <>
            <div
                className={cx('container', {
                    ticketHidden: isSubmitted,
                    resultsHidden: !isSubmitted,
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
                            <ButtonIcon
                                title="Случайно"
                                icon="fillAll"
                                onClick={handleRandomFill}
                            />
                            <ButtonIcon
                                title="Читерство"
                                icon="cheat"
                                onClick={handleCheat}
                            />
                            <ButtonIcon
                                title="Заново"
                                icon="reset"
                                onClick={handleCheat}
                                isDisabled={!isSomeSelected}
                            />
                        </div>
                        <Field
                            title="Поле 1"
                            numSelect={FIELD_ONE_REQUIRED_COUNT}
                            numArray={FIELD_ONE_NUMBERS}
                            selected={selectedFieldOne}
                            setSelected={setSelectedFieldOne}
                        />
                        <Field
                            title="Поле 2"
                            numSelect={FIELD_TWO_REQUIRED_COUNT}
                            numArray={[1, 2]}
                            selected={selectedFieldTwo}
                            setSelected={setSelectedFieldTwo}
                        />
                        <div
                            className={cx('button', 'resultButton', {
                                disabled: !isAllSelected,
                            })}
                            onClick={
                                isAllSelected ? handleCheckResult : () => null
                            }
                        >
                            Показать результат
                        </div>
                    </section>
                )}
            </div>
            {showErrorNotification && (
                <Notification
                    onClick={hideNotification}
                    text="Не удалось сохранить результат :( "
                />
            )}
        </>
    );
};

export { Ticket };
