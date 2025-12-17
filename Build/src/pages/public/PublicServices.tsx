import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import Icon from '../../components/Icon/Icon';
import Cards from '../../components/Cards/Cards';

/**
 * PUBLIC SERVICES PAGE
 * Demonstrates ODL Cards component with custom public styling
 */
const PublicServices: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services = [
    {
      id: '1',
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies',
      icon: 'application-web',
      color: '#3B82F6'
    },
    {
      id: '2', 
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications for iOS and Android',
      icon: 'mobile',
      color: '#10B981'
    },
    {
      id: '3',
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and deployment services',
      icon: 'cloud',
      color: '#8B5CF6'
    },
    {
      id: '4',
      title: 'Data Analytics',
      description: 'Transform your data into actionable insights',
      icon: 'analytics',
      color: '#F59E0B'
    },
    {
      id: '5',
      title: 'Security Services',
      description: 'Comprehensive security audits and implementation',
      icon: 'security',
      color: '#EF4444'
    },
    {
      id: '6',
      title: 'Consulting',
      description: 'Expert technical consulting and architecture design',
      icon: 'user-multiple',
      color: '#06B6D4'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB' }}>
      {/* Header Section */}
      <section style={{
        background: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)',
        padding: '60px 40px',
        color: 'white',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '42px', 
          fontWeight: '700',
          marginBottom: '16px'
        }}>
          Our Services
        </h1>
        <p style={{ 
          fontSize: '18px',
          opacity: 0.95,
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Comprehensive solutions tailored to your business needs
        </p>
      </section>

      {/* Services Grid with Custom Styled Cards */}
      <section style={{ padding: '60px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '30px'
        }}>
          {services.map((service) => (
            <div
              key={service.id}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '30px',
                boxShadow: selectedService === service.id 
                  ? `0 20px 40px ${service.color}33`
                  : '0 4px 12px rgba(0,0,0,0.08)',
                border: selectedService === service.id 
                  ? `2px solid ${service.color}`
                  : '2px solid transparent',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedService(service.id)}
              onMouseEnter={(e) => {
                if (selectedService !== service.id) {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.12)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedService !== service.id) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                }
              }}
            >
              {/* Icon with custom background */}
              <div style={{
                width: '70px',
                height: '70px',
                borderRadius: '16px',
                background: `linear-gradient(135deg, ${service.color}22, ${service.color}44)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px'
              }}>
                <Icon name={service.icon} size={36} color={service.color} />
              </div>

              {/* Content */}
              <h3 style={{ 
                fontSize: '24px', 
                fontWeight: '600',
                marginBottom: '12px',
                color: '#1F2937'
              }}>
                {service.title}
              </h3>
              <p style={{ 
                color: '#6B7280',
                lineHeight: '1.6',
                marginBottom: '24px'
              }}>
                {service.description}
              </p>

              {/* Custom styled button */}
              <Button
                variant="secondary"
                style={{
                  background: selectedService === service.id ? service.color : 'transparent',
                  color: selectedService === service.id ? 'white' : service.color,
                  border: `2px solid ${service.color}`,
                  borderRadius: '8px',
                  padding: '10px 20px',
                  fontWeight: '600',
                  width: '100%',
                  transition: 'all 0.3s ease'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(`Learn more about ${service.title}`);
                }}
              >
                Learn More →
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)',
        padding: '80px 40px',
        textAlign: 'center',
        color: 'white'
      }}>
        <h2 style={{ fontSize: '36px', marginBottom: '20px' }}>
          Need a Custom Solution?
        </h2>
        <p style={{ fontSize: '18px', marginBottom: '40px', opacity: 0.9 }}>
          Let's discuss how we can help transform your business
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <Button
            variant="primary"
            size="large"
            style={{
              background: 'white',
              color: '#1F2937',
              padding: '14px 32px',
              borderRadius: '12px',
              fontWeight: '600',
              fontSize: '16px'
            }}
          >
            Schedule Consultation
          </Button>
          <Button
            variant="secondary"
            size="large"
            style={{
              background: 'transparent',
              color: 'white',
              border: '2px solid white',
              padding: '14px 32px',
              borderRadius: '12px',
              fontWeight: '600',
              fontSize: '16px'
            }}
          >
            View Portfolio
          </Button>
        </div>
      </section>
    </div>
  );
};

export default PublicServices;