import React, { useEffect, useRef } from 'react';
import styles from './AlertPanel.module.css';

export interface Alert {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

interface AlertPanelProps {
  alerts: Alert[];
  isOpen: boolean;
  onClose: () => void;
  onAlertDismiss: (alertId: string) => void;
  onAlertRead: (alertId: string) => void;
}

const AlertPanel: React.FC<AlertPanelProps> = ({
  alerts,
  isOpen,
  onClose,
  onAlertDismiss,
  onAlertRead,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        // Check if the click is not on the alert icon button
        const alertButton = document.querySelector('[aria-label*="unread alerts"]');
        if (alertButton && !alertButton.contains(event.target as Node)) {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'success':
        return (
          <svg className={`${styles.alertIcon} ${styles.successIcon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'warning':
        return (
          <svg className={`${styles.alertIcon} ${styles.warningIcon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'error':
        return (
          <svg className={`${styles.alertIcon} ${styles.errorIcon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className={`${styles.alertIcon} ${styles.infoIcon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString();
  };

  const unreadAlerts = alerts.filter(a => !a.read);
  const readAlerts = alerts.filter(a => a.read);

  return (
    <div className={styles.panel} ref={panelRef}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div>
            <h3 className={styles.title}>Council Updates</h3>
            <p className={styles.subtitle}>
              {unreadAlerts.length} new update{unreadAlerts.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close alerts panel"
          >
            <svg className={styles.closeButtonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Alerts List */}
      <div className={styles.alertsList}>
        {alerts.length === 0 ? (
          <div className={styles.emptyState}>
            <svg className={styles.emptyStateIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className={styles.emptyStateText}>No council updates</p>
          </div>
        ) : (
          <>
            {/* Unread Alerts */}
            {unreadAlerts.length > 0 && (
              <div>
                <div className={`${styles.sectionHeader} ${styles.newUpdatesHeader}`}>
                  <span className={`${styles.sectionHeaderLabel} ${styles.newUpdatesLabel}`}>New Updates</span>
                </div>
                {unreadAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={styles.alertItem}
                    onClick={() => onAlertRead(alert.id)}
                  >
                    <div className={styles.alertItemContent}>
                      <div className={styles.alertIconContainer}>
                        {getAlertIcon(alert.type)}
                      </div>
                      <div className={styles.alertTextContent}>
                        <p className={styles.alertTitle}>{alert.title}</p>
                        <p className={styles.alertMessage}>{alert.message}</p>
                        <p className={styles.alertTimestamp}>
                          {formatTimestamp(alert.timestamp)}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAlertDismiss(alert.id);
                        }}
                        className={styles.dismissButton}
                        aria-label="Dismiss alert"
                      >
                        <svg className={styles.dismissButtonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Read Alerts */}
            {readAlerts.length > 0 && (
              <div>
                <div className={`${styles.sectionHeader} ${styles.previousUpdatesHeader}`}>
                  <span className={`${styles.sectionHeaderLabel} ${styles.previousUpdatesLabel}`}>Previous Updates</span>
                </div>
                {readAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`${styles.alertItem} ${styles.readAlertItem}`}
                  >
                    <div className={styles.alertItemContent}>
                      <div className={styles.alertIconContainer}>
                        {getAlertIcon(alert.type)}
                      </div>
                      <div className={styles.alertTextContent}>
                        <p className={`${styles.alertTitle} ${styles.readAlertTitle}`}>{alert.title}</p>
                        <p className={`${styles.alertMessage} ${styles.readAlertMessage}`}>{alert.message}</p>
                        <p className={`${styles.alertTimestamp} ${styles.readAlertTimestamp}`}>
                          {formatTimestamp(alert.timestamp)}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAlertDismiss(alert.id);
                        }}
                        className={styles.dismissButton}
                        aria-label="Dismiss alert"
                      >
                        <svg className={styles.dismissButtonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer with Mark All as Read */}
      {unreadAlerts.length > 0 && (
        <div className={styles.footer}>
          <button
            onClick={() => unreadAlerts.forEach(alert => onAlertRead(alert.id))}
            className={styles.markAllReadButton}
          >
            Mark all as read
          </button>
        </div>
      )}
    </div>
  );
};

export default AlertPanel;