import React from 'react';
import * as styles from './style.module.scss';

const Loader = (): any => {
  return (
  <div className={styles["wrapper"]}>
    <div className={styles["box"]}>
      <div className={styles["cube"]} />
      <div className={styles["cube"]} />
      <div className={styles["cube"]} />
      <div className={styles["cube"]} />
    </div>
  </div>
  );
};

export default Loader;