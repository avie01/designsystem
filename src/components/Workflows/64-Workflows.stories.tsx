import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Workflows, { WorkflowNode, WorkflowEdge } from './Workflows';
import { useTheme } from '../../../.storybook/theme-decorator';

const meta: Meta<typeof Workflows> = {
  title: 'Design System/Components/Workflows',
  component: Workflows,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Interactive workflow diagram component powered by React Flow. Supports custom node types, drag-and-drop, zoom controls, and various layout options. Ideal for visualizing processes, pipelines, and decision trees.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    showControls: {
      control: 'boolean',
      description: 'Show zoom and pan controls',
    },
    showMiniMap: {
      control: 'boolean',
      description: 'Show minimap for navigation',
    },
    showBackground: {
      control: 'boolean',
      description: 'Show background pattern',
    },
    backgroundVariant: {
      control: 'select',
      options: ['dots', 'lines', 'cross'],
      description: 'Background pattern style',
    },
    fitView: {
      control: 'boolean',
      description: 'Automatically fit diagram to viewport',
    },
    interactive: {
      control: 'boolean',
      description: 'Enable drag, connect, and select interactions',
    },
    height: {
      control: 'text',
      description: 'Height of the workflow container',
    },
    width: {
      control: 'text',
      description: 'Width of the workflow container',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const simpleNodes: WorkflowNode[] = [
  { id: '1', type: 'start', label: 'Start', position: { x: 250, y: 0 } },
  { id: '2', type: 'process', label: 'Process Data', description: 'Validate and transform', status: 'completed', position: { x: 250, y: 100 } },
  { id: '3', type: 'process', label: 'Analyze', description: 'Run analysis', status: 'active', position: { x: 250, y: 200 } },
  { id: '4', type: 'end', label: 'End', position: { x: 250, y: 300 } },
];

const simpleEdges: WorkflowEdge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e3-4', source: '3', target: '4' },
];

export const Default: Story = {
  name: '01 Default',
  args: {
    nodes: simpleNodes,
    edges: simpleEdges,
    showControls: true,
    showMiniMap: false,
    showBackground: true,
    backgroundVariant: 'dots',
    fitView: true,
    interactive: true,
    height: '500px',
  },
};

const approvalNodes: WorkflowNode[] = [
  { id: 'start', type: 'start', label: 'Submit Request', position: { x: 250, y: 0 } },
  { id: 'review', type: 'process', label: 'Initial Review', description: 'Manager reviews request', status: 'completed', position: { x: 250, y: 100 } },
  { id: 'decision', type: 'decision', label: 'Approve?', position: { x: 250, y: 220 } },
  { id: 'approved', type: 'process', label: 'Process Approval', description: 'Execute approved action', status: 'pending', position: { x: 100, y: 350 } },
  { id: 'rejected', type: 'process', label: 'Send Rejection', description: 'Notify requestor', status: 'pending', position: { x: 400, y: 350 } },
  { id: 'end', type: 'end', label: 'Complete', position: { x: 250, y: 480 } },
];

const approvalEdges: WorkflowEdge[] = [
  { id: 'e-start-review', source: 'start', target: 'review' },
  { id: 'e-review-decision', source: 'review', target: 'decision' },
  { id: 'e-decision-approved', source: 'decision', target: 'approved', label: 'Yes' },
  { id: 'e-decision-rejected', source: 'decision', target: 'rejected', label: 'No' },
  { id: 'e-approved-end', source: 'approved', target: 'end' },
  { id: 'e-rejected-end', source: 'rejected', target: 'end' },
];

export const ApprovalWorkflow: Story = {
  name: '02 Approval Workflow',
  args: {
    nodes: approvalNodes,
    edges: approvalEdges,
    showControls: true,
    showMiniMap: true,
    showBackground: true,
    height: '600px',
  },
};

const cicdNodes: WorkflowNode[] = [
  { id: 'commit', type: 'start', label: 'Git Commit', position: { x: 0, y: 100 } },
  { id: 'build', type: 'process', label: 'Build', description: 'Compile code', status: 'completed', position: { x: 150, y: 100 } },
  { id: 'test', type: 'process', label: 'Test', description: 'Run unit tests', status: 'completed', position: { x: 300, y: 100 } },
  { id: 'lint', type: 'process', label: 'Lint', description: 'Check code style', status: 'completed', position: { x: 450, y: 100 } },
  { id: 'security', type: 'process', label: 'Security Scan', description: 'SAST analysis', status: 'active', position: { x: 600, y: 100 } },
  { id: 'deploy-staging', type: 'process', label: 'Deploy Staging', description: 'Deploy to staging', status: 'pending', position: { x: 750, y: 100 } },
  { id: 'e2e', type: 'process', label: 'E2E Tests', description: 'Integration tests', status: 'pending', position: { x: 900, y: 100 } },
  { id: 'deploy-prod', type: 'end', label: 'Deploy Prod', position: { x: 1050, y: 100 } },
];

const cicdEdges: WorkflowEdge[] = [
  { id: 'e1', source: 'commit', target: 'build' },
  { id: 'e2', source: 'build', target: 'test' },
  { id: 'e3', source: 'test', target: 'lint' },
  { id: 'e4', source: 'lint', target: 'security', animated: true },
  { id: 'e5', source: 'security', target: 'deploy-staging' },
  { id: 'e6', source: 'deploy-staging', target: 'e2e' },
  { id: 'e7', source: 'e2e', target: 'deploy-prod' },
];

export const CICDPipeline: Story = {
  name: '03 CI/CD Pipeline',
  args: {
    nodes: cicdNodes,
    edges: cicdEdges,
    showControls: true,
    showMiniMap: true,
    showBackground: true,
    backgroundVariant: 'lines',
    height: '300px',
  },
};

const dataNodes: WorkflowNode[] = [
  { id: 'source1', type: 'start', label: 'Database', position: { x: 0, y: 0 } },
  { id: 'source2', type: 'start', label: 'API', position: { x: 0, y: 150 } },
  { id: 'source3', type: 'start', label: 'Files', position: { x: 0, y: 300 } },
  { id: 'extract', type: 'process', label: 'Extract', description: 'Collect raw data', status: 'completed', position: { x: 200, y: 150 } },
  { id: 'transform', type: 'process', label: 'Transform', description: 'Clean & normalize', status: 'active', position: { x: 400, y: 150 } },
  { id: 'validate', type: 'decision', label: 'Valid?', position: { x: 600, y: 150 } },
  { id: 'load', type: 'process', label: 'Load', description: 'Store in warehouse', status: 'pending', position: { x: 800, y: 100 } },
  { id: 'error', type: 'process', label: 'Error Queue', description: 'Handle failures', status: 'error', position: { x: 800, y: 250 } },
  { id: 'dashboard', type: 'end', label: 'Dashboard', position: { x: 1000, y: 100 } },
];

const dataEdges: WorkflowEdge[] = [
  { id: 'e-s1-extract', source: 'source1', target: 'extract' },
  { id: 'e-s2-extract', source: 'source2', target: 'extract' },
  { id: 'e-s3-extract', source: 'source3', target: 'extract' },
  { id: 'e-extract-transform', source: 'extract', target: 'transform', animated: true },
  { id: 'e-transform-validate', source: 'transform', target: 'validate' },
  { id: 'e-validate-load', source: 'validate', target: 'load', label: 'Yes' },
  { id: 'e-validate-error', source: 'validate', target: 'error', label: 'No' },
  { id: 'e-load-dashboard', source: 'load', target: 'dashboard' },
];

export const DataPipeline: Story = {
  name: '04 Data Pipeline (ETL)',
  args: {
    nodes: dataNodes,
    edges: dataEdges,
    showControls: true,
    showMiniMap: true,
    showBackground: true,
    backgroundVariant: 'cross',
    height: '500px',
  },
};

export const InteractiveWorkflow: Story = {
  name: '05 Interactive with Click Events',
  render: () => {
    const { colors } = useTheme();
    const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);

    const nodes: WorkflowNode[] = [
      { id: '1', type: 'start', label: 'Start', position: { x: 250, y: 0 } },
      { id: '2', type: 'process', label: 'Step 1', description: 'First process', status: 'completed', position: { x: 250, y: 100 } },
      { id: '3', type: 'process', label: 'Step 2', description: 'Second process', status: 'active', position: { x: 250, y: 200 } },
      { id: '4', type: 'process', label: 'Step 3', description: 'Third process', status: 'pending', position: { x: 250, y: 300 } },
      { id: '5', type: 'end', label: 'Complete', position: { x: 250, y: 400 } },
    ];

    const edges: WorkflowEdge[] = [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3', animated: true },
      { id: 'e3-4', source: '3', target: '4' },
      { id: 'e4-5', source: '4', target: '5' },
    ];

    return (
      <div>
        <Workflows
          nodes={nodes}
          edges={edges}
          onNodeClick={(node) => setSelectedNode(node)}
          showControls={true}
          showMiniMap={false}
          height="500px"
        />
        <div style={{ marginTop: '16px', padding: '12px', backgroundColor: colors.grey300, borderRadius: '8px' }}>
          <p style={{ margin: 0, color: colors.textPrimary }}>
            {selectedNode
              ? `Selected: ${selectedNode.label}${selectedNode.description ? ` - ${selectedNode.description}` : ''} (Status: ${selectedNode.status || 'N/A'})`
              : 'Click on a node to select it'}
          </p>
        </div>
      </div>
    );
  },
};

