import React from 'react';

import styles from './Notification.module.css';

const Notification: React.FC<{ text: string }> = ({ text }) => {
    return (
        <div className={styles.container}>
            <div className={styles.notification}>{text}</div>
        </div>
    );
};

export { Notification };
