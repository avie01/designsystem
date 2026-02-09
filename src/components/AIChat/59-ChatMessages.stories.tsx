import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import UserAvatar from '../UserAvatar/UserAvatar';
import Button from '../Button/Button';
import IconButton from '../IconButton/IconButton';
import Checkbox from '../Checkbox/Checkbox';
import Icon from '../Icon/Icon';
import Cards from '../CardComponents/Cards/Cards';
import Workflows, { WorkflowNode, WorkflowEdge } from '../Workflows/Workflows';
import Maps, { MapMarker } from '../Maps/Maps';
import { useTheme } from '../../../.storybook/theme-decorator';
import oiIcon from '../../assets/oi.svg';

const meta: Meta = {
  title: 'Design System/Components/AI Q&A/Chat Messages',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'Ready for dev'],
};

export default meta;
type Story = StoryObj;

const AIIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <img src={oiIcon} alt="Objective Intelligence" width={size} height={size} style={{ borderRadius: '4px' }} />
);

interface UserMessageProps {
  content: string;
  timestamp?: string;
  userName?: string;
  showAvatar?: boolean;
  showTimestamp?: boolean;
}

const UserMessage: React.FC<UserMessageProps> = ({
  content,
  timestamp,
  userName = 'User',
  showAvatar = true,
  showTimestamp = true,
}) => {
  const { colors } = useTheme();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row-reverse',
        gap: '12px',
        alignItems: 'flex-start',
        maxWidth: '500px',
      }}
    >
      {showAvatar && (
        <div style={{ flexShrink: 0 }}>
          <UserAvatar size="lg" user={{ name: 'User' }} showPopup={false} />
        </div>
      )}
      <div
        style={{
          maxWidth: '75%',
          padding: '12px 16px',
          borderRadius: '0px',
          backgroundColor: colors.grey300,
          color: colors.textPrimary,
          borderLeft: `4px solid ${colors.grey500}`,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '6px',
          }}
        >
          <span
            style={{
              color: colors.primaryNight,
              fontFamily: 'var(--font-family-noto)',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: '21px',
            }}
          >
            {userName}
          </span>
          {showTimestamp && timestamp && (
            <span
              style={{
                color: colors.grey700,
                fontFamily: 'var(--font-family-noto)',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '21px',
              }}
            >
              {timestamp}
            </span>
          )}
        </div>
        <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.5, whiteSpace: 'pre-wrap', fontFamily: 'var(--font-family-noto)' }}>{content}</p>
      </div>
    </div>
  );
};

interface AIResponseProps {
  content: string;
  timestamp?: string;
  showAvatar?: boolean;
  showTimestamp?: boolean;
}

const AIResponse: React.FC<AIResponseProps> = ({
  content,
  timestamp,
  showAvatar = true,
  showTimestamp = true,
}) => {
  const { colors } = useTheme();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '12px',
        alignItems: 'flex-start',
        maxWidth: '500px',
      }}
    >
      {showAvatar && (
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <AIIcon size={32} />
        </div>
      )}
      <div
        style={{
          maxWidth: '75%',
          padding: '0 16px 12px 0',
          color: colors.textPrimary,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '6px',
          }}
        >
          <span
            style={{
              color: colors.primaryNight,
              fontFamily: 'var(--font-family-noto)',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: '21px',
            }}
          >
            Objective Intelligence
          </span>
          {showTimestamp && timestamp && (
            <span
              style={{
                color: colors.grey700,
                fontFamily: 'var(--font-family-noto)',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '21px',
              }}
            >
              {timestamp}
            </span>
          )}
        </div>
        <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.5, whiteSpace: 'pre-wrap', fontFamily: 'var(--font-family-noto)' }}>{content}</p>
      </div>
    </div>
  );
};

