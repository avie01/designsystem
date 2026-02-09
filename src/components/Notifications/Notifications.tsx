import React, { useEffect, useRef } from 'react';
import styles from './Notifications.module.css';
import Button from '../Button/Button';
import IconButton from '../IconButton/IconButton';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationsProps {
  notifications: Notification[];
  isOpen: boolean;
  onClose: () => void;
  onNotificationDismiss: (notificationId: string) => void;
  onNotificationRead: (notificationId: string) => void;
}

const Notifications: React.FC<NotificationsProps> = ({
  notifications,
  isOpen,
  onClose,
  onNotificationDismiss,
  onNotificationRead,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        const notificationButton = document.querySelector('[aria-label*="unread notifications"]');
        if (notificationButton && !notificationButton.contains(event.target as Node)) {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

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

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return (
          <svg className={`${styles.notificationIcon} ${styles.successIcon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'warning':
        return (
          <svg className={`${styles.notificationIcon} ${styles.warningIcon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'error':
        return (
          <svg className={`${styles.notificationIcon} ${styles.errorIcon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className={`${styles.notificationIcon} ${styles.infoIcon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

  const unreadNotifications = notifications.filter(n => !n.read);
  const readNotifications = notifications.filter(n => n.read);

  return (
    <div className={styles.panel} ref={panelRef}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div>
            <h3 className={styles.title}>Notifications</h3>
            <p className={styles.subtitle}>
              {unreadNotifications.length} new notification{unreadNotifications.length !== 1 ? 's' : ''}
            </p>
          </div>
          <IconButton
            icon="close"
            variant="disabled"
            size="small"
            onClick={onClose}
            aria-label="Close notifications panel"
          />
        </div>
      </div>

      <div className={styles.notificationsList}>
        {notifications.length === 0 ? (
          <div className={styles.emptyState}>
            <svg className={styles.emptyStateIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className={styles.emptyStateText}>No notifications</p>
          </div>
        ) : (
          <>
            {unreadNotifications.length > 0 && (
              <div>
                <div className={`${styles.sectionHeader} ${styles.newUpdatesHeader}`}>
                  <span className={`${styles.sectionHeaderLabel} ${styles.newUpdatesLabel}`}>New</span>
                </div>
                {unreadNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={styles.notificationItem}
                    onClick={() => onNotificationRead(notification.id)}
                  >
                    <div className={styles.notificationItemContent}>
                      <div className={styles.notificationIconContainer}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className={styles.notificationTextContent}>
                        <p className={styles.notificationTitle}>{notification.title}</p>
                        <p className={styles.notificationMessage}>{notification.message}</p>
                        <p className={styles.notificationTimestamp}>
                          {formatTimestamp(notification.timestamp)}
                        </p>
                      </div>
                      <div onClick={(e) => e.stopPropagation()}>
                        <IconButton
                          icon="close"
                          variant="disabled"
                          size="xs"
                          onClick={() => onNotificationDismiss(notification.id)}
                          aria-label="Dismiss notification"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {readNotifications.length > 0 && (
              <div>
                <div className={`${styles.sectionHeader} ${styles.previousUpdatesHeader}`}>
                  <span className={`${styles.sectionHeaderLabel} ${styles.previousUpdatesLabel}`}>Earlier</span>
                </div>
                {readNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`${styles.notificationItem} ${styles.readNotificationItem}`}
                  >
                    <div className={styles.notificationItemContent}>
                      <div className={styles.notificationIconContainer}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className={styles.notificationTextContent}>
                        <p className={`${styles.notificationTitle} ${styles.readNotificationTitle}`}>{notification.title}</p>
                        <p className={`${styles.notificationMessage} ${styles.readNotificationMessage}`}>{notification.message}</p>
                        <p className={`${styles.notificationTimestamp} ${styles.readNotificationTimestamp}`}>
                          {formatTimestamp(notification.timestamp)}
                        </p>
                      </div>
                      <div onClick={(e) => e.stopPropagation()}>
                        <IconButton
                          icon="close"
                          variant="disabled"
                          size="xs"
                          onClick={() => onNotificationDismiss(notification.id)}
                          aria-label="Dismiss notification"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {unreadNotifications.length > 0 && (
        <div className={styles.footer}>
          <Button
            variant="text"
            onClick={() => unreadNotifications.forEach(notification => onNotificationRead(notification.id))}
          >
            Mark all as read
          </Button>
        </div>
      )}
    </div>
  );
};

export default Notifications;
