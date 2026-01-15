import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useRef, useEffect } from 'react';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import IconButton from '../IconButton/IconButton';
import Input from '../Input/Input';
import Modal from '../Modal/Modal';
import NavigationRail from '../NavigationRail/NavigationRail';
import UserAvatar from '../UserAvatar/UserAvatar';
import { useTheme } from '../../../.storybook/theme-decorator';
import oiIcon from '../../assets/oi.svg';

const meta: Meta = {
  title: 'Design System/Components/AI Q&A',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs', 'Ready for dev'],
};

export default meta;
type Story = StoryObj;

const AIIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <img src={oiIcon} alt="Objective Intelligence" width={size} height={size} style={{ borderRadius: '4px' }} />
);

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIChatProps {
  initialMessages?: Message[];
  onSendMessage?: (message: string) => void;
  placeholder?: string;
  title?: string;
  showHeader?: boolean;
  onClose?: () => void;
  height?: string;
}

const AIChat: React.FC<AIChatProps> = ({
  initialMessages = [],
  onSendMessage,
  placeholder = 'Ask a question...',
  title = 'Objective Intelligence',
  showHeader = true,
  onClose,
  height = '100%',
}) => {
  const { colors } = useTheme();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isInitialMount = useRef(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const responses: Record<string, string> = {
        default: "I'm here to help! Could you provide more details about your question?",
        hello: "Hello! How can I assist you today?",
        help: "I can help you with various tasks like answering questions, explaining concepts, or providing guidance. What would you like to know?",
        thanks: "You're welcome! Is there anything else I can help you with?",
      };

      const lowerMessage = userMessage.toLowerCase();
      let response = responses.default;

      if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        response = responses.hello;
      } else if (lowerMessage.includes('help')) {
        response = responses.help;
      } else if (lowerMessage.includes('thank')) {
        response = responses.thanks;
      } else if (lowerMessage.includes('what') || lowerMessage.includes('how')) {
        response = `That's a great question about "${userMessage}". Let me explain: This is a simulated response demonstrating the AI chat functionality. In a real implementation, this would connect to an AI service to provide accurate answers.`;
      }

      const aiMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    onSendMessage?.(inputValue.trim());
    setInputValue('');
    simulateAIResponse(inputValue.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height,
        backgroundColor: colors.paper,
        overflow: 'hidden',
      }}
    >
      {showHeader && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px',
            borderBottom: `1px solid ${colors.grey300}`,
            backgroundColor: colors.paper,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AIIcon size={36} />
            </div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: colors.textPrimary }}>{title}</h3>
          </div>
          {onClose && (
            <IconButton icon="close" variant="ghost" size="small" onClick={onClose} aria-label="Close chat" />
          )}
        </div>
      )}

      <div
        style={{
          flex: 1,
          overflow: 'auto',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: colors.textSecondary }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '12px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}
            >
              <AIIcon size={64} />
            </div>
            <h4 style={{ margin: '0 0 8px 0', color: colors.textPrimary }}>How can I help you today?</h4>
            <p style={{ margin: 0, fontSize: '14px' }}>Ask me anything and I'll do my best to assist you.</p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              display: 'flex',
              flexDirection: message.role === 'user' ? 'row-reverse' : 'row',
              gap: '12px',
              alignItems: 'flex-start',
            }}
          >
            {message.role === 'user' ? (
              <div style={{ flexShrink: 0 }}>
                <UserAvatar size="lg" user={{ name: 'User' }} showPopup={false} />
              </div>
            ) : (
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
                padding: message.role === 'user' ? '12px 16px' : '0 16px 12px 0',
                borderRadius: message.role === 'user' ? '0px' : undefined,
                backgroundColor: message.role === 'user' ? colors.grey300 : undefined,
                borderLeft: message.role === 'user' ? `4px solid ${colors.grey500}` : undefined,
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
                  {message.role === 'user' ? 'User' : 'Objective Intelligence'}
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
                  {formatTime(message.timestamp)}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.5, whiteSpace: 'pre-wrap', fontFamily: 'var(--font-family-noto)' }}>{message.content}</p>
              {message.role === 'assistant' && (
                <div style={{ display: 'flex', gap: '4px', marginTop: '12px' }}>
                  <IconButton icon="copy" variant="ghost" size="small" aria-label="Copy response" title="Copy" />
                  <IconButton icon="restart" variant="ghost" size="small" aria-label="Regenerate response" title="Regenerate" />
                  <IconButton icon="thumbs-up" variant="ghost" size="small" aria-label="Good response" title="Good response" />
                  <IconButton icon="thumbs-down" variant="ghost" size="small" aria-label="Bad response" title="Bad response" />
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
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
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '10px 16px',
          gap: '4px',
          alignSelf: 'stretch',
          borderTop: `1px solid ${colors.default}`,
        }}
        onKeyDown={handleKeyDown}
      >
        <Input
          value={inputValue}
          onChange={setInputValue}
          placeholder={placeholder}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <IconButton
            icon="add"
            variant="ghost"
            aria-label="Add attachment"
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            <IconButton
              icon="microphone"
              variant="ghost"
              aria-label="Voice input"
            />
            <IconButton
              icon="send"
              variant={inputValue.trim() && !isTyping ? 'primary' : 'disabled'}
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              aria-label="Send message"
            />
          </div>
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