const TypingIndicator: React.FC = () => {
  const { colors } = useTheme();

  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', maxWidth: '500px' }}>
      <div
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '6px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <AIIcon size={32} />
      </div>
      <div
        style={{
          padding: '12px 16px',
          borderRadius: '16px 16px 16px 4px',
          backgroundColor: colors.grey100,
        }}
      >
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: colors.textSecondary,
              animation: 'typing-dot 1.4s infinite ease-in-out',
              animationDelay: '0s',
            }}
          />
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: colors.textSecondary,
              animation: 'typing-dot 1.4s infinite ease-in-out',
              animationDelay: '0.2s',
            }}
          />
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: colors.textSecondary,
              animation: 'typing-dot 1.4s infinite ease-in-out',
              animationDelay: '0.4s',
            }}
          />
        </div>
      </div>
      <style>{`
        @keyframes typing-dot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.6; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export const UserQuestion: Story = {
  name: '01 User Question',
  render: () => (
    <div style={{ padding: '20px' }}>
      <UserMessage
        content="What features does this design system include?"
        timestamp="2:30 PM"
      />
    </div>
  ),
};

export const UserQuestionLong: Story = {
  name: '02 User Question (Long)',
  render: () => (
    <div style={{ padding: '20px' }}>
      <UserMessage
        content="I'm trying to understand how to use the Table component with sorting and pagination. Can you explain the props needed and show me an example of how to implement it with custom column renderers?"
        timestamp="2:31 PM"
      />
    </div>
  ),
};

export const UserQuestionNoAvatar: Story = {
  name: '03 User Question (No Avatar)',
  render: () => (
    <div style={{ padding: '20px' }}>
      <UserMessage
        content="How do I customize the theme colors?"
        showAvatar={false}
        timestamp="2:32 PM"
      />
    </div>
  ),
};

export const AIResponseDefault: Story = {
  name: '04 AI Response',
  render: () => (
    <div style={{ padding: '20px' }}>
      <AIResponse
        content="The ODL Design System includes over 40 components such as Buttons, Inputs, Tables, Cards, Navigation Rails, Modals, and more."
        timestamp="2:30 PM"
      />
    </div>
  ),
};

export const AIResponseLong: Story = {
  name: '05 AI Response (Long)',
  render: () => (
    <div style={{ padding: '20px' }}>
      <AIResponse
        content={`The Table component supports several features:

1. **Sorting** - Enable with the \`sortable\` prop on columns
2. **Pagination** - Use \`paginated\` and \`itemsPerPage\` props
3. **Selection** - Add \`selectable\` for row selection
4. **Search** - Enable with \`showSearch\` prop
5. **Export** - Add \`showExport\` for CSV/Excel export

You can also use custom column renderers via the \`render\` property in your column definitions.`}
        timestamp="2:31 PM"
      />
    </div>
  ),
};

export const AIResponseNoAvatar: Story = {
  name: '06 AI Response (No Avatar)',
  render: () => (
    <div style={{ padding: '20px' }}>
      <AIResponse
        content="You can customize theme colors by modifying the ODLTheme object or using CSS variables like var(--odl-primary)."
        showAvatar={false}
        timestamp="2:32 PM"
      />
    </div>
  ),
};

export const TypingIndicatorStory: Story = {
  name: '07 Typing Indicator',
  render: () => (
    <div style={{ padding: '20px' }}>
      <TypingIndicator />
    </div>
  ),
};

export const ConversationThread: Story = {
  name: '08 Conversation Thread',
  render: () => (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '500px' }}>
      <UserMessage
        content="What components are available for navigation?"
        timestamp="2:30 PM"
      />
      <AIResponse
        content="The design system includes several navigation components: NavigationRail for side navigation, Breadcrumb for hierarchical navigation, Tabs for content switching, and TreeNavigation for nested menus."
        timestamp="2:30 PM"
      />
      <UserMessage
        content="Can you tell me more about NavigationRail?"
        timestamp="2:31 PM"
      />
      <AIResponse
        content="NavigationRail is a vertical navigation component that can be positioned on the left or right side of your application. It supports collapsed/expanded states, tooltips, icons with labels, and can include a help icon at the bottom."
        timestamp="2:31 PM"
      />
    </div>
  ),
};

export const MessageVariants: Story = {
  name: '09 All Variants',
  render: () => {
    const { colors } = useTheme();

    return (
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <h4 style={{ margin: '0 0 12px 0', color: colors.textSecondary, fontSize: '12px', textTransform: 'uppercase' }}>User Question</h4>
          <UserMessage content="How do I get started?" timestamp="2:30 PM" />
        </div>

        <div>
          <h4 style={{ margin: '0 0 12px 0', color: colors.textSecondary, fontSize: '12px', textTransform: 'uppercase' }}>AI Response</h4>
          <AIResponse content="Welcome! I'm here to help you get started with the design system." timestamp="2:30 PM" />
        </div>

        <div>
          <h4 style={{ margin: '0 0 12px 0', color: colors.textSecondary, fontSize: '12px', textTransform: 'uppercase' }}>Typing Indicator</h4>
          <TypingIndicator />
        </div>

        <div>
          <h4 style={{ margin: '0 0 12px 0', color: colors.textSecondary, fontSize: '12px', textTransform: 'uppercase' }}>Without Avatars</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <UserMessage content="Question without avatar" showAvatar={false} showTimestamp={false} />
            <AIResponse content="Response without avatar" showAvatar={false} showTimestamp={false} />
          </div>
        </div>
      </div>
    );
  },
};

