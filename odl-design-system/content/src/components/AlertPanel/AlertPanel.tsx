import React, { useEffect, useRef } from 'react';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
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
    const iconMap = {
      success: 'checkmark-filled',
      warning: 'warning-filled',
      error: 'error-filled',
      info: 'information'
    };

    return (
      <Icon
        name={iconMap[type] || 'information'}
        size={20}
        className={styles.alertIcon}
        aria-hidden="true"
      />
    );
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
            <h3 className={styles.title}>Notifications</h3>
            <p className={styles.subtitle}>
              {unreadAlerts.length} new notification{unreadAlerts.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Button
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close alerts panel"
            variant="ghost"
            size="sm"
          >
            <Icon name="close" size={20} className={styles.closeButtonIcon} aria-hidden="true" />
          </Button>
        </div>
      </div>

      {/* Alerts List */}
      <div className={styles.alertsList}>
        {alerts.length === 0 ? (
          <div className={styles.emptyState}>
            <Icon name="notification" size={32} className={styles.emptyStateIcon} aria-hidden="true" />
            <p className={styles.emptyStateText}>No notifications</p>
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
                      <Button
                        onClick={() => onAlertDismiss(alert.id)}
                        className={styles.dismissButton}
                        aria-label="Dismiss alert"
                        variant="ghost"
                        size="sm"
                      >
                        <Icon name="close" size={16} className={styles.dismissButtonIcon} aria-hidden="true" />
                      </Button>
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
                      <Button
                        onClick={() => onAlertDismiss(alert.id)}
                        className={styles.dismissButton}
                        aria-label="Dismiss alert"
                        variant="ghost"
                        size="sm"
                      >
                        <Icon name="close" size={16} className={styles.dismissButtonIcon} aria-hidden="true" />
                      </Button>
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
          <Button
            onClick={() => unreadAlerts.forEach(alert => onAlertRead(alert.id))}
            className={styles.markAllReadButton}
            variant="text"
            size="sm"
          >
            Mark all as read
          </Button>
        </div>
      )}
    </div>
  );
};

export default AlertPanel;