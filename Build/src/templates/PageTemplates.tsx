import React from 'react';
import Button from '../components/Button/Button';
import Icon from '../components/Icon/Icon';
import './PageTemplates.css';

/**
 * PAGE TEMPLATES
 * Simple wireframe templates with content borders and placeholder content
 * 
 * Usage:
 * 1. Copy the template you need
 * 2. Replace placeholder content with your components
 * 3. Keep the content wrapper structure
 */

/**
 * BASIC PAGE TEMPLATE
 * Standard page with content border
 */
export const BasicPageTemplate: React.FC = () => {
  return (
    <div className="page-template">
      <div className="page-template__content">
        {/* Your content here */}
        <h1>Page Title</h1>
        <p>Page content goes here...</p>
      </div>
    </div>
  );
};

/**
 * DASHBOARD TEMPLATE
 * Page with status cards row at top
 */
export const DashboardTemplate: React.FC = () => {
  return (
    <div className="dashboard-template">
      <div className="dashboard-template__content">
        {/* Status Cards Row */}
        <div className="dashboard-template__metrics-grid">
          {[1, 2, 3, 4].map(i => (
            <div 
              key={i} 
              className="dashboard-template__metric-card"
              tabIndex={0}
              role="button"
              aria-label={`Metric ${i} card`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  console.log(`Metric ${i} clicked`);
                }
              }}
            >
              <div className="dashboard-template__metric-label">Metric {i}</div>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="dashboard-template__main-content">
          <p>Main content area...</p>
        </div>
      </div>
    </div>
  );
};

/**
 * TABLE LIST TEMPLATE
 * Page with filters bar and table area
 */
export const TableListTemplate: React.FC = () => {
  // Sample data
  const sampleData = [
    { id: 1, name: 'Project Alpha', status: 'Active', category: 'Development', lastUpdated: '2024-01-15', owner: 'John Smith' },
    { id: 2, name: 'Marketing Campaign', status: 'Pending', category: 'Marketing', lastUpdated: '2024-01-14', owner: 'Sarah Johnson' },
    { id: 3, name: 'User Research', status: 'Active', category: 'Research', lastUpdated: '2024-01-13', owner: 'Mike Chen' },
    { id: 4, name: 'Bug Fixes', status: 'Inactive', category: 'Development', lastUpdated: '2024-01-12', owner: 'Emma Wilson' },
    { id: 5, name: 'Design System', status: 'Active', category: 'Design', lastUpdated: '2024-01-11', owner: 'David Brown' },
  ];

  return (
    <div className="table-template">
      <div className="table-template__content">
        {/* Action Bar */}
        <div className="table-template__action-bar">
          <div>
            <Button variant="primary" size="small">
              <Icon name="add" size={16} />
              Add New
            </Button>
            <Button variant="secondary" size="small" style={{ marginLeft: '8px' }}>
              <Icon name="filter" size={16} />
              Filter
            </Button>
          </div>
          <div>
            <Button variant="ghost" size="small">
              <Icon name="download" size={16} />
              Export
            </Button>
            <Button variant="ghost" size="small" style={{ marginLeft: '8px' }}>
              <Icon name="renew" size={16} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Basic Table Area */}
        <div className="table-template__table-area">
          <table className="basic-table">
            <thead className="basic-table__head">
              <tr>
                <th className="basic-table__header">
                  <input type="checkbox" className="basic-table__checkbox" />
                </th>
                <th className="basic-table__header">Name</th>
                <th className="basic-table__header">Status</th>
                <th className="basic-table__header">Category</th>
                <th className="basic-table__header">Last Updated</th>
                <th className="basic-table__header">Owner</th>
                <th className="basic-table__header">Actions</th>
              </tr>
            </thead>
            <tbody className="basic-table__body">
              {sampleData.map((item) => (
                <tr key={item.id} className="basic-table__row">
                  <td className="basic-table__cell">
                    <input type="checkbox" className="basic-table__checkbox" />
                  </td>
                  <td className="basic-table__cell basic-table__cell--name">
                    {item.name}
                  </td>
                  <td className="basic-table__cell">
                    <span className={`basic-table__status basic-table__status--${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="basic-table__cell">{item.category}</td>
                  <td className="basic-table__cell">{item.lastUpdated}</td>
                  <td className="basic-table__cell">{item.owner}</td>
                  <td className="basic-table__cell">
                    <div className="basic-table__actions">
                      <Button variant="ghost" size="small">
                        <Icon name="edit" size={14} />
                      </Button>
                      <Button variant="ghost" size="small">
                        <Icon name="trash-can" size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/**
 * TWO COLUMN TEMPLATE
 * Page with main content and sidebar
 */
export const TwoColumnTemplate: React.FC = () => {
  return (
    <div className="two-column-template">
      <div className="two-column-template__content">
        <div className="two-column-template__grid">
          {/* Main Content */}
          <div className="two-column-template__main">
            <p>Main content area...</p>
          </div>

          {/* Sidebar */}
          <div className="two-column-template__sidebar">
            <div className="two-column-template__sidebar-widget">
              <p>Sidebar widget 1...</p>
            </div>
            <div className="two-column-template__sidebar-widget">
              <p>Sidebar widget 2...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * FORM PAGE TEMPLATE
 * Page with form sections
 */
export const FormPageTemplate: React.FC = () => {
  return (
    <div className="form-template">
      <div className="form-template__content">
        {/* Form Sections */}
        <div className="form-template__sections">
          {/* Section 1 */}
          <div className="form-template__section">
            <h3 className="form-template__section-title">Section Title</h3>
            <p>Form fields here...</p>
          </div>

          {/* Section 2 */}
          <div className="form-template__section">
            <h3 className="form-template__section-title">Another Section</h3>
            <p>More form fields...</p>
          </div>

          {/* Action Buttons */}
          <div className="form-template__actions">
            <button 
              className="form-template__action-button"
              type="button"
              onClick={() => console.log('Cancel clicked')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  console.log('Cancel clicked');
                }
              }}
              aria-label="Cancel form"
            >
              Cancel
            </button>
            <button 
              className="form-template__action-button form-template__action-button--primary"
              type="submit"
              onClick={() => console.log('Save clicked')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  console.log('Save clicked');
                }
              }}
              aria-label="Save form"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * CARDS GRID TEMPLATE
 * Page with grid of cards
 */
export const CardsGridTemplate: React.FC = () => {
  return (
    <div className="cards-template">
      <div className="cards-template__content">
        {/* Cards Grid */}
        <div className="cards-template__grid">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div 
              key={i} 
              className="cards-template__card"
              tabIndex={0}
              role="button"
              aria-label={`Card ${i}`}
              onClick={() => console.log(`Card ${i} clicked`)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  console.log(`Card ${i} clicked`);
                }
              }}
            >
              <p>Card {i} content...</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};