interface InlinePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string;
}

const InlinePanel: React.FC<InlinePanelProps> = ({ isOpen, onClose, title, children, width = '380px' }) => {
  const { colors } = useTheme();

  if (!isOpen) return null;

  return (
    <div
      style={{
        width,
        height: '100%',
        backgroundColor: colors.paper,
        borderLeft: `1px solid ${colors.grey300}`,
        borderRight: `1px solid ${colors.default}`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'width 0.2s ease-in-out',
      }}
    >
      {children}
    </div>
  );
};

const sampleMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Hello! I\'m your AI assistant. How can I help you today?',
    timestamp: new Date(Date.now() - 60000),
  },
  {
    id: '2',
    role: 'user',
    content: 'What features does this design system include?',
    timestamp: new Date(Date.now() - 30000),
  },
  {
    id: '3',
    role: 'assistant',
    content: 'The ODL Design System includes over 40 components such as Buttons, Inputs, Tables, Cards, Navigation Rails, Modals, and more. It\'s built with React and TypeScript, featuring full accessibility support and theme customization.',
    timestamp: new Date(),
  },
];

export const Default: Story = {
  name: '01 Default Chat',
  render: () => {
    const { colors } = useTheme();
    return (
      <div style={{ height: '600px', maxWidth: '500px', margin: '20px auto', border: `1px solid ${colors.border}`, borderRadius: '12px', overflow: 'hidden' }}>
        <AIChat
          initialMessages={sampleMessages}
          title="Objective Intelligence"
          onSendMessage={(msg) => console.log('Sent:', msg)}
        />
      </div>
    );
  },
};

export const EmptyState: Story = {
  name: '02 Empty State',
  render: () => {
    const { colors } = useTheme();
    return (
      <div style={{ height: '600px', maxWidth: '500px', margin: '20px auto', border: `1px solid ${colors.border}`, borderRadius: '12px', overflow: 'hidden' }}>
        <AIChat
          title="Objective Intelligence"
          placeholder="Type your question here..."
          onSendMessage={(msg) => console.log('Sent:', msg)}
        />
      </div>
    );
  },
};

export const RightPanelVariant: Story = {
  name: '03 Right Panel',
  render: () => {
    const { colors } = useTheme();
    const [isOpen, setIsOpen] = useState(true);
    const [currentPath, setCurrentPath] = useState('/dashboard');

    const menuItems = [
      { id: 'dashboard', label: 'Dashboard', iconName: 'dashboard', path: '/dashboard', description: 'Dashboard' },
      { id: 'documents', label: 'Documents', iconName: 'document', path: '/documents', description: 'Documents' },
      { id: 'settings', label: 'Settings', iconName: 'settings', path: '/settings', description: 'Settings' },
    ];

    const rightMenuItems = [
      { id: 'ai-chat', label: 'Objective Intelligence', iconName: 'chat', path: '/ai-chat', description: 'Ask AI' },
      { id: 'help', label: 'Help', iconName: 'help', path: '/help', description: 'Help' },
    ];

    const handleRightNavigate = (path: string) => {
      if (path === '/ai-chat') {
        setIsOpen(!isOpen);
      }
    };

    return (
      <div style={{ height: '100vh', display: 'flex' }}>
        <NavigationRail
          currentPath={currentPath}
          onNavigate={setCurrentPath}
          menuItems={menuItems}
          collapsed={true}
          position="left"
          showTooltips={true}
        />

        <div style={{ flex: 1, padding: '24px', backgroundColor: colors.grey300 }}>
          <h1>Main Content Area</h1>
          <p>Click the Objective Intelligence icon on the right to toggle the chat panel.</p>
          <p>The AI Q&A panel appears beside the NavigationRail when activated.</p>
        </div>

        <div style={{ display: 'flex', height: '100%' }}>
          <InlinePanel isOpen={isOpen} onClose={() => setIsOpen(false)} title="Objective Intelligence" width="380px">
            <AIChat
              initialMessages={sampleMessages}
              title="Objective Intelligence"
              showHeader={true}
              onClose={() => setIsOpen(false)}
              onSendMessage={(msg) => console.log('Sent:', msg)}
            />
          </InlinePanel>

          <NavigationRail
            currentPath={isOpen ? '/ai-chat' : ''}
            onNavigate={handleRightNavigate}
            menuItems={rightMenuItems}
            collapsed={true}
            position="right"
            showTooltips={true}
          />
        </div>
      </div>
    );
  },
};

