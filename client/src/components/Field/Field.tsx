import React from 'react';

import styles from './Field.module.css';
import { FieldItem } from '../FieldItem';
import { inflectFieldNumber } from '../../helpers';

interface FieldProps {
    title: string;
    numSelect: number;
    numArray: number[];
    selected: number[];
    setSelected: (arr: number[]) => void;
}

const Field: React.FC<FieldProps> = ({
    title,
    numSelect,
    numArray,
    selected,
    setSelected
}) => {
    const selectFieldItem = (num: number) => {
        if (selected.length < numSelect) {
            setSelected([...selected, num]);
        }
    };
    const removeFieldItem = (num: number) => {
        const copyWithRemovedNum = selected.filter(item => item !== num);
        setSelected(copyWithRemovedNum);
    };
    const hint = `Отметьте ${selected.length > 0 ? 'еще' : ''} ${numSelect -
        selected.length} ${inflectFieldNumber(numSelect - selected.length)}`;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <p className={styles.title}>{title}</p>
                {selected.length === numSelect ? null : (
                    <p className={styles.hint}>{hint}</p>
                )}
            </header>
            <div className={styles.field}>
                {numArray.map(num => {
                    const isSelected = selected.includes(num);
                    const onClick = isSelected
                        ? () => removeFieldItem(num)
                        : () => selectFieldItem(num);
                    return (
                        <FieldItem
                            key={num}
                            num={num}
                            isSelected={isSelected}
                            onClick={onClick}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export { Field };
