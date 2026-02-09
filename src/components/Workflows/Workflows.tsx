import React, { useCallback, useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  MarkerType,
  BackgroundVariant,
  NodeTypes,
  Handle,
  Position,
} from 'reactflow';

export interface WorkflowNode {
  id: string;
  type?: 'default' | 'input' | 'output' | 'custom' | 'decision' | 'process' | 'start' | 'end';
  label: string;
  description?: string;
  status?: 'pending' | 'active' | 'completed' | 'error';
  position: { x: number; y: number };
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  animated?: boolean;
  type?: 'default' | 'step' | 'smoothstep' | 'straight';
}

export interface WorkflowsProps {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  onNodeClick?: (node: WorkflowNode) => void;
  onEdgeClick?: (edge: WorkflowEdge) => void;
  onConnect?: (connection: { source: string; target: string }) => void;
  showControls?: boolean;
  showMiniMap?: boolean;
  showBackground?: boolean;
  backgroundVariant?: 'dots' | 'lines' | 'cross';
  fitView?: boolean;
  interactive?: boolean;
  height?: string;
  width?: string;
}

const getStatusColor = (status?: string) => {
  switch (status) {
    case 'completed':
      return '#10B981';
    case 'active':
      return '#3B82F6';
    case 'error':
      return '#EF4444';
    case 'pending':
    default:
      return '#6B7280';
  }
};

const CustomNode = ({ data }: { data: { label: string; description?: string; status?: string } }) => {
  const borderColor = getStatusColor(data.status);

  return (
    <div
      style={{
        padding: '12px 16px',
        borderRadius: '8px',
        background: '#fff',
        border: `2px solid ${borderColor}`,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        minWidth: '150px',
      }}
    >
      <Handle type="target" position={Position.Top} style={{ background: borderColor }} />
      <div style={{ fontWeight: 600, fontSize: '14px', color: '#1F2937' }}>{data.label}</div>
      {data.description && (
        <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>{data.description}</div>
      )}
      <Handle type="source" position={Position.Bottom} style={{ background: borderColor }} />
    </div>
  );
};

const DecisionNode = ({ data }: { data: { label: string; description?: string; status?: string } }) => {
  const borderColor = getStatusColor(data.status);

  return (
    <div
      style={{
        padding: '16px',
        background: '#fff',
        border: `2px solid ${borderColor}`,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transform: 'rotate(45deg)',
        width: '80px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Handle type="target" position={Position.Top} style={{ background: borderColor, transform: 'rotate(-45deg)' }} />
      <div style={{ transform: 'rotate(-45deg)', textAlign: 'center' }}>
        <div style={{ fontWeight: 600, fontSize: '12px', color: '#1F2937' }}>{data.label}</div>
      </div>
      <Handle type="source" position={Position.Bottom} style={{ background: borderColor, transform: 'rotate(-45deg)' }} />
      <Handle type="source" position={Position.Right} id="right" style={{ background: borderColor, transform: 'rotate(-45deg)' }} />
    </div>
  );
};

const StartNode = ({ data }: { data: { label: string } }) => (
  <div
    style={{
      padding: '12px 24px',
      borderRadius: '24px',
      background: '#10B981',
      color: '#fff',
      fontWeight: 600,
      fontSize: '14px',
    }}
  >
    <Handle type="source" position={Position.Bottom} style={{ background: '#fff' }} />
    {data.label}
  </div>
);

const EndNode = ({ data }: { data: { label: string } }) => (
  <div
    style={{
      padding: '12px 24px',
      borderRadius: '24px',
      background: '#EF4444',
      color: '#fff',
      fontWeight: 600,
      fontSize: '14px',
    }}
  >
    <Handle type="target" position={Position.Top} style={{ background: '#fff' }} />
    {data.label}
  </div>
);

const ProcessNode = ({ data }: { data: { label: string; description?: string; status?: string } }) => {
  const borderColor = getStatusColor(data.status);

  return (
    <div
      style={{
        padding: '12px 16px',
        borderRadius: '4px',
        background: '#fff',
        border: `2px solid ${borderColor}`,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        minWidth: '150px',
      }}
    >
      <Handle type="target" position={Position.Top} style={{ background: borderColor }} />
      <div style={{ fontWeight: 600, fontSize: '14px', color: '#1F2937' }}>{data.label}</div>
      {data.description && (
        <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>{data.description}</div>
      )}
      <Handle type="source" position={Position.Bottom} style={{ background: borderColor }} />
    </div>
  );
};

const nodeTypes: NodeTypes = {
  custom: CustomNode,
  decision: DecisionNode,
  start: StartNode,
  end: EndNode,
  process: ProcessNode,
};

const Workflows: React.FC<WorkflowsProps> = ({
  nodes: initialNodes,
  edges: initialEdges,
  onNodeClick,
  onEdgeClick,
  onConnect,
  showControls = true,
  showMiniMap = false,
  showBackground = true,
  backgroundVariant = 'dots',
  fitView = true,
  interactive = true,
  height = '500px',
  width = '100%',
}) => {
  const flowNodes: Node[] = useMemo(
    () =>
      initialNodes.map((node) => ({
        id: node.id,
        type: node.type === 'decision' || node.type === 'start' || node.type === 'end' || node.type === 'process' || node.type === 'custom'
          ? node.type
          : 'custom',
        position: node.position,
        data: {
          label: node.label,
          description: node.description,
          status: node.status,
        },
      })),
    [initialNodes]
  );

  const flowEdges: Edge[] = useMemo(
    () =>
      initialEdges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        label: edge.label,
        animated: edge.animated,
        type: edge.type || 'smoothstep',
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
        },
        style: { strokeWidth: 2 },
      })),
    [initialEdges]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(flowNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(flowEdges);

  const handleConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge({ ...params, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } }, eds));
      if (onConnect && params.source && params.target) {
        onConnect({ source: params.source, target: params.target });
      }
    },
    [setEdges, onConnect]
  );

  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      if (onNodeClick) {
        const originalNode = initialNodes.find((n) => n.id === node.id);
        if (originalNode) {
          onNodeClick(originalNode);
        }
      }
    },
    [onNodeClick, initialNodes]
  );

  const handleEdgeClick = useCallback(
    (_: React.MouseEvent, edge: Edge) => {
      if (onEdgeClick) {
        const originalEdge = initialEdges.find((e) => e.id === edge.id);
        if (originalEdge) {
          onEdgeClick(originalEdge);
        }
      }
    },
    [onEdgeClick, initialEdges]
  );

  const bgVariant = backgroundVariant === 'dots' ? BackgroundVariant.Dots :
                    backgroundVariant === 'lines' ? BackgroundVariant.Lines :
                    BackgroundVariant.Cross;

  return (
    <div style={{ width, height, border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={interactive ? onNodesChange : undefined}
        onEdgesChange={interactive ? onEdgesChange : undefined}
        onConnect={interactive ? handleConnect : undefined}
        onNodeClick={handleNodeClick}
        onEdgeClick={handleEdgeClick}
        nodeTypes={nodeTypes}
        fitView={fitView}
        nodesDraggable={interactive}
        nodesConnectable={interactive}
        elementsSelectable={interactive}
      >
        {showBackground && <Background variant={bgVariant} gap={16} size={1} />}
        {showControls && <Controls />}
        {showMiniMap && <MiniMap />}
      </ReactFlow>
    </div>
  );
};

export default Workflows;