export const AIResponseWithButtonActions: Story = {
  name: '10 AI Response with Button Actions',
  render: () => {
    const { colors } = useTheme();

    return (
      <div style={{ padding: '20px' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '12px',
            alignItems: 'flex-start',
            maxWidth: '500px',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <AIIcon size={32} />
          </div>
          <div
            style={{
              maxWidth: '75%',
              padding: '0 16px 12px 0',
              color: colors.textPrimary,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '6px',
              }}
            >
              <span
                style={{
                  color: colors.primaryNight,
                  fontFamily: 'var(--font-family-noto)',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: '21px',
                }}
              >
                Objective Intelligence
              </span>
              <span
                style={{
                  color: colors.grey700,
                  fontFamily: 'var(--font-family-noto)',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: '21px',
                }}
              >
                2:30 PM
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.5, whiteSpace: 'pre-wrap', fontFamily: 'var(--font-family-noto)' }}>
              The ODL Design System includes over 40 components. Would you like me to explain any specific component in detail?
            </p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <Button variant="secondary" size="medium">Copy</Button>
              <Button variant="secondary" size="medium">Regenerate</Button>
              <Button variant="secondary" size="medium">Share</Button>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const AIResponseWithIconButtonActions: Story = {
  name: '11 AI Response with IconButton Actions',
  render: () => {
    const { colors } = useTheme();

    return (
      <div style={{ padding: '20px' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '12px',
            alignItems: 'flex-start',
            maxWidth: '500px',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <AIIcon size={32} />
          </div>
          <div
            style={{
              maxWidth: '75%',
              padding: '0 16px 12px 0',
              color: colors.textPrimary,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '6px',
              }}
            >
              <span
                style={{
                  color: colors.primaryNight,
                  fontFamily: 'var(--font-family-noto)',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: '21px',
                }}
              >
                Objective Intelligence
              </span>
              <span
                style={{
                  color: colors.grey700,
                  fontFamily: 'var(--font-family-noto)',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: '21px',
                }}
              >
                2:30 PM
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.5, whiteSpace: 'pre-wrap', fontFamily: 'var(--font-family-noto)' }}>
              The ODL Design System includes over 40 components. Would you like me to explain any specific component in detail?
            </p>
            <div style={{ display: 'flex', gap: '4px', marginTop: '12px' }}>
              <IconButton icon="copy" variant="ghost" size="small" aria-label="Copy response" title="Copy" />
              <IconButton icon="restart" variant="ghost" size="small" aria-label="Regenerate response" title="Regenerate" />
              <IconButton icon="thumbs-up" variant="ghost" size="small" aria-label="Good response" title="Good response" />
              <IconButton icon="thumbs-down" variant="ghost" size="small" aria-label="Bad response" title="Bad response" />
              <IconButton icon="share" variant="ghost" size="small" aria-label="Share response" title="Share" />
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const AIResponseWithCalendarPicker: Story = {
  name: '12 AI Response with Calendar Picker',
  render: () => {
    const { colors } = useTheme();
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    return (
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'flex-start', maxWidth: '500px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '6px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <AIIcon size={32} />
          </div>
          <div style={{ maxWidth: '100%', padding: '0 16px 12px 0', color: colors.textPrimary }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ color: colors.primaryNight, fontFamily: 'var(--font-family-noto)', fontSize: '14px', fontWeight: 600, lineHeight: '21px' }}>Objective Intelligence</span>
              <span style={{ color: colors.grey700, fontFamily: 'var(--font-family-noto)', fontSize: '14px', fontWeight: 500, lineHeight: '21px' }}>2:30 PM</span>
            </div>
            <p style={{ margin: '0 0 16px 0', fontSize: '14px', lineHeight: 1.5, fontFamily: 'var(--font-family-noto)' }}>
              Please select a date for your meeting:
            </p>
            <div style={{ backgroundColor: colors.paper, border: `1px solid ${colors.border}`, borderRadius: '8px', padding: '16px', maxWidth: '280px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <IconButton icon="chevron-left" variant="ghost" size="small" aria-label="Previous month" />
                <span style={{ fontWeight: 600, fontSize: '14px', color: colors.textPrimary }}>{monthNames[currentMonth]} {currentYear}</span>
                <IconButton icon="chevron-right" variant="ghost" size="small" aria-label="Next month" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center' }}>
                {dayNames.map(day => (
                  <div key={day} style={{ fontSize: '12px', color: colors.textSecondary, padding: '4px', fontWeight: 500 }}>{day}</div>
                ))}
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dateStr = `${currentYear}-${currentMonth + 1}-${day}`;
                  const isSelected = selectedDate === dateStr;
                  const isToday = day === today.getDate();
                  return (
                    <div
                      key={day}
                      onClick={() => setSelectedDate(dateStr)}
                      style={{
                        padding: '8px',
                        fontSize: '13px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        backgroundColor: isSelected ? colors.primaryMain : 'transparent',
                        color: isSelected ? colors.textInverse : (isToday ? colors.primaryMain : colors.textPrimary),
                        fontWeight: isToday ? 600 : 400,
                        border: isToday && !isSelected ? `1px solid ${colors.primaryMain}` : '1px solid transparent',
                      }}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
              {selectedDate && (
                <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: `1px solid ${colors.border}` }}>
                  <Button variant="primary" size="medium" style={{ width: '100%' }}>
                    Confirm {selectedDate}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const AIResponseWithDateTimePicker: Story = {
  name: '13 AI Response with Date & Time Picker',
  render: () => {
    const { colors } = useTheme();
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    const timeSlots = [
      '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
      '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
      '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
      '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
    ];

    return (
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'flex-start', maxWidth: '600px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '6px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <AIIcon size={32} />
          </div>
          <div style={{ maxWidth: '100%', padding: '0 16px 12px 0', color: colors.textPrimary }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ color: colors.primaryNight, fontFamily: 'var(--font-family-noto)', fontSize: '14px', fontWeight: 600, lineHeight: '21px' }}>Objective Intelligence</span>
              <span style={{ color: colors.grey700, fontFamily: 'var(--font-family-noto)', fontSize: '14px', fontWeight: 500, lineHeight: '21px' }}>2:30 PM</span>
            </div>
            <p style={{ margin: '0 0 16px 0', fontSize: '14px', lineHeight: 1.5, fontFamily: 'var(--font-family-noto)' }}>
              Please select a date and time for your appointment:
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ backgroundColor: colors.paper, border: `1px solid ${colors.border}`, borderRadius: '8px', padding: '16px', minWidth: '280px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <Icon name="calendar" size={18} color={colors.primaryMain} />
                  <span style={{ fontWeight: 600, fontSize: '14px', color: colors.textPrimary }}>Select Date</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <IconButton icon="chevron-left" variant="ghost" size="small" aria-label="Previous month" />
                  <span style={{ fontWeight: 500, fontSize: '13px', color: colors.textPrimary }}>{monthNames[currentMonth]} {currentYear}</span>
                  <IconButton icon="chevron-right" variant="ghost" size="small" aria-label="Next month" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center' }}>
                  {dayNames.map(day => (
                    <div key={day} style={{ fontSize: '11px', color: colors.textSecondary, padding: '4px', fontWeight: 500 }}>{day}</div>
                  ))}
                  {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const dateStr = `${monthNames[currentMonth]} ${day}`;
                    const isSelected = selectedDate === dateStr;
                    const isToday = day === today.getDate();
                    const isPast = day < today.getDate();
                    return (
                      <div
                        key={day}
                        onClick={() => !isPast && setSelectedDate(dateStr)}
                        style={{
                          padding: '6px',
                          fontSize: '12px',
                          borderRadius: '4px',
                          cursor: isPast ? 'not-allowed' : 'pointer',
                          backgroundColor: isSelected ? colors.primaryMain : 'transparent',
                          color: isPast ? colors.textDisabled : (isSelected ? colors.textInverse : (isToday ? colors.primaryMain : colors.textPrimary)),
                          fontWeight: isToday ? 600 : 400,
                          border: isToday && !isSelected ? `1px solid ${colors.primaryMain}` : '1px solid transparent',
                          opacity: isPast ? 0.5 : 1,
                        }}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ backgroundColor: colors.paper, border: `1px solid ${colors.border}`, borderRadius: '8px', padding: '16px', minWidth: '180px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <Icon name="time" size={18} color={colors.primaryMain} />
                  <span style={{ fontWeight: 600, fontSize: '14px', color: colors.textPrimary }}>Select Time</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px', maxHeight: '200px', overflowY: 'auto' }}>
                  {timeSlots.map(time => {
                    const isSelected = selectedTime === time;
                    return (
                      <div
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        style={{
                          padding: '8px 12px',
                          fontSize: '12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          backgroundColor: isSelected ? colors.primaryMain : colors.grey100,
                          color: isSelected ? colors.textInverse : colors.textPrimary,
                          textAlign: 'center',
                          fontWeight: isSelected ? 500 : 400,
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {time}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {(selectedDate || selectedTime) && (
              <div style={{ marginTop: '16px', padding: '12px', backgroundColor: colors.grey100, borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '12px', color: colors.textSecondary }}>Selected:</span>
                  <p style={{ margin: '4px 0 0 0', fontSize: '14px', fontWeight: 500, color: colors.textPrimary }}>
                    {selectedDate || 'No date'} {selectedTime ? `at ${selectedTime}` : ''}
                  </p>
                </div>
                {selectedDate && selectedTime && (
                  <Button variant="primary" size="medium">
                    Confirm Appointment
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
};

export const AIResponseWithCheckboxes: Story = {
  name: '14 AI Response with Checkboxes',
  render: () => {
    const { colors } = useTheme();
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const options = [
      { id: 'email', label: 'Email notifications' },
      { id: 'sms', label: 'SMS notifications' },
      { id: 'push', label: 'Push notifications' },
      { id: 'weekly', label: 'Weekly digest summary' },
    ];

    const toggleOption = (id: string) => {
      setSelectedOptions(prev =>
        prev.includes(id) ? prev.filter(o => o !== id) : [...prev, id]
      );
    };

    return (
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'flex-start', maxWidth: '500px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '6px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <AIIcon size={32} />
          </div>
          <div style={{ maxWidth: '100%', padding: '0 16px 12px 0', color: colors.textPrimary }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ color: colors.primaryNight, fontFamily: 'var(--font-family-noto)', fontSize: '14px', fontWeight: 600, lineHeight: '21px' }}>Objective Intelligence</span>
              <span style={{ color: colors.grey700, fontFamily: 'var(--font-family-noto)', fontSize: '14px', fontWeight: 500, lineHeight: '21px' }}>2:30 PM</span>
            </div>
            <p style={{ margin: '0 0 16px 0', fontSize: '14px', lineHeight: 1.5, fontFamily: 'var(--font-family-noto)' }}>
              How would you like to receive notifications? Select all that apply:
            </p>
            <div style={{ backgroundColor: colors.paper, border: `1px solid ${colors.border}`, borderRadius: '8px', padding: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {options.map(option => (
                  <Checkbox
                    key={option.id}
                    checked={selectedOptions.includes(option.id)}
                    label={option.label}
                    onChange={() => toggleOption(option.id)}
                  />
                ))}
              </div>
              {selectedOptions.length > 0 && (
                <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: `1px solid ${colors.border}` }}>
                  <Button variant="primary" size="medium">
                    Save Preferences ({selectedOptions.length} selected)
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const AIResponseWithUploadButton: Story = {
  name: '15 AI Response with Upload Button',
  render: () => {
    const { colors } = useTheme();
    const [uploadedFile, setUploadedFile] = useState<string | null>(null);

    return (
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'flex-start', maxWidth: '500px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '6px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <AIIcon size={32} />
          </div>
          <div style={{ maxWidth: '100%', padding: '0 16px 12px 0', color: colors.textPrimary }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ color: colors.primaryNight, fontFamily: 'var(--font-family-noto)', fontSize: '14px', fontWeight: 600, lineHeight: '21px' }}>Objective Intelligence</span>
              <span style={{ color: colors.grey700, fontFamily: 'var(--font-family-noto)', fontSize: '14px', fontWeight: 500, lineHeight: '21px' }}>2:30 PM</span>
            </div>
            <p style={{ margin: '0 0 16px 0', fontSize: '14px', lineHeight: 1.5, fontFamily: 'var(--font-family-noto)' }}>
              Please upload the document you'd like me to analyze:
            </p>
            <div
              style={{
                backgroundColor: colors.paper,
                border: `2px dashed ${colors.border}`,
                borderRadius: '8px',
                padding: '24px',
                textAlign: 'center',
                cursor: 'pointer',
              }}
              onClick={() => setUploadedFile('document.pdf')}
            >
              {!uploadedFile ? (
                <>
                  <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>
                    <Icon name="upload" size={32} color={colors.primaryMain} />
                  </div>
                  <p style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 500, color: colors.textPrimary }}>
                    Drop your file here or click to browse
                  </p>
                  <p style={{ margin: 0, fontSize: '12px', color: colors.textSecondary }}>
                    Supported formats: PDF, DOC, DOCX, TXT (Max 10MB)
                  </p>
                </>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                  <Icon name="document" size={24} color={colors.successMain} />
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: 500, color: colors.textPrimary }}>{uploadedFile}</p>
                    <p style={{ margin: 0, fontSize: '12px', color: colors.successMain }}>Uploaded successfully</p>
                  </div>
                  <IconButton
                    icon="close"
                    variant="ghost"
                    size="small"
                    aria-label="Remove file"
                    onClick={(e) => { e.stopPropagation(); setUploadedFile(null); }}
                  />
                </div>
              )}
            </div>
            {uploadedFile && (
              <div style={{ marginTop: '12px' }}>
                <Button variant="primary" size="medium">
                  <Icon name="analytics" size={16} /> Analyze Document
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
};

export const AIResponseWithReferenceLink: Story = {
  name: '16 AI Response with Reference Link',
  render: () => {
    const { colors } = useTheme();

    const references = [
      {
        title: 'ODL Design System Documentation',
        description: 'Complete guide to using components and design tokens',
        url: '#',
        icon: 'document',
      },
      {
        title: 'Component API Reference',
        description: 'Detailed props and usage examples for all components',
        url: '#',
        icon: 'code',
      },
      {
        title: 'Accessibility Guidelines',
        description: 'WCAG 2.1 AA compliance and best practices',
        url: '#',
        icon: 'accessibility',
      },
    ];

    return (
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'flex-start', maxWidth: '500px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '6px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <AIIcon size={32} />
          </div>
          <div style={{ maxWidth: '100%', padding: '0 16px 12px 0', color: colors.textPrimary }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ color: colors.primaryNight, fontFamily: 'var(--font-family-noto)', fontSize: '14px', fontWeight: 600, lineHeight: '21px' }}>Objective Intelligence</span>
              <span style={{ color: colors.grey700, fontFamily: 'var(--font-family-noto)', fontSize: '14px', fontWeight: 500, lineHeight: '21px' }}>2:30 PM</span>
            </div>
            <p style={{ margin: '0 0 16px 0', fontSize: '14px', lineHeight: 1.5, fontFamily: 'var(--font-family-noto)' }}>
              Here are some helpful resources to get you started:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {references.map((ref, index) => (
                <a
                  key={index}
                  href={ref.url}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    backgroundColor: colors.paper,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '2px',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = colors.primaryNight;
                    e.currentTarget.style.backgroundColor = colors.grey400;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = colors.border;
                    e.currentTarget.style.backgroundColor = colors.paper;
                  }}
                >
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '2px',
                    backgroundColor: colors.grey200,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon name={ref.icon} size={20} color={colors.primaryNight} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 500, color: colors.primaryNight }}>
                      {ref.title}
                    </p>
                    <p style={{ margin: 0, fontSize: '12px', color: colors.textSecondary }}>
                      {ref.description}
                    </p>
                  </div>
                  <Icon name="arrow-right" size={16} color={colors.primaryNight} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const AIResponseWithCard: Story = {
  name: '17 AI Response with Card',
  render: () => {
    const { colors } = useTheme();

    const documents = [
      {
        id: 1,
        title: 'Project Requirements.pdf',
        subtitle: 'Updated 2 hours ago by Sarah Chen',
        tag: 'v2.1',
        fileType: 'pdf' as const,
      },
      {
        id: 2,
        title: 'Design System Guidelines.fig',
        subtitle: 'Shared with design team',
        tag: 'Final',
        fileType: 'figma' as const,
      },
      {
        id: 3,
        title: 'Q4 Analytics Report.xlsx',
        subtitle: 'Created 3 days ago',
        tag: 'Draft',
        fileType: 'excel' as const,
      },
      {
        id: 4,
        title: 'Meeting Notes.docx',
        subtitle: 'Last edited 1 hour ago',
        tag: 'WIP',
        fileType: 'word' as const,
      },
    ];

    return (
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'flex-start', maxWidth: '600px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '6px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <AIIcon size={32} />
          </div>
          <div style={{ maxWidth: '100%', padding: '0 16px 12px 0', color: colors.textPrimary, flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ color: colors.primaryNight, fontFamily: 'var(--font-family-noto)', fontSize: '14px', fontWeight: 600, lineHeight: '21px' }}>Objective Intelligence</span>
              <span style={{ color: colors.grey700, fontFamily: 'var(--font-family-noto)', fontSize: '14px', fontWeight: 500, lineHeight: '21px' }}>2:30 PM</span>
            </div>
            <p style={{ margin: '0 0 16px 0', fontSize: '14px', lineHeight: 1.5, fontFamily: 'var(--font-family-noto)' }}>
              I found the following documents related to your query:
            </p>
            <style>{`.ai-cards-no-checkbox .cards-container__checkbox { display: none; }`}</style>
            <div className="ai-cards-no-checkbox" style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {documents.map((doc) => (
                <Cards
                  key={doc.id}
                  title={doc.title}
                  subtitle={doc.subtitle}
                  tag={doc.tag}
                  fileType={doc.fileType}
                  onInfoClick={() => alert(`View details for ${doc.title}`)}
                  onMenuClick={() => alert(`More options for ${doc.title}`)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const AIResponseWithWorkflowMap: Story = {
  name: '18 AI Response with Workflow Map',
  render: () => {
    const { colors } = useTheme();

    const workflowNodes: WorkflowNode[] = [
      { id: 'start', type: 'start', label: 'Submit Request', position: { x: 250, y: 0 } },
      { id: 'review', type: 'process', label: 'Initial Review', description: 'Manager reviews request', status: 'completed', position: { x: 250, y: 100 } },
      { id: 'decision', type: 'decision', label: 'Approve?', position: { x: 250, y: 220 } },
      { id: 'approved', type: 'process', label: 'Process Approval', description: 'Execute approved action', status: 'pending', position: { x: 100, y: 350 } },
      { id: 'rejected', type: 'process', label: 'Send Rejection', description: 'Notify requestor', status: 'pending', position: { x: 400, y: 350 } },
      { id: 'end', type: 'end', label: 'Complete', position: { x: 250, y: 480 } },
    ];

    const workflowEdges: WorkflowEdge[] = [
      { id: 'e-start-review', source: 'start', target: 'review' },
      { id: 'e-review-decision', source: 'review', target: 'decision' },
      { id: 'e-decision-approved', source: 'decision', target: 'approved', label: 'Yes' },
      { id: 'e-decision-rejected', source: 'decision', target: 'rejected', label: 'No' },
      { id: 'e-approved-end', source: 'approved', target: 'end' },
      { id: 'e-rejected-end', source: 'rejected', target: 'end' },
    ];

    return (
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'flex-start', maxWidth: '700px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '6px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <AIIcon size={32} />
          </div>
          <div style={{ maxWidth: '100%', padding: '0 16px 12px 0', color: colors.textPrimary, flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ color: colors.primaryNight, fontFamily: 'var(--font-family-noto)', fontSize: '14px', fontWeight: 600, lineHeight: '21px' }}>Objective Intelligence</span>
              <span style={{ color: colors.grey700, fontFamily: 'var(--font-family-noto)', fontSize: '14px', fontWeight: 500, lineHeight: '21px' }}>2:30 PM</span>
            </div>
            <p style={{ margin: '0 0 16px 0', fontSize: '14px', lineHeight: 1.5, fontFamily: 'var(--font-family-noto)' }}>
              Here's the approval workflow for your request. The process starts with submission, goes through manager review, and branches based on the approval decision:
            </p>
            <div style={{ backgroundColor: colors.paper, border: `1px solid ${colors.border}`, borderRadius: '8px', overflow: 'hidden' }}>
              <Workflows
                nodes={workflowNodes}
                edges={workflowEdges}
                showControls={true}
                showMiniMap={false}
                showBackground={true}
                backgroundVariant="dots"
                fitView={true}
                interactive={false}
                height="400px"
              />
            </div>
            <div style={{ display: 'flex', gap: '4px', marginTop: '12px' }}>
              <IconButton icon="copy" variant="ghost" size="small" aria-label="Copy response" title="Copy" />
              <IconButton icon="restart" variant="ghost" size="small" aria-label="Regenerate response" title="Regenerate" />
              <IconButton icon="thumbs-up" variant="ghost" size="small" aria-label="Good response" title="Good response" />
              <IconButton icon="thumbs-down" variant="ghost" size="small" aria-label="Bad response" title="Bad response" />
              <IconButton icon="share" variant="ghost" size="small" aria-label="Share response" title="Share" />
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const AIResponseWithMap: Story = {
  name: '19 AI Response with Map',
  render: () => {
    const { colors } = useTheme();

    const markers: MapMarker[] = [
      { id: '1', longitude: 151.2093, latitude: -33.8688, color: '#0F62FE', popup: '<strong>Sydney CBD</strong><br/>Central Business District' },
      { id: '2', longitude: 151.2153, latitude: -33.8568, color: '#198038', popup: '<strong>Sydney Opera House</strong><br/>Iconic performing arts venue' },
      { id: '3', longitude: 151.2111, latitude: -33.8523, color: '#DA1E28', popup: '<strong>Sydney Harbour Bridge</strong><br/>Historic bridge crossing' },
      { id: '4', longitude: 151.1957, latitude: -33.8908, color: '#6929C4', popup: '<strong>Central Station</strong><br/>Main railway terminus' },
    ];

    return (
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'flex-start', maxWidth: '700px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '6px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <AIIcon size={32} />
          </div>
          <div style={{ maxWidth: '100%', padding: '0 16px 12px 0', color: colors.textPrimary, flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ color: colors.primaryNight, fontFamily: 'var(--font-family-noto)', fontSize: '14px', fontWeight: 600, lineHeight: '21px' }}>Objective Intelligence</span>
              <span style={{ color: colors.grey700, fontFamily: 'var(--font-family-noto)', fontSize: '14px', fontWeight: 500, lineHeight: '21px' }}>2:30 PM</span>
            </div>
            <p style={{ margin: '0 0 16px 0', fontSize: '14px', lineHeight: 1.5, fontFamily: 'var(--font-family-noto)' }}>
              Here are the key landmarks in Sydney that you asked about. The map shows the CBD area with major points of interest marked:
            </p>
            <div style={{ backgroundColor: colors.paper, border: `1px solid ${colors.border}`, borderRadius: '8px', overflow: 'hidden' }}>
              <Maps
                longitude={151.2093}
                latitude={-33.8688}
                zoom={14}
                height="350px"
                markers={markers}
                tileStyle="standard"
              />
            </div>
            <div style={{ marginTop: '12px', padding: '12px', backgroundColor: colors.grey100, borderRadius: '8px' }}>
              <p style={{ margin: 0, fontSize: '13px', color: colors.textSecondary }}>
                <strong style={{ color: colors.textPrimary }}>Tip:</strong> Click on the markers to see more details about each location. You can zoom and pan to explore the area.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '4px', marginTop: '12px' }}>
              <IconButton icon="copy" variant="ghost" size="small" aria-label="Copy response" title="Copy" />
              <IconButton icon="restart" variant="ghost" size="small" aria-label="Regenerate response" title="Regenerate" />
              <IconButton icon="thumbs-up" variant="ghost" size="small" aria-label="Good response" title="Good response" />
              <IconButton icon="thumbs-down" variant="ghost" size="small" aria-label="Bad response" title="Bad response" />
              <IconButton icon="share" variant="ghost" size="small" aria-label="Share response" title="Share" />
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const AIResponseWithMapDirections: Story = {
  name: '20 AI Response with Map Directions',
  render: () => {
    const { colors } = useTheme();

    const routeMarkers: MapMarker[] = [
      { id: 'start', longitude: 151.2093, latitude: -33.8688, color: '#198038', popup: '<strong>Start: Sydney CBD</strong><br/>Your starting point' },
      { id: 'waypoint1', longitude: 151.2153, latitude: -33.8568, color: '#0F62FE', popup: '<strong>Stop 1: Opera House</strong><br/>15 min walk' },
      { id: 'waypoint2', longitude: 151.2111, latitude: -33.8523, color: '#0F62FE', popup: '<strong>Stop 2: Harbour Bridge</strong><br/>10 min walk' },
      { id: 'end', longitude: 151.1957, latitude: -33.8568, color: '#DA1E28', popup: '<strong>End: Milsons Point</strong><br/>Final destination' },
    ];

    const directions = [
      { step: 1, instruction: 'Start at Sydney CBD (George Street)', distance: '0 km', duration: '-', icon: 'location' },
      { step: 2, instruction: 'Head north on George Street toward Circular Quay', distance: '0.8 km', duration: '10 min', icon: 'arrow-up' },
      { step: 3, instruction: 'Turn right and walk along the waterfront to the Opera House', distance: '0.5 km', duration: '7 min', icon: 'arrow-right' },
      { step: 4, instruction: 'Continue west along the harbour foreshore', distance: '0.6 km', duration: '8 min', icon: 'arrow-left' },
      { step: 5, instruction: 'Walk across Sydney Harbour Bridge', distance: '1.1 km', duration: '15 min', icon: 'arrow-up' },
      { step: 6, instruction: 'Arrive at Milsons Point', distance: '3.0 km total', duration: '40 min total', icon: 'flag' },
    ];

    return (
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'flex-start', maxWidth: '800px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '6px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <AIIcon size={32} />
          </div>
          <div style={{ maxWidth: '100%', padding: '0 16px 12px 0', color: colors.textPrimary, flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ color: colors.primaryNight, fontFamily: 'var(--font-family-noto)', fontSize: '14px', fontWeight: 600, lineHeight: '21px' }}>Objective Intelligence</span>
              <span style={{ color: colors.grey700, fontFamily: 'var(--font-family-noto)', fontSize: '14px', fontWeight: 500, lineHeight: '21px' }}>2:30 PM</span>
            </div>
            <p style={{ margin: '0 0 16px 0', fontSize: '14px', lineHeight: 1.5, fontFamily: 'var(--font-family-noto)' }}>
              Here are the walking directions from Sydney CBD to Milsons Point via the Opera House and Harbour Bridge:
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 350px', backgroundColor: colors.paper, border: `1px solid ${colors.border}`, borderRadius: '8px', overflow: 'hidden' }}>
                <Maps
                  longitude={151.2050}
                  latitude={-33.8600}
                  zoom={14}
                  height="300px"
                  markers={routeMarkers}
                  tileStyle="standard"
                />
              </div>
              <div style={{ flex: '1 1 280px', backgroundColor: colors.paper, border: `1px solid ${colors.border}`, borderRadius: '8px', padding: '16px', maxHeight: '300px', overflowY: 'auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', paddingBottom: '12px', borderBottom: `1px solid ${colors.border}` }}>
                  <Icon name="directions" size={20} color={colors.primaryMain} />
                  <span style={{ fontWeight: 600, fontSize: '14px', color: colors.textPrimary }}>Walking Directions</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {directions.map((dir, index) => (
                    <div
                      key={dir.step}
                      style={{
                        display: 'flex',
                        gap: '12px',
                        padding: '10px 0',
                        borderBottom: index < directions.length - 1 ? `1px solid ${colors.grey200}` : 'none',
                      }}
                    >
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: dir.step === 1 ? colors.successMain : dir.step === directions.length ? colors.errorMain : colors.primaryMain,
                        color: colors.textInverse,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 600,
                        flexShrink: 0,
                      }}>
                        {dir.step}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: colors.textPrimary, lineHeight: 1.4 }}>
                          {dir.instruction}
                        </p>
                        <p style={{ margin: 0, fontSize: '12px', color: colors.textSecondary }}>
                          {dir.distance} • {dir.duration}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ marginTop: '12px', padding: '12px', backgroundColor: colors.grey100, borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Icon name="information" size={18} color={colors.primaryMain} />
              <p style={{ margin: 0, fontSize: '13px', color: colors.textSecondary }}>
                Total distance: <strong style={{ color: colors.textPrimary }}>3.0 km</strong> • Estimated time: <strong style={{ color: colors.textPrimary }}>40 minutes</strong> walking
              </p>
            </div>
            <div style={{ display: 'flex', gap: '4px', marginTop: '12px' }}>
              <IconButton icon="copy" variant="ghost" size="small" aria-label="Copy response" title="Copy" />
              <IconButton icon="restart" variant="ghost" size="small" aria-label="Regenerate response" title="Regenerate" />
              <IconButton icon="thumbs-up" variant="ghost" size="small" aria-label="Good response" title="Good response" />
              <IconButton icon="thumbs-down" variant="ghost" size="small" aria-label="Bad response" title="Bad response" />
              <IconButton icon="share" variant="ghost" size="small" aria-label="Share response" title="Share" />
            </div>
          </div>
        </div>
      </div>
    );
  },
};
