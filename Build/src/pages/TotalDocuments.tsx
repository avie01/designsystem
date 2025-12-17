import React, { useState, useMemo } from 'react';
import Icon from '../components/Icon/Icon';
import Table from '../components/Table/Table';
import Chip from '../components/Chip/Chip';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import Dropdown, { DropdownOption } from '../components/Dropdown/Dropdown';
import Graph from '../components/Graph/Graph';
import InlineMetricCard from '../components/InlineMetricCard/InlineMetricCard';
import ODLTheme from '../styles/ODLTheme';
import { TableColumn, TableRowData } from '../types/common';
import { governmentDocuments, GovernmentDocument, getDocumentStats } from '../data/Building_constent_table';

interface Document extends TableRowData {
  id: string;
  name: string;
  type: 'pdf' | 'word' | 'excel' | 'image' | 'other';
  category: string;
  size: string;
  uploadedBy: string;
  uploadedDate: string;
  lastModified: string;
  status: 'active' | 'archived' | 'draft' | 'review';
  tags: string[];
  version: string;
  downloads: number;
  department: string;
}

const TotalDocuments: React.FC = () => {
  // Convert building consent documents to our document format
  const [documents] = useState<Document[]>(
    governmentDocuments.map((doc, index) => {
      // Determine file type based on tags or title
      const getFileType = (title: string): 'pdf' | 'word' | 'excel' | 'image' | 'other' => {
        if (title.toLowerCase().includes('plan') || title.toLowerCase().includes('drawing')) return 'image';
        if (title.toLowerCase().includes('budget') || title.toLowerCase().includes('financial')) return 'excel';
        if (title.toLowerCase().includes('assessment') || title.toLowerCase().includes('report')) return 'word';
        return 'pdf';
      };

      // Map government document status to our document status
      const getDocStatus = (status: string): 'active' | 'archived' | 'draft' | 'review' => {
        switch (status) {
          case 'Approved':
          case 'Issued':
          case 'Active':
          case 'Final Certificate':
            return 'active';
          case 'In Review':
          case 'Under Review':
          case 'Pending Review':
          case 'Pending Approval':
            return 'review';
          case 'Lodged':
          case 'In Progress':
            return 'draft';
          case 'Archived':
          case 'Rejected':
            return 'archived';
          default:
            return 'active';
        }
      };

      // Generate random download count based on classification
      const getDownloads = (classification: string): number => {
        switch (classification) {
          case 'UNCLASSIFIED': return Math.floor(Math.random() * 300) + 100;
          case 'CONFIDENTIAL': return Math.floor(Math.random() * 150) + 50;
          case 'RESTRICTED': return Math.floor(Math.random() * 100) + 20;
          case 'SECRET': return Math.floor(Math.random() * 50) + 5;
          case 'TOP SECRET': return Math.floor(Math.random() * 20) + 1;
          default: return Math.floor(Math.random() * 200) + 50;
        }
      };

      // Extract version from workflow or generate
      const version = `v${Math.floor(Math.random() * 3) + 1}.${Math.floor(Math.random() * 9)}`;

      return {
        id: doc.id,
        name: doc.title,
        type: getFileType(doc.title),
        category: doc.workflow || 'General',
        size: doc.size || `${(Math.random() * 5 + 0.5).toFixed(1)} MB`,
        uploadedBy: doc.owner,
        uploadedDate: doc.lastModified.split(' ')[0],
        lastModified: doc.lastModified,
        status: getDocStatus(doc.status),
        tags: doc.tags,
        version: version,
        downloads: getDownloads(doc.classification),
        department: doc.department
      };
    })
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Filter documents
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = searchQuery === '' || 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || doc.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Calculate statistics using actual data
  const docStats = getDocumentStats();
  const stats = {
    total: documents.length,
    active: documents.filter(d => d.status === 'active').length,
    draft: documents.filter(d => d.status === 'draft').length,
    review: documents.filter(d => d.status === 'review').length,
    archived: documents.filter(d => d.status === 'archived').length,
    totalSize: `${(documents.length * 3.2).toFixed(1)} GB`,
    totalDownloads: documents.reduce((sum, doc) => sum + doc.downloads, 0),
    byClassification: docStats.byClassification,
    byStatus: docStats.byStatus
  };

  // Category distribution for chart - use actual departments
  const departments = [...new Set(documents.map(d => d.department))];
  const categoryDistribution = departments.map(dept => ({
    name: dept.split(' ')[0], // Shorten long department names for chart
    value: documents.filter(d => d.department === dept).length
  })).filter(item => item.value > 0).slice(0, 6); // Limit to 6 for readability

  // Document uploads over time
  const uploadsOverTime = [
    { month: 'Jan', uploads: 12 },
    { month: 'Feb', uploads: 18 },
    { month: 'Mar', uploads: 25 }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return 'document-pdf';
      case 'word': return 'document';
      case 'excel': return 'data-table';
      case 'image': return 'image';
      default: return 'document-blank';
    }
  };

  const getStatusColor = (status: string): 'green' | 'yellow' | 'blue' | 'grey' => {
    switch (status) {
      case 'active': return 'green';
      case 'draft': return 'yellow';
      case 'review': return 'blue';
      case 'archived': return 'grey';
      default: return 'grey';
    }
  };

  // Generate category options from actual data
  const uniqueCategories = [...new Set(documents.map(d => d.category))].sort();
  const categoryOptions: DropdownOption[] = [
    { value: 'all', label: 'All Categories' },
    ...uniqueCategories.map(cat => ({ value: cat, label: cat }))
  ];

  const columns: TableColumn[] = [
    {
      key: 'name',
      label: 'Document Name',
      sortable: true,
      render: (row: TableRowData) => {
        const doc = row as Document;
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon name={getFileIcon(doc.type)} size={20} />
            <div>
              <div style={{ fontWeight: 500 }}>{doc.name}</div>
              <div style={{ fontSize: '12px', color: ODLTheme.colors.text.secondary }}>
                {doc.version} • {doc.size}
              </div>
            </div>
          </div>
        );
      }
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (row: TableRowData) => {
        const doc = row as Document;
        return <Chip label={doc.status} variant={getStatusColor(doc.status)} />;
      }
    },
    {
      key: 'uploadedBy',
      label: 'Uploaded By',
      sortable: true
    },
    {
      key: 'lastModified',
      label: 'Last Modified',
      sortable: true
    },
    {
      key: 'downloads',
      label: 'Downloads',
      sortable: true,
      render: (row: TableRowData) => {
        const doc = row as Document;
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Icon name="download" size={14} />
            <span>{doc.downloads}</span>
          </div>
        );
      }
    },
    {
      key: 'tags',
      label: 'Tags',
      render: (row: TableRowData) => {
        const doc = row as Document;
        return (
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {doc.tags.slice(0, 2).map((tag, index) => (
              <Chip 
                key={index} 
                label={tag} 
                variant="grey" 
                size="small"
                style={{ fontSize: '11px' }}
              />
            ))}
            {doc.tags.length > 2 && (
              <Chip 
                label={`+${doc.tags.length - 2}`} 
                variant="grey" 
                size="small"
                style={{ fontSize: '11px' }}
              />
            )}
          </div>
        );
      }
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row: TableRowData) => {
        const doc = row as Document;
        return (
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              variant="ghost"
              size="small"
              onClick={() => setSelectedDocument(doc)}
              style={{ padding: '4px 8px' }}
            >
              <Icon name="view" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="small"
              style={{ padding: '4px 8px' }}
            >
              <Icon name="download" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="small"
              style={{ padding: '4px 8px' }}
            >
              <Icon name="share" size={16} />
            </Button>
          </div>
        );
      }
    }
  ];

  return (
    <div style={{ 
      backgroundColor: ODLTheme.colors.surface, 
      borderRadius: ODLTheme.borders.radius.lg,
      padding: ODLTheme.spacing[6],
      height: 'fit-content'
    }}>
      <div style={{
        backgroundColor: ODLTheme.colors.white,
        borderRadius: ODLTheme.borders.radius.md,
        padding: ODLTheme.spacing[6]
      }}>
      {/* Ultra-Compact Inline Metrics */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: ODLTheme.spacing[2],
        marginBottom: ODLTheme.spacing[6]
      }}>
        <InlineMetricCard
          icon="document"
          iconColor={ODLTheme.colors.primary}
          label="Total Documents"
          value={stats.total}
          trend="+12% this month"
          trendColor={ODLTheme.colors.success}
        />

        <InlineMetricCard
          icon="data-base"
          iconColor={ODLTheme.colors.success}
          label="Storage Used"
          value={stats.totalSize}
          trend="87% capacity"
          trendColor={ODLTheme.colors.warning}
        />

        <InlineMetricCard
          icon="download"
          iconColor={ODLTheme.colors.info}
          label="Total Downloads"
          value={stats.totalDownloads.toLocaleString()}
          trend="+5.2% today"
          trendColor={ODLTheme.colors.success}
        />

        <InlineMetricCard
          icon="document-add"
          iconColor={ODLTheme.colors.warning}
          label="Under Review"
          value={stats.review}
          trend="Pending approval"
          trendColor={ODLTheme.colors.warning}
        />
      </div>

      {/* Charts Row */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div style={ODLTheme.components.card.base}>
          <div style={{ padding: '16px', borderBottom: `1px solid ${ODLTheme.colors.border}` }}>
            <h3 style={{ fontSize: '16px', fontWeight: 500 }}>Upload Trends</h3>
          </div>
          <div style={{ padding: '16px' }}>
            <Graph
              type="line"
              data={uploadsOverTime}
              dataKeys={['uploads']}
              xAxisKey="month"
              height={180}
              colors={[ODLTheme.colors.primary]}
              gradient={true}
            />
          </div>
        </div>

        <div style={ODLTheme.components.card.base}>
          <div style={{ padding: '16px', borderBottom: `1px solid ${ODLTheme.colors.border}` }}>
            <h3 style={{ fontSize: '16px', fontWeight: 500 }}>By Department</h3>
          </div>
          <div style={{ padding: '16px' }}>
            <Graph
              type="pie"
              data={categoryDistribution}
              dataKeys={['value']}
              xAxisKey="name"
              height={180}
              showLegend={false}
            />
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div style={{ 
        display: 'flex',
        gap: '16px',
        marginBottom: '24px',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <Input
          placeholder="Search documents..."
          value={searchQuery}
          onChange={(value) => setSearchQuery(value)}
          icon="search"
          style={{ minWidth: '250px', flex: '1' }}
        />
        
        <Dropdown
          options={categoryOptions}
          value={selectedCategory}
          onChange={(value) => setSelectedCategory(value)}
          placeholder="Category"
          style={{ minWidth: '150px' }}
        />

        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            variant={selectedStatus === 'all' ? 'primary' : 'secondary'}
            size="small"
            onClick={() => setSelectedStatus('all')}
          >
            All
          </Button>
          <Button
            variant={selectedStatus === 'active' ? 'primary' : 'secondary'}
            size="small"
            onClick={() => setSelectedStatus('active')}
          >
            Active
          </Button>
          <Button
            variant={selectedStatus === 'draft' ? 'primary' : 'secondary'}
            size="small"
            onClick={() => setSelectedStatus('draft')}
          >
            Draft
          </Button>
          <Button
            variant={selectedStatus === 'archived' ? 'primary' : 'secondary'}
            size="small"
            onClick={() => setSelectedStatus('archived')}
          >
            Archived
          </Button>
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
          <Button
            variant="ghost"
            onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
          >
            <Icon name={viewMode === 'list' ? 'grid' : 'list'} size={20} />
          </Button>
          <Button variant="primary">
            <Icon name="upload" size={16} style={{ marginRight: '4px' }} />
            Upload Document
          </Button>
        </div>
      </div>

      {/* Documents Table/Grid */}
      {viewMode === 'list' ? (
        <div style={ODLTheme.components.card.base}>
          <Table
            columns={columns}
            data={filteredDocuments}
            sortable
            hoverable
          />
        </div>
      ) : (
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px'
        }}>
          {filteredDocuments.map((doc) => (
            <div 
              key={doc.id} 
              style={{
                ...ODLTheme.components.card.base,
                padding: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = ODLTheme.shadows.md;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = ODLTheme.shadows.sm;
              }}
            >
              <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                <Icon name={getFileIcon(doc.type)} size={32} style={{ color: ODLTheme.colors.primary }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ 
                    fontSize: '14px', 
                    fontWeight: 500,
                    marginBottom: '4px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {doc.name}
                  </h4>
                  <p style={{ 
                    fontSize: '12px', 
                    color: ODLTheme.colors.text.secondary,
                    marginBottom: '8px'
                  }}>
                    {doc.size} • {doc.version}
                  </p>
                  <Chip 
                    label={doc.status} 
                    variant={getStatusColor(doc.status)} 
                    size="small"
                  />
                </div>
              </div>
              
              <div style={{ 
                marginTop: '12px',
                paddingTop: '12px',
                borderTop: `1px solid ${ODLTheme.colors.border}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '11px', color: ODLTheme.colors.text.secondary }}>
                  {doc.uploadedBy}
                </span>
                <span style={{ fontSize: '11px', color: ODLTheme.colors.text.secondary }}>
                  {doc.lastModified}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Document Details Modal */}
      {selectedDocument && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: ODLTheme.zIndex.modal
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: ODLTheme.borders.radius.lg,
            padding: '24px',
            maxWidth: '500px',
            width: '90%'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: 600 }}>Document Details</h2>
              <Button
                variant="ghost"
                size="small"
                onClick={() => setSelectedDocument(null)}
              >
                <Icon name="close" size={20} />
              </Button>
            </div>

            <div style={{ display: 'grid', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Icon name={getFileIcon(selectedDocument.type)} size={40} style={{ color: ODLTheme.colors.primary }} />
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 500 }}>{selectedDocument.name}</h3>
                  <p style={{ fontSize: '12px', color: ODLTheme.colors.text.secondary }}>
                    {selectedDocument.version} • {selectedDocument.size}
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: ODLTheme.colors.text.secondary }}>
                    Category
                  </label>
                  <p style={{ fontWeight: 500 }}>{selectedDocument.category}</p>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: ODLTheme.colors.text.secondary }}>
                    Status
                  </label>
                  <Chip 
                    label={selectedDocument.status} 
                    variant={getStatusColor(selectedDocument.status)} 
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: ODLTheme.colors.text.secondary }}>
                    Uploaded By
                  </label>
                  <p style={{ fontWeight: 500 }}>{selectedDocument.uploadedBy}</p>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: ODLTheme.colors.text.secondary }}>
                    Department
                  </label>
                  <p style={{ fontWeight: 500 }}>{selectedDocument.department}</p>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', color: ODLTheme.colors.text.secondary }}>
                  Tags
                </label>
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '4px' }}>
                  {selectedDocument.tags.map((tag, index) => (
                    <Chip key={index} label={tag} variant="grey" size="small" />
                  ))}
                </div>
              </div>

              <div style={{ 
                display: 'flex', 
                gap: '12px',
                marginTop: '20px',
                paddingTop: '20px',
                borderTop: `1px solid ${ODLTheme.colors.border}`
              }}>
                <Button variant="primary" style={{ flex: 1 }}>
                  <Icon name="download" size={16} style={{ marginRight: '4px' }} />
                  Download
                </Button>
                <Button variant="secondary" style={{ flex: 1 }}>
                  <Icon name="share" size={16} style={{ marginRight: '4px' }} />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default TotalDocuments;