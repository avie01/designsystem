import { useState, useMemo, useCallback, memo } from 'react';
import Icon from '../components/Icon/Icon';
import ApplicationDetailCard from '../components/ApplicationDetailCard/ApplicationDetailCard';
import Tabs from '../components/Tabs/Tabs';
import mapImage from '../Images/map-image.png';
import { colors, spacing, borderRadius, statusColors } from '../design-system/designTokens';

interface ApplicationSummaryPageProps {
  bcNumber?: string;
  onBack?: () => void;
}

// Move static data outside component to prevent recreation
const staticApplicationData = {
  siteAddress: '508-512 Kingsway, 1-3 Higherdale Ave, Northshire',
  reference: 'DA23/214',
  applicant: 'Couvaras Architects',
  owner: 'Maverick Developments',
  contact: '0483 010 577',
  description: 'Construction of residential flat building containing 24 units with basement parking',
  approver: 'Planning Panel'
} as const;

const tabItems = [
  { id: 'summary', label: 'Summary' },
  { id: 'detail', label: 'Detail' },
  { id: 'siteHistory', label: 'Site history' }
];

// Memoize sub-components to prevent unnecessary re-renders
const MemoizedApplicationDetailCard = memo(ApplicationDetailCard);
const MemoizedTabs = memo(Tabs);
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

const ApplicationSummaryPage = memo<ApplicationSummaryPageProps>(({ 
  bcNumber = 'BC-2024-0523',
  onBack 
}) => {
  const [activeTab, setActiveTab] = useState('summary');

  // Memoize application data
  const applicationData = useMemo(() => ({
    ...staticApplicationData,
    bcNumber
  }), [bcNumber]);

  // Memoize callbacks
  const handleBack = useCallback(() => {
    onBack?.();
  }, [onBack]);

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId);
  }, []);

  return (
    <div className="w-full">
      {/* Header with back button */}
      <div className="flex items-center gap-4 mb-6" style={{ marginTop: '-16px', paddingTop: '16px' }}>
        <button
          onClick={handleBack}
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          aria-label="Go back"
        >
          <MemoizedIcon name="arrow-left" size={20} />
        </button>
        <div>
          {/* Breadcrumb trail */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs mb-1" style={{ color: colors.secondary }}>
            <button className="cursor-pointer hover:opacity-80" onClick={handleBack}>Objective Build</button>
            <MemoizedIcon name="chevron-right" size={12} />
            <button className="cursor-pointer hover:opacity-80" onClick={handleBack}>Applications</button>
            <MemoizedIcon name="chevron-right" size={12} />
            <span aria-current="page">{bcNumber}</span>
          </nav>
          <h1 className="text-lg font-semibold" style={{ color: colors.primary }}>Applications / {bcNumber}</h1>
          <p className="text-sm mt-1" style={{ color: colors.secondary }}>{applicationData.siteAddress}</p>
        </div>
      </div>

      <div style={styles.container}>
        
        {/* Three columns grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
          {/* Main card with tabs and content */}
          <div style={styles.card}>
          
          {/* Title */}
          <h2 className="text-base font-semibold mb-3" style={{ color: colors.primary }}>Application summary</h2>
          
          {/* Tabs */}
          <div className="mb-4">
            <MemoizedTabs
              tabs={tabItems}
              activeTab={activeTab}
              onTabChange={handleTabChange}
              showContent={false}
            />
          </div>

          {/* Tab Content */}
          {activeTab === 'summary' && (
            <div>
              {/* Application Details */}
              <MemoizedApplicationDetailCard {...applicationData} />
            </div>
          )}

          {activeTab === 'detail' && (
            <div className="py-4 text-center text-gray-400">
              <p className="text-sm">Detail content coming soon</p>
            </div>
          )}

          {activeTab === 'siteHistory' && (
            <div className="py-4 text-center text-gray-400">
              <p className="text-sm">Site history content coming soon</p>
            </div>
          )}
          </div>
          
          {/* Second placeholder card - Map */}
          <div style={styles.flexCard}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold" style={{ color: colors.primary }}>Map</h3>
              <div className="flex gap-2">
                <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                  <MemoizedIcon name="renew" size={20} />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                  <MemoizedIcon name="map" size={20} />
                </button>
              </div>
            </div>
            <div className="bg-gray-100 rounded overflow-hidden flex-1">
              <img 
                src={mapImage} 
                alt="Map view" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          
          {/* Third card - Planning Summary */}
          <PlanningSummaryCard />
          
          {/* Container for Assessment Reports and Internal Referrals */}
          <div style={styles.flexContainer}>
            {/* Collapsed card - Key Dates */}
            <KeyDatesCard />
            
            {/* Internal Referrals card */}
            <InternalReferralsCard />
          </div>
          
          {/* Container for Document Library and Compliance Check */}
          <div style={styles.flexContainer}>
            {/* Collapsed card - Document Library */}
            <DocumentLibraryCard />
            
            {/* Compliance Check card */}
            <ComplianceCheckCard />
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
      </div>
    </div>
  );
});

