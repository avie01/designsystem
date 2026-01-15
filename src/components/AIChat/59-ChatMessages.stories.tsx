import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import UserAvatar from '../UserAvatar/UserAvatar';
import Button from '../Button/Button';
import IconButton from '../IconButton/IconButton';
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
