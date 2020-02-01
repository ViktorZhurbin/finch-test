import React from 'react';
import classNames from 'classnames/bind';

import styles from './FieldItem.module.css';

const cx = classNames.bind(styles);

interface FieldItemProps {
    num: number;
    isSelected: boolean;
    isInactive: boolean;
    onClick: (num: number) => void;
}

const FieldItem: React.FC<FieldItemProps> = ({
    num,
    isSelected,
    isInactive,
    onClick,
}) => {
    const handleClick = () => onClick(num);

    return (
        <div
            className={cx('container', { isSelected, isInactive })}
            onClick={handleClick}
        >
            <p className={cx('fieldItem', { isSelected })}>{num}</p>
        </div>
    );
};

export { FieldItem };
