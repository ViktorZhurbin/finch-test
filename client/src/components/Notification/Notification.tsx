import React from 'react';

import styles from './Notification.module.css';

const Notification: React.FC<{ text: string; onClick: () => void }> = ({
    text,
    onClick,
}) => {
    return (
        <div className={styles.container} onClick={onClick}>
            <span className={styles.notification}>{text}</span>
            <div className={styles.deleteButton} role="button" />
        </div>
    );
};

export { Notification };
