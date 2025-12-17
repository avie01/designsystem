import React, { useState, useMemo, useCallback, memo } from 'react';
import Icon from '../components/Icon/Icon';
import ApplicationDetailCard from '../components/ApplicationDetailCard/ApplicationDetailCard';
import Tabs from '../components/Tabs/Tabs';
import Drawer from '../components/Drawer/Drawer';
import Button from '../components/Button/Button';
import mapImage from '../Images/Map.png';
import { colors, spacing, borderRadius, statusColors } from '../design-system/designTokens';
import { governmentDocuments, GovernmentDocument } from '../data/Building_constent_table';

interface ApplicationSummaryPageProps {
  bcNumber?: string;
  onBack?: () => void;
}

const tabItems = [
  { id: 'summary', label: 'Summary' },
  { id: 'detail', label: 'Detail' },
  { id: 'siteHistory', label: 'Site history' }
];

// Only memoize Icon since it's used frequently with same props
const MemoizedIcon = memo(Icon);

// Style objects moved outside to prevent recreation
const styles = {
  container: {
    backgroundColor: colors.backgroundGray,
    padding: spacing.md,
    marginTop: spacing.md
  },
  card: {
    backgroundColor: colors.backgroundWhite,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    minHeight: 'fit-content'
  },
  flexCard: {
    backgroundColor: colors.backgroundWhite,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%'
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
    height: '100%'
  }
};

