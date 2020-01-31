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
import { getResults, checkResultAndPost } from '../../tools/helpers';
import { Notification } from '../Notification';
import { ButtonIcon } from '../ButtonIcon';

const cx = classNames.bind(styles);

const Ticket = () => {
    const [isWin, setIsWin] = useState(false);
    const [showErrorNotification, setShowErrorNotification] = useState(false);
    const [isSubmitted, setIsSubmited] = useState(false);
    const [firstField, setFirstField] = useState<number[]>([]);
    const [secondField, setSecondField] = useState<number[]>([]);

    const handleCheckResult = async () => {
        const { isResponseSaved, isTicketWon } = await checkResultAndPost(
            firstField,
            secondField
        );

        if (!isResponseSaved) {
            setShowErrorNotification(true);
            setTimeout(() => {
                setShowErrorNotification(false);
            }, 4000);
            return;
        }

        setIsWin(isTicketWon);
        setIsSubmited(true);
    };

    const handleRandomFill = () => {
        const [resultOne, resultTwo] = getResults();
        setFirstField(resultOne);
        setSecondField(resultTwo);
    };

    const handleReset = () => {
        setFirstField([]);
        setSecondField([]);
    };

    const handleRestart = () => {
        handleReset();
        setIsSubmited(false);
    };

    const resultText = isWin ? WIN_TEXT : LOOSE_TEXT;
    const isAllSelected =
        firstField.length === FIELD_ONE_REQUIRED_COUNT &&
        secondField.length === FIELD_TWO_REQUIRED_COUNT;
    const isSomeSelected = firstField.length || secondField.length;

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
                                title="Заново"
                                icon="reset"
                                onClick={handleReset}
                                isDisabled={!isSomeSelected}
                            />
                        </div>
                        <Field
                            title="Поле 1"
                            numSelect={FIELD_ONE_REQUIRED_COUNT}
                            numArray={FIELD_ONE_NUMBERS}
                            selected={firstField}
                            setSelected={setFirstField}
                        />
                        <Field
                            title="Поле 2"
                            numSelect={FIELD_TWO_REQUIRED_COUNT}
                            numArray={[1, 2]}
                            selected={secondField}
                            setSelected={setSecondField}
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
                <Notification text="Не удалось сохранить результат :( " />
            )}
        </>
    );
};

export { Ticket };
