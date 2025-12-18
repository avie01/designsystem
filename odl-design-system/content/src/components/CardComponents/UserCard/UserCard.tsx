import React, { useState } from 'react';
import ODLTheme from '../../../styles/ODLTheme';
import Icon from '../../Icon/Icon';
import Button from '../../Button/Button';

export interface UserCardProps {
  avatar?: string;
  initials?: string;
  name: string;
  role: string;
  department?: string;
  email?: string;
  status?: 'active' | 'away' | 'offline';
  lastActive?: string;
  tags?: string[];
  actions?: {
    onMessage?: () => void;
    onCall?: () => void;
    onEmail?: () => void;
  };
  onSave?: (saved: boolean) => void;
  saved?: boolean;
  className?: string;
}

const UserCard: React.FC<UserCardProps> = ({
  avatar,
  initials,
  name,
  role,
  department,
  email,
  status = 'offline',
  lastActive,
  tags = [],
  actions,
  onSave,
  saved = false,
  className = '',
}) => {
  const [isSaved, setIsSaved] = useState(saved);
  const [isHovered, setIsHovered] = useState(false);

  const handleSave = () => {
    const newSaved = !isSaved;
    setIsSaved(newSaved);
    onSave?.(newSaved);
  };

  const getStatusColor = () => {
    switch (status) {
      case 'active': return ODLTheme.colors.success;
      case 'away': return ODLTheme.colors.warning;
      case 'offline': return ODLTheme.colors.text.secondary;
      default: return ODLTheme.colors.text.secondary;
    }
  };

  const getInitials = () => {
    if (initials) return initials;
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div
      className={className}
      style={{
        backgroundColor: isHovered ? ODLTheme.colors.surface : ODLTheme.colors.background,
        border: `1px solid ${ODLTheme.colors.border}`,
        borderRadius: ODLTheme.borders.radius.md,
        padding: ODLTheme.spacing[5],
        transition: ODLTheme.transitions.base,
        boxShadow: isHovered ? ODLTheme.shadows.md : ODLTheme.shadows.sm,
        cursor: 'pointer',
        position: 'relative',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Save Button */}
      <button
        onClick={handleSave}
        style={{
          position: 'absolute',
          top: ODLTheme.spacing[4],
          right: ODLTheme.spacing[4],
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: ODLTheme.spacing[1],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon
          name={isSaved ? "bookmark-filled" : "bookmark"}
          size={18}
          color={isSaved ? ODLTheme.colors.primary : ODLTheme.colors.text.secondary}
        />
      </button>

      {/* Header with Avatar and Status */}
      <div style={{ display: 'flex', gap: ODLTheme.spacing[4], marginBottom: ODLTheme.spacing[4] }}>
        {/* Avatar */}
        <div style={{ position: 'relative' }}>
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              style={{
                width: `${ODLTheme.spacing[12]}px`,
                height: `${ODLTheme.spacing[12]}px`,
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <div style={{
              width: `${ODLTheme.spacing[12]}px`,
              height: `${ODLTheme.spacing[12]}px`,
              borderRadius: '50%',
              backgroundColor: ODLTheme.colors.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: ODLTheme.colors.background,
              fontSize: ODLTheme.typography.fontSize.base,
              fontWeight: ODLTheme.typography.fontWeight.semibold,
            }}>
              {getInitials()}
            </div>
          )}
          {/* Status Indicator */}
          <div style={{
            position: 'absolute',
            bottom: '0',
            right: '0',
            width: `${ODLTheme.spacing[3]}px`,
            height: `${ODLTheme.spacing[3]}px`,
            borderRadius: '50%',
            backgroundColor: getStatusColor(),
            border: `2px solid ${ODLTheme.colors.background}`,
          }} />
        </div>

        {/* Name and Info */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: ODLTheme.spacing[2] }}>
            <h3 style={{
              fontSize: ODLTheme.typography.fontSize.base,
              fontWeight: ODLTheme.typography.fontWeight.semibold,
              color: ODLTheme.colors.text.primary,
              margin: 0,
            }}>
              {name}
            </h3>
            {lastActive && (
              <span style={{
                fontSize: ODLTheme.typography.fontSize.xs,
                color: ODLTheme.colors.text.secondary,
              }}>
                {lastActive}
              </span>
            )}
          </div>
          <p style={{
            fontSize: ODLTheme.typography.fontSize.sm,
            color: ODLTheme.colors.text.secondary,
            margin: `${ODLTheme.spacing[1]}px 0 0 0`,
          }}>
            {role}
          </p>
        </div>
      </div>

      {/* Department and Email */}
      {(department || email) && (
        <div style={{ marginBottom: ODLTheme.spacing[4] }}>
          {department && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: ODLTheme.spacing[2],
              marginBottom: ODLTheme.spacing[1],
            }}>
              <Icon name="folder" size={14} color={ODLTheme.colors.text.secondary} />
              <span style={{ fontSize: ODLTheme.typography.fontSize.sm, color: ODLTheme.colors.text.secondary }}>{department}</span>
            </div>
          )}
          {email && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: ODLTheme.spacing[2],
            }}>
              <Icon name="email" size={14} color={ODLTheme.colors.text.secondary} />
              <span style={{ fontSize: ODLTheme.typography.fontSize.sm, color: ODLTheme.colors.text.secondary }}>{email}</span>
            </div>
          )}
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div style={{
          display: 'flex',
          gap: ODLTheme.spacing[2],
          flexWrap: 'wrap',
          marginBottom: ODLTheme.spacing[4],
        }}>
          {tags.map((tag, index) => (
            <span
              key={index}
              style={{
                padding: `${ODLTheme.spacing[1]}px ${ODLTheme.spacing[3]}px`,
                backgroundColor: ODLTheme.colors.surface,
                color: ODLTheme.colors.text.primary,
                borderRadius: ODLTheme.borders.radius.full,
                fontSize: ODLTheme.typography.fontSize.xs,
                fontWeight: ODLTheme.typography.fontWeight.medium,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      {actions && (
        <div style={{
          display: 'flex',
          gap: ODLTheme.spacing[2],
          paddingTop: ODLTheme.spacing[4],
          borderTop: `1px solid ${ODLTheme.colors.border}`,
        }}>
          {actions.onMessage && (
            <Button
              variant="ghost"
              size="small"
              onClick={actions.onMessage}
              icon={<Icon name="chat" size={16} />}
              style={{ flex: 1 }}
            >
              Message
            </Button>
          )}
          {actions.onCall && (
            <Button
              variant="primary"
              size="small"
              onClick={actions.onCall}
              icon={<Icon name="phone" size={16} />}
              style={{ flex: 1 }}
            >
              Call
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserCard;