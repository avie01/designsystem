import React from 'react';
import styles from './DemoComparison.module.css';

interface DemoComparisonProps {
  title: string;
  description?: string;
  odlExample: React.ReactNode;
  muiExample: React.ReactNode;
  odlCode?: string;
  muiCode?: string;
}

const DemoComparison: React.FC<DemoComparisonProps> = ({
  title,
  description,
  odlExample,
  muiExample,
  odlCode,
  muiCode,
}) => {
  return (
    <div className={styles.comparison}>
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}

      <div className={styles.grid}>
        <div className={styles.column}>
          <div className={styles.header}>
            <h3>ODL Component</h3>
            <span className={styles.badge} data-type="odl">ODL</span>
          </div>
          <div className={styles.example}>
            {odlExample}
          </div>
          {odlCode && (
            <pre className={styles.code}>
              <code>{odlCode}</code>
            </pre>
          )}
        </div>

        <div className={styles.column}>
          <div className={styles.header}>
            <h3>MUI with ODL Theme</h3>
            <span className={styles.badge} data-type="mui">MUI</span>
          </div>
          <div className={styles.example}>
            {muiExample}
          </div>
          {muiCode && (
            <pre className={styles.code}>
              <code>{muiCode}</code>
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default DemoComparison;