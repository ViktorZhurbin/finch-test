import React from 'react';
import classNames from 'classnames/bind';

import styles from '../Ticket.module.css';
import { WIN_TEXT, LOOSE_TEXT } from '../../../const';

const cx = classNames.bind(styles);

interface ResultProps {
    isWin: boolean;
    handleRestart: () => void;
}

const Result: React.FC<ResultProps> = ({ isWin, handleRestart }) => {
    const resultText = isWin ? WIN_TEXT : LOOSE_TEXT;

    return (
        <section className={cx('resultContainer')}>
            <div className={cx('resultText')}>{resultText}</div>
            <div
                className={cx('button', 'restartButton')}
                onClick={handleRestart}
            >
                Заново
            </div>
        </section>
    );
};

export { Result };
