import React from 'react';

import styles from './FieldItem.module.css';

interface FieldItemProps {
    num: number;
    isSelected: boolean;
    onClick: (num: number) => void;
}

const FieldItem: React.FC<FieldItemProps> = ({ num, isSelected, onClick }) => {
    const handleClick = () => onClick(num);
    return (
        <div
            className={`${styles.container} ${
                isSelected ? styles.selected : ''
            }`}
            onClick={handleClick}
        >
            <p
                className={`${styles.fieldItem} ${
                    isSelected ? styles.selected : ''
                }`}
            >
                {num}
            </p>
        </div>
    );
};

export { FieldItem };
