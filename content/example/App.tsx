import React from 'react';
import MultiPageExample from './MultiPageExample';
import AccessibilityPanelTest from './AccessibilityPanelTest';
import InputComponentTest from './InputComponentTest';
import DropdownTest from './DropdownTest';
import ApplicationNavigationExample from './ApplicationNavigationExample';
import { ApplicationsPage } from '../src';

const ExampleApp: React.FC = () => {
  // Test options - uncomment one:
  // return <AccessibilityPanelTest />;
  // return <InputComponentTest />; // Testing Input components
  // return <DropdownTest />; // Testing Dropdown component with Input-like styling
  // return <ApplicationsPage />; // Testing ApplicationsPage with Input components
  // return <ApplicationNavigationExample />; // Testing navigation between Applications list and detail
  
  return <MultiPageExample />;
};

export default ExampleApp; 