export const PopupVariant: Story = {
  name: '04 Popup',
  render: () => {
    const { colors } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
      <div style={{ height: '100vh', padding: '24px', backgroundColor: colors.grey300, position: 'relative' }}>
        <h1>Popup AI Chat</h1>
        <p>Click the chat button in the bottom-right corner to open the AI assistant popup.</p>

        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '60px',
            height: '60px',
            borderRadius: isOpen ? '50%' : '12px',
            border: 'none',
            background: isOpen ? colors.grey600 : 'transparent',
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            overflow: 'hidden',
          }}
          aria-label="Open AI Chat"
        >
          {isOpen ? <Icon name="close" size={28} /> : <AIIcon size={60} />}
        </button>

        {isOpen && (
          <div
            style={{
              position: 'fixed',
              bottom: '100px',
              right: '24px',
              width: '400px',
              height: '500px',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              overflow: 'hidden',
              zIndex: 999,
              animation: 'slideUp 0.3s ease-out',
            }}
          >
            <AIChat
              initialMessages={sampleMessages}
              title="Objective Intelligence"
              showHeader={true}
              onClose={() => setIsOpen(false)}
              onSendMessage={(msg) => console.log('Sent:', msg)}
            />
          </div>
        )}

        <style>{`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  },
};

export const ModalVariant: Story = {
  name: '05 Modal',
  render: () => {
    const { colors } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ height: '100vh', padding: '24px', backgroundColor: colors.grey300 }}>
        <h1>Modal AI Chat</h1>
        <p>Click the button below to open the AI assistant in a modal dialog.</p>

        <Button variant="primary" onClick={() => setIsOpen(true)} icon={<AIIcon size={16} />}>
          Open Objective Intelligence
        </Button>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Objective Intelligence"
          size="large"
        >
          <div style={{ height: '500px', margin: '-24px', marginTop: '-16px' }}>
            <AIChat
              initialMessages={sampleMessages}
              showHeader={false}
              onSendMessage={(msg) => console.log('Sent:', msg)}
            />
          </div>
        </Modal>
      </div>
    );
  },
};

export const FullPageVariant: Story = {
  name: '06 Full Page',
  render: () => {
    const { colors } = useTheme();
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            padding: '16px 24px',
            borderBottom: `1px solid ${colors.border}`,
            backgroundColor: colors.paper,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <Icon name="arrow-left" size={20} style={{ cursor: 'pointer' }} />
          <h2 style={{ margin: 0, fontSize: '18px', color: colors.textPrimary }}>AI Q&A Center</h2>
        </div>
        <div style={{ flex: 1, display: 'flex' }}>
          <div
            style={{
              width: '280px',
              borderRight: `1px solid ${colors.border}`,
              padding: '16px',
              backgroundColor: colors.default,
            }}
          >
            <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', color: colors.textSecondary }}>Recent Conversations</h4>
            {['Design System Questions', 'Component Usage', 'Theme Customization'].map((item, i) => (
              <div
                key={i}
                style={{
                  padding: '12px',
                  marginBottom: '8px',
                  backgroundColor: i === 0 ? colors.selectedLight : colors.paper,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  border: i === 0 ? `1px solid ${colors.primaryMain}` : `1px solid ${colors.border}`,
                }}
              >
                <div style={{ fontWeight: 500, fontSize: '14px', color: colors.textPrimary }}>{item}</div>
                <div style={{ fontSize: '12px', color: colors.textMuted, marginTop: '4px' }}>
                  {i === 0 ? 'Active' : `${i + 1} days ago`}
                </div>
              </div>
            ))}
            <button
              style={{
                width: '100%',
                padding: '12px',
                marginTop: '16px',
                border: `1px dashed ${colors.grey600}`,
                borderRadius: '8px',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                color: colors.textSecondary,
              }}
            >
              <Icon name="add" size={16} />
              New Conversation
            </button>
          </div>
          <div style={{ flex: 1 }}>
            <AIChat
              initialMessages={sampleMessages}
              showHeader={false}
              placeholder="Ask anything about the design system..."
              onSendMessage={(msg) => console.log('Sent:', msg)}
            />
          </div>
        </div>
      </div>
    );
  },
};

export const MinimalVariant: Story = {
  name: '07 Minimal',
  render: () => {
    const { colors } = useTheme();
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');

    const handleSend = () => {
      if (!inputValue.trim()) return;
      const userMsg: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: inputValue,
        timestamp: new Date(),
      };
      setMessages([...messages, userMsg]);
      setInputValue('');

      setTimeout(() => {
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `Response to: "${inputValue}"`,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiMsg]);
      }, 1000);
    };

    return (
      <div style={{ maxWidth: '600px', margin: '40px auto', padding: '24px' }}>
        <h2 style={{ marginBottom: '24px' }}>Quick Q&A</h2>

        <div
          style={{
            border: `1px solid ${colors.grey300}`,
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          {messages.length > 0 && (
            <div style={{ maxHeight: '300px', overflow: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                    gap: '12px',
                    alignItems: 'flex-start',
                  }}
                >
                  {msg.role === 'user' ? (
                    <div style={{ flexShrink: 0 }}>
                      <UserAvatar size="lg" user={{ name: 'User' }} showPopup={false} />
                    </div>
                  ) : (
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
                      padding: msg.role === 'user' ? '12px 16px' : '0 16px 12px 0',
                      borderRadius: msg.role === 'user' ? '0px' : undefined,
                      backgroundColor: msg.role === 'user' ? colors.grey300 : undefined,
                      borderLeft: msg.role === 'user' ? `4px solid ${colors.grey500}` : undefined,
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
                        {msg.role === 'user' ? 'User' : 'Objective Intelligence'}
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
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.5, whiteSpace: 'pre-wrap', fontFamily: 'var(--font-family-noto)' }}>{msg.content}</p>
                    {msg.role === 'assistant' && (
                      <div style={{ display: 'flex', gap: '4px', marginTop: '12px' }}>
                        <IconButton icon="copy" variant="ghost" size="small" aria-label="Copy response" title="Copy" />
                        <IconButton icon="restart" variant="ghost" size="small" aria-label="Regenerate response" title="Regenerate" />
                        <IconButton icon="thumbs-up" variant="ghost" size="small" aria-label="Good response" title="Good response" />
                        <IconButton icon="thumbs-down" variant="ghost" size="small" aria-label="Bad response" title="Bad response" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '10px 16px',
              gap: '4px',
              borderTop: `1px solid ${colors.default}`,
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          >
            <Input
              value={inputValue}
              onChange={setInputValue}
              placeholder="Ask a question..."
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <IconButton
                icon="add"
                variant="ghost"
                aria-label="Add attachment"
              />
              <div style={{ display: 'flex', gap: '8px' }}>
                <IconButton
                  icon="microphone"
                  variant="ghost"
                  aria-label="Voice input"
                />
                <IconButton
                  icon="send"
                  variant={inputValue.trim() ? 'primary' : 'disabled'}
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  aria-label="Send message"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const WithSuggestedQuestions: Story = {
  name: '08 With Suggestions',
  render: () => {
    const { colors } = useTheme();
    const [messages, setMessages] = useState<Message[]>([]);

    const suggestions = [
      'How do I customize the theme?',
      'What components are available?',
      'How to use the Table component?',
      'Explain the NavigationRail props',
    ];

    const handleSuggestionClick = (question: string) => {
      const userMsg: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: question,
        timestamp: new Date(),
      };
      setMessages([userMsg]);

      setTimeout(() => {
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `Great question! Here's information about "${question}": This is a simulated response. In production, this would provide detailed information based on your query.`,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiMsg]);
      }, 1500);
    };

    return (
      <div style={{ height: '600px', maxWidth: '500px', margin: '20px auto', border: `1px solid ${colors.border}`, borderRadius: '12px', overflow: 'hidden' }}>
        <AIChat
          initialMessages={messages}
          title="Objective Intelligence"
          onSendMessage={(msg) => console.log('Sent:', msg)}
        />
        {messages.length === 0 && (
          <div style={{ padding: '0 16px 16px', backgroundColor: colors.paper }}>
            <p style={{ fontSize: '12px', color: colors.textSecondary, marginBottom: '12px' }}>Suggested questions:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {suggestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestionClick(q)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '16px',
                    border: `1px solid ${colors.grey500}`,
                    backgroundColor: colors.paper,
                    fontSize: '13px',
                    cursor: 'pointer',
                    color: colors.textPrimary,
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
};
