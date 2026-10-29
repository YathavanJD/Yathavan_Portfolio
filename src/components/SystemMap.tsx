/**
 * The hero's signature graphic: a lightweight SVG "system map" — a core node connected to the kinds of
 * components that appear in Yathavan's real projects (UI, API, auth, database, ML, mobile, tests).
 * Pure SVG + CSS; GSAP (in Hero) drives the draw/activation per scroll stage.
 */
type NodeDef = { id: string; label: string; x: number; y: number; stage: 1 | 2 | 3 | 4 };
type EdgeDef = { from: string; to: string; stage: 2 | 3 | 4 };

const MAP_NODES: NodeDef[] = [
  { id: "core", label: "CORE", x: 300, y: 300, stage: 1 },
  { id: "ui", label: "UI", x: 135, y: 170, stage: 2 },
  { id: "api", label: "API", x: 320, y: 130, stage: 2 },
  { id: "db", label: "DB", x: 480, y: 205, stage: 3 },
  { id: "auth", label: "AUTH", x: 490, y: 345, stage: 3 },
  { id: "ml", label: "ML", x: 395, y: 470, stage: 3 },
  { id: "mobile", label: "ANDROID", x: 120, y: 385, stage: 3 },
  { id: "test", label: "TEST", x: 235, y: 495, stage: 4 },
  { id: "ship", label: "SHIP", x: 545, y: 455, stage: 4 },
];

const EDGES: EdgeDef[] = [
  { from: "core", to: "api", stage: 2 },
  { from: "core", to: "ui", stage: 2 },
  { from: "ui", to: "api", stage: 2 },
  { from: "api", to: "db", stage: 3 },
  { from: "core", to: "auth", stage: 3 },
  { from: "core", to: "ml", stage: 3 },
  { from: "ui", to: "mobile", stage: 3 },
  { from: "mobile", to: "test", stage: 4 },
  { from: "core", to: "test", stage: 4 },
  { from: "auth", to: "ship", stage: 4 },
  { from: "ml", to: "ship", stage: 4 },
];

const byId = Object.fromEntries(MAP_NODES.map((n) => [n.id, n]));

const TICKS = Array.from({ length: 72 }, (_, i) => {
  const a = (i / 72) * Math.PI * 2;
  const long = i % 6 === 0;
  const r1 = 262;
  const r2 = long ? 276 : 270;
  return { x1: 300 + Math.cos(a) * r1, y1: 300 + Math.sin(a) * r1, x2: 300 + Math.cos(a) * r2, y2: 300 + Math.sin(a) * r2, key: i };
});

export default function SystemMap() {
  return (
    <svg
      viewBox="0 0 600 600"
      className="system-map h-full w-full"
      role="img"
      aria-label="Animated system diagram: a core node connected to UI, API, database, authentication, machine-learning, Android, test and ship nodes"
    >
      {/* coordinate markers */}
      <g className="map-base" fontFamily="'JetBrains Mono Variable', monospace" fontSize="9.5" fill="#F5F5F0" opacity="0.55" letterSpacing="1.2">
        {[
          [28, 34, "start", "X 00.0  Y 00.0"],
          [572, 34, "end", "X 60.0  Y 00.0"],
          [28, 578, "start", "X 00.0  Y 60.0"],
          [572, 578, "end", "X 60.0  Y 60.0"],
        ].map(([x, y, a, t]) => (
          <text key={t as string} x={x as number} y={y as number} textAnchor={a as "start" | "end"}>
            {t}
          </text>
        ))}
      </g>
      <g className="map-base" stroke="#F5F5F0" strokeWidth="1" opacity="0.35">
        <path d="M18 18h14M18 18v14M582 18h-14M582 18v14M18 582h14M18 582v-14M582 582h-14M582 582v-14" fill="none" />
      </g>

      <g className="map-parallax">
        {/* concentric rings */}
        <g className="map-rot" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
          <g className="spin-slow">
            <circle className="map-base" cx="300" cy="300" r="258" fill="none" stroke="#28364A" strokeWidth="1" />
            <g className="map-base" stroke="#36CFC9" strokeWidth="1" opacity="0.7">
              {TICKS.map((t) => (
                <line key={t.key} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} />
              ))}
            </g>
          </g>
          <g className="spin-slower">
            <circle className="map-base" cx="300" cy="300" r="205" fill="none" stroke="#36CFC9" strokeWidth="1" strokeDasharray="2 8" opacity="0.6" />
          </g>
        </g>
        <circle className="map-base" cx="300" cy="300" r="140" fill="none" stroke="#28364A" strokeWidth="1" />
        <circle className="map-base" cx="300" cy="300" r="70" fill="none" stroke="#28364A" strokeWidth="1" />
        <path className="map-base" d="M300 24v552M24 300h552" stroke="#28364A" strokeWidth="1" />

        {/* edges (base line + animated data-flow overlay) */}
        {EDGES.map((e) => {
          const a = byId[e.from];
          const b = byId[e.to];
          const d = `M${a.x} ${a.y} L${b.x} ${b.y}`;
          return (
            <g key={`${e.from}-${e.to}`}>
              <path className="map-edge" data-stage={e.stage} d={d} pathLength={1} strokeDasharray="1" fill="none" stroke="#F5F5F0" strokeWidth="1.2" opacity="0.55" />
              <path className="map-flow flow-line" data-stage={e.stage} d={d} fill="none" stroke="#36CFC9" strokeWidth="1.6" strokeLinecap="round" />
            </g>
          );
        })}

        {/* nodes */}
        {MAP_NODES.map((n) => {
          const left = n.x > 300;
          return (
            <g key={n.id} className="map-node" data-stage={n.stage}>
              {n.id === "ship" && <circle className="pulse-ring" cx={n.x} cy={n.y} r="12" fill="none" stroke="#B7F34A" strokeWidth="1.2" />}
              <circle className="node-dot" cx={n.x} cy={n.y} r={n.id === "core" ? 11 : 7} />
              {n.id === "core" && <circle cx={n.x} cy={n.y} r="22" fill="none" stroke="#B7F34A" strokeWidth="1" opacity="0.6" />}
              <text
                className="map-label"
                x={left ? n.x - 15 : n.x + 15}
                y={n.y + 4}
                textAnchor={left ? "end" : "start"}
                fontFamily="'JetBrains Mono Variable', monospace"
                fontSize="11"
                letterSpacing="1.4"
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
