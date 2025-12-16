import React, { useState } from 'react';
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
      case 'active': return '#24A148';
      case 'away': return '#F1C21B';
      case 'offline': return '#8D8D8D';
      default: return '#8D8D8D';
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
        backgroundColor: isHovered ? '#f8f8f8' : '#ffffff',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '20px',
        transition: 'all 0.2s ease',
        boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.08)' : '0 2px 4px rgba(0,0,0,0.04)',
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
          top: '16px',
          right: '16px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon 
          name={isSaved ? "bookmark-filled" : "bookmark"} 
          size={20} 
          color={isSaved ? "#3560C1" : "#8D8D8D"}
        />
      </button>

      {/* Header with Avatar and Status */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
        {/* Avatar */}
        <div style={{ position: 'relative' }}>
          {avatar ? (
            <img 
              src={avatar} 
              alt={name}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#3560C1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: '600',
            }}>
              {getInitials()}
            </div>
          )}
          {/* Status Indicator */}
          <div style={{
            position: 'absolute',
            bottom: '0',
            right: '0',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: getStatusColor(),
            border: '2px solid #ffffff',
          }} />
        </div>

        {/* Name and Info */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h3 style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: '#161616',
              margin: 0,
            }}>
              {name}
            </h3>
            {lastActive && (
              <span style={{ 
                fontSize: '12px', 
                color: '#8D8D8D',
              }}>
                {lastActive}
              </span>
            )}
          </div>
          <p style={{ 
            fontSize: '14px', 
            color: '#525252',
            margin: '4px 0 0 0',
          }}>
            {role}
          </p>
        </div>
      </div>

      {/* Department and Email */}
      {(department || email) && (
        <div style={{ marginBottom: '16px' }}>
          {department && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              marginBottom: '4px',
            }}>
              <Icon name="folder" size={14} color="#8D8D8D" />
              <span style={{ fontSize: '13px', color: '#525252' }}>{department}</span>
            </div>
          )}
          {email && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
            }}>
              <Icon name="email" size={14} color="#8D8D8D" />
              <span style={{ fontSize: '13px', color: '#525252' }}>{email}</span>
            </div>
          )}
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          flexWrap: 'wrap',
          marginBottom: '16px',
        }}>
          {tags.map((tag, index) => (
            <span 
              key={index}
              style={{
                padding: '4px 12px',
                backgroundColor: '#F4F4F4',
                color: '#161616',
                borderRadius: '16px',
                fontSize: '12px',
                fontWeight: '500',
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
          gap: '8px',
          paddingTop: '16px',
          borderTop: '1px solid #e0e0e0',
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