// Memoized sub-components for better performance
const PlanningSummaryCard = memo(() => (
  <div style={styles.card}>
    <h2 className="text-base font-semibold mb-4" style={{ color: colors.primary }}>Planning summary</h2>
    <div className="space-y-2">
      {planningSummaryItems.map(item => (
        <div key={item.label} className="grid gap-2 py-1" style={{ gridTemplateColumns: '140px 1fr' }}>
          <span className="text-sm" style={{ color: colors.secondary }}>{item.label}</span>
          <span className="text-sm" style={{ color: colors.primary }}>{item.value}</span>
        </div>
      ))}
    </div>
  </div>
));

const KeyDatesCard = memo(() => (
  <div style={styles.card}>
    <div className="flex items-center justify-between">
      <h2 className="text-base font-semibold" style={{ color: colors.primary }}>Key dates</h2>
      <div className="flex items-center gap-2">
        <span className="text-xs" style={{ color: colors.secondary }}>5 dates</span>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <Icon name="chevron-down" size={20} />
        </button>
      </div>
    </div>
  </div>
));

const InternalReferralsCard = memo(() => (
  <div style={{ ...styles.card, flex: '1' }}>
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-base font-semibold" style={{ color: colors.primary }}>Internal referrals</h2>
      <button className="px-2 py-1 text-xs rounded hover:bg-gray-100 transition-colors" style={{ color: colors.secondary }}>
        + Add new
      </button>
    </div>
    
    {/* Table Header */}
    <div className="grid grid-cols-12 gap-2 pb-2 border-b border-gray-200 text-xs font-medium" style={{ color: colors.secondary }}>
      <div className="col-span-6">Team name</div>
      <div className="col-span-2 text-center">Age</div>
      <div className="col-span-3">Status</div>
      <div className="col-span-1"></div>
    </div>
    
    {/* Table Rows */}
    <div className="space-y-1 mt-2">
      {referralItems.map(item => (
        <ReferralRow key={item.team} {...item} />
      ))}
    </div>
  </div>
));

const ReferralRow = memo<{ team: string; age?: number; status: string; statusColor: string; textColor: string }>(
  ({ team, age, status, statusColor, textColor }) => (
    <div className="grid grid-cols-12 gap-2 py-2 items-center hover:bg-gray-50 rounded group">
      <div className="col-span-6 text-sm" style={{ color: colors.primary }}>{team}</div>
      <div className="col-span-2 text-sm text-center" style={{ color: colors.secondary }}>{age || ''}</div>
      <div className="col-span-3">
        <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: statusColor, color: textColor }}>{status}</span>
      </div>
      <div className="col-span-1 text-right pr-2">
        <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Icon name="arrow-right" size={16} />
        </button>
      </div>
    </div>
  )
);

const DocumentLibraryCard = memo(() => (
  <div style={styles.card}>
    <div className="flex items-center justify-between">
      <h2 className="text-base font-semibold" style={{ color: colors.primary }}>Document library</h2>
      <div className="flex items-center gap-2">
        <span className="text-xs" style={{ color: colors.secondary }}>12 documents</span>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <Icon name="chevron-down" size={20} />
        </button>
      </div>
    </div>
  </div>
));

const ComplianceCheckCard = memo(() => (
  <div style={{ ...styles.card, flex: '1' }}>
    <h2 className="text-base font-semibold mb-4" style={{ color: colors.primary }}>Compliance Check</h2>
    <div className="space-y-3">
      {complianceItems.map(item => (
        <ComplianceRow key={item.label} {...item} />
      ))}
    </div>
  </div>
));

