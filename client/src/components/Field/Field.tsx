import React from 'react';
import classNames from 'classnames/bind';

import styles from './Field.module.css';
import { FieldItem } from '../FieldItem';
import { inflectFieldNumber } from '../../tools/helpers';

const cx = classNames.bind(styles);

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
    setSelected,
}) => {
    const isAllSelected = selected.length === numSelect;
    const leftToSelect = numSelect - selected.length;
    const selectFieldItem = (num: number) => {
        if (!isAllSelected) {
            setSelected([...selected, num]);
        }
    };
    const removeFieldItem = (num: number) => {
        const copyWithRemovedNum = selected.filter(item => item !== num);
        setSelected(copyWithRemovedNum);
    };
    const hintText = `Отметьте ${
        selected.length > 0 ? 'еще' : ''
    } ${leftToSelect} ${inflectFieldNumber(leftToSelect)}`;

    return (
        <article className={cx('container')}>
            <header className={cx('header')}>
                <p className={cx('title')}>{title}</p>
                {!isAllSelected ? (
                    <p className={cx('hint')}>{hintText}</p>
                ) : null}
            </header>
            <section className={cx('field')}>
                {numArray.map(num => {
                    const isSelected = selected.includes(num);
                    const onClick = isSelected
                        ? () => removeFieldItem(num)
                        : () => selectFieldItem(num);
                    return (
                        <FieldItem
                            key={num}
                            num={num}
                            isInactive={!isSelected && isAllSelected}
                            isSelected={isSelected}
                            onClick={onClick}
                        />
                    );
                })}
            </section>
        </article>
    );
};

export { Field };
