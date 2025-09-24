import React, { useState } from 'react';
import Input from '../components/Input/Input';
import Icon from '../components/Icon/Icon';
import Button from '../components/Button/Button';
import DemoBreadcrumb from '../components/DemoBreadcrumb/DemoBreadcrumb';
import BackToTop from '../components/BackToTop/BackToTop';
import styles from './TableDemo.module.css';

const InputDemo: React.FC = () => {
  const [selectedDemo, setSelectedDemo] = useState<'basic' | 'validation' | 'icons' | 'sizes' | 'states' | 'textarea' | 'interactive'>('basic');
  const [showCode, setShowCode] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  
  // Close calendar on click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.calendar-container')) {
        setShowCalendar(false);
      }
    };
    
    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showCalendar]);
  
  // Interactive demo states
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    search: '',
    url: '',
    number: '',
    bio: '',
    description: '',
    notes: ''
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
    url: false
  });

  const handleInputChange = (field: string, value: string) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
    
    // Basic validation
    if (field === 'email') {
      setErrors(prev => ({ ...prev, email: value !== '' && !value.includes('@') }));
    }
    if (field === 'password') {
      setErrors(prev => ({ ...prev, password: value !== '' && value.length < 8 }));
    }
    if (field === 'url') {
      setErrors(prev => ({ ...prev, url: value !== '' && !value.startsWith('http') }));
    }
  };

  // Simple calendar component
  const SimpleCalendar = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    const currentDate = new Date();
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
    
    const getDaysInMonth = (month: number, year: number) => {
      return new Date(year, month + 1, 0).getDate();
    };
    
    const getFirstDayOfMonth = (month: number, year: number) => {
      return new Date(year, month, 1).getDay();
    };
    
    const handleDateClick = (day: number) => {
      const date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      setSelectedDate(date);
      setShowCalendar(false);
    };
    
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} />);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          style={{
            padding: '0.5rem',
            border: 'none',
            background: day === currentDate.getDate() && 
                       currentMonth === currentDate.getMonth() && 
                       currentYear === currentDate.getFullYear() 
                       ? '#3b82f6' : 'transparent',
            color: day === currentDate.getDate() && 
                   currentMonth === currentDate.getMonth() && 
                   currentYear === currentDate.getFullYear() 
                   ? 'white' : '#374151',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            fontSize: '0.875rem'
          }}
          onMouseEnter={(e) => {
            if (!(day === currentDate.getDate() && 
                  currentMonth === currentDate.getMonth() && 
                  currentYear === currentDate.getFullYear())) {
              e.currentTarget.style.background = '#f3f4f6';
            }
          }}
          onMouseLeave={(e) => {
            if (!(day === currentDate.getDate() && 
                  currentMonth === currentDate.getMonth() && 
                  currentYear === currentDate.getFullYear())) {
              e.currentTarget.style.background = 'transparent';
            }
          }}
        >
          {day}
        </button>
      );
    }
    
    return (
      <div style={{
        position: 'absolute',
        top: '100%',
        right: 0,
        marginTop: '2px',
        background: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '0.5rem',
        padding: '1rem',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        zIndex: 9999,
        minWidth: '280px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <button
            onClick={() => {
              if (currentMonth === 0) {
                setCurrentMonth(11);
                setCurrentYear(currentYear - 1);
              } else {
                setCurrentMonth(currentMonth - 1);
              }
            }}
            style={{
              padding: '0.25rem',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer'
            }}
          >
            <Icon name="chevron-left" size={16} />
          </button>
          <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>
            {months[currentMonth]} {currentYear}
          </span>
          <button
            onClick={() => {
              if (currentMonth === 11) {
                setCurrentMonth(0);
                setCurrentYear(currentYear + 1);
              } else {
                setCurrentMonth(currentMonth + 1);
              }
            }}
            style={{
              padding: '0.25rem',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer'
            }}
          >
            <Icon name="chevron-right" size={16} />
          </button>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.25rem', marginBottom: '0.5rem' }}>
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
            <div key={day} style={{ 
              textAlign: 'center', 
              fontSize: '0.75rem', 
              color: '#6b7280',
              fontWeight: 500,
              padding: '0.25rem'
            }}>
              {day}
            </div>
          ))}
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.25rem' }}>
          {days}
        </div>
        
        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
          <button
            onClick={() => {
              const today = new Date();
              setCurrentMonth(today.getMonth());
              setCurrentYear(today.getFullYear());
              const date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
              setSelectedDate(date);
              setShowCalendar(false);
            }}
            style={{
              width: '100%',
              padding: '0.5rem',
              background: '#f3f4f6',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              color: '#374151'
            }}
          >
            Today
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.tableDemo}>
      {/* Breadcrumb Navigation */}
      <DemoBreadcrumb componentName="Input Component" />
      
      {/* Enhanced Header Section */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <h1>Input Component Showcase</h1>
            <p>Form input fields with validation, icons, and various states</p>
          </div>
          <div className={styles.headerActions}>
            <Button
              variant={showCode ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setShowCode(!showCode)}
            >
              {showCode ? 'Hide Code' : 'View Code'}
            </Button>
          </div>
        </div>
      </div>

      {/* Demo Selector */}
      <div className={styles.demoSelector}>
        <div className={styles.demoTabs}>
          {[
            { key: 'basic', label: 'Basic', desc: 'Standard input types', icon: '✏️' },
            { key: 'validation', label: 'Validation', desc: 'Error states & messages', icon: '✅' },
            { key: 'icons', label: 'With Icons', desc: 'Input fields with icons', icon: '🎨' },
            { key: 'sizes', label: 'Sizes', desc: 'Different input sizes', icon: '📏' },
            { key: 'states', label: 'States', desc: 'Disabled & readonly states', icon: '🔒' },
            { key: 'textarea', label: 'Textarea', desc: 'Multi-line text inputs', icon: '📝' },
            { key: 'interactive', label: 'Interactive', desc: 'Live form example', icon: '⚡' }
          ].map(demo => (
            <button
              key={demo.key}
              className={`${styles.demoTab} ${selectedDemo === demo.key ? styles.active : ''}`}
              onClick={() => setSelectedDemo(demo.key as any)}
            >
              <span className={styles.demoIcon}>{demo.icon}</span>
              <div className={styles.demoTabContent}>
                <span className={styles.demoLabel}>{demo.label}</span>
                <span className={styles.demoDesc}>{demo.desc}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Demo Content */}
      <div className={styles.demoContent}>
        {selectedDemo === 'basic' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Basic Input Types</h2>
              <p>Different input types for various data entry needs</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <div>
                  <Input
                    type="text"
                    label="Text Input"
                    placeholder="Enter text"
                    helperText="Standard text input field"
                  />
                </div>
                
                <div>
                  <Input
                    type="email"
                    label="Email Input"
                    placeholder="user@example.com"
                    helperText="Email address with validation"
                  />
                </div>
                
                <div>
                  <Input
                    type="password"
                    label="Password Input"
                    placeholder="Enter password"
                    helperText="Minimum 8 characters"
                  />
                </div>
                
                <div>
                  <Input
                    type="number"
                    label="Number Input"
                    placeholder="0"
                    helperText="Numeric values only"
                  />
                </div>
                
                <div>
                  <Input
                    type="tel"
                    label="Phone Input"
                    placeholder="+1 (555) 000-0000"
                    helperText="Phone number format"
                  />
                </div>
                
                <div>
                  <Input
                    type="url"
                    label="URL Input"
                    placeholder="https://example.com"
                    helperText="Website URL"
                  />
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Search Input (Application Style)</h3>
                  <Input
                    type="search"
                    placeholder="Search..."
                    icon={<Icon name="search" size={16} />}
                  />
                  <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                    Search input with the styling from the applications page: border-radius: 0, background: #f5f5f5, 2px grey bottom border
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'validation' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Input Validation</h2>
              <p>Error states and validation messages</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <div>
                  <Input
                    type="text"
                    label="Required Field"
                    placeholder="This field is required"
                    required
                    helperText="This field must be filled"
                  />
                </div>
                
                <div>
                  <Input
                    type="email"
                    label="Invalid Email"
                    value="invalid-email"
                    error
                    errorMessage="Please enter a valid email address"
                  />
                </div>
                
                <div>
                  <Input
                    type="password"
                    label="Weak Password"
                    value="12345"
                    error
                    errorMessage="Password must be at least 8 characters"
                  />
                </div>
                
                <div>
                  <Input
                    type="url"
                    label="Invalid URL"
                    value="not-a-url"
                    error
                    errorMessage="Please enter a valid URL starting with http:// or https://"
                  />
                </div>
                
                <div>
                  <Input
                    type="number"
                    label="Out of Range"
                    value="150"
                    error
                    errorMessage="Value must be between 0 and 100"
                  />
                </div>
                
                <div>
                  <Input
                    type="text"
                    label="Pattern Mismatch"
                    value="ABC123"
                    error
                    errorMessage="Must contain only lowercase letters"
                  />
                </div>
              </div>
              
              <div style={{ marginTop: '2rem', padding: '1rem', background: '#fef2f2', borderRadius: '0.5rem', border: '1px solid #fecaca' }}>
                <p style={{ fontSize: '0.875rem', color: '#dc2626' }}>
                  <strong>Validation:</strong> Inputs show error states with red bottom border and error messages below the field.
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'icons' && (
          <div className={styles.tableSection} style={{ overflow: 'visible' }}>
            <div className={styles.sectionHeader}>
              <h2>Inputs with Icons</h2>
              <p>Enhanced input fields with icon indicators</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px', position: 'relative', overflow: 'visible' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', position: 'relative', overflow: 'visible' }}>
                <div>
                  <Input
                    type="search"
                    label="Search"
                    placeholder="Search..."
                    icon={<Icon name="search" size={16} />}
                  />
                </div>
                
                <div>
                  <Input
                    type="email"
                    label="Email"
                    placeholder="Enter email"
                    icon={<Icon name="email" size={16} />}
                  />
                </div>
                
                <div>
                  <Input
                    type="text"
                    label="Username"
                    placeholder="Enter username"
                    icon={<Icon name="user" size={16} />}
                  />
                </div>
                
                <div>
                  <Input
                    type="password"
                    label="Password"
                    placeholder="Enter password"
                    icon={<Icon name="locked" size={16} />}
                  />
                </div>
                
                <div>
                  <Input
                    type="tel"
                    label="Phone"
                    placeholder="Enter phone"
                    icon={<Icon name="phone" size={16} />}
                  />
                </div>
                
                <div>
                  <Input
                    type="url"
                    label="Website"
                    placeholder="Enter URL"
                    icon={<Icon name="link" size={16} />}
                  />
                </div>

                <div>
                  <Input
                    type="text"
                    label="With Right Icon"
                    placeholder="Verified input"
                    iconRight={<Icon name="checkmark-filled" size={16} color="#10b981" />}
                  />
                </div>
                
                <div style={{ position: 'relative', zIndex: showCalendar ? 999 : 'auto' }} className="calendar-container">
                  <Input
                    type="text"
                    label="Calendar Date"
                    placeholder="Select date"
                    value={selectedDate}
                    onChange={(value) => setSelectedDate(value)}
                    iconRight={
                      <button
                        onClick={() => setShowCalendar(!showCalendar)}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          color: '#6b7280'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#3b82f6'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
                      >
                        <Icon name="calendar" size={16} />
                      </button>
                    }
                  />
                  {showCalendar && <SimpleCalendar />}
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'sizes' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Input Sizes</h2>
              <p>Different input sizes for various UI contexts</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Small Size</h3>
                  <div style={{ maxWidth: '400px' }}>
                    <Input
                      type="text"
                      size="sm"
                      label="Small Input"
                      placeholder="Small size input field"
                      helperText="Compact size for dense layouts"
                    />
                  </div>
                </div>
                
                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Medium Size (Default)</h3>
                  <div style={{ maxWidth: '400px' }}>
                    <Input
                      type="text"
                      size="md"
                      label="Medium Input"
                      placeholder="Medium size input field"
                      helperText="Standard size for most use cases"
                    />
                  </div>
                </div>
                
                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Large Size</h3>
                  <div style={{ maxWidth: '400px' }}>
                    <Input
                      type="text"
                      size="lg"
                      label="Large Input"
                      placeholder="Large size input field"
                      helperText="Prominent size for important inputs"
                    />
                  </div>
                </div>

                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Size Comparison</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', maxWidth: '800px' }}>
                    <Input type="text" size="sm" placeholder="Small" />
                    <Input type="text" size="md" placeholder="Medium" />
                    <Input type="text" size="lg" placeholder="Large" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'states' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Input States</h2>
              <p>Different states for user interaction control</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <div>
                  <Input
                    type="text"
                    label="Normal State"
                    placeholder="You can edit this"
                    helperText="Default editable state"
                  />
                </div>
                
                <div>
                  <Input
                    type="text"
                    label="Disabled State"
                    placeholder="Cannot edit"
                    disabled
                    helperText="Input is disabled"
                  />
                </div>
                
                <div>
                  <Input
                    type="text"
                    label="Read-only State"
                    value="Read-only value"
                    readOnly
                    helperText="Value cannot be changed"
                  />
                </div>
                
                <div>
                  <Input
                    type="text"
                    label="With Default Value"
                    value="Pre-filled value"
                    helperText="Input with initial value"
                  />
                </div>
                
                <div>
                  <Input
                    type="text"
                    label="Focus State"
                    placeholder="Click to see focus"
                    helperText="Blue border on focus"
                  />
                </div>
                
                <div>
                  <Input
                    type="text"
                    label="Hover State"
                    placeholder="Hover to see effect"
                    helperText="Blue bottom border on hover"
                  />
                </div>
              </div>
              
              <div style={{ marginTop: '2rem', padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  <strong>Note:</strong> The input styling follows the design pattern with border-radius: 0, background: #f5f5f5, and 2px grey bottom border.
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'textarea' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Textarea Inputs</h2>
              <p>Multi-line text inputs for longer content</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                <div>
                  <Input
                    type="textarea"
                    label="Basic Textarea"
                    placeholder="Enter your message here..."
                    rows={4}
                    helperText="Default textarea with 4 rows"
                  />
                </div>
                
                <div>
                  <Input
                    type="textarea"
                    label="Small Textarea"
                    placeholder="Brief description..."
                    rows={2}
                    size="sm"
                    helperText="Small size with 2 rows"
                  />
                </div>
                
                <div>
                  <Input
                    type="textarea"
                    label="Large Textarea"
                    placeholder="Detailed information..."
                    rows={6}
                    size="lg"
                    helperText="Large size with 6 rows"
                  />
                </div>
                
                <div>
                  <Input
                    type="textarea"
                    label="With Character Count"
                    value={formValues.bio}
                    onChange={(value) => setFormValues(prev => ({ ...prev, bio: value }))}
                    placeholder="Tell us about yourself..."
                    rows={4}
                    helperText={`${formValues.bio.length}/500 characters`}
                  />
                </div>
                
                <div>
                  <Input
                    type="textarea"
                    label="Non-resizable"
                    placeholder="Fixed size textarea..."
                    rows={4}
                    resize="none"
                    helperText="Resize disabled"
                  />
                </div>
                
                <div>
                  <Input
                    type="textarea"
                    label="With Validation"
                    value={formValues.description}
                    onChange={(value) => setFormValues(prev => ({ ...prev, description: value }))}
                    placeholder="Enter at least 10 characters..."
                    rows={4}
                    error={formValues.description.length > 0 && formValues.description.length < 10}
                    errorMessage="Description must be at least 10 characters"
                    helperText="Minimum 10 characters required"
                  />
                </div>
                
                <div>
                  <Input
                    type="textarea"
                    label="Disabled Textarea"
                    value="This content cannot be edited"
                    rows={3}
                    disabled
                    helperText="Disabled state"
                  />
                </div>
                
                <div>
                  <Input
                    type="textarea"
                    label="Read-only Textarea"
                    value="This is read-only content that can be selected but not modified."
                    rows={3}
                    readOnly
                    helperText="Read-only state"
                  />
                </div>
                
                <div>
                  <Input
                    type="textarea"
                    label="Required Field"
                    placeholder="This field is required..."
                    rows={4}
                    required
                    helperText="Required textarea field"
                  />
                </div>
              </div>
              
              <div style={{ marginTop: '2rem', padding: '1rem', background: '#f0f9ff', borderRadius: '0.5rem', border: '1px solid #0284c7' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#0c4a6e' }}>Textarea Features:</h4>
                <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#475569' }}>
                  <li>Configurable rows (height)</li>
                  <li>Resize control (none, vertical, horizontal, both)</li>
                  <li>All standard input features (validation, states, sizes)</li>
                  <li>Character counting support</li>
                  <li>Consistent styling with other inputs</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'interactive' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Interactive Form Example</h2>
              <p>Live form with validation and feedback</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <Input
                      type="text"
                      label="Full Name"
                      placeholder="John Doe"
                      value={formValues.name}
                      onChange={(value) => handleInputChange('name', value)}
                      required
                    />
                  </div>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <Input
                      type="email"
                      label="Email Address"
                      placeholder="john@example.com"
                      value={formValues.email}
                      onChange={(value) => handleInputChange('email', value)}
                      error={errors.email}
                      errorMessage={errors.email ? "Please enter a valid email address" : undefined}
                      required
                    />
                  </div>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <Input
                      type="password"
                      label="Password"
                      placeholder="Enter password"
                      value={formValues.password}
                      onChange={(value) => handleInputChange('password', value)}
                      error={errors.password}
                      errorMessage={errors.password ? "Password must be at least 8 characters" : undefined}
                      helperText="Minimum 8 characters"
                      required
                    />
                  </div>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <Input
                      type="tel"
                      label="Phone Number"
                      placeholder="+1 (555) 000-0000"
                      value={formValues.phone}
                      onChange={(value) => handleInputChange('phone', value)}
                    />
                  </div>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <Input
                      type="url"
                      label="Website"
                      placeholder="https://example.com"
                      value={formValues.url}
                      onChange={(value) => handleInputChange('url', value)}
                      error={errors.url}
                      errorMessage={errors.url ? "URL must start with http:// or https://" : undefined}
                    />
                  </div>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <Input
                      type="search"
                      placeholder="Search in form..."
                      value={formValues.search}
                      onChange={(value) => handleInputChange('search', value)}
                      icon={<Icon name="search" size={16} />}
                    />
                  </div>
                  
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                    <button
                      type="submit"
                      style={{
                        padding: '0.75rem 1.5rem',
                        background: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.375rem',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: 500
                      }}
                    >
                      Submit Form
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFormValues({
                          name: '',
                          email: '',
                          password: '',
                          phone: '',
                          search: '',
                          url: '',
                          number: ''
                        });
                        setErrors({ email: false, password: false, url: false });
                      }}
                      style={{
                        padding: '0.75rem 1.5rem',
                        background: 'white',
                        color: '#6b7280',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.375rem',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: 500
                      }}
                    >
                      Reset Form
                    </button>
                  </div>
                </form>
                
                <div style={{ marginTop: '2rem', padding: '1rem', background: '#f0f9ff', borderRadius: '0.5rem', border: '1px solid #bae6fd' }}>
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>Form Values:</h4>
                  <pre style={{ fontSize: '0.75rem', color: '#0369a1' }}>
                    {JSON.stringify(formValues, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Code Example Panel */}
        {showCode && (
          <div className={styles.codePanel}>
            <h3>Code Example</h3>
            <pre className={styles.codeBlock}>
              <code>{getCodeExample(selectedDemo)}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Features Showcase */}
      <div className={styles.featuresShowcase}>
        <div className={styles.sectionHeader}>
          <h3>Input Component Features</h3>
          <p>Everything you need for form input fields</p>
        </div>
        
        <div className={styles.featureGrid}>
          <div className={styles.featureCategory}>
            <h4>✏️ Input Types</h4>
            <ul>
              <li>✓ Text input</li>
              <li>✓ Email validation</li>
              <li>✓ Password field</li>
              <li>✓ Number input</li>
              <li>✓ Search field</li>
              <li>✓ URL & Phone</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>🎨 Styling</h4>
            <ul>
              <li>✓ Border radius: 0</li>
              <li>✓ Background: #f5f5f5</li>
              <li>✓ 2px grey bottom border</li>
              <li>✓ Blue focus state</li>
              <li>✓ Hover effects</li>
              <li>✓ Size variants</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>✅ Validation</h4>
            <ul>
              <li>✓ Error states</li>
              <li>✓ Error messages</li>
              <li>✓ Required fields</li>
              <li>✓ Helper text</li>
              <li>✓ Pattern matching</li>
              <li>✓ Real-time validation</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>🔒 States</h4>
            <ul>
              <li>✓ Normal state</li>
              <li>✓ Disabled inputs</li>
              <li>✓ Read-only mode</li>
              <li>✓ Focus state</li>
              <li>✓ Hover state</li>
              <li>✓ Error state</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>⚡ Features</h4>
            <ul>
              <li>✓ Icon support</li>
              <li>✓ Left/right icons</li>
              <li>✓ Placeholder text</li>
              <li>✓ Labels</li>
              <li>✓ Helper text</li>
              <li>✓ onChange events</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>👍 Accessibility</h4>
            <ul>
              <li>✓ ARIA attributes</li>
              <li>✓ Label association</li>
              <li>✓ Error announcements</li>
              <li>✓ Keyboard navigation</li>
              <li>✓ Screen reader support</li>
              <li>✓ Focus management</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );

  // Helper function to generate code examples
  function getCodeExample(demo: string): string {
    const examples = {
      basic: `// Basic Input Types
<Input
  type="text"
  label="Text Input"
  placeholder="Enter text"
  helperText="Standard text input field"
/>

<Input
  type="search"
  placeholder="Search..."
  icon={<Icon name="search" size={16} />}
/>

// The input has these styles:
// border-radius: 0
// background: #f5f5f5
// border-bottom: 2px solid grey`,
      
      validation: `// Input with Validation
<Input
  type="email"
  label="Email Address"
  value={email}
  onChange={(value) => setEmail(value)}
  error={!email.includes('@')}
  errorMessage="Please enter a valid email"
  required
/>

<Input
  type="password"
  label="Password"
  value={password}
  onChange={(value) => setPassword(value)}
  error={password.length < 8}
  errorMessage="Must be at least 8 characters"
/>`,
      
      icons: `// Inputs with Icons
<Input
  type="search"
  placeholder="Search..."
  icon={<Icon name="search" size={16} />}
/>

<Input
  type="text"
  label="Verified"
  placeholder="Enter text"
  iconRight={<Icon name="checkmark-filled" size={16} color="#10b981" />}
/>`,
      
      sizes: `// Input Sizes
<Input type="text" size="sm" placeholder="Small input" />
<Input type="text" size="md" placeholder="Medium input" />
<Input type="text" size="lg" placeholder="Large input" />`,
      
      states: `// Input States
<Input type="text" placeholder="Normal" />
<Input type="text" placeholder="Disabled" disabled />
<Input type="text" value="Read-only" readOnly />
<Input type="text" value="With error" error errorMessage="Error message" />`,
      
      interactive: `// Form Example
const [email, setEmail] = useState('');
const [error, setError] = useState(false);

<Input
  type="email"
  label="Email"
  value={email}
  onChange={(value) => {
    setEmail(value);
    setError(value !== '' && !value.includes('@'));
  }}
  error={error}
  errorMessage={error ? "Invalid email" : undefined}
  required
/>`
    };
    
    return examples[demo as keyof typeof examples] || examples.basic;
  }
};

export default InputDemo;