import React, { useState } from 'react';
import DemoNavigation from '../components/DemoNavigation';
import Cards from '../components/Cards/Cards';

const CardsDemo: React.FC = () => {
  const [selectedCards, setSelectedCards] = useState<Set<number>>(new Set());

  const handleCardSelect = (index: number, selected: boolean) => {
    const newSelected = new Set(selectedCards);
    if (selected) {
      newSelected.add(index);
    } else {
      newSelected.delete(index);
    }
    setSelectedCards(newSelected);
  };

  const handleInfoClick = (index: number) => {
    alert(`Info clicked for card ${index + 1}`);
  };

  const handleMenuClick = (index: number) => {
    alert(`Menu clicked for card ${index + 1}`);
  };

  return (
    <div>
      <DemoNavigation 
        title="Cards" 
        breadcrumbPath="ODL Components > Cards"
      />
      
      <div style={{ padding: '24px', maxWidth: '100%', margin: '0 auto', overflow: 'hidden' }}>
        <h1>Cards Component</h1>
        <p>
          A horizontal card component with checkbox, folder icon, text content, tag, and action icons. 
          Perfect for list items and document/file displays.
        </p>
        
        <div style={{ marginTop: '32px' }}>
          <h2>Default Cards</h2>
          <p>Basic card with all elements visible:</p>
          <div style={{ marginBottom: '16px' }}>
            <Cards />
          </div>
        </div>

        <div style={{ marginTop: '32px' }}>
          <h2>Interactive Cards</h2>
          <p>Cards with working selection and click handlers:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { title: "Document 1", subtitle: "First document in the list", tag: "fA7985" },
              { title: "Document 2", subtitle: "Second document in the list", tag: "bC1234" },
              { title: "Document 3", subtitle: "Third document in the list", tag: "dE5678" },
            ].map((doc, index) => (
              <Cards
                key={index}
                selected={selectedCards.has(index)}
                title={doc.title}
                subtitle={doc.subtitle}
                tag={doc.tag}
                onSelect={(selected) => handleCardSelect(index, selected)}
                onInfoClick={() => handleInfoClick(index)}
                onMenuClick={() => handleMenuClick(index)}
              />
            ))}
          </div>
        </div>

        <div style={{ marginTop: '32px' }}>
          <h2>Variations</h2>
          <p>Different card configurations:</p>
          
          <div style={{ marginBottom: '16px' }}>
            <h3>Selected Card</h3>
            <Cards
              selected={true}
              title="Selected Document"
              subtitle="This card is currently selected"
              tag="fA7985"
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <h3>Card without Tag</h3>
            <Cards
              title="Document without tag"
              subtitle="This card doesn't have a tag"
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <h3>Card without Action Icons</h3>
            <Cards
              title="Document without action icons"
              subtitle="This card has no info or menu icons"
              tag="fA7985"
              showInfoIcon={false}
              showMenuIcon={false}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <h3>Long Title Card</h3>
            <Cards
              title="This is a very long document title that might wrap to multiple lines and shows how the component handles overflow"
              subtitle="Secondary text for the long title document"
              tag="fA7985"
            />
          </div>
        </div>

        <div style={{ marginTop: '32px' }}>
          <h2>Usage</h2>
          <div style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '16px', 
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '14px',
            overflow: 'auto'
          }}>
            <pre>{`import Cards from '../components/Cards/Cards';

<Cards
  selected={false}
  title="Document Title"
  subtitle="Document description"
  tag="fA7985"
  onSelect={(selected) => console.log('Selected:', selected)}
  onInfoClick={() => console.log('Info clicked')}
  onMenuClick={() => console.log('Menu clicked')}
/>`}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsDemo; 