const ApplicationSummaryPage: React.FC<ApplicationSummaryPageProps> = ({ 
  bcNumber = 'BCN-101',
  onBack 
}) => {
  const [activeTab, setActiveTab] = useState('summary');
  const [selectedReferral, setSelectedReferral] = useState<string | null>(null);
  
  // Find the document data based on bcNumber or use first document as fallback
  const currentDocument = useMemo(() => {
    return governmentDocuments.find(doc => doc.id === bcNumber) || governmentDocuments[0];
  }, [bcNumber]);

  const handleReferralClick = useCallback((teamName: string) => {
    setSelectedReferral(teamName);
  }, []);

  const handleReferralBack = useCallback(() => {
    setSelectedReferral(null);
  }, []);

  // Navigation functions for drawer
  const handleNextReferral = useCallback(() => {
    if (!selectedReferral) return;
    const currentIndex = referralItems.findIndex(item => item.team === selectedReferral);
    const nextIndex = (currentIndex + 1) % referralItems.length;
    setSelectedReferral(referralItems[nextIndex].team);
  }, [selectedReferral]);

  const handlePrevReferral = useCallback(() => {
    if (!selectedReferral) return;
    const currentIndex = referralItems.findIndex(item => item.team === selectedReferral);
    const prevIndex = currentIndex === 0 ? referralItems.length - 1 : currentIndex - 1;
    setSelectedReferral(referralItems[prevIndex].team);
  }, [selectedReferral]);

  // Get current referral index for display
  const getCurrentReferralIndex = useCallback(() => {
    if (!selectedReferral) return { current: 0, total: 0 };
    const currentIndex = referralItems.findIndex(item => item.team === selectedReferral);
    return { current: currentIndex + 1, total: referralItems.length };
  }, [selectedReferral]);

  // Use building consent data for application information
  const applicationData = useMemo(() => ({
    siteAddress: currentDocument.title,
    reference: currentDocument.id,
    applicant: currentDocument.owner,
    owner: currentDocument.department,
    contact: currentDocument.lastAccessedBy || '0483 010 577',
    description: currentDocument.description || 'Building consent application',
    approver: currentDocument.agency,
    bcNumber: currentDocument.id,
    status: currentDocument.status,
    classification: currentDocument.classification,
    workflow: currentDocument.workflow,
    lastModified: currentDocument.lastModified,
    securityClearance: currentDocument.securityClearance,
    retentionPeriod: currentDocument.retentionPeriod
  }), [currentDocument]);

  // Memoize callbacks
  const handleBack = useCallback(() => {
    onBack?.();
  }, [onBack]);

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId);
  }, []);

  // Drawer will be rendered at the end of the main content

  return (
    <div className="w-full">
      {/* Skip navigation link for keyboard users */}


      {/* Header with back button */}
      <header className="flex items-center gap-4 mb-4">
        <button
          onClick={handleBack}
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          aria-label="Go back to applications list"
        >
          <MemoizedIcon name="arrow-left" size={20} aria-hidden="true" />
        </button>
        <div>
          {/* Breadcrumb trail */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs mb-1" style={{ color: colors.secondary }}>
            <button 
              className="cursor-pointer hover:opacity-80" 
              onClick={handleBack}
              aria-label="Go to Objective Build home"
            >
              Objective Build
            </button>
            <MemoizedIcon name="chevron-right" size={12} aria-hidden="true" />
            <button 
              className="cursor-pointer hover:opacity-80" 
              onClick={handleBack}
              aria-label="Go to Applications"
            >
              Applications
            </button>
            <MemoizedIcon name="chevron-right" size={12} aria-hidden="true" />
            <span aria-current="page">{bcNumber}</span>
          </nav>
          <h1 className="text-lg font-semibold" style={{ color: colors.primary }}>Applications / {bcNumber}</h1>
          <p className="text-sm mt-1" style={{ color: colors.secondary }}>{applicationData.siteAddress}</p>
        </div>
      </header>

      <main id="main-content" style={styles.container}>
        
        {/* Three columns grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
          {/* Main card with tabs and content */}
          <section style={{ ...styles.card, paddingTop: '12px' }} aria-labelledby="application-summary-heading">
          
          {/* Title */}
          <h2 id="application-summary-heading" className="text-lg font-semibold mb-4" style={{ color: colors.primary }}>Application summary</h2>
          
          {/* Tabs */}
          <div className="mb-4">
            <Tabs
              tabs={tabItems}
              activeTab={activeTab}
              onTabChange={handleTabChange}
              showContent={false}
              aria-label="Application summary sections"
            />
          </div>

          {/* Tab Content */}
          {activeTab === 'summary' && (
            <div role="tabpanel" aria-labelledby="tab-summary" tabIndex={0}>
              {/* Application Details */}
              <ApplicationDetailCard {...applicationData} />
            </div>
          )}

          {activeTab === 'detail' && (
            <div role="tabpanel" aria-labelledby="tab-detail" tabIndex={0} className="py-4 text-center text-gray-400">
              <p className="text-sm">Detail content coming soon</p>
            </div>
          )}

          {activeTab === 'siteHistory' && (
            <div role="tabpanel" aria-labelledby="tab-siteHistory" tabIndex={0} className="py-4 text-center text-gray-400">
              <p className="text-sm">Site history content coming soon</p>
            </div>
          )}
          </section>
          
          {/* Second placeholder card - Map */}
          <section style={styles.flexCard} aria-labelledby="map-heading">
            <div className="flex items-center justify-between mb-3">
              <h3 id="map-heading" className="text-base font-semibold" style={{ color: colors.primary }}>Map</h3>
              <div className="flex gap-2" role="group" aria-label="Map controls">
                <button 
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  aria-label="Refresh map view"
                >
                  <MemoizedIcon name="renew" size={20} aria-hidden="true" />
                </button>
                <button 
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  aria-label="Open full map view"
                >
                  <MemoizedIcon name="map" size={20} aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="bg-gray-100 rounded overflow-hidden flex-1">
              <img 
                src={mapImage} 
                alt="Site location map showing property at 508-512 Kingsway, 1-3 Higherdale Ave, Northshire" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </section>
          
          {/* Third card - Planning Summary */}
          <PlanningSummaryCard />
          
          {/* Container for Assessment Reports and Internal Referrals */}
          <div style={styles.flexContainer}>
            {/* Collapsed card - Key Dates */}
            <KeyDatesCard />
            
            {/* Internal Referrals card */}
            <InternalReferralsCard onReferralClick={handleReferralClick} />
          </div>
          
          {/* Container for Document Library and Notification */}
          <div style={styles.flexContainer}>
            {/* Collapsed card - Document Library */}
            <DocumentLibraryCard />
            
            {/* Notification card */}
            <NotificationCard />
          </div>
          
          {/* Fifth card - Tasks */}
          <TasksCard />
          
          {/* Sixth card - Related Applications */}
          <RelatedApplicationsCard />
          
          {/* Eighth card - Contacts */}
          <ContactsCard />
          
          {/* Ninth card - Notes & Comments */}
          <NotesCommentsCard />
        </div>
      </main>

      {/* Referral Details Drawer */}
      <Drawer
        isOpen={!!selectedReferral}
        onClose={handleReferralBack}
        position="right"
        width="half"
        title=""
        overlay={true}
        closeOnEscape={true}
        closeOnBackdropClick={true}
        style={{ top: 0 }}
      >
        {selectedReferral && (
          <>
            {/* Custom Header with Navigation */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              padding: '20px 24px 16px 24px',
              borderBottom: '1px solid var(--odl-color-border)',
              backgroundColor: 'var(--odl-color-white)',
              position: 'sticky',
              top: 0,
              zIndex: 10
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <h2 style={{ 
                  fontSize: '18px', 
                  fontWeight: 600, 
                  color: 'var(--odl-color-text-primary)',
                  margin: 0
                }}>
                  {selectedReferral} Referral
                </h2>
                <span style={{ 
                  fontSize: '12px', 
                  color: 'var(--odl-color-text-secondary)',
                  backgroundColor: 'var(--odl-color-background-light)',
                  padding: '2px 8px',
                  borderRadius: '12px'
                }}>
                  {getCurrentReferralIndex().current} of {getCurrentReferralIndex().total}
                </span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={handlePrevReferral}
                  disabled={referralItems.length <= 1}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    border: '1px solid var(--odl-color-border)',
                    borderRadius: '6px',
                    backgroundColor: 'var(--odl-color-white)',
                    cursor: referralItems.length > 1 ? 'pointer' : 'not-allowed',
                    opacity: referralItems.length > 1 ? 1 : 0.5
                  }}
                  title="Previous referral"
                >
                  <Icon name="arrow-left" size={16} />
                </button>
                
                <button
                  onClick={handleNextReferral}
                  disabled={referralItems.length <= 1}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    border: '1px solid var(--odl-color-border)',
                    borderRadius: '6px',
                    backgroundColor: 'var(--odl-color-white)',
                    cursor: referralItems.length > 1 ? 'pointer' : 'not-allowed',
                    opacity: referralItems.length > 1 ? 1 : 0.5
                  }}
                  title="Next referral"
                >
                  <Icon name="arrow-right" size={16} />
                </button>
              </div>
            </div>
            
            <ReferralDrawerContent 
              teamName={selectedReferral}
              applicationData={applicationData}
            />
          </>
        )}
      </Drawer>
    </div>
  );
};

