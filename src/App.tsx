import React from "react";

import styles from "./App.module.css";
import { Ticket } from "./components/Ticket";

const App: React.FC = () => (
    <div className={styles.app}>
        <Ticket />
    </div>
);

export default App;
