import React from 'react';
import Button from '../../components/Button/Button';
import Icon from '../../components/Icon/Icon';

/**
 * PUBLIC HOME PAGE
 * This demonstrates using ODL components with custom styling
 * for public-facing pages in Isovist
 */
const PublicHome: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero Section with Custom Gradient */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '80px 40px',
        color: 'white',
        textAlign: 'center',
        borderRadius: '0 0 50px 50px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          fontSize: '48px', 
          fontWeight: '700',
          marginBottom: '20px',
          fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
        }}>
          Welcome to Isovist
        </h1>
        <p style={{ 
          fontSize: '20px', 
          marginBottom: '40px',
          opacity: 0.95
        }}>
          Experience the power of modern design with ODL components
        </p>
        
        {/* ODL Button with custom styling */}
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <Button 
            variant="primary"
            size="large"
            style={{
              background: 'white',
              color: '#764ba2',
              padding: '16px 40px',
              fontSize: '18px',
              borderRadius: '50px',
              fontWeight: '600',
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
              border: 'none'
            }}
            onClick={() => console.log('Get Started clicked')}
          >
            Get Started
          </Button>
          <Button 
            variant="secondary"
            size="large"
            style={{
              background: 'transparent',
              color: 'white',
              padding: '16px 40px',
              fontSize: '18px',
              borderRadius: '50px',
              border: '2px solid white',
              fontWeight: '600'
            }}
            onClick={() => console.log('Learn More clicked')}
          >
            Learn More
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '60px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ 
          fontSize: '36px', 
          textAlign: 'center', 
          marginBottom: '50px',
          color: '#333'
        }}>
          Our Features
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          {[
            { icon: 'rocket', title: 'Fast Performance', color: '#667eea' },
            { icon: 'security', title: 'Secure Platform', color: '#764ba2' },
            { icon: 'analytics', title: 'Advanced Analytics', color: '#f093fb' }
          ].map((feature, index) => (
            <div key={index} style={{
              padding: '30px',
              borderRadius: '20px',
              background: 'white',
              boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)';
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '15px',
                background: `linear-gradient(135deg, ${feature.color}22, ${feature.color}44)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <Icon name={feature.icon} size={32} color={feature.color} />
              </div>
              <h3 style={{ fontSize: '24px', marginBottom: '10px', color: '#333' }}>
                {feature.title}
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section style={{
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        padding: '60px 40px',
        textAlign: 'center',
        color: 'white',
        marginTop: '40px'
      }}>
        <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>
          Ready to Transform Your Experience?
        </h2>
        <p style={{ fontSize: '18px', marginBottom: '30px', opacity: 0.95 }}>
          Join thousands of users who trust Isovist
        </p>
        <Button
          variant="primary"
          size="large"
          style={{
            background: 'white',
            color: '#f5576c',
            padding: '14px 36px',
            fontSize: '16px',
            borderRadius: '30px',
            fontWeight: '600',
            boxShadow: '0 6px 20px rgba(0,0,0,0.15)'
          }}
        >
          Start Free Trial
        </Button>
      </section>
    </div>
  );
};

export default PublicHome;