import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Cards from './Cards';
import { useTheme } from '../../../../.storybook/theme-decorator';
import { getAvailableFileTypes } from '../../FileType/fileTypeSvgs';

const meta: Meta<typeof Cards> = {
  title: 'Design System/Components/Cards',
  component: Cards,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'ODL Cards component with checkbox selection, multiple states, and action buttons. Designed for file and folder representation.',
      },
    },
  },
  tags: ['autodocs', 'Ready for dev'],
  argTypes: {
    type: {
      control: 'select',
      options: ['compact', 'comfortable', 'metadata', 'user', 'workspace', 'build', '3Sixty'],
      description: 'Card type variant affecting layout and styling',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'comfortable' },
      },
    },
    iconGutter: {
      control: 'boolean',
      description: 'Whether to show the icon gutter (FileType icon)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    gutterIcons: {
      control: 'object',
      description: 'Array of icon names to display in the gutter between FileType and text content',
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: '[]' },
      },
    },
    fileType: {
      control: { type: 'select' },
      options: getAvailableFileTypes(),
      description: 'File type to display in the icon gutter',
      table: {
        type: { summary: 'FileTypeVariant' },
        defaultValue: { summary: 'folder' },
      },
    },
    extensionSize: {
      control: 'boolean',
      description: 'Whether to show extension and file size text next to title',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showMetadata: {
      control: 'boolean',
      description: 'Whether to show metadata card with chips section',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state - affects colors and interaction',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: 'boolean',
      description: 'Error state - uses error colors',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    selected: {
      control: 'boolean',
      description: 'Whether the card is selected (checkbox state)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    title: {
      control: 'text',
      description: 'Primary text content',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Title - h4 - Primary' },
      },
    },
    subtitle: {
      control: 'text',
      description: 'Secondary text content',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Body - body2 - Secondary' },
      },
    },
    subtitle2: {
      control: 'text',
      description: 'Additional subtitle for 3Sixty type - appears below subtitle',
      table: {
        type: { summary: 'string' },
      },
    },
    tag: {
      control: 'text',
      description: 'Tag text to display',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'fA7985' },
      },
    },
    topText: {
      control: 'text',
      description: 'Top secondary text (for build type) - appears above title',
      table: {
        type: { summary: 'string' },
      },
    },
    bottomText: {
      control: 'text',
      description: 'Bottom secondary text (for build type) - appears below subtitle',
      table: {
        type: { summary: 'string' },
      },
    },
    showInfoIcon: {
      control: 'boolean',
      description: 'Whether to show the information icon',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showMenuIcon: {
      control: 'boolean',
      description: 'Whether to show the ellipsis menu icon',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    onSelect: {
      control: false,
      table: {
        disable: true,
      },
      description: 'Callback when checkbox is clicked',
    },
    onInfoClick: {
      description: 'Callback when info icon is clicked',
      table: {
        type: { summary: '() => void' },
      },
    },
    onMenuClick: {
      description: 'Callback when menu icon is clicked',
      table: {
        type: { summary: '() => void' },
      },
    },
    onEditClick: {
      control: false,
      description: 'Callback when edit hover action is clicked',
      table: {
        type: { summary: '() => void' },
      },
    },
    onTextSelectionClick: {
      control: false,
      description: 'Callback when text selection hover action is clicked',
      table: {
        type: { summary: '() => void' },
      },
    },
    onCopyClick: {
      control: false,
      description: 'Callback when copy hover action is clicked',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default card
export const Default: Story = {
  args: {
    title: 'Project Documentation',
    subtitle: 'Updated 2 hours ago',
    tag: 'v2.1.0',
    extensionSize: true,
  },
};

// All States showcase
export const AllStates: Story = {
  name: '02 All States',
  render: () => {
    const { colors } = useTheme();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing[6] || '24px' }}>
        <div>
          <h4 style={{ marginBottom: colors.spacing[3] || '12px', fontSize: colors.fontSize?.sm || '14px', fontWeight: 600, color: colors.textPrimary }}>Card States</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing[3] || '12px' }}>
            <Cards
              title="Default State"
              subtitle="This is the default card state"
              tag="Default"
            />
            <Cards
              title="Selected State"
              subtitle="This card is selected"
              tag="Selected"
              selected={true}
            />
            <Cards
              title="Disabled State"
              subtitle="This card is disabled"
              tag="Disabled"
              disabled={true}
            />
            <Cards
              title="Error State"
              subtitle="This card has an error"
              tag="Error"
              error={true}
            />
            <Cards
              title="Selected + Disabled"
              subtitle="This card is selected and disabled"
              tag="Multi"
              selected={true}
              disabled={true}
            />
            <Cards
              title="Error + Selected"
              subtitle="This card has error and is selected"
              tag="Multi"
              error={true}
              selected={true}
            />
          </div>
        </div>
      </div>
    );
  },
};

