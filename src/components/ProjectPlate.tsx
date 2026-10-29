import type { Project } from "../data/portfolio";

/** Small deterministic PRNG so every project gets its own stable composition. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const hash = (s: string) => [...s].reduce((a, c) => (Math.imul(a, 31) + c.charCodeAt(0)) | 0, 7);

const W = 640;
const H = 400;

/**
 * Generated technical schematic for a project — an abstract node graph seeded from the project id,
 * annotated with its real category and stack. It is deliberately NOT styled as a screenshot.
 * If `project.screenshot` is set (a real image in /public), that image is used instead.
 */
export function ProjectPlate({
  project,
  className = "",
  priority = false,
}: {
  project: Project;
  className?: string;
  priority?: boolean;
}) {
  if (project.screenshot) {
    return (
      <img
        src={project.screenshot}
        alt={`Screenshot of ${project.title}`}
        width={W}
        height={H}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  const rand = mulberry32(hash(project.id));
  const n = 7 + Math.floor(rand() * 3);
  const nodes = Array.from({ length: n }, (_, i) => ({
    x: 70 + rand() * (W - 140),
    y: 70 + rand() * (H - 150),
    r: 3 + rand() * 3,
    key: i,
  }));
  const hub = Math.floor(rand() * n);

  // Connect each node to its nearest neighbour, plus the hub, for a readable tree-ish graph.
  const edges = new Set<string>();
  nodes.forEach((a, i) => {
    let best = -1;
    let bd = Infinity;
    nodes.forEach((b, j) => {
      if (i === j) return;
      const d = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
      if (d < bd) {
        bd = d;
        best = j;
      }
    });
    if (best >= 0) edges.add([i, best].sort().join("-"));
    if (i !== hub && rand() > 0.55) edges.add([i, hub].sort().join("-"));
  });

  const tags = project.stack.slice(0, 3).join("  ·  ").toUpperCase();

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`Generated schematic for ${project.title} — an abstract diagram, not a screenshot`}
      className={`h-full w-full ${className}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width={W} height={H} fill="#101827" />
      <g stroke="#28364A" strokeWidth="1" opacity="0.7">
        {Array.from({ length: 12 }, (_, i) => (
          <line key={`v${i}`} x1={i * 56} y1="0" x2={i * 56} y2={H} />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 56} x2={W} y2={i * 56} />
        ))}
      </g>

      <text
        x={W - 28}
        y={H - 36}
        textAnchor="end"
        fontFamily="'Space Grotesk Variable', sans-serif"
        fontWeight="700"
        fontSize="170"
        fill="none"
        stroke="#28364A"
        strokeWidth="1.5"
        letterSpacing="-8"
      >
        {project.index}
      </text>

      <g>
        {[...edges].map((e) => {
          const [a, b] = e.split("-").map(Number);
          const live = a === hub || b === hub;
          return (
            <line
              key={e}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              stroke={live ? "#36CFC9" : "#4a5b78"}
              strokeWidth={live ? 1.4 : 1}
              strokeDasharray={live ? "2 5" : undefined}
              opacity={live ? 0.9 : 0.7}
            />
          );
        })}
        {nodes.map((nd, i) => (
          <g key={nd.key}>
            {i === hub && <circle cx={nd.x} cy={nd.y} r={nd.r + 9} fill="none" stroke="#B7F34A" strokeWidth="1" opacity="0.5" />}
            <circle cx={nd.x} cy={nd.y} r={i === hub ? nd.r + 2 : nd.r} fill={i === hub ? "#B7F34A" : "#F5F5F0"} />
          </g>
        ))}
      </g>

      <g fontFamily="'JetBrains Mono Variable', monospace" fontSize="11" letterSpacing="1.5">
        <text x="28" y="40" fill="#B7F34A">
          {project.index} / {project.category.toUpperCase()}
        </text>
        <text x="28" y={H - 28} fill="#F5F5F0" opacity="0.8">
          {tags}
        </text>
      </g>
    </svg>
  );
}
