import React, { useState, useEffect } from 'react';
import ODLTheme from '../styles/ODLTheme';
import Icon from '../components/Icon/Icon';
import Button from '../components/Button/Button';
import styles from './EditingPage.module.css';

interface EditingPageProps {
  amendmentTitle?: string | null;
  onBack?: () => void;
  fromPage?: string;
}

const EditingPage: React.FC<EditingPageProps> = ({ amendmentTitle, onBack, fromPage = 'Dashboard' }) => {
  const [selectedSection, setSelectedSection] = useState<string>('1');
  const [isEditMode, setIsEditMode] = useState<boolean>(true);
  const [showAuditTrail, setShowAuditTrail] = useState<boolean>(false);
  const [showTableOfContents, setShowTableOfContents] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [mobileAuditOpen, setMobileAuditOpen] = useState<boolean>(false);

  // Set the page title to match the amendment title
  useEffect(() => {
    if (amendmentTitle) {
      document.title = amendmentTitle;
    } else {
      document.title = 'Document Editor';
    }
    
    // Cleanup - restore original title when component unmounts
    return () => {
      document.title = 'ODL Build - MultiPage Example';
    };
  }, [amendmentTitle]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
        setMobileAuditOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setMobileAuditOpen(false);
  };

  const toggleMobileAudit = () => {
    setMobileAuditOpen(!mobileAuditOpen);
    setMobileMenuOpen(false);
  };

  // Table of Contents data
  const tableOfContents = [
    { id: '1', title: '1. Purpose and Scope', level: 1 },
    { id: '1.1', title: '1.1 Purpose', level: 2 },
    { id: '1.2', title: '1.2 Scope', level: 2 },
    { id: '1.3', title: '1.3 Legislative Authority', level: 2 },
    { id: '2', title: '2. Definitions', level: 1 },
    { id: '3', title: '3. Policy Principles', level: 1 },
    { id: '3.1', title: '3.1 Guiding Principles', level: 2 },
    { id: '3.2', title: '3.2 Management Objectives', level: 2 },
    { id: '4', title: '4. Permitted and Prohibited Activities', level: 1 },
    { id: '4.1', title: '4.1 General Permitted Activities', level: 2 },
    { id: '4.2', title: '4.2 Activities Requiring Permits', level: 2 },
    { id: '4.3', title: '4.3 Prohibited Activities', level: 2 },
    { id: '5', title: '5. Management Procedures', level: 1 },
    { id: '5.1', title: '5.1 Booking and Permit Procedures', level: 2 },
    { id: '5.2', title: '5.2 Maintenance and Inspection', level: 2 },
    { id: '5.3', title: '5.3 Compliance and Enforcement', level: 2 },
    { id: '6', title: '6. Review and Amendment', level: 1 },
    { id: '6.1', title: '6.1 Amendment Process', level: 2 },
    { id: '7', title: '7. Implementation', level: 1 },
    { id: '7.1', title: '7.1 Training and Communication', level: 2 },
    { id: '8', title: '8. Contact Information', level: 1 },
  ];

  // Audit trail data
  const auditTrailEntries = [
    {
      id: 1,
      user: 'Sarah Mitchell',
      action: 'Document created',
      timestamp: '2024-01-01 09:00 AM',
      section: 'Full document',
      type: 'create' as const
    },
    {
      id: 2,
      user: 'John Smith',
      action: 'Updated Section 1.2',
      timestamp: '2024-01-15 02:30 PM',
      section: '1.2 Scope',
      type: 'edit' as const
    },
    {
      id: 3,
      user: 'Emily Chen',
      action: 'Added comment',
      timestamp: '2024-01-20 11:15 AM',
      section: '3.1 Guiding Principles',
      type: 'comment' as const
    },
    {
      id: 4,
      user: 'Michael Torres',
      action: 'Approved changes',
      timestamp: '2024-01-22 04:45 PM',
      section: 'Full document',
      type: 'approve' as const
    },
    {
      id: 5,
      user: 'Lisa Anderson',
      action: 'Updated Section 4.3',
      timestamp: '2024-01-25 10:00 AM',
      section: '4.3 Prohibited Activities',
      type: 'edit' as const
    },
  ];

  // Mock document content with dynamic title
  const documentTitle = amendmentTitle || 'PUBLIC SPACES MANAGEMENT AND COMMUNITY USE POLICY';
  const documentContent = `
    <h1 style="font-size: ${ODLTheme.typography.fontSize.xl}; color: ${ODLTheme.colors.text.primary}; margin-bottom: ${ODLTheme.spacing[2]};">${documentTitle}</h1>
    <h2 style="font-size: ${ODLTheme.typography.fontSize.lg}; color: ${ODLTheme.colors.text.secondary}; font-weight: normal; margin-bottom: ${ODLTheme.spacing[6]};">CITY OF RIVERDALE</h2>
    
    <p><strong>Policy Number:</strong> PSM-2024-07<br/>
    <strong>Effective Date:</strong> January 1, 2024<br/>
    <strong>Review Date:</strong> January 1, 2026<br/>
    <strong>Approved By:</strong> Riverdale City Council<br/>
    <strong>Resolution Number:</strong> 2024-RC-1892</p>
    
    <hr style="margin: ${ODLTheme.spacing[6]} 0;"/>
    
    <h2 id="1">1. PURPOSE AND SCOPE</h2>
    
    <h3 id="1.1">1.1 Purpose</h3>
    <p>This policy establishes a comprehensive framework for the management, maintenance, and community use of public spaces within the City of Riverdale. The policy aims to ensure equitable access, sustainable management, and the preservation of public spaces for current and future generations while promoting community wellbeing and environmental stewardship.</p>
    
    <h3 id="1.2">1.2 Scope</h3>
    <p>This policy applies to all public spaces owned, operated, or managed by the City of Riverdale, including but not limited to:</p>
    <ul>
      <li>Municipal parks and gardens</li>
      <li>Public squares and plazas</li>
      <li>Community recreation facilities</li>
      <li>Nature reserves and conservation areas</li>
      <li>Public walkways and trails</li>
      <li>Waterfront areas and beaches</li>
      <li>Sports fields and courts</li>
      <li>Children's playgrounds</li>
    </ul>
    
    <h3 id="1.3">1.3 Legislative Authority</h3>
    <p>This policy is established pursuant to the Local Government Act 1995, the Environmental Protection Act 2019, and the Community Services Regulation 2021, and operates in conjunction with all relevant state and federal legislation.</p>
    
    <div style="page-break-after: always; margin: ${ODLTheme.spacing[12]} 0;"></div>
    
    <h2 id="2">2. DEFINITIONS</h2>
    
    <p>For the purposes of this policy, the following definitions apply:</p>
    
    <p><strong>Community Use:</strong> The utilization of public spaces by residents, visitors, and community organizations for recreational, cultural, educational, or social purposes in accordance with designated uses and applicable regulations.</p>
    
    <p><strong>Environmental Stewardship:</strong> The responsible management and care of public spaces to protect and enhance their environmental value, including conservation of natural habitats, sustainable landscaping practices, and minimization of environmental impact.</p>
    
    <p><strong>Public Space:</strong> Any land, building, or facility owned, operated, or controlled by the City of Riverdale that is accessible to the general public for recreational, cultural, educational, or community purposes.</p>
    
    <p><strong>Sustainable Management:</strong> Management practices that meet current community needs while preserving the ability of future generations to meet their own needs, incorporating environmental, social, and economic considerations.</p>
    
    <p><strong>Equitable Access:</strong> The principle that all members of the community should have fair and reasonable opportunity to use and benefit from public spaces, regardless of age, ability, cultural background, economic status, or other personal characteristics.</p>
    
    <div style="page-break-after: always; margin: ${ODLTheme.spacing[12]} 0;"></div>
    
    <h2 id="3">3. POLICY PRINCIPLES</h2>
    
    <h3 id="3.1">3.1 Guiding Principles</h3>
    
    <p>The management and use of public spaces shall be guided by the following principles:</p>
    
    <h4>3.1.1 Accessibility and Inclusion</h4>
    <p>Public spaces shall be designed, maintained, and operated to ensure accessibility for all community members, including persons with disabilities, families with children, elderly residents, and individuals from diverse cultural backgrounds. Universal design principles shall be applied wherever possible to create spaces that are inherently accessible and usable by all people.</p>
    
    <h4>3.1.2 Environmental Sustainability</h4>
    <p>The development and maintenance of public spaces shall prioritize environmental protection and sustainability through:</p>
    <ul>
      <li>Conservation of native flora and fauna</li>
      <li>Implementation of water-wise landscaping and irrigation systems</li>
      <li>Use of sustainable and recycled materials in construction and maintenance</li>
      <li>Minimization of chemical pesticides and fertilizers</li>
      <li>Integration of renewable energy sources where feasible</li>
      <li>Climate change adaptation and resilience planning</li>
    </ul>
    
    <h4>3.1.3 Community Engagement</h4>
    <p>The planning, development, and management of public spaces shall involve meaningful consultation with the community, including:</p>
    <ul>
      <li>Regular community forums and stakeholder meetings</li>
      <li>Online consultation platforms and surveys</li>
      <li>Engagement with special interest groups and community organizations</li>
      <li>Youth engagement programs and initiatives</li>
      <li>Cultural consultation with Indigenous community representatives</li>
    </ul>
    
    <div style="page-break-after: always; margin: ${ODLTheme.spacing[12]} 0;"></div>
    
    <h3 id="3.2">3.2 Management Objectives</h3>
    
    <p>The City's management of public spaces aims to achieve the following objectives:</p>
    
    <h4>3.2.1 Health and Wellbeing</h4>
    <p>Public spaces shall be designed and maintained to promote physical activity, mental health, and social interaction. This includes providing diverse recreational opportunities, quiet contemplative spaces, and facilities that encourage active lifestyles and community connection.</p>
    
    <h4>3.2.2 Cultural and Social Cohesion</h4>
    <p>Public spaces shall serve as venues for cultural expression, community events, and social interaction that strengthen community bonds and celebrate the diverse heritage of Riverdale residents.</p>
    
    <h4>3.2.3 Economic Vitality</h4>
    <p>Well-maintained and attractive public spaces contribute to the economic vitality of the city by enhancing property values, attracting visitors, and supporting local businesses. The management of public spaces shall consider their role in the broader economic development of the community.</p>
    
    <h4>3.2.4 Safety and Security</h4>
    <p>Public spaces shall be designed and maintained with safety and security as paramount considerations, incorporating Crime Prevention Through Environmental Design (CPTED) principles and ensuring adequate lighting, sight lines, and emergency access.</p>
    
    <div style="page-break-after: always; margin: ${ODLTheme.spacing[12]} 0;"></div>
    
    <h2 id="4">4. PERMITTED AND PROHIBITED ACTIVITIES</h2>
    
    <h3 id="4.1">4.1 General Permitted Activities</h3>
    
    <p>The following activities are generally permitted in public spaces without requiring specific authorization:</p>
    
    <h4>4.1.1 Recreational Activities</h4>
    <ul>
      <li>Walking, jogging, and cycling on designated paths</li>
      <li>Playground use by children under appropriate supervision</li>
      <li>Informal sports and games that do not interfere with other users</li>
      <li>Picnicking in designated areas</li>
      <li>Nature observation and photography</li>
      <li>Dog walking in designated off-leash areas (where permitted)</li>
    </ul>
    
    <h4>4.1.2 Social and Cultural Activities</h4>
    <ul>
      <li>Small informal gatherings and family celebrations</li>
      <li>Reading, studying, and quiet contemplation</li>
      <li>Artistic activities such as sketching, painting, and music practice (subject to noise considerations)</li>
      <li>Educational activities and nature study</li>
    </ul>
    
    <h3 id="4.2">4.2 Activities Requiring Permits</h3>
    
    <p>The following activities require advance booking and/or permit approval:</p>
    
    <h4>4.2.1 Events and Gatherings</h4>
    <ul>
      <li>Organized events with more than 50 participants</li>
      <li>Commercial photography and filming</li>
      <li>Weddings and formal celebrations</li>
      <li>Fundraising activities and markets</li>
      <li>Sports competitions and tournaments</li>
      <li>Music performances and entertainment events</li>
    </ul>
    
    <h4>4.2.2 Exclusive Use Activities</h4>
    <ul>
      <li>Private functions requiring exclusive access to facilities</li>
      <li>Corporate events and team building activities</li>
      <li>Educational programs requiring specialized equipment</li>
      <li>Fitness classes and organized group activities</li>
    </ul>
    
    <div style="page-break-after: always; margin: ${ODLTheme.spacing[12]} 0;"></div>
    
    <h3 id="4.3">4.3 Prohibited Activities</h3>
    
    <p>The following activities are prohibited in all public spaces:</p>
    
    <h4>4.3.1 Safety and Security Violations</h4>
    <ul>
      <li>Consumption of alcohol outside designated licensed areas</li>
      <li>Use or possession of illegal substances</li>
      <li>Violent or threatening behavior</li>
      <li>Vandalism, graffiti, or damage to property</li>
      <li>Unauthorized camping or overnight stays</li>
      <li>Open fires outside designated barbecue areas</li>
    </ul>
    
    <h4>4.3.2 Environmental Protection Violations</h4>
    <ul>
      <li>Littering or improper disposal of waste</li>
      <li>Damage to vegetation or wildlife</li>
      <li>Unauthorized removal of plants, rocks, or natural materials</li>
      <li>Introduction of non-native species</li>
      <li>Pollution of waterways or water features</li>
    </ul>
    
    <h4>4.3.3 Nuisance Activities</h4>
    <ul>
      <li>Excessive noise that disturbs other users</li>
      <li>Commercial activities without appropriate permits</li>
      <li>Motor vehicle access outside designated areas</li>
      <li>Soliciting or begging</li>
      <li>Feeding of wildlife (except in designated areas with approved food)</li>
    </ul>
    
    <div style="page-break-after: always; margin: ${ODLTheme.spacing[12]} 0;"></div>
    
    <h2 id="5">5. MANAGEMENT PROCEDURES</h2>
    
    <h3 id="5.1">5.1 Booking and Permit Procedures</h3>
    
    <p>Applications for permits and bookings shall be submitted using the online booking system or by contacting the Parks and Recreation Department. All applications must be submitted at least 14 days in advance for standard bookings, and 28 days in advance for large events requiring additional coordination.</p>
    
    <h4>5.1.1 Application Requirements</h4>
    <p>All permit applications must include:</p>
    <ul>
      <li>Completed application form with contact details</li>
      <li>Detailed description of proposed activity</li>
      <li>Expected number of participants</li>
      <li>Risk management plan (for events over 100 people)</li>
      <li>Insurance certificate (where required)</li>
      <li>Site plan showing setup and emergency access</li>
    </ul>
    
    <h3 id="5.2">5.2 Maintenance and Inspection</h3>
    
    <p>The City shall maintain all public spaces to a high standard through regular inspection, preventive maintenance, and responsive repair programs. Maintenance schedules shall be developed based on usage patterns, seasonal requirements, and asset condition assessments.</p>
    
    <h3 id="5.3">5.3 Compliance and Enforcement</h3>
    
    <p>The City reserves the right to enforce this policy through education, warnings, fines, and where necessary, prosecution. Enforcement officers are authorized to issue on-the-spot fines for violations and may require immediate cessation of prohibited activities.</p>
    
    <div style="page-break-after: always; margin: ${ODLTheme.spacing[12]} 0;"></div>
    
    <h2 id="6">6. REVIEW AND AMENDMENT</h2>
    
    <p>This policy shall be reviewed every two years or as required to ensure its continued relevance and effectiveness. Community input shall be sought as part of the review process through public consultation and stakeholder engagement.</p>
    
    <h3 id="6.1">6.1 Amendment Process</h3>
    
    <p>Proposed amendments to this policy must be:</p>
    <ul>
      <li>Drafted by the Parks and Recreation Department</li>
      <li>Subject to community consultation (minimum 21 days)</li>
      <li>Reviewed by the City's Legal Department</li>
      <li>Approved by City Council resolution</li>
    </ul>
    
    <h2 id="7">7. IMPLEMENTATION</h2>
    
    <p>This policy comes into effect on January 1, 2024, and supersedes all previous public spaces management policies. The Parks and Recreation Department is responsible for implementation and shall develop operational procedures to support policy objectives.</p>
    
    <h3 id="7.1">7.1 Training and Communication</h3>
    
    <p>All staff involved in public spaces management shall receive appropriate training on policy requirements. Public information campaigns shall be conducted to inform the community about policy provisions and procedures.</p>
    
    <h2 id="8">8. CONTACT INFORMATION</h2>
    
    <p>For questions about this policy or to make permit applications, contact:</p>
    
    <p><strong>Parks and Recreation Department</strong><br/>
    City of Riverdale<br/>
    123 Municipal Drive<br/>
    Riverdale, State 12345<br/>
    Phone: (555) 123-4567<br/>
    Email: parks@riverdale.gov<br/>
    Website: www.riverdale.gov/parks</p>
    
    <hr style="margin: ${ODLTheme.spacing[6]} 0;"/>
    
    <p><em>This policy was adopted by City Council Resolution 2024-RC-1892 on December 15, 2023, and becomes effective January 1, 2024.</em></p>
  `;

  return (
    <div style={{ 
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: ODLTheme.colors.background
    }}>

      {/* Top Toolbar */}
      <div style={{
        background: 'white',
        borderBottom: `1px solid ${ODLTheme.colors.border}`,
        padding: `${ODLTheme.spacing[2]} ${ODLTheme.spacing[4]}`,
        flexShrink: 0
      }}>
        {/* First Row - Action Buttons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: ODLTheme.spacing[2]
        }}>
          {/* Mobile Menu Button */}
          {isMobile && (
            <Button
              variant="ghost"
              size="small"
              onClick={toggleMobileMenu}
              style={{ 
                position: 'absolute',
                left: ODLTheme.spacing[4]
              }}
            >
              <Icon name="menu" size={20} />
            </Button>
          )}
          
          {/* Centered buttons */}
          <div style={{ 
            display: 'flex', 
            gap: ODLTheme.spacing[2],
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <Button
              onClick={() => isMobile ? toggleMobileMenu() : setShowTableOfContents(!showTableOfContents)}
              variant={(isMobile ? mobileMenuOpen : showTableOfContents) ? 'primary' : 'secondary'}
              size="small"
            >
              <Icon name="list" size={16} />
              {!isMobile && 'Table of Contents'}
            </Button>
            <Button
              onClick={() => isMobile ? toggleMobileAudit() : setShowAuditTrail(!showAuditTrail)}
              variant={(isMobile ? mobileAuditOpen : showAuditTrail) ? 'primary' : 'secondary'}
              size="small"
            >
              <Icon name="audit" size={16} />
              {!isMobile && 'Audit Trail'}
            </Button>
            <Button
              onClick={() => setIsEditMode(!isEditMode)}
              variant="secondary"
              size="small"
            >
              <Icon name={isEditMode ? 'view' : 'edit'} size={16} />
              {isEditMode ? 'Preview' : 'Edit'}
            </Button>
          </div>
        </div>

        {/* Second Row - Editing Tools */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: ODLTheme.spacing[3],
          flexWrap: 'wrap'
        }}>
          {/* File operations */}
          <div style={{ display: 'flex', gap: ODLTheme.spacing[1] }}>
            <Button variant="ghost" size="small">
              <Icon name="save" size={20} />
            </Button>
            <Button variant="ghost" size="small">
              <Icon name="document-export" size={20} />
            </Button>
            <Button variant="ghost" size="small">
              <Icon name="printer" size={20} />
            </Button>
          </div>

          <div style={{ width: '1px', height: '24px', background: ODLTheme.colors.border }} />

          {/* Formatting toolbar */}
          <div style={{ display: 'flex', gap: ODLTheme.spacing[1] }}>
            <Button variant="ghost" size="small">
              <Icon name="text-bold" size={20} />
            </Button>
            <Button variant="ghost" size="small">
              <Icon name="text-italic" size={20} />
            </Button>
            <Button variant="ghost" size="small">
              <Icon name="text-underline" size={20} />
            </Button>
            <Button variant="ghost" size="small">
              <Icon name="text-strikethrough" size={20} />
            </Button>
          </div>

          <div style={{ width: '1px', height: '24px', background: ODLTheme.colors.border }} />

          {/* Alignment */}
          <div style={{ display: 'flex', gap: ODLTheme.spacing[1] }}>
            <Button variant="ghost" size="small">
              <Icon name="text-align-left" size={20} />
            </Button>
            <Button variant="ghost" size="small">
              <Icon name="text-align-center" size={20} />
            </Button>
            <Button variant="ghost" size="small">
              <Icon name="text-align-right" size={20} />
            </Button>
            <Button variant="ghost" size="small">
              <Icon name="text-align-justify" size={20} />
            </Button>
          </div>

          <div style={{ width: '1px', height: '24px', background: ODLTheme.colors.border }} />

          {/* Lists */}
          <div style={{ display: 'flex', gap: ODLTheme.spacing[1] }}>
            <Button variant="ghost" size="small">
              <Icon name="list-bulleted" size={20} />
            </Button>
            <Button variant="ghost" size="small">
              <Icon name="list-numbered" size={20} />
            </Button>
            <Button variant="ghost" size="small">
              <Icon name="text-indent-less" size={20} />
            </Button>
            <Button variant="ghost" size="small">
              <Icon name="text-indent-more" size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ 
        flex: 1,
        display: 'flex',
        overflow: 'hidden'
      }}>
        {/* Mobile Overlay */}
        {isMobile && (mobileMenuOpen || mobileAuditOpen) && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999
            }}
            onClick={() => {
              setMobileMenuOpen(false);
              setMobileAuditOpen(false);
            }}
          />
        )}

        {/* Table of Contents Sidebar */}
        {(isMobile ? mobileMenuOpen : showTableOfContents) && (
          <div style={{
            position: isMobile ? 'fixed' : 'static',
            top: isMobile ? 0 : 'auto',
            left: isMobile ? 0 : 'auto',
            bottom: isMobile ? 0 : 'auto',
            width: isMobile ? '80%' : '280px',
            maxWidth: '280px',
            background: 'white',
            borderRight: `1px solid ${ODLTheme.colors.border}`,
            overflowY: 'auto',
            flexShrink: 0,
            zIndex: isMobile ? 1000 : 'auto',
            transform: isMobile ? (mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)') : 'none',
            transition: 'transform 0.3s ease'
          }}>
            <div style={{
              padding: ODLTheme.spacing[4],
              borderBottom: `1px solid ${ODLTheme.colors.border}`,
              background: ODLTheme.colors.surface,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{
                fontSize: ODLTheme.typography.fontSize.lg,
                fontWeight: ODLTheme.typography.fontWeight.semibold,
                color: ODLTheme.colors.text.primary,
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: ODLTheme.spacing[2]
              }}>
                <Icon name="list" size={20} />
                Table of Contents
              </h3>
              <Button
                variant="ghost"
                size="small"
                onClick={() => setShowTableOfContents(false)}
              >
                <Icon name="close" size={16} />
              </Button>
            </div>
          
          <div style={{ padding: ODLTheme.spacing[2] }}>
            {tableOfContents.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedSection(item.id);
                  // Scroll to the section in the document
                  const element = document.getElementById(item.id);
                  if (element) {
                    element.scrollIntoView({ 
                      behavior: 'smooth', 
                      block: 'start',
                      inline: 'nearest'
                    });
                  }
                }}
                style={{
                  padding: `${ODLTheme.spacing[2]} ${ODLTheme.spacing[3]}`,
                  marginLeft: item.level === 2 ? ODLTheme.spacing[4] : 0,
                  cursor: 'pointer',
                  borderRadius: '4px',
                  background: selectedSection === item.id ? ODLTheme.colors.blue50 : 'transparent',
                  color: selectedSection === item.id ? ODLTheme.colors.primary : ODLTheme.colors.text.secondary,
                  fontSize: item.level === 1 ? ODLTheme.typography.fontSize.base : ODLTheme.typography.fontSize.sm,
                  fontWeight: item.level === 1 ? ODLTheme.typography.fontWeight.medium : ODLTheme.typography.fontWeight.normal,
                  transition: 'all 0.2s ease',
                  marginBottom: ODLTheme.spacing[1]
                }}
                onMouseEnter={(e) => {
                  if (selectedSection !== item.id) {
                    e.currentTarget.style.background = ODLTheme.colors.surface;
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedSection !== item.id) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>
        )}

        {/* Document Editor Area */}
        <div style={{
          flex: 1,
          background: ODLTheme.colors.background,
          display: 'flex',
          justifyContent: 'center',
          padding: isMobile ? ODLTheme.spacing[3] : ODLTheme.spacing[6],
          overflowY: 'auto'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '850px',
            background: 'white',
            minHeight: 'fit-content',
            boxShadow: isMobile ? 'none' : '0 2px 8px rgba(0,0,0,0.08)',
            borderRadius: isMobile ? '0' : '8px',
            padding: isMobile ? `${ODLTheme.spacing[4]} ${ODLTheme.spacing[3]}` : '60px 80px',
            marginBottom: isMobile ? ODLTheme.spacing[3] : ODLTheme.spacing[6]
          }}>

            <div 
              dangerouslySetInnerHTML={{ __html: documentContent }}
              style={{
                fontFamily: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                lineHeight: '1.8',
                color: ODLTheme.colors.text.primary,
                fontSize: '16px'
              }}
            />
          </div>
        </div>

        {/* Audit Trail Panel */}
        {(isMobile ? mobileAuditOpen : showAuditTrail) && (
          <div style={{
            position: isMobile ? 'fixed' : 'static',
            top: isMobile ? 0 : 'auto',
            right: isMobile ? 0 : 'auto',
            bottom: isMobile ? 0 : 'auto',
            width: isMobile ? '80%' : '320px',
            maxWidth: '320px',
            background: 'white',
            borderLeft: `1px solid ${ODLTheme.colors.border}`,
            overflowY: 'auto',
            flexShrink: 0,
            zIndex: isMobile ? 1000 : 'auto',
            transform: isMobile ? (mobileAuditOpen ? 'translateX(0)' : 'translateX(100%)') : 'none',
            transition: 'transform 0.3s ease'
          }}>
            <div style={{
              padding: ODLTheme.spacing[4],
              borderBottom: `1px solid ${ODLTheme.colors.border}`,
              background: ODLTheme.colors.surface,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{
                fontSize: ODLTheme.typography.fontSize.lg,
                fontWeight: ODLTheme.typography.fontWeight.semibold,
                color: ODLTheme.colors.text.primary,
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: ODLTheme.spacing[2]
              }}>
                <Icon name="activity" size={20} />
                Audit Trail
              </h3>
              <Button
                variant="ghost"
                size="small"
                onClick={() => setShowAuditTrail(false)}
              >
                <Icon name="close" size={16} />
              </Button>
            </div>
            
            <div style={{ padding: ODLTheme.spacing[3] }}>
              {auditTrailEntries.map((entry) => (
                <div
                  key={entry.id}
                  style={{
                    padding: ODLTheme.spacing[3],
                    borderBottom: `1px solid ${ODLTheme.colors.border}`,
                    marginBottom: ODLTheme.spacing[2]
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: ODLTheme.spacing[2],
                    marginBottom: ODLTheme.spacing[2]
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 
                        entry.type === 'create' ? ODLTheme.colors.blue100 :
                        entry.type === 'edit' ? ODLTheme.colors.green100 :
                        entry.type === 'comment' ? ODLTheme.colors.yellow100 :
                        ODLTheme.colors.purple100,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon 
                        name={
                          entry.type === 'create' ? 'document-add' :
                          entry.type === 'edit' ? 'edit' :
                          entry.type === 'comment' ? 'chat' :
                          'checkmark-filled'
                        } 
                        size={16} 
                        color={
                          entry.type === 'create' ? ODLTheme.colors.blue600 :
                          entry.type === 'edit' ? ODLTheme.colors.green600 :
                          entry.type === 'comment' ? ODLTheme.colors.yellow600 :
                          ODLTheme.colors.purple600
                        }
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: ODLTheme.typography.fontSize.sm,
                        fontWeight: ODLTheme.typography.fontWeight.medium,
                        color: ODLTheme.colors.text.primary
                      }}>
                        {entry.user}
                      </div>
                      <div style={{
                        fontSize: ODLTheme.typography.fontSize.xs,
                        color: ODLTheme.colors.text.tertiary
                      }}>
                        {entry.timestamp}
                      </div>
                    </div>
                  </div>
                  <div style={{
                    fontSize: ODLTheme.typography.fontSize.sm,
                    color: ODLTheme.colors.text.secondary,
                    marginBottom: ODLTheme.spacing[1]
                  }}>
                    {entry.action}
                  </div>
                  <div style={{
                    fontSize: ODLTheme.typography.fontSize.xs,
                    color: ODLTheme.colors.text.tertiary,
                    display: 'flex',
                    alignItems: 'center',
                    gap: ODLTheme.spacing[1]
                  }}>
                    <Icon name="document" size={12} />
                    {entry.section}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div style={{
        background: ODLTheme.colors.surface,
        borderTop: `1px solid ${ODLTheme.colors.border}`,
        padding: `${ODLTheme.spacing[2]} ${ODLTheme.spacing[4]}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: ODLTheme.typography.fontSize.sm,
        color: ODLTheme.colors.text.secondary,
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', gap: ODLTheme.spacing[4] }}>
          <span>Words: 2,847</span>
          <span>Characters: 15,392</span>
          <span>Pages: 10</span>
        </div>
        <div style={{ display: 'flex', gap: ODLTheme.spacing[4] }}>
          <span>Last saved: 2 minutes ago</span>
          <span>{isEditMode ? 'Editing' : 'Read Only'}</span>
        </div>
      </div>
    </div>
  );
};

export default EditingPage;