export const ReadOnlyWorkflow: Story = {
  name: '06 Read Only (Non-interactive)',
  args: {
    nodes: simpleNodes,
    edges: simpleEdges,
    showControls: false,
    showMiniMap: false,
    showBackground: true,
    interactive: false,
    height: '400px',
  },
};

const complexNodes: WorkflowNode[] = [
  { id: 'input', type: 'start', label: 'User Input', position: { x: 400, y: 0 } },
  { id: 'auth', type: 'process', label: 'Authenticate', description: 'Verify user credentials', status: 'completed', position: { x: 400, y: 100 } },
  { id: 'auth-check', type: 'decision', label: 'Valid?', position: { x: 400, y: 220 } },
  { id: 'fetch-data', type: 'process', label: 'Fetch Data', description: 'Get user data', status: 'completed', position: { x: 200, y: 350 } },
  { id: 'fetch-prefs', type: 'process', label: 'Fetch Preferences', description: 'Get settings', status: 'completed', position: { x: 600, y: 350 } },
  { id: 'merge', type: 'process', label: 'Merge Results', description: 'Combine data', status: 'active', position: { x: 400, y: 480 } },
  { id: 'cache-check', type: 'decision', label: 'Cached?', position: { x: 400, y: 600 } },
  { id: 'cache', type: 'process', label: 'Update Cache', description: 'Store in cache', status: 'pending', position: { x: 200, y: 730 } },
  { id: 'respond', type: 'process', label: 'Send Response', description: 'Return to user', status: 'pending', position: { x: 400, y: 850 } },
  { id: 'error', type: 'process', label: 'Error Handler', description: 'Handle auth failure', status: 'error', position: { x: 700, y: 350 } },
  { id: 'end', type: 'end', label: 'Complete', position: { x: 400, y: 950 } },
];

