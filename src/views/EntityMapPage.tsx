'use client';
import { useCallback, useMemo, useRef, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { teamMembers } from '@/data/seed';
import RandomLetterReveal from '@/components/shared/RandomLetterReveal';
import { Maximize, Minimize, Plus, RotateCcw, Info } from 'lucide-react';
import FormDialog from '@/components/shared/FormDialog';
import { useReactFlow, ReactFlowProvider } from '@xyflow/react';

// All roles with their display info
const roleConfig: Record<string, { color: string; bg: string; department: string }> = {
  'Guard': { color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)', department: 'Security' },
  'Groom': { color: '#22c55e', bg: 'rgba(34,197,94,0.12)', department: 'Stable Ops' },
  'Gardener': { color: '#84cc16', bg: 'rgba(132,204,22,0.12)', department: 'Ground Ops' },
  'Housekeeping': { color: '#a855f7', bg: 'rgba(168,85,247,0.12)', department: 'Ground Ops' },
  'Electrician': { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', department: 'Maintenance' },
  'Ground Supervisor': { color: '#14b8a6', bg: 'rgba(20,184,166,0.12)', department: 'Ground Ops' },
  'Riding Boy': { color: '#f97316', bg: 'rgba(249,115,22,0.12)', department: 'Stable Ops' },
  'Rider': { color: '#3b82f6', bg: 'rgba(59,130,246,0.12)', department: 'Stable Ops' },
  'Instructor': { color: '#ec4899', bg: 'rgba(236,72,153,0.12)', department: 'Stable Ops' },
  'Farrier': { color: '#f97316', bg: 'rgba(249,115,22,0.12)', department: 'Stable Ops' },
  'Jamedar': { color: '#ef4444', bg: 'rgba(239,68,68,0.12)', department: 'Ground Ops' },
  'Stable Manager': { color: '#c084fc', bg: 'rgba(192,132,252,0.12)', department: 'Stable Ops' },
  'Executive Accounts': { color: '#60a5fa', bg: 'rgba(96,165,250,0.12)', department: 'Accounts' },
  'Executive Admin': { color: '#fbbf24', bg: 'rgba(251,191,36,0.12)', department: 'Admin' },
  'Restaurant Manager': { color: '#fb923c', bg: 'rgba(251,146,60,0.12)', department: 'Restaurant' },
  'Kitchen Helper': { color: '#a3e635', bg: 'rgba(163,230,53,0.12)', department: 'Restaurant' },
  'Waiter': { color: '#38bdf8', bg: 'rgba(56,189,248,0.12)', department: 'Restaurant' },
};

// Get people for each role from seed data
function getPeopleForRole(role: string): string[] {
  const people = teamMembers.filter(m => m.role === role).map(m => m.fullName);
  // Add placeholders for roles not in seed data
  if (people.length === 0) {
    const placeholders: Record<string, string[]> = {
      'Electrician': ['Raju Electrician'],
      'Riding Boy': ['Hassan Riding Boy', 'Ali Riding Boy'],
      'Restaurant Manager': ['Ahmad Manager'],
      'Kitchen Helper': ['Maria Kitchen', 'Saeed Helper'],
      'Waiter': ['Khalid Waiter', 'Youssef Waiter'],
      'Executive Admin': ['Rachel Senior Executive Admin'],
    };
    return placeholders[role] || ['(Unassigned)'];
  }
  return people;
}

// Custom Role Node
function RoleNode({ data }: { data: { label: string; people: string[]; color: string; bg: string; department: string } }) {
  return (
    <div
      className="rounded-xl border shadow-lg backdrop-blur-sm min-w-[180px] max-w-[220px] gpu-accelerated"
      style={{
        borderColor: data.color + '40',
        background: `linear-gradient(135deg, ${data.bg}, hsl(240 5% 8% / 0.95))`,
      }}
    >
      <Handle type="target" position={Position.Top} className="!w-2 !h-2 !border-2" style={{ borderColor: data.color, background: data.bg }} />
      <Handle type="source" position={Position.Bottom} className="!w-2 !h-2 !border-2" style={{ borderColor: data.color, background: data.bg }} />
      <Handle type="target" position={Position.Left} className="!w-2 !h-2 !border-2" style={{ borderColor: data.color, background: data.bg }} />
      <Handle type="source" position={Position.Right} className="!w-2 !h-2 !border-2" style={{ borderColor: data.color, background: data.bg }} />

      {/* Header */}
      <div className="px-3 py-2 border-b flex items-center gap-2" style={{ borderColor: data.color + '20' }}>
        <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: data.color }} />
        <span className="text-[11px] font-bold uppercase tracking-wider text-white/90 truncate">{data.label}</span>
        <span className="text-[8px] px-1.5 py-0.5 rounded-full ml-auto shrink-0" style={{ background: data.color + '25', color: data.color }}>
          {data.people.length}
        </span>
      </div>

      {/* Department */}
      <div className="px-3 pt-1.5">
        <span className="text-[8px] uppercase tracking-widest" style={{ color: data.color + 'aa' }}>{data.department}</span>
      </div>

      {/* People */}
      <div className="px-3 py-2 space-y-1">
        {data.people.slice(0, 4).map((p, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-bold shrink-0" style={{ background: data.color + '20', color: data.color }}>
              {p.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <span className="text-[10px] text-white/70 truncate">{p}</span>
          </div>
        ))}
        {data.people.length > 4 && (
          <span className="text-[9px] text-white/40 pl-5">+{data.people.length - 4} more</span>
        )}
      </div>
    </div>
  );
}

const nodeTypes = { roleNode: RoleNode };

// Layout: arrange nodes in a circular/grid pattern
function generateLayout(): { nodes: Node[]; edges: Edge[] } {
  const roles = Object.keys(roleConfig);
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  // Arrange in a radial layout
  const cx = 600, cy = 450;
  const radius = 380;

  roles.forEach((role, i) => {
    const angle = (2 * Math.PI * i) / roles.length - Math.PI / 2;
    const x = cx + radius * Math.cos(angle) - 100;
    const y = cy + radius * Math.sin(angle) - 50;

    nodes.push({
      id: role,
      type: 'roleNode',
      position: { x, y },
      data: {
        label: role,
        people: getPeopleForRole(role),
        ...roleConfig[role],
      },
    });
  });

  // Define connections between roles
  const connections: [string, string][] = [
    ['Stable Manager', 'Groom'],
    ['Stable Manager', 'Rider'],
    ['Stable Manager', 'Instructor'],
    ['Stable Manager', 'Farrier'],
    ['Stable Manager', 'Riding Boy'],
    ['Ground Supervisor', 'Guard'],
    ['Ground Supervisor', 'Gardener'],
    ['Ground Supervisor', 'Housekeeping'],
    ['Ground Supervisor', 'Electrician'],
    ['Ground Supervisor', 'Jamedar'],
    ['Restaurant Manager', 'Kitchen Helper'],
    ['Restaurant Manager', 'Waiter'],
    ['Executive Accounts', 'Executive Admin'],
    ['Instructor', 'Rider'],
    ['Groom', 'Farrier'],
    ['Stable Manager', 'Ground Supervisor'],
    ['Executive Admin', 'Stable Manager'],
  ];

  connections.forEach(([source, target], i) => {
    if (roleConfig[source] && roleConfig[target]) {
      edges.push({
        id: `e-${i}`,
        source,
        target,
        style: { stroke: roleConfig[source].color + '50', strokeWidth: 1.5 },
        animated: true,
      });
    }
  });

  return { nodes, edges };
}

export default function EntityMapPage() {
  return (
    <ReactFlowProvider>
      <EntityMapContent />
    </ReactFlowProvider>
  );
}

function EntityMapContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { fitView } = useReactFlow();

  const layout = useMemo(() => generateLayout(), []);
  const [nodes, setNodes, onNodesChange] = useNodesState(layout.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layout.edges);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleReset = () => {
    fitView({ duration: 800, padding: 0.15 });
  };

  const handleAddNode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const roleName = formData.get('roleName') as string;
    const department = formData.get('department') as string;
    
    if (roleName && department) {
      const newNode: Node = {
        id: roleName,
        type: 'roleNode',
        position: { x: Math.random() * 200 + 400, y: Math.random() * 200 + 300 }, // Center-ish
        data: {
          label: roleName,
          people: ['(Unassigned)'],
          color: '#0ea5e9', // Sky blue default
          bg: 'rgba(14,165,233,0.12)',
          department
        }
      };
      setNodes((nds) => [...nds, newNode]);
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
        <div>
          <p className="label-sm text-muted-foreground text-[10px] truncate uppercase tracking-widest mb-1">
            Organization &gt; Visualizers &gt; <span className="text-primary">Entity Topology</span>
          </p>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-0.5 bg-primary rounded" /><div className="w-3 h-0.5 bg-primary rounded" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Organizational Topology</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-foreground tracking-tight">
            <RandomLetterReveal text="Entity Map" />
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Interactive role hierarchy — drag nodes, zoom, and explore connections.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="hidden lg:flex items-center gap-4 text-[10px] font-bold tracking-widest text-muted-foreground uppercase border-r border-border pr-4 mr-1">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary" /> {nodes.length} NODES</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-secondary" /> 42 NOTES</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-success" /> 165 EDGES</span>
          </div>
          <FormDialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            trigger={
              <button className="h-9 px-3 rounded-lg bg-surface-container-high border border-border text-foreground hover:bg-muted transition-colors flex items-center gap-2 text-sm">
                <Plus className="w-4 h-4" /> Add Node
              </button>
            }
            title="Add New Role Node"
          >
            <form onSubmit={handleAddNode} className="space-y-4 mt-2">
              <div><label className="label-sm text-muted-foreground block mb-1.5">ROLE NAME</label><input name="roleName" type="text" required placeholder="e.g. Blacksmith" className="w-full h-10 px-3 rounded-lg bg-surface-container-high border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary outline-none" /></div>
              <div><label className="label-sm text-muted-foreground block mb-1.5">DEPARTMENT</label><input name="department" type="text" required placeholder="e.g. Stable Ops" className="w-full h-10 px-3 rounded-lg bg-surface-container-high border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary outline-none" /></div>
              <button type="submit" className="w-full h-10 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-semibold tracking-wider uppercase">ADD NODE</button>
            </form>
          </FormDialog>
          <button onClick={handleReset} className="h-9 px-3 rounded-lg border border-border text-foreground hover:bg-surface-container-high transition-colors flex items-center gap-2 text-sm uppercase font-bold tracking-wider" title="Reset Viewport">
            <RotateCcw className="w-3.5 h-3.5" /> <span className="hidden sm:inline">RESET</span>
          </button>
          <button onClick={toggleFullscreen} className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface-container-high transition-colors" title="Toggle Fullscreen">
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* React Flow Canvas */}
      <div ref={containerRef} className={`rounded-xl border border-border overflow-hidden bg-surface-container-highest ${isFullscreen ? 'w-screen h-screen rounded-none border-0' : 'h-[calc(100vh-260px)] sm:h-[calc(100vh-200px)]'}`}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          minZoom={0.3}
          maxZoom={1.5}
          defaultEdgeOptions={{ animated: true }}
          proOptions={{ hideAttribution: true }}
        >
          <Controls
            className="!bg-surface-container-highest !border-border !rounded-lg !shadow-lg"
          />
          <MiniMap
            style={{ background: 'hsl(240 5% 8%)', borderRadius: 8 }}
            nodeColor={(n: Node) => (n.data?.color as string) || '#8b5cf6'}
            maskColor="hsla(240 5% 5% / 0.7)"
          />
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="hsl(240 5% 15%)" />
        </ReactFlow>

        {/* Legend Overlay */}
        <div className="absolute top-4 left-4 z-10 bg-surface-container-highest/90 backdrop-blur-md border border-border p-4 rounded-xl shadow-2xl space-y-3 max-w-[200px]">
          <div className="flex items-center gap-2 mb-1">
            <Info className="w-3.5 h-3.5 text-primary" />
            <h4 className="text-[10px] font-bold text-foreground uppercase tracking-[0.2em]">Categories</h4>
          </div>
          <div className="space-y-2">
            {[
              { label: 'Stable Ops', color: '#22c55e' },
              { label: 'Security', color: '#8b5cf6' },
              { label: 'Maintenance', color: '#f59e0b' },
              { label: 'Ground Ops', color: '#84cc16' },
              { label: 'Accounts', color: '#60a5fa' },
            ].map(cat => (
              <div key={cat.label} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{cat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