// Type variations
export const Types: Story = {
  args: {
    type: "compact",
    selected: true
  },

  name: '03 Types',

  render: () => {
    const [selectedCards, setSelectedCards] = React.useState<string[]>([]);
    const { colors } = useTheme();

    const toggleCardSelection = (cardType: string) => {
      setSelectedCards(prev =>
        prev.includes(cardType)
          ? prev.filter(type => type !== cardType)
          : [...prev, cardType]
      );
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing[6] || '24px' }}>
        <div>
          <h4 style={{ marginBottom: colors.spacing[3] || '12px', fontSize: colors.fontSize?.sm || '14px', fontWeight: 600, color: colors.textPrimary }}>Card Types</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing[3] || '12px' }}>
            <Cards
              type="compact"
              title="Compact Card"
              subtitle="Type: compact - Dense spacing and smaller text"
              tag="Compact"
              selected={selectedCards.includes('compact')}
              onSelect={() => toggleCardSelection('compact')}
            />
            <Cards
              type="comfortable"
              title="Comfortable Card"
              subtitle="Type: comfortable - Default spacing and sizing"
              tag="Comfortable"
              selected={selectedCards.includes('comfortable')}
              onSelect={() => toggleCardSelection('comfortable')}
            />
            <Cards
              type="metadata"
              title="Project Documentation.pdf"
              subtitle="Type: metadata - Shows white chips with file metadata"
              tag="Final"
              extensionSize={true}
              showMetadata={true}
              selected={selectedCards.includes('metadata')}
              onSelect={() => toggleCardSelection('metadata')}
            />
            <Cards
              type="user"
              title="Sarah Chen"
              subtitle="Type: user - Larger spacing and user icon display"
              tag="Admin"
              fileType="user"
              selected={selectedCards.includes('user')}
              onSelect={() => toggleCardSelection('user')}
            />
            <Cards
              type="workspace"
              title="North Shire City Council"
              subtitle="Type: workspace - Same styling as user cards for workspace display"
              selected={selectedCards.includes('workspace')}
              onSelect={() => toggleCardSelection('workspace')}
            />
            <Cards
              type="build"
              title="BLD2024081011"
              subtitle="11A Palm Avenue, Hokowhitu, Palmerston North 4410"
              topText="Building Consent - Form 2"
              bottomText="Modified on 24 Jan 2026, 11:00 AM"
              tag="BC-156"
              selected={selectedCards.includes('build')}
              onSelect={() => toggleCardSelection('build')}
            />
            <Cards
              type="3Sixty"
              title="3Sixty Document"
              subtitle="Type: 3Sixty - Same styling as comfortable cards"
              subtitle2="Encrypting sensitive data stored on portable devices is a critical security measure aimed at safeguarding against potential data breaches. When employees are required to encrypt such data, it ensures that even if the device falls into unauthorized hands, the information remains unintelligible and inaccessible to anyone without the proper decryption key."
              tag="DOC-789"
              fileType="pdf"
              selected={selectedCards.includes('3Sixty')}
              onSelect={() => toggleCardSelection('3Sixty')}
            />
          </div>
        </div>
      </div>
    );
  }
};

// Build Cards
export const BuildCards: Story = {
  name: '04 Build Cards',
  render: () => {
    const [selectedBuilds, setSelectedBuilds] = React.useState<number[]>([1]);
    const { colors } = useTheme();

    const builds = [
      { 
        id: 1, 
        name: 'BC-2024-0156', 
        status: 'Approved - Ready for issue',
        topText: 'Building Consent - Form 2',
        bottomText: 'Residential dwelling • 123 Main St • Approved: 15 Dec 2024',
        tag: 'BC-156'
      },
      { 
        id: 2, 
        name: 'BC-2024-0155', 
        status: 'Under review - Additional info required',
        topText: 'Building Consent - Form 2',
        bottomText: 'Commercial renovation • 45 Queen St • Requested: 10 Dec 2024',
        tag: 'BC-155'
      },
      { 
        id: 3, 
        name: 'BC-2024-0154', 
        status: 'Processing - Initial assessment',
        topText: 'Building Consent - Form 2',
        bottomText: 'Residential extension • 78 Park Ave • Submitted: 14 Dec 2024',
        tag: 'BC-154'
      },
      { 
        id: 4, 
        name: 'BC-2024-0153', 
        status: 'Declined - Does not meet standards',
        topText: 'Building Consent - Form 2',
        bottomText: 'Industrial warehouse • 99 Industrial Rd • Declined: 12 Dec 2024',
        tag: 'BC-153'
      },
    ];

    const toggleBuildSelection = (id: number) => {
      setSelectedBuilds(prev =>
        prev.includes(id)
          ? prev.filter(buildId => buildId !== id)
          : [...prev, id]
      );
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing[6] || '24px' }}>
        <div>
          <h4 style={{ marginBottom: colors.spacing[3] || '12px', fontSize: colors.fontSize?.sm || '14px', fontWeight: 600, color: colors.textPrimary }}>Building Consent Cards</h4>
          <p style={{ marginBottom: colors.spacing[4] || '16px', fontSize: colors.fontSize?.sm || '14px', color: colors.textSecondary }}>
            Build cards with consent type above title and details below status. Perfect for consent management systems.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing[3] || '12px' }}>
            {builds.map(build => (
              <Cards
                key={build.id}
                type="build"
                title={build.name}
                subtitle={build.status}
                topText={build.topText}
                bottomText={build.bottomText}
                tag={build.tag}
                selected={selectedBuilds.includes(build.id)}
                onSelect={() => toggleBuildSelection(build.id)}
                onMenuClick={() => alert(`Build options for ${build.name}`)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  },
};

// 3Sixty Cards
export const ThreeSixtyCards: Story = {
  name: '05 3Sixty Cards',
  render: () => {
    const [selectedDocs, setSelectedDocs] = React.useState<number[]>([1]);
    const { colors } = useTheme();

    const documents = [
      { 
        id: 1, 
        name: 'Annual Report 2024.pdf', 
        description: 'Complete financial and operational report',
        description2: 'Last modified: 15 Dec 2024 | Size: 2.3 MB',
        tag: 'FIN-2024'
      },
      { 
        id: 2, 
        name: 'Strategic Plan 2025-2030.docx', 
        description: 'Five-year strategic roadmap and goals',
        description2: 'Last modified: 10 Dec 2024 | Size: 856 KB',
        tag: 'STRAT-001'
      },
      { 
        id: 3, 
        name: 'Q4 Performance Review.xlsx', 
        description: 'Quarterly metrics and KPI analysis',
        description2: 'Last modified: 14 Dec 2024 | Size: 1.5 MB',
        tag: 'PERF-Q4'
      },
      { 
        id: 4, 
        name: 'Compliance Audit Results.pdf', 
        description: 'Internal audit findings and recommendations',
        description2: 'Last modified: 12 Dec 2024 | Size: 4.2 MB',
        tag: 'AUDIT-156'
      },
    ];

    const toggleDocSelection = (id: number) => {
      setSelectedDocs(prev =>
        prev.includes(id)
          ? prev.filter(docId => docId !== id)
          : [...prev, id]
      );
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing[6] || '24px' }}>
        <div>
          <h4 style={{ marginBottom: colors.spacing[3] || '12px', fontSize: colors.fontSize?.sm || '14px', fontWeight: 600, color: colors.textPrimary }}>3Sixty Document Cards</h4>
          <p style={{ marginBottom: colors.spacing[4] || '16px', fontSize: colors.fontSize?.sm || '14px', color: colors.textSecondary }}>
            3Sixty cards use the same comfortable styling for document management.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing[3] || '12px' }}>
            {documents.map(doc => (
              <Cards
                key={doc.id}
                type="3Sixty"
                title={doc.name}
                subtitle={doc.description}
                subtitle2={doc.description2}
                tag={doc.tag}
                selected={selectedDocs.includes(doc.id)}
                onSelect={() => toggleDocSelection(doc.id)}
                onInfoClick={() => alert(`View details for ${doc.name}`)}
                onMenuClick={() => alert(`Document options for ${doc.name}`)}
                fileType="pdf"
              />
            ))}
          </div>
        </div>
      </div>
    );
  },
};