// Sub-components
const PlanningSummaryCard = () => (
  <section style={styles.card} aria-labelledby="planning-summary-heading">
    <h2 id="planning-summary-heading" className="text-base font-semibold mb-4" style={{ color: colors.primary }}>Planning summary</h2>
    <div className="space-y-2">
      {planningSummaryItems.map(item => (
        <div key={item.label} className="grid gap-2 py-1" style={{ gridTemplateColumns: '140px 1fr' }}>
          <span className="text-sm" style={{ color: colors.secondary }}>{item.label}</span>
          <span className="text-sm" style={{ color: colors.primary }}>{item.value}</span>
        </div>
      ))}
    </div>
  </section>
);

const KeyDatesCard = () => (
  <section style={styles.card} aria-labelledby="key-dates-heading">
    <div className="flex items-center justify-between">
      <h2 id="key-dates-heading" className="text-lg font-semibold" style={{ color: colors.primary }}>Key dates</h2>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium" style={{ color: colors.secondary }} aria-label="Number of dates">5 dates</span>
        <button 
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Expand key dates section"
          aria-expanded="false"
        >
          <Icon name="chevron-down" size={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  </section>
);

const InternalReferralsCard = ({ onReferralClick }: { onReferralClick: (teamName: string) => void }) => (
  <section style={{ ...styles.card, flex: '1' }} aria-labelledby="referrals-heading">
    <div className="flex items-center justify-between mb-4">
      <h2 id="referrals-heading" className="text-lg font-semibold" style={{ color: colors.primary }}>Internal referrals</h2>
      <button 
        className="px-3 py-1.5 text-sm font-medium rounded hover:bg-gray-100 transition-colors" 
        style={{ color: colors.secondary }}
        aria-label="Add new internal referral"
      >
        + Add new
      </button>
    </div>
    
    {/* Referral Rows */}
    <div className="space-y-0" role="list" aria-label="Internal referrals">
      {referralItems.map(item => (
        <ReferralRow key={item.team} {...item} onClick={() => onReferralClick(item.team)} />
      ))}
    </div>
  </section>
);

const ReferralRow = memo<{ team: string; age?: number; status: string; statusColor: string; textColor: string; onClick: () => void }>(
  ({ team, age, status, statusColor, textColor, onClick }) => (
    <div 
      className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors" 
      role="listitem"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={0}
      aria-label={`View details for ${team} referral`}
    >
      <div className="flex-1">
        <div className="text-sm font-medium" style={{ color: colors.primary }}>{team}</div>
        <div className="text-xs mt-1" style={{ color: colors.secondary }}>
          {age ? `${age} days` : 'N/A'}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span 
          className="text-xs px-2 py-1 rounded font-medium" 
          style={{ backgroundColor: statusColor, color: textColor }}
          aria-label={`Status: ${status}`}
        >
          {status}
        </span>
        <Icon name="chevron-right" size={16} className="text-gray-400" aria-hidden="true" />
      </div>
    </div>
  )
);

const DocumentLibraryCard = () => (
  <section style={styles.card} aria-labelledby="document-library-heading">
    <div className="flex items-center justify-between">
      <h2 id="document-library-heading" className="text-base font-semibold" style={{ color: colors.primary }}>Document library</h2>
      <div className="flex items-center gap-2">
        <span className="text-xs" style={{ color: colors.secondary }} aria-label="Number of documents">12 documents</span>
        <button 
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Expand document library section"
          aria-expanded="false"
        >
          <Icon name="chevron-down" size={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  </section>
);

const NotificationCard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isDropdownOpen && !target.closest('.notification-dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);
  
  return (
    <section style={{ ...styles.card, flex: '1' }} aria-labelledby="notification-heading">
      {/* Header with View dropdown */}
      <div className="flex items-center justify-between mb-4">
        <h2 id="notification-heading" className="text-base font-semibold" style={{ color: colors.primary }}>
          Notification
        </h2>
        <div className="relative notification-dropdown-container">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-gray-50 transition-colors"
            aria-label="View notification options"
            aria-expanded={isDropdownOpen}
          >
            <span className="text-xs text-gray-700">View</span>
            <Icon name="chevron-down" size={16} className="text-gray-500" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-1 w-48 bg-white border border-blue-500 rounded shadow-xl z-10">
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">View all notifications</button>
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">View submissions</button>
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Export data</button>
            </div>
          )}
        </div>
      </div>

      {/* Notification period */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Notification period</span>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-700">12-Feb-2025</span>
            <Icon name="arrow-right" size={16} className="text-gray-400" />
            <span className="text-sm text-gray-700">26-Feb-2025</span>
            <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded">
              Complete
            </span>
          </div>
        </div>
      </div>

      {/* Stats rows */}
      <div className="space-y-3">
        <NotificationRow label="Notified" value="15" />
        <NotificationRow label="Submissions received" value="4" />
        <NotificationRow label="Impact identified" value="4" />
        <NotificationRow label="Submissions reviewed" value="4" />
      </div>
    </section>
  );
};

const NotificationRow = memo<{ label: string; value: string }>(({ label, value }) => (
  <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
    <span className="text-sm text-gray-600">{label}</span>
    <span className="text-sm font-medium text-gray-900">{value}</span>
  </div>
));

const TasksCard = () => (
  <section style={styles.card} aria-labelledby="tasks-heading">
    <div className="flex items-center justify-between mb-4">
      <h2 id="tasks-heading" className="text-lg font-semibold" style={{ color: colors.primary }}>Tasks</h2>
      <button 
        className="px-3 py-1.5 text-sm font-medium rounded hover:bg-gray-100 transition-colors" 
        style={{ color: colors.secondary }}
        aria-label="Add new task"
      >
        + Add task
      </button>
    </div>
    
    {/* Task Rows */}
    <div className="space-y-0" role="list" aria-label="Tasks list">
      {taskItems.map(item => (
        <TaskRow key={item.task} {...item} />
      ))}
    </div>
  </section>
);

const TaskRow = memo<{ task: string; due: string; status: string; statusColor: string; textColor: string }>(
  ({ task, due, status, statusColor, textColor }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors" role="listitem">
      <div className="flex-1">
        <div className="text-sm font-medium" style={{ color: colors.primary }}>{task}</div>
        <div className="text-xs mt-1" style={{ color: colors.secondary }}>
          Due: {due || 'No due date'}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span 
          className="text-xs px-2 py-1 rounded font-medium" 
          style={{ backgroundColor: statusColor, color: textColor }}
          aria-label={`Status: ${status}`}
        >
          {status}
        </span>
        <Icon name="chevron-right" size={16} className="text-gray-400" aria-hidden="true" />
      </div>
    </div>
  )
);

const RelatedApplicationsCard = () => (
  <section style={styles.card} aria-labelledby="related-applications-heading">
    <h2 id="related-applications-heading" className="text-base font-semibold mb-4" style={{ color: colors.primary }}>Related Applications</h2>
    <div className="space-y-3">
      {relatedApplications.map(app => (
        <button 
          key={app.id} 
          className="w-full p-3 border border-gray-200 rounded hover:border-gray-300 cursor-pointer text-left focus:ring-2 focus:ring-blue-500 focus:outline-none"
          aria-label={`View related application ${app.id}: ${app.description}`}
        >
          <div className="flex justify-between items-start mb-1">
            <span className="text-sm font-medium">{app.id}</span>
            <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded" aria-label="Status: Approved">Approved</span>
          </div>
          <p className="text-xs text-gray-600">{app.description}</p>
          <p className="text-xs text-gray-500 mt-1">{app.date}</p>
        </button>
      ))}
    </div>
  </section>
);

const ContactsCard = () => (
  <section style={styles.card} aria-labelledby="contacts-heading">
    <h2 id="contacts-heading" className="text-base font-semibold mb-4" style={{ color: colors.primary }}>Contacts</h2>
    <div className="space-y-4">
      {contacts.map(contact => (
        <ContactItem key={contact.name} {...contact} />
      ))}
    </div>
  </section>
);

const ContactItem = memo<{ name: string; role: string; email: string; phone: string; initials: string; color: string }>(
  ({ name, role, email, phone, initials, color }) => (
    <div className="pb-3 border-b border-gray-100 last:border-0">
      <div className="flex items-start gap-3">
        <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center`}>
          <span className={`text-xs font-medium ${color.replace('bg-', 'text-').replace('100', '600')}`}>{initials}</span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-gray-500">{role}</p>
          <p className="text-xs text-gray-600 mt-1">{email}</p>
          <p className="text-xs text-gray-600">{phone}</p>
        </div>
      </div>
    </div>
  )
);

const NotesCommentsCard = () => (
  <section style={styles.card} aria-labelledby="notes-comments-heading">
    <div className="flex items-center justify-between mb-4">
      <h2 id="notes-comments-heading" className="text-base font-semibold" style={{ color: colors.primary }}>Notes & Comments</h2>
      <button 
        className="text-blue-600 hover:text-blue-700"
        aria-label="Add new note or comment"
      >
        <Icon name="add" size={20} aria-hidden="true" />
      </button>
    </div>
    <div className="space-y-3">
      {notes.map((note, index) => (
        <NoteItem key={index} {...note} />
      ))}
    </div>
  </section>
);

const NoteItem = memo<{ type: string; time: string; content: string; author: string; bgColor: string; typeColor: string }>(
  ({ type, time, content, author, bgColor, typeColor }) => (
    <div className={`${bgColor} rounded p-3`}>
      <div className="flex items-center justify-between mb-2">
        <span className={`text-xs font-medium ${typeColor}`}>{type}</span>
        <span className="text-xs" style={{ color: colors.secondary }}>{time}</span>
      </div>
      <p className="text-sm text-gray-600">{content}</p>
      <p className="text-xs text-gray-500 mt-2">- {author}</p>
    </div>
  )
);

// Static data arrays
const planningSummaryItems = [
  { label: 'LEP', value: 'Northshire Local Environmental Plan 2015' },
  { label: 'Zone', value: 'R4 - High Density Residential' },
  { label: 'Height of Buildings', value: '20m' },
  { label: 'Floor Space Ratio', value: '1.5:1' },
  { label: 'Minimum Lot Size', value: 'NA' },
  { label: 'Acid Sulfate Soils', value: 'Class 5' },
  { label: 'Local Provisions', value: 'Green Grid, Landscape Area (30%)' },
];

const referralItems = [
  { team: 'Building Surveyor', age: 22, status: 'Overdue', statusColor: statusColors.raspberry, textColor: colors.error },
  { team: 'Landscape Architect', age: 14, status: 'Due', statusColor: statusColors.grapefruit, textColor: colors.primary },
  { team: 'Development Engineer', age: 11, status: 'Due soon', statusColor: statusColors.mango, textColor: colors.primary },
  { team: 'Stormwater Engineer', age: undefined, status: 'Complete', statusColor: statusColors.lime, textColor: colors.success },
  { team: 'Urban Design', age: undefined, status: 'Complete', statusColor: statusColors.lime, textColor: colors.success },
];


const taskItems = [
  { task: 'Review heritage assessment', due: 'Today', status: 'Urgent', statusColor: statusColors.raspberry, textColor: colors.error },
  { task: 'Contact applicant', due: '2 days', status: 'High', statusColor: statusColors.grapefruit, textColor: colors.primary },
  { task: 'Site inspection', due: '5 days', status: 'In progress', statusColor: statusColors.blueberry, textColor: colors.blueDefault },
  { task: 'Prepare assessment report', due: '7 days', status: 'Pending', statusColor: statusColors.nutmeg, textColor: colors.primary },
  { task: 'Initial compliance check', due: '', status: 'Complete', statusColor: statusColors.lime, textColor: colors.success },
];

const relatedApplications = [
  { id: 'BC-2023-0412', description: 'Previous renovation - Same address', date: '12 Nov 2023' },
  { id: 'BC-2023-0388', description: 'Subdivision - Adjacent property', date: '5 Oct 2023' },
];

const contacts = [
  { name: 'Couvaras Architects', role: 'Applicant', email: 'contact@couvaras.com', phone: '0483 010 577', initials: 'CA', color: 'bg-blue-100' },
  { name: 'Maverick Developments', role: 'Owner', email: 'info@maverick.dev', phone: '02 9876 5432', initials: 'MD', color: 'bg-green-100' },
  { name: 'Jane Doe', role: 'Case Officer', email: 'jane.doe@council.gov', phone: '02 9123 4567', initials: 'JD', color: 'bg-purple-100' },
];

const notes = [
  { type: 'Internal Note', time: '2 hours ago', content: 'Parking requirements need further review. Request additional information from applicant regarding visitor parking provisions.', author: 'Sarah Mitchell', bgColor: 'bg-gray-50', typeColor: 'text-gray-700' },
  { type: 'Action Required', time: 'Yesterday', content: 'Awaiting response from Traffic & Transport department regarding street access concerns.', author: 'Tom Wilson', bgColor: 'bg-yellow-50', typeColor: 'text-yellow-700' },
  { type: 'General Comment', time: '3 days ago', content: 'Initial review completed. Application appears complete with all required documentation.', author: 'Jane Doe', bgColor: 'bg-gray-50', typeColor: 'text-gray-700' },
];

// Referral Drawer Content
const ReferralDrawerContent: React.FC<{
  teamName: string;
  applicationData: any;
}> = ({ teamName, applicationData }) => {
  const referralData = referralItems.find(item => item.team === teamName);
  
  if (!referralData) {
    return (
      <div className="text-center text-gray-500 py-8">
        Referral not found
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4 pb-4">
      {/* Application Context */}
      <div className="pb-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <p className="text-lg font-semibold" style={{ color: colors.primary }}>
            {applicationData.reference}
          </p>
          <Icon name="link" size={16} style={{ color: colors.secondary }} />
        </div>
        <p className="text-sm mb-2" style={{ color: colors.secondary }}>
          {applicationData.siteAddress}
        </p>
        <div className="flex items-center gap-4 text-xs" style={{ color: colors.secondary }}>
          <span>Type: {applicationData.type}</span>
          <span>•</span>
          <span>Received: {applicationData.dateReceived}</span>
        </div>
      </div>

      {/* Referral Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold" style={{ color: colors.primary }}>
            {teamName} Referral
          </h3>
          <Icon name="department" size={20} style={{ color: colors.primary }} />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-medium mb-1" style={{ color: colors.primary }}>Status</p>
            <span 
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{ 
                backgroundColor: referralData.statusColor,
                color: referralData.textColor
              }}
            >
              {referralData.status}
            </span>
          </div>
          
          <div>
            <p className="text-xs font-medium mb-1" style={{ color: colors.primary }}>Days Outstanding</p>
            <p className="text-sm font-semibold" style={{ 
              color: referralData.age && referralData.age > 10 ? colors.error : colors.secondary 
            }}>
              {referralData.age ? `${referralData.age} days` : 'N/A'}
            </p>
          </div>
          
          <div>
            <p className="text-xs font-medium mb-1" style={{ color: colors.primary }}>Priority</p>
            <p className="text-sm" style={{ color: colors.secondary }}>Standard</p>
          </div>
          
          <div>
            <p className="text-xs font-medium mb-1" style={{ color: colors.primary }}>Due Date</p>
            <p className="text-sm" style={{ color: colors.secondary }}>
              {referralData.age ? new Date(Date.now() + (21 - referralData.age) * 24 * 60 * 60 * 1000).toLocaleDateString() : 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Requirements Checklist */}
      <div className="space-y-4">
        <h3 className="font-semibold" style={{ color: colors.primary }}>
          Review Requirements
        </h3>
        
        <div className="space-y-3">
          {[
            { item: 'Site plans reviewed', completed: true },
            { item: 'Technical specifications assessed', completed: teamName !== 'Heritage' },
            { item: 'Compliance check completed', completed: false },
            { item: 'Conditions drafted', completed: false }
          ].map((req, index) => (
            <div key={index} className="flex items-center gap-3">
              <Icon 
                name={req.completed ? 'checkmark-filled' : 'radio-button'} 
                size={16} 
                style={{ color: req.completed ? colors.success : colors.secondary }} 
              />
              <span 
                className="text-sm"
                style={{ 
                  color: req.completed ? colors.primary : colors.secondary,
                  textDecoration: req.completed ? 'line-through' : 'none'
                }}
              >
                {req.item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h3 className="font-semibold" style={{ color: colors.primary }}>Quick Actions</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="primary" 
            size="small"
            onClick={() => {}}
            style={{ fontSize: '12px' }}
          >
            <Icon name="email" size={14} style={{ marginRight: '4px' }} />
            Send Reminder
          </Button>
          <Button 
            variant="secondary" 
            size="small"
            onClick={() => {}}
            style={{ fontSize: '12px' }}
          >
            <Icon name="phone" size={14} style={{ marginRight: '4px' }} />
            Call Department
          </Button>
          <Button 
            variant="secondary" 
            size="small"
            onClick={() => {}}
            style={{ fontSize: '12px' }}
          >
            <Icon name="add-comment" size={14} style={{ marginRight: '4px' }} />
            Add Note
          </Button>
          <Button 
            variant="secondary" 
            size="small"
            onClick={() => {}}
            style={{ fontSize: '12px' }}
          >
            <Icon name="view" size={14} style={{ marginRight: '4px' }} />
            View History
          </Button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="space-y-4">
        <h3 className="font-semibold" style={{ color: colors.primary }}>
          Recent Activity
        </h3>
        
        <div className="space-y-3 max-h-64 overflow-y-auto">
          <div className="border-l-4 border-blue-200 pl-4 py-2">
            <div className="flex justify-between items-start mb-1">
              <p className="text-sm font-medium" style={{ color: colors.primary }}>Referral Sent</p>
              <span className="text-xs" style={{ color: colors.secondary }}>2h ago</span>
            </div>
            <p className="text-sm" style={{ color: colors.secondary }}>
              Referral sent to {teamName} for technical review. Standard timeframe: 21 days.
            </p>
          </div>
          
          {referralData.status === 'Overdue' && (
            <div className="border-l-4 border-red-200 pl-4 py-2">
              <div className="flex justify-between items-start mb-1">
                <p className="text-sm font-medium text-red-700">Overdue Notice</p>
                <span className="text-xs" style={{ color: colors.secondary }}>Today</span>
              </div>
              <p className="text-sm" style={{ color: colors.secondary }}>
                This referral is overdue. Please follow up with {teamName} department.
              </p>
            </div>
          )}
          
          <div className="border-l-4 border-green-200 pl-4 py-2">
            <div className="flex justify-between items-start mb-1">
              <p className="text-sm font-medium" style={{ color: colors.primary }}>Documents Received</p>
              <span className="text-xs" style={{ color: colors.secondary }}>1 day ago</span>
            </div>
            <p className="text-sm" style={{ color: colors.secondary }}>
              All required plans and specifications received. Technical review in progress.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-3" style={{ color: colors.primary }}>
          Contact Information
        </h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Icon name="user" size={14} style={{ color: colors.secondary }} />
            <span className="text-sm">Lead Officer: John Smith</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="email" size={14} style={{ color: colors.secondary }} />
            <span className="text-sm">john.smith@council.govt.nz</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="phone" size={14} style={{ color: colors.secondary }} />
            <span className="text-sm">(09) 555-1234 ext. 567</span>
          </div>
        </div>
      </div>
        
      {/* Add Comment Form */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium" style={{ color: colors.primary }}>Add Comment</h4>
        <textarea
          className="w-full p-3 border border-gray-300 rounded resize-none text-sm"
          rows={3}
          placeholder={`Add a note about the ${teamName} referral...`}
        />
        <Button 
          variant="primary" 
          size="small"
          onClick={() => {}}
          style={{ fontSize: '12px' }}
        >
          Add Comment
        </Button>
      </div>
    </div>
  );
};

export default ApplicationSummaryPage;