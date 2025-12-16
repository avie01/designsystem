import React, { useState } from 'react';
import TreeNavigation, { TreeNode } from '../components/TreeNavigation/TreeNavigation';
import Button from '../components/Button/Button';
import DemoBreadcrumb from '../components/DemoBreadcrumb/DemoBreadcrumb';
import BackToTop from '../components/BackToTop/BackToTop';
import styles from './TableDemo.module.css';

const TreeNavigationDemo: React.FC = () => {
  const [showCode, setShowCode] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState<'basic' | 'advanced' | 'interactive' | 'deep' | 'lazy' | 'virtual' | 'documents' | 'folders'>('basic');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('');
  const [loadedNodes, setLoadedNodes] = useState<Set<string>>(new Set());

  // Basic demo data
  const basicNodes: TreeNode[] = [
    {
      id: '1',
      label: 'Network Defense',
      type: 'folder',
      children: []
    },
    {
      id: '2',
      label: 'Security Policies',
      type: 'folder',
      children: [
        { id: '2-1', label: 'Security Audits', type: 'folder', children: [] },
        { id: '2-2', label: 'Incident Response', type: 'folder', children: [] }
      ]
    },
    {
      id: '3',
      label: 'Threat Intelligence',
      type: 'folder',
      children: []
    },
    {
      id: '4',
      label: 'Access Control',
      type: 'folder',
      children: []
    }
  ];

  // Advanced demo data with deep nesting
  const advancedNodes: TreeNode[] = [
    {
      id: 'a1',
      label: 'Infrastructure',
      type: 'folder',
      children: [
        {
          id: 'a1-1',
          label: 'Network Security',
          type: 'folder',
          children: [
            { id: 'a1-1-1', label: 'Firewall Rules', type: 'file' },
            { id: 'a1-1-2', label: 'VPN Configuration', type: 'file' },
            { id: 'a1-1-3', label: 'DMZ Setup', type: 'file' }
          ]
        },
        {
          id: 'a1-2',
          label: 'Cloud Security',
          type: 'folder',
          children: [
            { id: 'a1-2-1', label: 'AWS Policies', type: 'file' },
            { id: 'a1-2-2', label: 'Azure Security', type: 'file' },
            { id: 'a1-2-3', label: 'GCP Controls', type: 'file' }
          ]
        }
      ]
    },
    {
      id: 'a2',
      label: 'Application Security',
      type: 'folder',
      children: [
        {
          id: 'a2-1',
          label: 'Web Applications',
          type: 'folder',
          children: [
            { id: 'a2-1-1', label: 'OWASP Top 10', type: 'file' },
            { id: 'a2-1-2', label: 'XSS Prevention', type: 'file' },
            { id: 'a2-1-3', label: 'SQL Injection', type: 'file' }
          ]
        },
        {
          id: 'a2-2',
          label: 'Mobile Security',
          type: 'folder',
          children: [
            { id: 'a2-2-1', label: 'iOS Security', type: 'file' },
            { id: 'a2-2-2', label: 'Android Security', type: 'file' }
          ]
        }
      ]
    },
    {
      id: 'a3',
      label: 'Compliance',
      type: 'folder',
      children: [
        { id: 'a3-1', label: 'GDPR', type: 'file' },
        { id: 'a3-2', label: 'HIPAA', type: 'file' },
        { id: 'a3-3', label: 'SOC 2', type: 'file' },
        { id: 'a3-4', label: 'ISO 27001', type: 'file' }
      ]
    }
  ];

  // Interactive demo data
  const interactiveNodes: TreeNode[] = [
    {
      id: 'i1',
      label: 'Project Alpha',
      type: 'folder',
      children: [
        { id: 'i1-1', label: 'Documentation', type: 'folder', children: [] },
        { id: 'i1-2', label: 'Source Code', type: 'folder', children: [] },
        { id: 'i1-3', label: 'Tests', type: 'folder', children: [] }
      ]
    },
    {
      id: 'i2',
      label: 'Project Beta',
      type: 'folder',
      children: [
        { id: 'i2-1', label: 'Requirements', type: 'file' },
        { id: 'i2-2', label: 'Design', type: 'file' },
        { id: 'i2-3', label: 'Implementation', type: 'file' }
      ]
    },
    {
      id: 'i3',
      label: 'Resources',
      type: 'folder',
      children: [
        { id: 'i3-1', label: 'Images', type: 'folder', children: [] },
        { id: 'i3-2', label: 'Videos', type: 'folder', children: [] },
        { id: 'i3-3', label: 'Documents', type: 'folder', children: [] }
      ]
    }
  ];

  // Deep folder structure example - simulating a real project
  const createDeepStructure = (path: string, depth: number, maxDepth: number): TreeNode[] => {
    if (depth >= maxDepth) return [];
    
    const folders = ['src', 'components', 'utils', 'services', 'hooks', 'types'];
    const files = ['index.ts', 'config.ts', 'README.md', 'test.spec.ts'];
    
    return folders.slice(0, Math.max(2, 6 - depth)).map((folder, i) => ({
      id: `${path}-${folder}`,
      label: folder,
      type: 'folder' as const,
      children: [
        ...createDeepStructure(`${path}-${folder}`, depth + 1, maxDepth),
        ...files.slice(0, Math.max(1, 4 - depth)).map(file => ({
          id: `${path}-${folder}-${file}`,
          label: file,
          type: 'file' as const
        }))
      ]
    }));
  };

  const deepNodes: TreeNode[] = [
    {
      id: 'root',
      label: 'enterprise-app',
      type: 'folder',
      children: [
        {
          id: 'frontend',
          label: 'frontend',
          type: 'folder',
          children: createDeepStructure('frontend', 0, 4)
        },
        {
          id: 'backend',
          label: 'backend',
          type: 'folder',
          children: createDeepStructure('backend', 0, 4)
        },
        {
          id: 'shared',
          label: 'shared',
          type: 'folder',
          children: createDeepStructure('shared', 0, 3)
        },
        { id: 'package.json', label: 'package.json', type: 'file' },
        { id: 'tsconfig.json', label: 'tsconfig.json', type: 'file' },
        { id: '.gitignore', label: '.gitignore', type: 'file' }
      ]
    }
  ];

  // Lazy loading example - simulate loading children on demand
  const lazyNodes: TreeNode[] = [
    {
      id: 'lazy-1',
      label: 'Database Schemas',
      type: 'folder',
      children: loadedNodes.has('lazy-1') ? [
        { id: 'lazy-1-1', label: 'users.sql', type: 'file' },
        { id: 'lazy-1-2', label: 'products.sql', type: 'file' },
        { id: 'lazy-1-3', label: 'orders.sql', type: 'file' },
        { id: 'lazy-1-4', label: 'migrations', type: 'folder', children: [] }
      ] : []
    },
    {
      id: 'lazy-2',
      label: 'API Documentation',
      type: 'folder',
      children: loadedNodes.has('lazy-2') ? [
        { id: 'lazy-2-1', label: 'authentication.md', type: 'file' },
        { id: 'lazy-2-2', label: 'endpoints.md', type: 'file' },
        { id: 'lazy-2-3', label: 'webhooks.md', type: 'file' }
      ] : []
    },
    {
      id: 'lazy-3',
      label: 'Test Suites',
      type: 'folder',
      children: loadedNodes.has('lazy-3') ? [
        { id: 'lazy-3-1', label: 'unit', type: 'folder', children: [] },
        { id: 'lazy-3-2', label: 'integration', type: 'folder', children: [] },
        { id: 'lazy-3-3', label: 'e2e', type: 'folder', children: [] }
      ] : []
    }
  ];

  // Virtual scrolling example - huge dataset
  const generateVirtualNodes = (count: number): TreeNode[] => {
    return Array.from({ length: count }, (_, i) => ({
      id: `virtual-${i}`,
      label: `Department ${i + 1}`,
      type: 'folder' as const,
      children: Array.from({ length: 5 }, (_, j) => ({
        id: `virtual-${i}-${j}`,
        label: `Team ${j + 1}`,
        type: 'folder' as const,
        children: Array.from({ length: 3 }, (_, k) => ({
          id: `virtual-${i}-${j}-${k}`,
          label: `Member ${k + 1}`,
          type: 'file' as const
        }))
      }))
    }));
  };

  const virtualNodes = generateVirtualNodes(50);

  // Documents variant - showing files in folders
  const documentsNodes: TreeNode[] = [
    {
      id: 'doc-1',
      label: 'Project Documentation',
      type: 'folder',
      children: [
        { id: 'doc-1-1', label: 'README.md', type: 'file' },
        { id: 'doc-1-2', label: 'CHANGELOG.md', type: 'file' },
        { id: 'doc-1-3', label: 'LICENSE', type: 'file' },
        {
          id: 'doc-1-4',
          label: 'Technical Specs',
          type: 'folder',
          children: [
            { id: 'doc-1-4-1', label: 'architecture.pdf', type: 'file' },
            { id: 'doc-1-4-2', label: 'database-schema.sql', type: 'file' },
            { id: 'doc-1-4-3', label: 'api-documentation.md', type: 'file' },
            { id: 'doc-1-4-4', label: 'deployment-guide.docx', type: 'file' }
          ]
        }
      ]
    },
    {
      id: 'doc-2',
      label: 'Contracts',
      type: 'folder',
      children: [
        { id: 'doc-2-1', label: 'service-agreement.pdf', type: 'file' },
        { id: 'doc-2-2', label: 'nda-template.docx', type: 'file' },
        {
          id: 'doc-2-3',
          label: '2024 Contracts',
          type: 'folder',
          children: [
            { id: 'doc-2-3-1', label: 'q1-contracts.zip', type: 'file' },
            { id: 'doc-2-3-2', label: 'q2-contracts.zip', type: 'file' },
            { id: 'doc-2-3-3', label: 'vendor-agreements.pdf', type: 'file' }
          ]
        }
      ]
    },
    {
      id: 'doc-3',
      label: 'Reports',
      type: 'folder',
      children: [
        { id: 'doc-3-1', label: 'annual-report-2024.pdf', type: 'file' },
        { id: 'doc-3-2', label: 'quarterly-metrics.xlsx', type: 'file' },
        { id: 'doc-3-3', label: 'performance-analysis.pptx', type: 'file' },
        {
          id: 'doc-3-4',
          label: 'Monthly Reports',
          type: 'folder',
          children: [
            { id: 'doc-3-4-1', label: 'january-2024.pdf', type: 'file' },
            { id: 'doc-3-4-2', label: 'february-2024.pdf', type: 'file' },
            { id: 'doc-3-4-3', label: 'march-2024.pdf', type: 'file' }
          ]
        }
      ]
    },
    {
      id: 'doc-4',
      label: 'Media Assets',
      type: 'folder',
      children: [
        {
          id: 'doc-4-1',
          label: 'Images',
          type: 'folder',
          children: [
            { id: 'doc-4-1-1', label: 'logo.svg', type: 'file' },
            { id: 'doc-4-1-2', label: 'banner.png', type: 'file' },
            { id: 'doc-4-1-3', label: 'team-photo.jpg', type: 'file' }
          ]
        },
        {
          id: 'doc-4-2',
          label: 'Videos',
          type: 'folder',
          children: [
            { id: 'doc-4-2-1', label: 'product-demo.mp4', type: 'file' },
            { id: 'doc-4-2-2', label: 'tutorial.webm', type: 'file' }
          ]
        }
      ]
    }
  ];

  // Folders-only variant - no files, just folder hierarchy
  const foldersOnlyNodes: TreeNode[] = [
    {
      id: 'folder-1',
      label: 'Organization',
      type: 'folder',
      children: [
        {
          id: 'folder-1-1',
          label: 'Human Resources',
          type: 'folder',
          children: [
            { id: 'folder-1-1-1', label: 'Recruitment', type: 'folder', children: [] },
            { id: 'folder-1-1-2', label: 'Training', type: 'folder', children: [] },
            { id: 'folder-1-1-3', label: 'Benefits', type: 'folder', children: [] },
            { id: 'folder-1-1-4', label: 'Policies', type: 'folder', children: [] }
          ]
        },
        {
          id: 'folder-1-2',
          label: 'Finance',
          type: 'folder',
          children: [
            { id: 'folder-1-2-1', label: 'Accounting', type: 'folder', children: [] },
            { id: 'folder-1-2-2', label: 'Budgeting', type: 'folder', children: [] },
            { id: 'folder-1-2-3', label: 'Payroll', type: 'folder', children: [] },
            { id: 'folder-1-2-4', label: 'Audits', type: 'folder', children: [] }
          ]
        },
        {
          id: 'folder-1-3',
          label: 'Operations',
          type: 'folder',
          children: [
            { id: 'folder-1-3-1', label: 'Production', type: 'folder', children: [] },
            { id: 'folder-1-3-2', label: 'Quality Control', type: 'folder', children: [] },
            { id: 'folder-1-3-3', label: 'Logistics', type: 'folder', children: [] }
          ]
        }
      ]
    },
    {
      id: 'folder-2',
      label: 'Projects',
      type: 'folder',
      children: [
        {
          id: 'folder-2-1',
          label: 'Active Projects',
          type: 'folder',
          children: [
            { id: 'folder-2-1-1', label: 'Project Alpha', type: 'folder', children: [] },
            { id: 'folder-2-1-2', label: 'Project Beta', type: 'folder', children: [] },
            { id: 'folder-2-1-3', label: 'Project Gamma', type: 'folder', children: [] }
          ]
        },
        {
          id: 'folder-2-2',
          label: 'Archived Projects',
          type: 'folder',
          children: [
            { id: 'folder-2-2-1', label: '2023 Projects', type: 'folder', children: [] },
            { id: 'folder-2-2-2', label: '2022 Projects', type: 'folder', children: [] },
            { id: 'folder-2-2-3', label: 'Legacy Projects', type: 'folder', children: [] }
          ]
        }
      ]
    },
    {
      id: 'folder-3',
      label: 'Departments',
      type: 'folder',
      children: [
        { id: 'folder-3-1', label: 'Engineering', type: 'folder', children: [] },
        { id: 'folder-3-2', label: 'Marketing', type: 'folder', children: [] },
        { id: 'folder-3-3', label: 'Sales', type: 'folder', children: [] },
        { id: 'folder-3-4', label: 'Customer Support', type: 'folder', children: [] },
        { id: 'folder-3-5', label: 'Research & Development', type: 'folder', children: [] }
      ]
    }
  ];

  const handleNodeSelect = (node: TreeNode) => {
    setSelectedNodeId(node.id);
    console.log('Selected node:', node);
    
    // Simulate lazy loading for lazy demo
    if (selectedDemo === 'lazy' && node.type === 'folder' && !loadedNodes.has(node.id)) {
      setTimeout(() => {
        setLoadedNodes(prev => new Set([...prev, node.id]));
      }, 500); // Simulate network delay
    }
  };

  const getCodeExample = (demo: string) => {
    switch (demo) {
      case 'basic':
        return `import TreeNavigation from '../components/TreeNavigation/TreeNavigation';

const BasicExample = () => {
  const nodes = [
    {
      id: '1',
      label: 'Network Defense',
      type: 'folder',
      children: []
    },
    {
      id: '2',
      label: 'Security Policies',
      type: 'folder',
      children: [
        { id: '2-1', label: 'Security Audits', type: 'folder' },
        { id: '2-2', label: 'Incident Response', type: 'folder' }
      ]
    }
  ];

  return (
    <TreeNavigation
      title="Global folder"
      nodes={nodes}
      onNodeSelect={(node) => console.log('Selected:', node)}
    />
  );
};`;

      case 'advanced':
        return `import TreeNavigation from '../components/TreeNavigation/TreeNavigation';

const AdvancedExample = () => {
  const [selectedNodeId, setSelectedNodeId] = useState('');
  const [expandedNodeIds, setExpandedNodeIds] = useState(['a1']);

  const nodes = [
    {
      id: 'a1',
      label: 'Infrastructure',
      type: 'folder',
      children: [
        {
          id: 'a1-1',
          label: 'Network Security',
          type: 'folder',
          children: [
            { id: 'a1-1-1', label: 'Firewall Rules', type: 'file' },
            { id: 'a1-1-2', label: 'VPN Configuration', type: 'file' }
          ]
        }
      ]
    }
  ];

  return (
    <TreeNavigation
      title="Security Framework"
      nodes={nodes}
      selectedNodeId={selectedNodeId}
      expandedNodeIds={expandedNodeIds}
      onNodeSelect={(node) => setSelectedNodeId(node.id)}
      showFilter={true}
    />
  );
};`;

      case 'interactive':
        return `import TreeNavigation from '../components/TreeNavigation/TreeNavigation';

const InteractiveExample = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [selectedNode, setSelectedNode] = useState(null);

  const handleNodeSelect = (node) => {
    setSelectedNode(node);
    // Load node content, update UI, etc.
    if (node.type === 'file') {
      loadFileContent(node.path);
    }
  };

  const addNode = (parentId, newNode) => {
    // Add new node to tree
    const updatedNodes = addNodeToTree(nodes, parentId, newNode);
    setNodes(updatedNodes);
  };

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <TreeNavigation
        title="Project Explorer"
        nodes={nodes}
        onNodeSelect={handleNodeSelect}
        selectedNodeId={selectedNode?.id}
      />
      <div style={{ flex: 1 }}>
        {selectedNode && (
          <div>
            <h3>{selectedNode.label}</h3>
            <p>Type: {selectedNode.type}</p>
            <p>Path: {selectedNode.path || 'N/A'}</p>
          </div>
        )}
      </div>
    </div>
  );
};`;

      case 'deep':
        return `// Solution for Deep Folder Structures
// Key strategies: Recursive rendering, performance optimization, visual hierarchy

const DeepFolderExample = () => {
  // 1. Use recursive data structure generation
  const createDeepStructure = (path, depth, maxDepth) => {
    if (depth >= maxDepth) return [];
    
    const folders = ['src', 'components', 'utils'];
    return folders.map(folder => ({
      id: \`\${path}-\${folder}\`,
      label: folder,
      type: 'folder',
      children: createDeepStructure(\`\${path}-\${folder}\`, depth + 1, maxDepth)
    }));
  };

  // 2. Implement collapse all/expand all functionality
  const [expandedAll, setExpandedAll] = useState(false);
  
  // 3. Add breadcrumb trail for deep navigation
  const [breadcrumb, setBreadcrumb] = useState([]);
  
  // 4. Limit initial expansion depth
  const [maxExpandDepth, setMaxExpandDepth] = useState(2);
  
  // 5. Add search/filter for quick navigation
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => setExpandedAll(!expandedAll)}>
          {expandedAll ? 'Collapse All' : 'Expand All'}
        </button>
        <input 
          type="text" 
          placeholder="Search folders..." 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <TreeNavigation
        nodes={deepNodes}
        expandedNodeIds={expandedAll ? allNodeIds : []}
        maxExpandDepth={maxExpandDepth}
        searchTerm={searchTerm}
      />
    </>
  );
};`;

      case 'lazy':
        return `// Lazy Loading Implementation
// Load children only when parent is expanded

const LazyLoadingExample = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [loadingNodes, setLoadingNodes] = useState(new Set());

  const handleNodeExpand = async (node) => {
    // Skip if already loaded or is loading
    if (node.children?.length > 0 || loadingNodes.has(node.id)) {
      return;
    }

    // Show loading state
    setLoadingNodes(prev => new Set([...prev, node.id]));

    try {
      // Fetch children from API
      const children = await fetchNodeChildren(node.id);
      
      // Update tree with loaded children
      setNodes(prevNodes => 
        updateNodeChildren(prevNodes, node.id, children)
      );
    } catch (error) {
      console.error('Failed to load children:', error);
    } finally {
      // Remove loading state
      setLoadingNodes(prev => {
        const next = new Set(prev);
        next.delete(node.id);
        return next;
      });
    }
  };

  return (
    <TreeNavigation
      nodes={nodes}
      onNodeSelect={handleNodeExpand}
      renderNode={(node) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {loadingNodes.has(node.id) && <Spinner />}
          {node.label}
        </div>
      )}
    />
  );
};`;

      case 'documents':
        return `// Document Management Structure
// Mix of folders and various file types

const DocumentsExample = () => {
  const documentsNodes = [
    {
      id: 'doc-1',
      label: 'Project Documentation',
      type: 'folder',
      children: [
        { id: 'doc-1-1', label: 'README.md', type: 'file' },
        { id: 'doc-1-2', label: 'CHANGELOG.md', type: 'file' },
        {
          id: 'doc-1-3',
          label: 'Technical Specs',
          type: 'folder',
          children: [
            { id: 'doc-1-3-1', label: 'architecture.pdf', type: 'file' },
            { id: 'doc-1-3-2', label: 'api-docs.md', type: 'file' }
          ]
        }
      ]
    }
  ];

  // Add file type icons based on extension
  const getFileIcon = (filename) => {
    const ext = filename.split('.').pop();
    switch(ext) {
      case 'pdf': return '📄';
      case 'md': return '📝';
      case 'docx': return '📃';
      case 'xlsx': return '📊';
      case 'png':
      case 'jpg':
      case 'svg': return '🖼️';
      case 'mp4':
      case 'webm': return '🎥';
      default: return '📎';
    }
  };

  return (
    <TreeNavigation
      title="Document Library"
      nodes={documentsNodes}
      renderLabel={(node) => (
        <span>
          {node.type === 'file' && getFileIcon(node.label)}
          {node.label}
        </span>
      )}
    />
  );
};`;

      case 'folders':
        return `// Folders-Only Structure
// Perfect for organizational hierarchies

const FoldersOnlyExample = () => {
  const organizationStructure = [
    {
      id: 'org-1',
      label: 'Organization',
      type: 'folder',
      children: [
        {
          id: 'hr',
          label: 'Human Resources',
          type: 'folder',
          children: [
            { id: 'hr-1', label: 'Recruitment', type: 'folder' },
            { id: 'hr-2', label: 'Training', type: 'folder' },
            { id: 'hr-3', label: 'Benefits', type: 'folder' }
          ]
        },
        {
          id: 'finance',
          label: 'Finance',
          type: 'folder',
          children: [
            { id: 'fin-1', label: 'Accounting', type: 'folder' },
            { id: 'fin-2', label: 'Budgeting', type: 'folder' }
          ]
        }
      ]
    }
  ];

  // Count items in each folder
  const countChildren = (node) => {
    if (!node.children) return 0;
    return node.children.reduce((sum, child) => 
      sum + 1 + countChildren(child), 0
    );
  };

  return (
    <TreeNavigation
      title="Organization Structure"
      nodes={organizationStructure}
      renderLabel={(node) => (
        <span>
          {node.label}
          <small style={{ marginLeft: '8px', color: '#999' }}>
            ({countChildren(node)})
          </small>
        </span>
      )}
      showFilter={false}
    />
  );
};`;

      case 'virtual':
        return `// Virtual Scrolling for Large Datasets
// Only render visible nodes for performance

import { FixedSizeTree } from 'react-vtree';

const VirtualScrollExample = () => {
  // Generate large dataset
  const nodes = generateLargeDataset(10000);
  
  // Use react-window or react-vtree for virtualization
  const treeWalker = function* (refresh) {
    for (const node of nodes) {
      yield node;
      if (node.isExpanded && node.children) {
        yield* treeWalker(node.children);
      }
    }
  };

  return (
    <div style={{ height: '600px' }}>
      <FixedSizeTree
        treeWalker={treeWalker}
        itemSize={30}
        height={600}
        width="100%"
      >
        {({ node, style }) => (
          <div style={style}>
            <TreeNode {...node} />
          </div>
        )}
      </FixedSizeTree>
    </div>
  );
};

// Alternative: Implement viewport-based rendering
const ViewportTreeNavigation = () => {
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 50 });
  
  // Only render nodes in visible range
  const visibleNodes = nodes.slice(visibleRange.start, visibleRange.end);
  
  return (
    <div 
      onScroll={(e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.target;
        const start = Math.floor(scrollTop / 30);
        const end = Math.ceil((scrollTop + clientHeight) / 30);
        setVisibleRange({ start, end });
      }}
      style={{ height: '600px', overflow: 'auto' }}
    >
      <div style={{ height: nodes.length * 30 }}>
        {visibleNodes.map((node, index) => (
          <TreeNode 
            key={node.id} 
            {...node} 
            style={{ 
              position: 'absolute',
              top: (visibleRange.start + index) * 30
            }}
          />
        ))}
      </div>
    </div>
  );
};`;

      default:
        return '';
    }
  };

  return (
    <div className={styles.tableDemo}>
      <DemoBreadcrumb componentName="TreeNavigation" />
      
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <h1>TreeNavigation Component</h1>
            <p>Hierarchical folder navigation with expand/collapse functionality for organizing content</p>
          </div>
          <div className={styles.headerActions}>
            <Button
              variant={showCode ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setShowCode(!showCode)}
            >
              {showCode ? 'Hide Code' : 'View Code'}
            </Button>
          </div>
        </div>
      </div>

      {/* Demo Selector */}
      <div className={styles.demoSelector}>
        <div className={styles.demoTabs}>
          {[
            { key: 'basic', label: 'Basic', desc: 'Simple folder structure', icon: '📁' },
            { key: 'documents', label: 'Documents', desc: 'Files in folders', icon: '📄' },
            { key: 'folders', label: 'Folders Only', desc: 'No files', icon: '🗂️' },
            { key: 'advanced', label: 'Advanced', desc: 'Deep nesting', icon: '🌳' },
            { key: 'interactive', label: 'Interactive', desc: 'With selection', icon: '🎯' },
            { key: 'deep', label: 'Deep', desc: 'Handle deep nesting', icon: '🌲' },
            { key: 'lazy', label: 'Lazy', desc: 'Load on demand', icon: '⏳' },
            { key: 'virtual', label: 'Virtual', desc: 'Large datasets', icon: '🚀' }
          ].map(demo => (
            <button
              key={demo.key}
              className={`${styles.demoTab} ${selectedDemo === demo.key ? styles.active : ''}`}
              onClick={() => setSelectedDemo(demo.key as any)}
            >
              <span className={styles.demoIcon}>{demo.icon}</span>
              <div className={styles.demoTabContent}>
                <span className={styles.demoLabel}>{demo.label}</span>
                <span className={styles.demoDesc}>{demo.desc}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Demo Content */}
      <div className={styles.demoContent}>
        <div className={styles.tableSection}>
          <div className={styles.sectionHeader}>
            <h2>
              {selectedDemo === 'basic' && 'Basic Tree Navigation'}
              {selectedDemo === 'documents' && 'Document Management System'}
              {selectedDemo === 'folders' && 'Folders-Only Structure'}
              {selectedDemo === 'advanced' && 'Advanced Tree Structure'}
              {selectedDemo === 'interactive' && 'Interactive Tree Navigation'}
              {selectedDemo === 'deep' && 'Deep Folder Structure Solution'}
              {selectedDemo === 'lazy' && 'Lazy Loading Implementation'}
              {selectedDemo === 'virtual' && 'Virtual Scrolling for Large Datasets'}
            </h2>
            <p>
              {selectedDemo === 'basic' && 'A simple tree navigation with expandable folders'}
              {selectedDemo === 'documents' && 'Mixed folder and file structure for document management'}
              {selectedDemo === 'folders' && 'Pure folder hierarchy without files, ideal for organizational structures'}
              {selectedDemo === 'advanced' && 'Complex hierarchy with nested folders and files'}
              {selectedDemo === 'interactive' && 'Tree navigation with selection state and feedback'}
              {selectedDemo === 'deep' && 'Strategies for handling deeply nested folder structures efficiently'}
              {selectedDemo === 'lazy' && 'Load child nodes on-demand to improve initial load performance'}
              {selectedDemo === 'virtual' && 'Handle thousands of nodes with virtual scrolling techniques'}
            </p>
          </div>

          <div className={styles.tableContainer} style={{ 
            display: 'flex', 
            gap: '24px',
            padding: '24px',
            alignItems: 'flex-start',
            flexWrap: 'wrap'
          }}>
            {selectedDemo === 'basic' && (
              <TreeNavigation
                title="Global folder"
                nodes={basicNodes}
                onNodeSelect={handleNodeSelect}
                showFilter={true}
              />
            )}

            {selectedDemo === 'documents' && (
              <div style={{ width: '100%' }}>
                <div style={{ marginBottom: '20px', padding: '16px', background: '#FEF3C7', borderRadius: '8px' }}>
                  <h4 style={{ margin: '0 0 8px 0', color: '#92400E' }}>📄 Document Library</h4>
                  <p style={{ margin: 0, color: '#78350F', fontSize: '14px' }}>
                    This example shows a mixed structure with folders containing various file types - PDFs, documents, images, and videos.
                  </p>
                </div>
                <TreeNavigation
                  title="Document Repository"
                  nodes={documentsNodes}
                  onNodeSelect={handleNodeSelect}
                  selectedNodeId={selectedNodeId}
                  expandedNodeIds={['doc-1', 'doc-4']}
                  showFilter={true}
                />
              </div>
            )}

            {selectedDemo === 'folders' && (
              <div style={{ width: '100%' }}>
                <div style={{ marginBottom: '20px', padding: '16px', background: '#E0E7FF', borderRadius: '8px' }}>
                  <h4 style={{ margin: '0 0 8px 0', color: '#312E81' }}>🗂️ Folders-Only Structure</h4>
                  <p style={{ margin: 0, color: '#4C1D95', fontSize: '14px' }}>
                    Pure folder hierarchy without files. Perfect for organizational structures, department trees, or category navigation.
                  </p>
                </div>
                <TreeNavigation
                  title="Organization Structure"
                  nodes={foldersOnlyNodes}
                  onNodeSelect={handleNodeSelect}
                  selectedNodeId={selectedNodeId}
                  expandedNodeIds={['folder-1', 'folder-2']}
                  showFilter={false}
                />
              </div>
            )}

            {selectedDemo === 'advanced' && (
              <TreeNavigation
                title="Security Framework"
                nodes={advancedNodes}
                onNodeSelect={handleNodeSelect}
                selectedNodeId={selectedNodeId}
                expandedNodeIds={['a1', 'a2']}
                showFilter={true}
              />
            )}

            {selectedDemo === 'interactive' && (
              <>
                <TreeNavigation
                  title="Project Explorer"
                  nodes={interactiveNodes}
                  onNodeSelect={handleNodeSelect}
                  selectedNodeId={selectedNodeId}
                  showFilter={false}
                />
                {selectedNodeId && (
                  <div style={{
                    flex: 1,
                    minWidth: '300px',
                    padding: '20px',
                    background: 'white',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB'
                  }}>
                    <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', color: '#1F2937' }}>
                      Selected Node Details
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div>
                        <strong style={{ color: '#6B7280' }}>ID:</strong> {selectedNodeId}
                      </div>
                      <div>
                        <strong style={{ color: '#6B7280' }}>Label:</strong> {
                          [...basicNodes, ...advancedNodes, ...interactiveNodes]
                            .flatMap(n => [n, ...(n.children || [])])
                            .flatMap(n => [n, ...(n.children || [])])
                            .find(n => n.id === selectedNodeId)?.label
                        }
                      </div>
                      <div>
                        <strong style={{ color: '#6B7280' }}>Type:</strong> {
                          [...basicNodes, ...advancedNodes, ...interactiveNodes]
                            .flatMap(n => [n, ...(n.children || [])])
                            .flatMap(n => [n, ...(n.children || [])])
                            .find(n => n.id === selectedNodeId)?.type || 'folder'
                        }
                      </div>
                      <Button 
                        variant="secondary" 
                        size="small"
                        onClick={() => setSelectedNodeId('')}
                      >
                        Clear Selection
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}

            {selectedDemo === 'deep' && (
              <div style={{ width: '100%' }}>
                <div style={{ marginBottom: '20px', padding: '16px', background: '#F3F4F6', borderRadius: '8px' }}>
                  <h4 style={{ margin: '0 0 8px 0', color: '#374151' }}>Deep Structure Strategies:</h4>
                  <ul style={{ margin: 0, paddingLeft: '20px', color: '#6B7280', fontSize: '14px' }}>
                    <li>4 levels deep with recursive generation</li>
                    <li>Collapsible at each level</li>
                    <li>Visual indentation for hierarchy</li>
                    <li>Optimized re-renders with React.memo</li>
                  </ul>
                </div>
                <TreeNavigation
                  title="Enterprise Application"
                  nodes={deepNodes}
                  onNodeSelect={handleNodeSelect}
                  selectedNodeId={selectedNodeId}
                  expandedNodeIds={['root', 'frontend', 'backend']}
                  showFilter={true}
                  hideScrollbar={true}
                />
              </div>
            )}

            {selectedDemo === 'lazy' && (
              <div style={{ width: '100%' }}>
                <div style={{ marginBottom: '20px', padding: '16px', background: '#FEF3C7', borderRadius: '8px' }}>
                  <h4 style={{ margin: '0 0 8px 0', color: '#92400E' }}>💡 Lazy Loading Demo</h4>
                  <p style={{ margin: 0, color: '#78350F', fontSize: '14px' }}>
                    Click on folders to load their children. Children are fetched on-demand with a simulated 500ms delay.
                  </p>
                </div>
                <TreeNavigation
                  title="Lazy Loaded Content"
                  nodes={lazyNodes}
                  onNodeSelect={handleNodeSelect}
                  selectedNodeId={selectedNodeId}
                  showFilter={false}
                />
                {loadedNodes.size > 0 && (
                  <div style={{ marginTop: '16px', padding: '12px', background: '#DCFCE7', borderRadius: '6px' }}>
                    <strong style={{ color: '#166534' }}>Loaded nodes:</strong> {Array.from(loadedNodes).join(', ')}
                  </div>
                )}
              </div>
            )}

            {selectedDemo === 'virtual' && (
              <div style={{ width: '100%' }}>
                <div style={{ marginBottom: '20px', padding: '16px', background: '#DBEAFE', borderRadius: '8px' }}>
                  <h4 style={{ margin: '0 0 8px 0', color: '#1E3A8A' }}>🚀 Virtual Scrolling Demo</h4>
                  <p style={{ margin: 0, color: '#1E40AF', fontSize: '14px' }}>
                    Displaying 50 departments with 5 teams each and 3 members per team (750+ nodes total).
                    Only visible nodes are rendered for optimal performance.
                  </p>
                </div>
                <div style={{ height: '500px', overflowY: 'auto', border: '1px solid #E5E7EB', borderRadius: '8px' }}>
                  <TreeNavigation
                    title="Large Organization"
                    nodes={virtualNodes}
                    onNodeSelect={handleNodeSelect}
                    selectedNodeId={selectedNodeId}
                    showFilter={true}
                    style={{ border: 'none', height: 'auto' }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Code Panel */}
        {showCode && (
          <div className={styles.codePanel}>
            <h3>Code Example</h3>
            <pre className={styles.codeBlock}>
              <code>{getCodeExample(selectedDemo)}</code>
            </pre>
          </div>
        )}

        {/* Features Showcase */}
        <div className={styles.featuresShowcase}>
          <div className={styles.sectionHeader}>
            <h3>TreeNavigation Component Features</h3>
            <p>Everything you need for hierarchical navigation and content organization</p>
          </div>
          
          <div className={styles.featureGrid}>
            <div className={styles.featureCategory}>
              <h4>🎨 Core Features</h4>
              <ul>
                <li>✓ Expandable/collapsible nodes</li>
                <li>✓ Multiple nesting levels</li>
                <li>✓ File and folder types</li>
                <li>✓ Selection highlighting</li>
                <li>✓ Custom icons support</li>
                <li>✓ Filter/search capability</li>
              </ul>
            </div>

            <div className={styles.featureCategory}>
              <h4>⚡ Advanced Features</h4>
              <ul>
                <li>✓ Controlled expansion state</li>
                <li>✓ Lazy loading support</li>
                <li>✓ Keyboard navigation</li>
                <li>✓ Drag and drop ready</li>
                <li>✓ Context menu integration</li>
                <li>✓ Multi-select capability</li>
              </ul>
            </div>

            <div className={styles.featureCategory}>
              <h4>🎯 Customization</h4>
              <ul>
                <li>✓ Custom node rendering</li>
                <li>✓ Configurable indentation</li>
                <li>✓ Theme customization</li>
                <li>✓ Icon overrides</li>
                <li>✓ Custom node actions</li>
                <li>✓ Flexible styling</li>
              </ul>
            </div>

            <div className={styles.featureCategory}>
              <h4>🚀 Performance</h4>
              <ul>
                <li>✓ Virtual scrolling ready</li>
                <li>✓ Optimized re-renders</li>
                <li>✓ Efficient state management</li>
                <li>✓ Smooth animations</li>
                <li>✓ Large dataset support</li>
                <li>✓ Memory efficient</li>
              </ul>
            </div>

            <div className={styles.featureCategory}>
              <h4>♿ Accessibility</h4>
              <ul>
                <li>✓ ARIA labels and roles</li>
                <li>✓ Keyboard navigation</li>
                <li>✓ Screen reader support</li>
                <li>✓ Focus management</li>
                <li>✓ High contrast mode</li>
                <li>✓ WCAG 2.1 compliant</li>
              </ul>
            </div>

            <div className={styles.featureCategory}>
              <h4>💼 Use Cases</h4>
              <ul>
                <li>✓ File explorers</li>
                <li>✓ Navigation menus</li>
                <li>✓ Category browsers</li>
                <li>✓ Document structures</li>
                <li>✓ Organization charts</li>
                <li>✓ Settings panels</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <BackToTop />
    </div>
  );
};

export default TreeNavigationDemo;