// User Cards
export const UserCards: Story = {
  name: '06 User Cards',
  render: () => {
    const [selectedUsers, setSelectedUsers] = React.useState<number[]>([1]);
    const { colors } = useTheme();

    const users = [
      { id: 1, name: 'Sarah Chen', role: 'Design Lead', tag: 'Admin' },
      { id: 2, name: 'Mike Davis', role: 'Frontend Developer', tag: 'Developer' },
      { id: 3, name: 'Alex Johnson', role: 'Product Manager', tag: 'Manager' },
      { id: 4, name: 'Lisa Wang', role: 'UX Researcher', tag: 'Researcher' },
    ];

    const toggleUserSelection = (id: number) => {
      setSelectedUsers(prev =>
        prev.includes(id)
          ? prev.filter(userId => userId !== id)
          : [...prev, id]
      );
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing[6] || '24px' }}>
        <div>
          <h4 style={{ marginBottom: colors.spacing[3] || '12px', fontSize: colors.fontSize?.sm || '14px', fontWeight: 600, color: colors.textPrimary }}>User Profile Cards</h4>
          <p style={{ marginBottom: colors.spacing[4] || '16px', fontSize: colors.fontSize?.sm || '14px', color: colors.textSecondary }}>
            Larger user cards with enhanced spacing and user icons for team member selection.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing[3] || '12px' }}>
            {users.map(user => (
              <Cards
                key={user.id}
                type="user"
                title={user.name}
                subtitle={user.role}
                tag={user.tag}
                selected={selectedUsers.includes(user.id)}
                onSelect={() => toggleUserSelection(user.id)}
                onInfoClick={() => alert(`View ${user.name}'s profile`)}
                onMenuClick={() => alert(`More options for ${user.name}`)}
                fileType="user"
              />
            ))}
          </div>
        </div>
      </div>
    );
  },
};

// Interactive features
export const InteractiveFeatures: Story = {
  args: {
    type: "build"
  },

  name: '07 Interactive Features',

  render: () => {
    const { colors } = useTheme();
    const [selected1, setSelected1] = React.useState(false);
    const [selected2, setSelected2] = React.useState(true);
    const [selected3, setSelected3] = React.useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing[6] || '24px' }}>
        <div>
          <h4 style={{ marginBottom: colors.spacing[3] || '12px', fontSize: colors.fontSize?.sm || '14px', fontWeight: 600, color: colors.textPrimary }}>Interactive Cards</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing[3] || '12px' }}>
            <Cards
              title="Click to select"
              subtitle="Try clicking the checkbox or the card"
              tag="Interactive"
              selected={selected1}
              onSelect={setSelected1}
              onInfoClick={() => alert('Info clicked!')}
              onMenuClick={() => alert('Menu clicked!')}
            />
            <Cards
              title="Pre-selected card"
              subtitle="This card starts selected"
              tag="Selected"
              selected={selected2}
              onSelect={setSelected2}
              onInfoClick={() => alert('Info clicked!')}
              onMenuClick={() => alert('Menu clicked!')}
            />
            <Cards
              title="Without action icons"
              subtitle="No info or menu icons"
              tag="Minimal"
              selected={selected3}
              onSelect={setSelected3}
              showInfoIcon={false}
              showMenuIcon={false}
            />
          </div>
        </div>
      </div>
    );
  }
};

