import React, { useState, useMemo } from 'react';
import Icon from '../components/Icon/Icon';
import Table from '../components/Table/Table';
import Chip from '../components/Chip/Chip';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import Cards from '../components/Cards/Cards';
import Graph from '../components/Graph/Graph';
import InlineMetricCard from '../components/InlineMetricCard/InlineMetricCard';
import ODLTheme from '../styles/ODLTheme';
import { TableColumn, TableRowData } from '../types/common';
import { governmentDocuments, GovernmentDocument } from '../data/Building_constent_table';

interface Workflow extends TableRowData {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'pending' | 'completed' | 'paused';
  startDate: string;
  dueDate: string;
  assignee: string;
  priority: 'high' | 'medium' | 'low';
  completion: number;
  steps: {
    total: number;
    completed: number;
  };
  department: string;
}

const ActiveWorkflows: React.FC = () => {
  // Convert building consent documents to workflows
  const [workflows] = useState<Workflow[]>(
    governmentDocuments.slice(0, 10).map((doc) => {
      // Map document status to workflow status
      const getWorkflowStatus = (docStatus: string): 'active' | 'pending' | 'completed' | 'paused' => {
        switch (docStatus) {
          case 'In Progress':
          case 'Under Review':
          case 'In Review':
            return 'active';
          case 'Lodged':
          case 'Pending Review':
          case 'Pending Approval':
            return 'pending';
          case 'Approved':
          case 'Issued':
          case 'Final Certificate':
            return 'completed';
          case 'Rejected':
          case 'Archived':
            return 'paused';
          default:
            return 'active';
        }
      };

      // Calculate completion based on status
      const getCompletion = (status: string): number => {
        switch (status) {
          case 'Lodged': return 10;
          case 'Pending Review': return 20;
          case 'Under Review': return 40;
          case 'In Review': return 50;
          case 'In Progress': return 60;
          case 'Pending Approval': return 75;
          case 'Approved': return 100;
          case 'Issued': return 100;
          case 'Final Certificate': return 100;
          case 'Rejected': return 0;
          default: return 30;
        }
      };

      // Determine priority based on classification
      const getPriority = (classification: string): 'high' | 'medium' | 'low' => {
        switch (classification) {
          case 'TOP SECRET':
          case 'SECRET':
            return 'high';
          case 'CONFIDENTIAL':
          case 'RESTRICTED':
            return 'medium';
          default:
            return 'low';
        }
      };

      const completion = getCompletion(doc.status);
      const totalSteps = 10;
      const completedSteps = Math.floor((completion / 100) * totalSteps);

      return {
        id: doc.id,
        name: doc.title,
        type: doc.workflow,
        status: getWorkflowStatus(doc.status),
        startDate: doc.lastModified.split(' ')[0],
        dueDate: new Date(new Date(doc.lastModified).getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        assignee: doc.owner,
        priority: getPriority(doc.classification),
        completion: completion,
        steps: { total: totalSteps, completed: completedSteps },
        department: doc.department
      };
    })
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);

  // Filter workflows
  const filteredWorkflows = workflows.filter(wf => {
    const matchesSearch = searchQuery === '' || 
      wf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wf.assignee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wf.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || wf.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const stats = {
    total: workflows.length,
    active: workflows.filter(w => w.status === 'active').length,
    pending: workflows.filter(w => w.status === 'pending').length,
    completed: workflows.filter(w => w.status === 'completed').length,
    paused: workflows.filter(w => w.status === 'paused').length,
    highPriority: workflows.filter(w => w.priority === 'high' && w.status === 'active').length,
    dueSoon: workflows.filter(w => {
      const dueDate = new Date(w.dueDate);
      const today = new Date();
      const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return daysUntilDue <= 3 && daysUntilDue >= 0;
    }).length
  };

  // Chart data for workflow distribution - get unique departments
  const departments = [...new Set(workflows.map(w => w.department))];
  const workflowDistribution = departments.map(dept => ({
    name: dept.split(' ')[0], // Shorten long department names
    value: workflows.filter(w => w.department === dept).length
  })).filter(item => item.value > 0);

  // Timeline data
  const timelineData = workflows
    .filter(w => w.status === 'active')
    .map(w => ({
      date: w.dueDate,
      active: 1,
      name: w.name
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return 'play-filled';
      case 'pending': return 'time';
      case 'completed': return 'checkmark-filled';
      case 'paused': return 'pause-filled';
      default: return 'help';
    }
  };

  const getStatusColor = (status: string): 'green' | 'yellow' | 'blue' | 'grey' => {
    switch (status) {
      case 'active': return 'blue';
      case 'pending': return 'yellow';
      case 'completed': return 'green';
      case 'paused': return 'grey';
      default: return 'grey';
    }
  };

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'high': return '#DA1E28';
      case 'medium': return '#F1C21B';
      case 'low': return '#24A148';
      default: return ODLTheme.colors.text.secondary;
    }
  };

  const columns: TableColumn[] = [
    {
      key: 'name',
      label: 'Workflow Name',
      sortable: true,
      render: (row: TableRowData) => {
        const workflow = row as Workflow;
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon name={getStatusIcon(workflow.status)} size={16} />
            <span style={{ fontWeight: 500 }}>{workflow.name}</span>
          </div>
        );
      }
    },
    {
      key: 'type',
      label: 'Type',
      sortable: true
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (row: TableRowData) => {
        const workflow = row as Workflow;
        return <Chip label={workflow.status} variant={getStatusColor(workflow.status)} />;
      }
    },
    {
      key: 'assignee',
      label: 'Assignee',
      sortable: true
    },
    {
      key: 'priority',
      label: 'Priority',
      sortable: true,
      render: (row: TableRowData) => {
        const workflow = row as Workflow;
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Icon 
              name="warning-alt" 
              size={14} 
              style={{ color: getPriorityColor(workflow.priority) }} 
            />
            <span style={{ 
              color: getPriorityColor(workflow.priority),
              fontWeight: 500,
              textTransform: 'capitalize'
            }}>
              {workflow.priority}
            </span>
          </div>
        );
      }
    },
    {
      key: 'completion',
      label: 'Progress',
      render: (row: TableRowData) => {
        const workflow = row as Workflow;
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '120px' }}>
            <div style={{ 
              flex: 1, 
              height: '8px', 
              backgroundColor: ODLTheme.colors.background,
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${workflow.completion}%`,
                height: '100%',
                backgroundColor: workflow.completion >= 80 ? ODLTheme.colors.success :
                                workflow.completion >= 50 ? ODLTheme.colors.warning :
                                ODLTheme.colors.primary,
                transition: 'width 0.3s ease'
              }} />
            </div>
            <span style={{ fontSize: '12px', color: ODLTheme.colors.text.secondary }}>
              {workflow.completion}%
            </span>
          </div>
        );
      }
    },
    {
      key: 'dueDate',
      label: 'Due Date',
      sortable: true,
      render: (row: TableRowData) => {
        const workflow = row as Workflow;
        const dueDate = new Date(workflow.dueDate);
        const today = new Date();
        const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        
        return (
          <span style={{ 
            color: daysUntilDue <= 3 ? ODLTheme.colors.error : 
                   daysUntilDue <= 7 ? ODLTheme.colors.warning : 
                   ODLTheme.colors.text.primary 
          }}>
            {workflow.dueDate}
            {daysUntilDue >= 0 && daysUntilDue <= 3 && (
              <span style={{ 
                marginLeft: '8px', 
                fontSize: '11px',
                fontWeight: 600,
                color: ODLTheme.colors.error 
              }}>
                ({daysUntilDue} days)
              </span>
            )}
          </span>
        );
      }
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row: TableRowData) => {
        const workflow = row as Workflow;
        return (
          <div style={{ display: 'flex', gap: ODLTheme.spacing[2] }}>
            <Button
              variant="ghost"
              size="small"
              onClick={() => setSelectedWorkflow(workflow)}
              style={{ padding: `${ODLTheme.spacing[1]} ${ODLTheme.spacing[2]}` }}
            >
              <Icon name="view" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="small"
              style={{ padding: `${ODLTheme.spacing[1]} ${ODLTheme.spacing[2]}` }}
            >
              <Icon name="edit" size={16} />
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
          icon="play-filled"
          iconColor={ODLTheme.colors.primary}
          label="Active Workflows"
          value={stats.active}
          trend="+8% this week"
          trendColor={ODLTheme.colors.success}
        />

        <InlineMetricCard
          icon="warning-alt"
          iconColor={ODLTheme.colors.error}
          label="High Priority"
          value={stats.highPriority}
          trend="Immediate attention"
          trendColor={ODLTheme.colors.error}
        />

        <InlineMetricCard
          icon="time"
          iconColor={ODLTheme.colors.warning}
          label="Due Soon"
          value={stats.dueSoon}
          trend="Next 3 days"
          trendColor={ODLTheme.colors.warning}
        />

        <InlineMetricCard
          icon="pause-filled"
          iconColor={ODLTheme.colors.text.secondary}
          label="Paused"
          value={stats.paused}
          trend="On hold"
          trendColor={ODLTheme.colors.text.secondary}
        />
      </div>

      {/* Charts Row */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div style={ODLTheme.components.card.base}>
          <div style={{ padding: '16px', borderBottom: `1px solid ${ODLTheme.colors.border}` }}>
            <h3 style={{ fontSize: '16px', fontWeight: 500 }}>Department Distribution</h3>
          </div>
          <div style={{ padding: '16px' }}>
            <Graph
              type="pie"
              data={workflowDistribution}
              dataKeys={['value']}
              xAxisKey="name"
              height={200}
              showLegend={true}
            />
          </div>
        </div>

        <div style={ODLTheme.components.card.base}>
          <div style={{ padding: '16px', borderBottom: `1px solid ${ODLTheme.colors.border}` }}>
            <h3 style={{ fontSize: '16px', fontWeight: 500 }}>Upcoming Deadlines</h3>
          </div>
          <div style={{ padding: '16px' }}>
            <Graph
              type="bar"
              data={timelineData.slice(0, 5)}
              dataKeys={['active']}
              xAxisKey="date"
              height={200}
              colors={[ODLTheme.colors.primary]}
            />
          </div>
        </div>
      </div>

      {/* Search, Filters and Actions Bar */}
      <div style={{ 
        display: 'flex',
        gap: ODLTheme.spacing[3],
        marginBottom: ODLTheme.spacing[6],
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ODLTheme.colors.surface,
        padding: `${ODLTheme.spacing[3]} ${ODLTheme.spacing[4]}`,
        borderRadius: ODLTheme.borders.radius.md,
        border: `${ODLTheme.borders.width.thin} solid ${ODLTheme.colors.border}`
      }}>
        {/* Search Input */}
        <Input
          placeholder="Search workflows..."
          value={searchQuery}
          onChange={(value) => setSearchQuery(value)}
          style={{ 
            maxWidth: '280px',
            flexShrink: 1,
            backgroundColor: ODLTheme.colors.white
          }}
        />
        
        {/* Vertical Divider */}
        <div style={{ 
          width: ODLTheme.borders.width.thin, 
          height: '32px', 
          backgroundColor: ODLTheme.colors.border,
          margin: `0 ${ODLTheme.spacing[1]}`
        }} />
        
        {/* Filter Chips */}
        <div style={{ 
          display: 'flex', 
          gap: ODLTheme.spacing[2], 
          flexWrap: 'nowrap', 
          alignItems: 'center'
        }}>
          <span style={{ 
            fontSize: ODLTheme.typography.fontSize.sm, 
            color: ODLTheme.colors.text.secondary,
            marginRight: ODLTheme.spacing[2],
            fontWeight: ODLTheme.typography.fontWeight.medium
          }}>
            Filter:
          </span>
          <div 
            onClick={() => setSelectedStatus('all')}
            style={{ cursor: 'pointer' }}
          >
            <Chip 
              label={`All (${stats.total})`}
              variant={selectedStatus === 'all' ? 'blue' : 'grey'}
              size="small"
              clickable
            />
          </div>
          <div 
            onClick={() => setSelectedStatus('active')}
            style={{ cursor: 'pointer' }}
          >
            <Chip 
              label={`Active (${stats.active})`}
              variant={selectedStatus === 'active' ? 'green' : 'grey'}
              size="small"
              clickable
            />
          </div>
          <div 
            onClick={() => setSelectedStatus('pending')}
            style={{ cursor: 'pointer' }}
          >
            <Chip 
              label={`Pending (${stats.pending})`}
              variant={selectedStatus === 'pending' ? 'yellow' : 'grey'}
              size="small"
              clickable
            />
          </div>
          <div 
            onClick={() => setSelectedStatus('paused')}
            style={{ cursor: 'pointer' }}
          >
            <Chip 
              label={`Paused (${stats.paused})`}
              variant={selectedStatus === 'paused' ? 'red' : 'grey'}
              size="small"
              clickable
            />
          </div>
        </div>
        
        {/* New Workflow Button */}
        <Button 
          variant="primary" 
          size="small" 
          style={{ 
            whiteSpace: 'nowrap'
          }}
        >
          <Icon name="add" size={16} style={{ marginRight: '4px' }} />
          New Workflow
        </Button>
      </div>

      {/* Workflows Table */}
      <div style={ODLTheme.components.card.base}>
        <Table
          columns={columns}
          data={filteredWorkflows}
          sortable
          hoverable
        />
      </div>

      {/* Workflow Details Modal */}
      {selectedWorkflow && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: `${ODLTheme.colors.overlay}80`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: ODLTheme.zIndex.modal
        }}>
          <div style={{
            backgroundColor: ODLTheme.colors.white,
            borderRadius: ODLTheme.borders.radius.lg,
            padding: ODLTheme.spacing[6],
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: ODLTheme.spacing[5]
            }}>
              <h2 style={{ fontSize: ODLTheme.typography.fontSize.xl, fontWeight: ODLTheme.typography.fontWeight.semibold }}>
                {selectedWorkflow.name}
              </h2>
              <Button
                variant="ghost"
                size="small"
                onClick={() => setSelectedWorkflow(null)}
              >
                <Icon name="close" size={20} />
              </Button>
            </div>

            <div style={{ display: 'grid', gap: ODLTheme.spacing[4] }}>
              <div>
                <label style={{ 
                  fontSize: ODLTheme.typography.fontSize.xs, 
                  color: ODLTheme.colors.text.secondary,
                  display: 'block',
                  marginBottom: ODLTheme.spacing[1]
                }}>
                  Status
                </label>
                <Chip 
                  label={selectedWorkflow.status} 
                  variant={getStatusColor(selectedWorkflow.status)} 
                />
              </div>

              <div>
                <label style={{ 
                  fontSize: ODLTheme.typography.fontSize.xs, 
                  color: ODLTheme.colors.text.secondary,
                  display: 'block',
                  marginBottom: ODLTheme.spacing[1]
                }}>
                  Progress
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: ODLTheme.spacing[3] }}>
                  <div style={{ 
                    flex: 1, 
                    height: '12px', 
                    backgroundColor: ODLTheme.colors.background,
                    borderRadius: ODLTheme.borders.radius.md,
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${selectedWorkflow.completion}%`,
                      height: '100%',
                      backgroundColor: ODLTheme.colors.primary,
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                  <span style={{ fontWeight: ODLTheme.typography.fontWeight.medium }}>
                    {selectedWorkflow.completion}%
                  </span>
                </div>
                <p style={{ 
                  fontSize: ODLTheme.typography.fontSize.xs, 
                  color: ODLTheme.colors.text.secondary,
                  marginTop: ODLTheme.spacing[1]
                }}>
                  {selectedWorkflow.steps.completed} of {selectedWorkflow.steps.total} steps completed
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: ODLTheme.spacing[4] }}>
                <div>
                  <label style={{ 
                    fontSize: ODLTheme.typography.fontSize.xs, 
                    color: ODLTheme.colors.text.secondary,
                    display: 'block',
                    marginBottom: ODLTheme.spacing[1]
                  }}>
                    Assignee
                  </label>
                  <p style={{ fontWeight: ODLTheme.typography.fontWeight.medium }}>{selectedWorkflow.assignee}</p>
                </div>
                <div>
                  <label style={{ 
                    fontSize: ODLTheme.typography.fontSize.xs, 
                    color: ODLTheme.colors.text.secondary,
                    display: 'block',
                    marginBottom: ODLTheme.spacing[1]
                  }}>
                    Department
                  </label>
                  <p style={{ fontWeight: ODLTheme.typography.fontWeight.medium }}>{selectedWorkflow.department}</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: ODLTheme.spacing[4] }}>
                <div>
                  <label style={{ 
                    fontSize: ODLTheme.typography.fontSize.xs, 
                    color: ODLTheme.colors.text.secondary,
                    display: 'block',
                    marginBottom: ODLTheme.spacing[1]
                  }}>
                    Start Date
                  </label>
                  <p style={{ fontWeight: ODLTheme.typography.fontWeight.medium }}>{selectedWorkflow.startDate}</p>
                </div>
                <div>
                  <label style={{ 
                    fontSize: ODLTheme.typography.fontSize.xs, 
                    color: ODLTheme.colors.text.secondary,
                    display: 'block',
                    marginBottom: ODLTheme.spacing[1]
                  }}>
                    Due Date
                  </label>
                  <p style={{ fontWeight: ODLTheme.typography.fontWeight.medium, color: ODLTheme.colors.error }}>
                    {selectedWorkflow.dueDate}
                  </p>
                </div>
              </div>

              <div style={{ 
                display: 'flex', 
                gap: ODLTheme.spacing[3],
                marginTop: ODLTheme.spacing[5],
                paddingTop: ODLTheme.spacing[5],
                borderTop: `${ODLTheme.borders.width.thin} solid ${ODLTheme.colors.border}`
              }}>
                <Button variant="primary" style={{ flex: 1 }}>
                  View Details
                </Button>
                <Button variant="secondary" style={{ flex: 1 }}>
                  Edit Workflow
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

export default ActiveWorkflows;