const complexEdges: WorkflowEdge[] = [
  { id: 'e1', source: 'input', target: 'auth' },
  { id: 'e2', source: 'auth', target: 'auth-check' },
  { id: 'e3', source: 'auth-check', target: 'fetch-data', label: 'Yes' },
  { id: 'e4', source: 'auth-check', target: 'fetch-prefs', label: 'Yes' },
  { id: 'e5', source: 'auth-check', target: 'error', label: 'No' },
  { id: 'e6', source: 'fetch-data', target: 'merge' },
  { id: 'e7', source: 'fetch-prefs', target: 'merge' },
  { id: 'e8', source: 'merge', target: 'cache-check', animated: true },
  { id: 'e9', source: 'cache-check', target: 'cache', label: 'No' },
  { id: 'e10', source: 'cache-check', target: 'respond', label: 'Yes' },
  { id: 'e11', source: 'cache', target: 'respond' },
  { id: 'e12', source: 'respond', target: 'end' },
];

export const ComplexWorkflow: Story = {
  name: '07 Complex Multi-branch Workflow',
  args: {
    nodes: complexNodes,
    edges: complexEdges,
    showControls: true,
    showMiniMap: true,
    showBackground: true,
    height: '700px',
  },
};

export const WithAllFeatures: Story = {
  name: '08 Full Featured',
  args: {
    nodes: approvalNodes,
    edges: approvalEdges,
    showControls: true,
    showMiniMap: true,
    showBackground: true,
    backgroundVariant: 'dots',
    fitView: true,
    interactive: true,
    height: '600px',
  },
};
