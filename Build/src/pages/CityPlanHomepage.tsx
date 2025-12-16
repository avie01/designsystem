import React, { useState } from 'react';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import Icon from '../components/Icon/Icon';
import ODLTheme from '../styles/ODLTheme';
import backgroundBrisbane from '../Images/backgroundBrisbane.jpg';
import bclogo from '../Images/bclogo.png';

const CityPlanHomepage: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');

  const actionCards = [
    {
      id: '1',
      title: 'View Planning Scheme',
      icon: 'document',
      description: 'Access the complete planning scheme documents and maps',
      action: () => console.log('View Planning Scheme')
    },
    {
      id: '2', 
      title: 'View Map',
      icon: 'map',
      description: 'Interactive zoning and planning maps',
      action: () => console.log('View Map')
    },
    {
      id: '3',
      title: 'Submissions',
      icon: 'edit',
      description: 'Submit planning applications and view status',
      action: () => console.log('Submissions')
    }
  ];

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Fake Header */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E0E0E0',
        padding: `${ODLTheme.spacing[3]} ${ODLTheme.spacing[6]}`,
        display: 'flex',
        alignItems: 'center'
      }}>
        <img 
          src={bclogo} 
          alt="Brisbane City Plan" 
          style={{ 
            height: '60px',
            width: 'auto'
          }} 
        />
      </div>

      {/* Hero Section */}
      <div style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1)), url(${backgroundBrisbane})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: ODLTheme.spacing[6]
      }}>

        {/* Search Input */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: ODLTheme.spacing[4],
          maxWidth: '800px',
          width: '100%',
          alignItems: 'center',
          marginTop: '0px'
        }}>
          {/* Search Row */}
          <div style={{
            display: 'flex',
            gap: '1px',
            width: '100%',
            alignItems: 'flex-start'
          }}>
            <div style={{ flex: 1 }}>
              <Input
                type="text"
                placeholder="Search by address, property name, lot/plan, or suburb"
                value={searchValue}
                onChange={setSearchValue}
                size="lg"
                style={{
                  fontSize: ODLTheme.typography.fontSize.md,
                  padding: `${ODLTheme.spacing[3]} ${ODLTheme.spacing[4]}`,
                  minHeight: '44px'
                }}
              />
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={() => console.log('Search:', searchValue)}
              style={{
                padding: `${ODLTheme.spacing[3]} ${ODLTheme.spacing[4]}`,
                minHeight: '44px'
              }}
            >
              <Icon name="search" size={20} />
            </Button>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: ODLTheme.spacing[3],
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: ODLTheme.spacing[3]
          }}>
            {actionCards.map(card => (
              <Button
                key={card.id}
                variant="secondary"
                size="md"
                onClick={card.action}
              >
                <Icon 
                  name={card.icon as any}
                  size={20}
                />
                {card.title}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityPlanHomepage;