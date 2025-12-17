import React, { useState } from 'react';
import ApplicationsPage from '../src/pages/ApplicationsPage';
import ApplicationSummaryPage from '../src/pages/ApplicationSummaryPage';

/**
 * Example demonstrating navigation between ApplicationsPage and ApplicationSummaryPage
 * When a BC number is clicked in the table or grid, it navigates to the summary page
 */
const ApplicationNavigationExample: React.FC = () => {
  const [currentView, setCurrentView] = useState<'list' | 'detail'>('list');
  const [selectedBcNumber, setSelectedBcNumber] = useState<string>('');

  const handleApplicationClick = (bcNumber: string) => {
    setSelectedBcNumber(bcNumber);
    setCurrentView('detail');
  };

  const handleBack = () => {
    setCurrentView('list');
  };

  if (currentView === 'detail') {
    return (
      <ApplicationSummaryPage 
        bcNumber={selectedBcNumber}
        onBack={handleBack}
      />
    );
  }

  return (
    <ApplicationsPage 
      onApplicationClick={handleApplicationClick}
    />
  );
};

export default ApplicationNavigationExample;