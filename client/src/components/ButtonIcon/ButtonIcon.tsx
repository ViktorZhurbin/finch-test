import * as React from 'react';
import classNames from 'classnames/bind';

import { ReactComponent as CheatIcon } from '../../assets/icons/cheat.svg';
import { ReactComponent as DoneAllIcon } from '../../assets/icons/done-all.svg';
import { ReactComponent as ResetIcon } from '../../assets/icons/reset.svg';

import styles from './ButtonIcon.module.css';

const icons = {
    cheat: CheatIcon,
    fillAll: DoneAllIcon,
    reset: ResetIcon,
};

const cx = classNames.bind(styles);

interface ButtonIconProps {
    onClick: () => void;
    title: string;
    icon: keyof typeof icons;
    isDisabled?: boolean;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({
    onClick,
    title,
    icon,
    isDisabled,
}) => {
    const Icon: React.ComponentType = icons[icon];

    return (
        <div
            title={title}
            className={cx('button', 'icon', { isDisabled })}
            onClick={onClick}
            role="button"
        >
            <Icon />
        </div>
    );
};

export { ButtonIcon };