// Metadata with White Chips
export const MetadataWithWhiteChips: Story = {
  name: '08 Metadata Cards with White Chips',
  render: () => {
    const { colors } = useTheme();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing[6] || '24px' }}>
        <div>
          <h4 style={{ marginBottom: colors.spacing[3] || '12px', fontSize: colors.fontSize?.sm || '14px', fontWeight: 600, color: colors.textPrimary }}>Metadata Cards with White Chips</h4>
          <p style={{ marginBottom: colors.spacing[4] || '16px', fontSize: colors.fontSize?.sm || '14px', color: colors.textSecondary }}>
            Metadata cards show file information using white chip variants with proper theme support.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing[3] || '12px' }}>
            <Cards
              type="metadata"
              title="Design System Guidelines.pdf"
              subtitle="Updated 2 hours ago by Sarah Chen"
              tag="v3.2.1"
              extensionSize={true}
              showMetadata={true}
              fileType="pdf"
            />
            <Cards
              type="metadata"
              title="Component Library.fig"
              subtitle="Shared with design team"
              tag="Draft"
              extensionSize={true}
              showMetadata={true}
              fileType="figma"
              selected={true}
            />
            <Cards
              type="metadata"
              title="User Research Data.xlsx"
              subtitle="Q4 analytics and insights"
              tag="Confidential"
              extensionSize={true}
              showMetadata={true}
              fileType="excel"
            />
          </div>
        </div>
      </div>
    );
  },
};

// Icon variations
export const IconVariations: Story = {
  name: '09 Icon Variations',
  render: () => {
    const { colors } = useTheme();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing[6] || '24px' }}>
        <div>
          <h4 style={{ marginBottom: colors.spacing[3] || '12px', fontSize: colors.fontSize?.sm || '14px', fontWeight: 600, color: colors.textPrimary }}>Icon Configurations</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing[3] || '12px' }}>
          <Cards
            title="All icons visible"
            subtitle="Folder icon and action icons shown"
            tag="Full"
            iconGutter={true}
            showInfoIcon={true}
            showMenuIcon={true}
          />
          <Cards
            title="With gutter icons"
            subtitle="Folder icon with additional gutter icons"
            tag="Gutter"
            iconGutter={true}
            gutterIcons={['star', 'bookmark', 'lock']}
            showInfoIcon={true}
            showMenuIcon={true}
          />
          <Cards
            title="No folder icon"
            subtitle="Action icons only, no icon gutter"
            tag="No Gutter"
            iconGutter={false}
            showInfoIcon={true}
            showMenuIcon={true}
          />
          <Cards
            title="Info icon only"
            subtitle="Only information icon visible"
            tag="Info"
            showInfoIcon={true}
            showMenuIcon={false}
          />
          <Cards
            title="Menu icon only"
            subtitle="Only menu icon visible"
            tag="Menu"
            showInfoIcon={false}
            showMenuIcon={true}
          />
          <Cards
            title="No action icons"
            subtitle="Only folder icon, no action icons"
            tag="Minimal"
            showInfoIcon={false}
            showMenuIcon={false}
          />
          <Cards
            title="No icons at all"
            subtitle="Clean card without any icons"
            tag="Clean"
            iconGutter={false}
            showInfoIcon={false}
            showMenuIcon={false}
          />
        </div>
      </div>
    </div>
    );
  },
};

