import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Icon from '../../components/Icon/Icon';

/**
 * PUBLIC CONTACT PAGE
 * Demonstrates ODL Input and Button components with custom public styling
 */
const PublicContact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F3F4F6' }}>
      {/* Header */}
      <section style={{
        background: 'linear-gradient(135deg, #EC4899 0%, #F97316 100%)',
        padding: '60px 40px',
        color: 'white',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '42px', fontWeight: '700', marginBottom: '16px' }}>
          Get in Touch
        </h1>
        <p style={{ fontSize: '18px', opacity: 0.95 }}>
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </section>

      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '60px' }}>
          
          {/* Contact Info Sidebar */}
          <div>
            <h2 style={{ fontSize: '28px', marginBottom: '30px', color: '#1F2937' }}>
              Contact Information
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {[
                { icon: 'location', label: 'Address', value: '123 Business Ave, Suite 100\nSan Francisco, CA 94105' },
                { icon: 'phone', label: 'Phone', value: '+1 (555) 123-4567' },
                { icon: 'email', label: 'Email', value: 'hello@isovist.com' },
                { icon: 'time', label: 'Hours', value: 'Monday - Friday\n9:00 AM - 6:00 PM PST' }
              ].map((item, index) => (
                <div key={index} style={{ display: 'flex', gap: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #EC489922, #F9731622)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Icon name={item.icon} size={24} color="#EC4899" />
                  </div>
                  <div>
                    <p style={{ fontWeight: '600', color: '#374151', marginBottom: '4px' }}>
                      {item.label}
                    </p>
                    <p style={{ color: '#6B7280', whiteSpace: 'pre-line' }}>
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div style={{ marginTop: '40px' }}>
              <p style={{ fontWeight: '600', color: '#374151', marginBottom: '16px' }}>
                Follow Us
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                {['logo-twitter', 'logo-linkedin', 'logo-github'].map((social, index) => (
                  <button
                    key={index}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB',
                      background: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#EC4899';
                      e.currentTarget.style.borderColor = '#EC4899';
                      const icon = e.currentTarget.querySelector('svg');
                      if (icon) (icon as SVGElement).style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.borderColor = '#E5E7EB';
                      const icon = e.currentTarget.querySelector('svg');
                      if (icon) (icon as SVGElement).style.color = '#6B7280';
                    }}
                  >
                    <Icon name={social} size={20} color="#6B7280" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{ fontSize: '28px', marginBottom: '30px', color: '#1F2937' }}>
              Send Us a Message
            </h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <Input
                    label="Your Name"
                    value={formData.name}
                    onChange={(value) => setFormData({ ...formData, name: value })}
                    placeholder="John Doe"
                    required
                    style={{
                      borderRadius: '8px',
                      borderColor: '#E5E7EB',
                      fontSize: '16px'
                    }}
                  />
                </div>
                <div>
                  <Input
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(value) => setFormData({ ...formData, email: value })}
                    placeholder="john@example.com"
                    required
                    style={{
                      borderRadius: '8px',
                      borderColor: '#E5E7EB',
                      fontSize: '16px'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <Input
                    label="Phone Number"
                    type="tel"
                    value={formData.phone}
                    onChange={(value) => setFormData({ ...formData, phone: value })}
                    placeholder="+1 (555) 123-4567"
                    style={{
                      borderRadius: '8px',
                      borderColor: '#E5E7EB',
                      fontSize: '16px'
                    }}
                  />
                </div>
                <div>
                  <Input
                    label="Subject"
                    value={formData.subject}
                    onChange={(value) => setFormData({ ...formData, subject: value })}
                    placeholder="How can we help?"
                    required
                    style={{
                      borderRadius: '8px',
                      borderColor: '#E5E7EB',
                      fontSize: '16px'
                    }}
                  />
                </div>
              </div>

              <div>
                <Input
                  label="Message"
                  type="textarea"
                  value={formData.message}
                  onChange={(value) => setFormData({ ...formData, message: value })}
                  placeholder="Tell us more about your project..."
                  rows={6}
                  required
                  style={{
                    borderRadius: '8px',
                    borderColor: '#E5E7EB',
                    fontSize: '16px',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
                <Button
                  type="submit"
                  variant="primary"
                  size="large"
                  style={{
                    background: 'linear-gradient(135deg, #EC4899 0%, #F97316 100%)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '14px 32px',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: 'white',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(236, 72, 153, 0.3)',
                    transition: 'transform 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Send Message
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="large"
                  style={{
                    background: 'white',
                    borderRadius: '8px',
                    padding: '14px 32px',
                    fontSize: '16px',
                    fontWeight: '600',
                    border: '2px solid #E5E7EB',
                    color: '#6B7280'
                  }}
                  onClick={() => setFormData({ name: '', email: '', phone: '', subject: '', message: '' })}
                >
                  Clear Form
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PublicContact;