const ComplianceRow = memo<{ label: string; status: 'pass' | 'review'; }>(({ label, status }) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-sm text-gray-600">{label}</span>
    {status === 'pass' ? (
      <span className="text-sm font-medium text-green-600 flex items-center gap-1">
        <Icon name="checkmark-filled" size={16} />
        Pass
      </span>
    ) : (
      <span className="text-sm font-medium text-yellow-600 flex items-center gap-1">
        <Icon name="warning" size={16} />
        Review
      </span>
    )}
  </div>
));

const TasksCard = memo(() => (
  <div style={styles.card}>
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-base font-semibold" style={{ color: colors.primary }}>Tasks</h2>
      <button className="px-3 py-1 text-sm rounded hover:bg-gray-50 transition-colors" style={{ color: colors.secondary }}>
        + Add task
      </button>
    </div>
    
    {/* Table Header */}
    <div className="grid grid-cols-12 gap-2 pb-2 border-b border-gray-200 text-xs font-medium" style={{ color: colors.secondary }}>
      <div className="col-span-6">Task</div>
      <div className="col-span-2 text-center">Due</div>
      <div className="col-span-3">Status</div>
      <div className="col-span-1"></div>
    </div>
    
    {/* Table Rows */}
    <div className="space-y-1 mt-2">
      {taskItems.map(item => (
        <TaskRow key={item.task} {...item} />
      ))}
    </div>
  </div>
));

const TaskRow = memo<{ task: string; due: string; status: string; statusColor: string; textColor: string }>(
  ({ task, due, status, statusColor, textColor }) => (
    <div className="grid grid-cols-12 gap-2 py-2 items-center hover:bg-gray-50 rounded group">
      <div className="col-span-6 text-sm" style={{ color: colors.primary }}>{task}</div>
      <div className="col-span-2 text-sm text-center" style={{ color: colors.secondary }}>{due}</div>
      <div className="col-span-3">
        <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: statusColor, color: textColor }}>{status}</span>
      </div>
      <div className="col-span-1 text-right pr-2">
        <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Icon name="arrow-right" size={16} />
        </button>
      </div>
    </div>
  )
);

const RelatedApplicationsCard = memo(() => (
  <div style={styles.card}>
    <h2 className="text-base font-semibold mb-4" style={{ color: colors.primary }}>Related Applications</h2>
    <div className="space-y-3">
      {relatedApplications.map(app => (
        <div key={app.id} className="p-3 border border-gray-200 rounded hover:border-gray-300 cursor-pointer">
          <div className="flex justify-between items-start mb-1">
            <span className="text-sm font-medium">{app.id}</span>
            <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">Approved</span>
          </div>
          <p className="text-xs text-gray-600">{app.description}</p>
          <p className="text-xs text-gray-500 mt-1">{app.date}</p>
        </div>
      ))}
    </div>
  </div>
));

const ContactsCard = memo(() => (
  <div style={styles.card}>
    <h2 className="text-base font-semibold mb-4" style={{ color: colors.primary }}>Contacts</h2>
    <div className="space-y-4">
      {contacts.map(contact => (
        <ContactItem key={contact.name} {...contact} />
      ))}
    </div>
  </div>
));

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

const NotesCommentsCard = memo(() => (
  <div style={styles.card}>
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-base font-semibold" style={{ color: colors.primary }}>Notes & Comments</h2>
      <button className="text-blue-600 hover:text-blue-700">
        <Icon name="add" size={20} />
      </button>
    </div>
    <div className="space-y-3">
      {notes.map((note, index) => (
        <NoteItem key={index} {...note} />
      ))}
    </div>
  </div>
));

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

const complianceItems = [
  { label: 'Setback Requirements', status: 'pass' as const },
  { label: 'Height Restrictions', status: 'pass' as const },
  { label: 'Parking Requirements', status: 'review' as const },
  { label: 'Fire Safety', status: 'pass' as const },
  { label: 'Accessibility', status: 'pass' as const },
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

ApplicationSummaryPage.displayName = 'ApplicationSummaryPage';

export default ApplicationSummaryPage;