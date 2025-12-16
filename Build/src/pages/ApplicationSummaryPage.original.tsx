import React, { useState } from 'react';
import Icon from '../components/Icon/Icon';
import ApplicationDetailCard from '../components/ApplicationDetailCard/ApplicationDetailCard';
import Tabs from '../components/Tabs/Tabs';
import mapImage from '../Images/map-image.png';
import { colors, spacing, borderRadius, statusColors } from '../design-system/designTokens';

interface ApplicationSummaryPageProps {
  bcNumber?: string;
  onBack?: () => void;
}

const ApplicationSummaryPage: React.FC<ApplicationSummaryPageProps> = ({ 
  bcNumber = 'BC-2024-0523',
  onBack 
}) => {
  
  const [activeTab, setActiveTab] = useState('summary');

  // Mock data - in real app, this would come from an API based on bcNumber
  const applicationData = {
    siteAddress: '508-512 Kingsway, 1-3 Higherdale Ave, Northshire',
    reference: 'DA23/214',
    applicant: 'Couvaras Architects',
    owner: 'Maverick Developments',
    contact: '0483 010 577',
    description: 'Construction of residential flat building containing 24 units with basement parking',
    approver: 'Planning Panel'
  };

  const handleBack = () => {
    onBack?.(); // Call the onBack callback if provided
  };

  const tabItems = [
    { id: 'summary', label: 'Summary' },
    { id: 'detail', label: 'Detail' },
    { id: 'siteHistory', label: 'Site history' }
  ];


  return (
    <div className="w-full">
      {/* Header with back button */}
      <div className="flex items-center gap-4 mb-6" style={{ marginTop: '-16px', paddingTop: '16px' }}>
        <button
          onClick={handleBack}
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          aria-label="Go back"
        >
          <Icon name="arrow-left" size={20} />
        </button>
        <div>
          {/* Breadcrumb trail */}
          <div className="flex items-center gap-2 text-xs mb-1" style={{ color: colors.secondary }}>
            <span className="cursor-pointer hover:opacity-80">Objective Build</span>
            <Icon name="chevron-right" size={12} />
            <span className="cursor-pointer hover:opacity-80" onClick={handleBack}>Applications</span>
            <Icon name="chevron-right" size={12} />
            <span>{bcNumber}</span>
          </div>
          <h1 className="text-lg font-semibold" style={{ color: colors.primary }}>Applications / {bcNumber}</h1>
          <p className="text-sm mt-1" style={{ color: colors.secondary }}>{applicationData.siteAddress}</p>
        </div>
      </div>

      <div style={{ backgroundColor: colors.backgroundGray, padding: spacing.md, marginTop: spacing.md }}>
        
        {/* Three columns grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
          {/* Main card with tabs and content */}
          <div style={{ backgroundColor: colors.backgroundWhite, borderRadius: borderRadius.md, padding: spacing.md, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', minHeight: 'fit-content' }}>
          
          {/* Title */}
          <h2 className="text-base font-semibold mb-3" style={{ color: colors.primary }}>Application summary</h2>
          
          {/* Tabs */}
          <div className="mb-4">
            <Tabs
              tabs={tabItems}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              showContent={false}
            />
          </div>

          {/* Tab Content */}
          {activeTab === 'summary' && (
            <div>
              {/* Application Details */}
              <ApplicationDetailCard {...applicationData} />
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
          <div style={{ backgroundColor: colors.backgroundWhite, borderRadius: borderRadius.md, padding: spacing.md, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold" style={{ color: colors.primary }}>Map</h3>
              <div className="flex gap-2">
                <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                  <Icon name="renew" size={20} />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                  <Icon name="map" size={20} />
                </button>
              </div>
            </div>
            <div className="bg-gray-100 rounded overflow-hidden flex-1">
              <img 
                src={mapImage} 
                alt="Map view" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Third card - Planning Summary */}
          <div style={{ backgroundColor: colors.backgroundWhite, borderRadius: borderRadius.md, padding: spacing.md, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', minHeight: 'fit-content' }}>
            
            {/* Title */}
            <h2 className="text-base font-semibold mb-4" style={{ color: colors.primary }}>Planning summary</h2>
            
            {/* Planning Summary Content */}
            <div className="space-y-2">
              <div className="grid gap-2 py-1" style={{ gridTemplateColumns: '140px 1fr' }}>
                <span className="text-sm" style={{ color: colors.secondary }}>LEP</span>
                <span className="text-sm" style={{ color: colors.primary }}>Northshire Local Environmental Plan 2015</span>
              </div>
              
              <div className="grid gap-2 py-1" style={{ gridTemplateColumns: '140px 1fr' }}>
                <span className="text-sm" style={{ color: colors.secondary }}>Zone</span>
                <span className="text-sm" style={{ color: colors.primary }}>R4 - High Density Residential</span>
              </div>
              
              <div className="grid gap-2 py-1" style={{ gridTemplateColumns: '140px 1fr' }}>
                <span className="text-sm" style={{ color: colors.secondary }}>Height of Buildings</span>
                <span className="text-sm" style={{ color: colors.primary }}>20m</span>
              </div>
              
              <div className="grid gap-2 py-1" style={{ gridTemplateColumns: '140px 1fr' }}>
                <span className="text-sm" style={{ color: colors.secondary }}>Floor Space Ratio</span>
                <span className="text-sm" style={{ color: colors.primary }}>1.5:1</span>
              </div>
              
              <div className="grid gap-2 py-1" style={{ gridTemplateColumns: '140px 1fr' }}>
                <span className="text-sm" style={{ color: colors.secondary }}>Minimum Lot Size</span>
                <span className="text-sm" style={{ color: colors.primary }}>NA</span>
              </div>
              
              <div className="grid gap-2 py-1" style={{ gridTemplateColumns: '140px 1fr' }}>
                <span className="text-sm" style={{ color: colors.secondary }}>Acid Sulfate Soils</span>
                <span className="text-sm" style={{ color: colors.primary }}>Class 5</span>
              </div>
              
              <div className="grid gap-2 py-1" style={{ gridTemplateColumns: '140px 1fr' }}>
                <span className="text-sm" style={{ color: colors.secondary }}>Local Provisions</span>
                <span className="text-sm" style={{ color: colors.primary }}>Green Grid, Landscape Area (30%)</span>
              </div>
            </div>
          </div>
          
          {/* Container for Assessment Reports and Internal Referrals */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
            {/* Collapsed card - Key Dates */}
            <div style={{ backgroundColor: colors.backgroundWhite, borderRadius: borderRadius.md, padding: spacing.md, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', minHeight: 'fit-content' }}>
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
            
            {/* Internal Referrals card */}
            <div style={{ backgroundColor: colors.backgroundWhite, borderRadius: borderRadius.md, padding: spacing.md, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', flex: '1' }}>
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
            
            {/* Table Rows - Sorted by urgency */}
            <div className="space-y-1 mt-2">
              {/* Overdue - highest priority */}
              <div className="grid grid-cols-12 gap-2 py-2 items-center hover:bg-gray-50 rounded group">
                <div className="col-span-6 text-sm" style={{ color: colors.primary }}>Building Surveyor</div>
                <div className="col-span-2 text-sm text-center" style={{ color: colors.secondary }}>22</div>
                <div className="col-span-3">
                  <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: statusColors.raspberry, color: colors.error }}>Overdue</span>
                </div>
                <div className="col-span-1 text-right pr-2">
                  <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Icon name="arrow-right" size={16} />
                  </button>
                </div>
              </div>
              
              {/* Due - second priority */}
              <div className="grid grid-cols-12 gap-2 py-2 items-center hover:bg-gray-50 rounded group">
                <div className="col-span-6 text-sm" style={{ color: colors.primary }}>Landscape Architect</div>
                <div className="col-span-2 text-sm text-center" style={{ color: colors.secondary }}>14</div>
                <div className="col-span-3">
                  <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: statusColors.grapefruit, color: colors.primary }}>Due</span>
                </div>
                <div className="col-span-1 text-right pr-2">
                  <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Icon name="arrow-right" size={16} />
                  </button>
                </div>
              </div>
              
              {/* Due soon - third priority */}
              <div className="grid grid-cols-12 gap-2 py-2 items-center hover:bg-gray-50 rounded group">
                <div className="col-span-6 text-sm" style={{ color: colors.primary }}>Development Engineer</div>
                <div className="col-span-2 text-sm text-center" style={{ color: colors.secondary }}>11</div>
                <div className="col-span-3">
                  <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: statusColors.mango, color: colors.primary }}>Due soon</span>
                </div>
                <div className="col-span-1 text-right pr-2">
                  <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Icon name="arrow-right" size={16} />
                  </button>
                </div>
              </div>
              
              {/* Complete - lowest priority */}
              <div className="grid grid-cols-12 gap-2 py-2 items-center hover:bg-gray-50 rounded group">
                <div className="col-span-6 text-sm" style={{ color: colors.primary }}>Stormwater Engineer</div>
                <div className="col-span-2 text-sm text-center" style={{ color: colors.secondary }}></div>
                <div className="col-span-3">
                  <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: statusColors.lime, color: colors.success }}>Complete</span>
                </div>
                <div className="col-span-1 text-right pr-2">
                  <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Icon name="arrow-right" size={16} />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-12 gap-2 py-2 items-center hover:bg-gray-50 rounded group">
                <div className="col-span-6 text-sm" style={{ color: colors.primary }}>Urban Design</div>
                <div className="col-span-2 text-sm text-center" style={{ color: colors.secondary }}></div>
                <div className="col-span-3">
                  <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: statusColors.lime, color: colors.success }}>Complete</span>
                </div>
                <div className="col-span-1 text-right pr-2">
                  <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Icon name="arrow-right" size={16} />
                  </button>
                </div>
              </div>
            </div>
            </div>
          </div>
          
          {/* Container for Document Library and Compliance Check */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
            {/* Collapsed card - Document Library */}
            <div style={{ backgroundColor: colors.backgroundWhite, borderRadius: borderRadius.md, padding: spacing.md, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', minHeight: 'fit-content' }}>
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
            
            {/* Compliance Check card */}
            <div style={{ backgroundColor: colors.backgroundWhite, borderRadius: borderRadius.md, padding: spacing.md, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', flex: '1' }}>
              <h2 className="text-base font-semibold mb-4" style={{ color: colors.primary }}>Compliance Check</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">Setback Requirements</span>
                  <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                    <Icon name="checkmark-filled" size={16} />
                    Pass
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">Height Restrictions</span>
                  <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                    <Icon name="checkmark-filled" size={16} />
                    Pass
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">Parking Requirements</span>
                  <span className="text-sm font-medium text-yellow-600 flex items-center gap-1">
                    <Icon name="warning" size={16} />
                    Review
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">Fire Safety</span>
                  <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                    <Icon name="checkmark-filled" size={16} />
                    Pass
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">Accessibility</span>
                  <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                    <Icon name="checkmark-filled" size={16} />
                    Pass
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Fifth card - Tasks */}
          <div style={{ backgroundColor: colors.backgroundWhite, borderRadius: borderRadius.md, padding: spacing.md, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', minHeight: 'fit-content' }}>
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
            
            {/* Table Rows - Sorted by urgency */}
            <div className="space-y-1 mt-2">
              {/* Urgent task */}
              <div className="grid grid-cols-12 gap-2 py-2 items-center hover:bg-gray-50 rounded group">
                <div className="col-span-6 text-sm" style={{ color: colors.primary }}>Review heritage assessment</div>
                <div className="col-span-2 text-sm text-center" style={{ color: colors.secondary }}>Today</div>
                <div className="col-span-3">
                  <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: statusColors.raspberry, color: colors.error }}>Urgent</span>
                </div>
                <div className="col-span-1 text-right pr-2">
                  <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Icon name="arrow-right" size={16} />
                  </button>
                </div>
              </div>
              
              {/* High priority */}
              <div className="grid grid-cols-12 gap-2 py-2 items-center hover:bg-gray-50 rounded group">
                <div className="col-span-6 text-sm" style={{ color: colors.primary }}>Contact applicant</div>
                <div className="col-span-2 text-sm text-center" style={{ color: colors.secondary }}>2 days</div>
                <div className="col-span-3">
                  <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: statusColors.grapefruit, color: colors.primary }}>High</span>
                </div>
                <div className="col-span-1 text-right pr-2">
                  <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Icon name="arrow-right" size={16} />
                  </button>
                </div>
              </div>
              
              {/* In progress */}
              <div className="grid grid-cols-12 gap-2 py-2 items-center hover:bg-gray-50 rounded group">
                <div className="col-span-6 text-sm" style={{ color: colors.primary }}>Site inspection</div>
                <div className="col-span-2 text-sm text-center" style={{ color: colors.secondary }}>5 days</div>
                <div className="col-span-3">
                  <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: statusColors.blueberry, color: colors.blueDefault }}>In progress</span>
                </div>
                <div className="col-span-1 text-right pr-2">
                  <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Icon name="arrow-right" size={16} />
                  </button>
                </div>
              </div>
              
              {/* Pending */}
              <div className="grid grid-cols-12 gap-2 py-2 items-center hover:bg-gray-50 rounded group">
                <div className="col-span-6 text-sm" style={{ color: colors.primary }}>Prepare assessment report</div>
                <div className="col-span-2 text-sm text-center" style={{ color: colors.secondary }}>7 days</div>
                <div className="col-span-3">
                  <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: statusColors.nutmeg, color: colors.primary }}>Pending</span>
                </div>
                <div className="col-span-1 text-right pr-2">
                  <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Icon name="arrow-right" size={16} />
                  </button>
                </div>
              </div>
              
              {/* Complete */}
              <div className="grid grid-cols-12 gap-2 py-2 items-center hover:bg-gray-50 rounded group">
                <div className="col-span-6 text-sm" style={{ color: colors.primary }}>Initial compliance check</div>
                <div className="col-span-2 text-sm text-center" style={{ color: colors.secondary }}></div>
                <div className="col-span-3">
                  <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: statusColors.lime, color: colors.success }}>Complete</span>
                </div>
                <div className="col-span-1 text-right pr-2">
                  <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Icon name="arrow-right" size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sixth card - Related Applications */}
          <div style={{ backgroundColor: colors.backgroundWhite, borderRadius: borderRadius.md, padding: spacing.md, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', minHeight: 'fit-content' }}>
            <h2 className="text-base font-semibold mb-4" style={{ color: colors.primary }}>Related Applications</h2>
            <div className="space-y-3">
              <div className="p-3 border border-gray-200 rounded hover:border-gray-300 cursor-pointer">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-medium">BC-2023-0412</span>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">Approved</span>
                </div>
                <p className="text-xs text-gray-600">Previous renovation - Same address</p>
                <p className="text-xs text-gray-500 mt-1">12 Nov 2023</p>
              </div>
              <div className="p-3 border border-gray-200 rounded hover:border-gray-300 cursor-pointer">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-medium">BC-2023-0388</span>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">Approved</span>
                </div>
                <p className="text-xs text-gray-600">Subdivision - Adjacent property</p>
                <p className="text-xs text-gray-500 mt-1">5 Oct 2023</p>
              </div>
            </div>
          </div>
          
          {/* Eighth card - Contacts */}
          <div style={{ backgroundColor: colors.backgroundWhite, borderRadius: borderRadius.md, padding: spacing.md, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', minHeight: 'fit-content' }}>
            <h2 className="text-base font-semibold mb-4" style={{ color: colors.primary }}>Contacts</h2>
            <div className="space-y-4">
              <div className="pb-3 border-b border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">CA</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Couvaras Architects</p>
                    <p className="text-xs text-gray-500">Applicant</p>
                    <p className="text-xs text-gray-600 mt-1">contact@couvaras.com</p>
                    <p className="text-xs text-gray-600">0483 010 577</p>
                  </div>
                </div>
              </div>
              <div className="pb-3 border-b border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-xs font-medium text-green-600">MD</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Maverick Developments</p>
                    <p className="text-xs text-gray-500">Owner</p>
                    <p className="text-xs text-gray-600 mt-1">info@maverick.dev</p>
                    <p className="text-xs text-gray-600">02 9876 5432</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-xs font-medium text-purple-600">JD</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Jane Doe</p>
                    <p className="text-xs text-gray-500">Case Officer</p>
                    <p className="text-xs text-gray-600 mt-1">jane.doe@council.gov</p>
                    <p className="text-xs text-gray-600">02 9123 4567</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Ninth card - Notes & Comments */}
          <div style={{ backgroundColor: colors.backgroundWhite, borderRadius: borderRadius.md, padding: spacing.md, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', minHeight: 'fit-content' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold" style={{ color: colors.primary }}>Notes & Comments</h2>
              <button className="text-blue-600 hover:text-blue-700">
                <Icon name="add" size={20} />
              </button>
            </div>
            <div className="space-y-3">
              <div className="bg-gray-50 rounded p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-700">Internal Note</span>
                  <span className="text-xs" style={{ color: colors.secondary }}>2 hours ago</span>
                </div>
                <p className="text-sm text-gray-600">Parking requirements need further review. Request additional information from applicant regarding visitor parking provisions.</p>
                <p className="text-xs text-gray-500 mt-2">- Sarah Mitchell</p>
              </div>
              <div className="bg-yellow-50 rounded p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-yellow-700">Action Required</span>
                  <span className="text-xs" style={{ color: colors.secondary }}>Yesterday</span>
                </div>
                <p className="text-sm text-gray-600">Awaiting response from Traffic & Transport department regarding street access concerns.</p>
                <p className="text-xs text-gray-500 mt-2">- Tom Wilson</p>
              </div>
              <div className="bg-gray-50 rounded p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-700">General Comment</span>
                  <span className="text-xs" style={{ color: colors.secondary }}>3 days ago</span>
                </div>
                <p className="text-sm text-gray-600">Initial review completed. Application appears complete with all required documentation.</p>
                <p className="text-xs text-gray-500 mt-2">- Jane Doe</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationSummaryPage;