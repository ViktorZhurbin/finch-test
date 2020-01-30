import React, { useState } from "react";

import styles from "./Ticket.module.css";

import { Field } from "../Field";
import { FIELD_ONE_NUMBERS, WIN_TEXT, LOOSE_TEXT } from "../../const";
import { checkResult, getResults } from "../../helpers";

const Ticket = () => {
    const [isWin, setIsWin] = useState();
    const [isSubmitted, setIsSubmited] = useState(false);
    const [selectedFieldOne, setSelectedFieldOne] = useState<number[]>([]);
    const [selectedFieldTwo, setSelectedFieldTwo] = useState<number[]>([]);

    const handleCheckResult = () => {
        const isWinResult = checkResult(selectedFieldOne, selectedFieldTwo);

        setIsWin(isWinResult);
        setIsSubmited(true);
    };

    const handleCheat = () => {
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

    return (
        <div
            className={`${styles.container} ${
                isSubmitted ? styles.ticketHidden : styles.resultsHidden
            }`}
        >
            <header className={styles.header}>Билет 1</header>
            {isSubmitted ? (
                <section className={styles.resultContainer}>
                    <div className={styles.resultText}>{resultText}</div>
                    <div className={styles.resetButton} onClick={handleRestart}>
                        Заново
                    </div>
                </section>
            ) : (
                <section className={styles.ticket}>
                    <div className={styles.topButtons}>
                        <div
                            className={styles.cheatButton}
                            onClick={handleCheat}
                        >
                            Чит
                        </div>
                        <div
                            className={styles.resetButton}
                            onClick={handleReset}
                        >
                            Сброс
                        </div>
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
                        className={`${styles.resultButton} ${
                            isAllSelected ? "" : styles.disabled
                        }`}
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