// Real-world examples
export const RealWorldExamples: Story = {
  name: '10 Real World Examples',
  render: () => {
    const [selectedFiles, setSelectedFiles] = React.useState<number[]>([1, 3]);

    const files = [
      { id: 1, title: 'Design System.fig', subtitle: 'Modified by Sarah Chen', tag: 'v3.2.1' },
      { id: 2, title: 'Component Library', subtitle: 'Updated yesterday', tag: 'Latest' },
      { id: 3, title: 'User Research Notes.docx', subtitle: 'Shared by Mike Davis', tag: 'Draft' },
      { id: 4, title: 'Q4 Analytics Report.pdf', subtitle: 'Created 3 days ago', tag: 'Final' },
      { id: 5, title: 'Sprint Planning.xlsx', subtitle: 'Last edited 1 hour ago', tag: 'WIP' },
    ];

    const toggleSelection = (id: number) => {
      setSelectedFiles(prev =>
        prev.includes(id)
          ? prev.filter(fileId => fileId !== id)
          : [...prev, id]
      );
    };

    const { colors } = useTheme();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing[6] || '24px' }}>
        <div>
          <h4 style={{ marginBottom: colors.spacing[3] || '12px', fontSize: colors.fontSize?.sm || '14px', fontWeight: 600, color: colors.textPrimary }}>File Manager Example</h4>
          <p style={{ marginBottom: colors.spacing[4] || '16px', fontSize: colors.fontSize?.sm || '14px', color: colors.textSecondary }}>
            {selectedFiles.length} file(s) selected
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing[2] || '8px' }}>
            {files.map(file => (
              <Cards
                key={file.id}
                title={file.title}
                subtitle={file.subtitle}
                tag={file.tag}
                selected={selectedFiles.includes(file.id)}
                onSelect={() => toggleSelection(file.id)}
                onInfoClick={() => alert(`Info for ${file.title}`)}
                onMenuClick={() => alert(`Menu for ${file.title}`)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  },
};

// Accessibility example
export const AccessibilityFocus: Story = {
  name: '11 Accessibility Focus',
  render: () => {
    const { colors } = useTheme();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing[6] || '24px' }}>
        <div>
          <h4 style={{ marginBottom: colors.spacing[3] || '12px', fontSize: colors.fontSize?.sm || '14px', fontWeight: 600, color: colors.textPrimary }}>Accessibility Features</h4>
          <p style={{ marginBottom: colors.spacing[4] || '16px', fontSize: colors.fontSize?.sm || '14px', color: colors.textSecondary }}>
            Cards are fully keyboard accessible. Try tabbing through and using Space/Enter to select.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing[3] || '12px' }}>
          <Cards
            title="Keyboard Accessible"
            subtitle="Press Tab to focus, Space to select"
            tag="A11y"
            aria-label="Accessible card with keyboard support"
            aria-describedby="card-help-text"
          />
          <Cards
            title="Screen Reader Friendly"
            subtitle="Includes proper ARIA labels"
            tag="ARIA"
            aria-label="Card with screen reader support"
          />
          <Cards
            title="Focus Indicators"
            subtitle="Clear focus states for keyboard users"
            tag="Focus"
          />
        </div>
        <p id="card-help-text" style={{ marginTop: colors.spacing[4] || '16px', fontSize: colors.fontSize?.xs || '12px', color: colors.textMuted }}>
          Use arrow keys to navigate between cards, Space or Enter to select/deselect
        </p>
      </div>
    </div>
    );
  },
};

// Edge cases
export const EdgeCases: Story = {
  name: '12 Edge Cases',
  render: () => {
    const { colors } = useTheme();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing[6] || '24px' }}>
        <div>
          <h4 style={{ marginBottom: colors.spacing[3] || '12px', fontSize: colors.fontSize?.sm || '14px', fontWeight: 600, color: colors.textPrimary }}>Edge Cases</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing[3] || '12px' }}>
          <Cards
            title="Very long title that might overflow the available space in the card component"
            subtitle="Similarly long subtitle text that could potentially wrap to multiple lines depending on the container width"
            tag="LongTextExample"
          />
          <Cards
            title=""
            subtitle=""
            tag=""
          />
          <Cards
            title="No subtitle or tag"
            subtitle=""
            tag=""
          />
          <Cards
            title="特殊字符 & émojis 🎨"
            subtitle="Testing unicode support 中文"
            tag="UTF-8"
          />
        </div>
      </div>
    </div>
    );
  },
};

// Playground
export const Playground: Story = {
  name: '13 Playground',
  args: {
    title: 'Playground Card',
    subtitle: 'Experiment with props',
    tag: 'v1.0',
    type: 'comfortable',
    iconGutter: true,
    gutterIcons: ['star', 'bookmark'],
    extensionSize: true,
    disabled: false,
    error: false,
    selected: false,
    showInfoIcon: true,
    showMenuIcon: true,
    topText: 'Top secondary text',
    bottomText: 'Bottom secondary text',
  },
};