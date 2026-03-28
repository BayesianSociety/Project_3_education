module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/better-sqlite3 [external] (better-sqlite3, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("better-sqlite3", () => require("better-sqlite3"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/multi-agent-producer_V0/Project_3_education/lib/db/schema.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "INDEXES",
    ()=>INDEXES,
    "TABLES",
    ()=>TABLES
]);
const TABLES = {
    users: `
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      display_name TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `,
    sessions: `
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      client_version TEXT,
      platform TEXT,
      started_at TEXT NOT NULL,
      ended_at TEXT,
      status TEXT NOT NULL DEFAULT 'active',
      metadata TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `,
    puzzles: `
    CREATE TABLE IF NOT EXISTS puzzles (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      story TEXT NOT NULL,
      goal TEXT NOT NULL,
      scene_id TEXT NOT NULL,
      order_index INTEGER NOT NULL,
      grid TEXT NOT NULL,
      entities TEXT NOT NULL,
      available_blocks TEXT NOT NULL,
      constraints TEXT,
      success_criteria TEXT,
      hints TEXT,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `,
    attempts: `
    CREATE TABLE IF NOT EXISTS attempts (
      id TEXT PRIMARY KEY,
      session_id TEXT NOT NULL,
      puzzle_id TEXT NOT NULL,
      started_at TEXT NOT NULL,
      ended_at TEXT,
      status TEXT NOT NULL,
      failure_reason TEXT,
      code_snapshot TEXT,
      metadata TEXT,
      FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE,
      FOREIGN KEY (puzzle_id) REFERENCES puzzles(id) ON DELETE CASCADE
    );
  `,
    events: `
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      attempt_id TEXT,
      session_id TEXT NOT NULL,
      puzzle_id TEXT NOT NULL,
      type TEXT NOT NULL,
      detail TEXT,
      created_at TEXT NOT NULL,
      FOREIGN KEY (attempt_id) REFERENCES attempts(id) ON DELETE CASCADE,
      FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE,
      FOREIGN KEY (puzzle_id) REFERENCES puzzles(id) ON DELETE CASCADE
    );
  `,
    movements: `
    CREATE TABLE IF NOT EXISTS movements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      attempt_id TEXT NOT NULL,
      step_index INTEGER NOT NULL,
      x INTEGER NOT NULL,
      y INTEGER NOT NULL,
      action TEXT,
      timestamp TEXT NOT NULL,
      FOREIGN KEY (attempt_id) REFERENCES attempts(id) ON DELETE CASCADE
    );
  `,
    puzzleProgress: `
    CREATE TABLE IF NOT EXISTS puzzle_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      puzzle_id TEXT NOT NULL,
      status TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      UNIQUE(user_id, puzzle_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (puzzle_id) REFERENCES puzzles(id) ON DELETE CASCADE
    );
  `
};
const INDEXES = [
    `CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);`,
    `CREATE INDEX IF NOT EXISTS idx_attempts_session ON attempts(session_id);`,
    `CREATE INDEX IF NOT EXISTS idx_attempts_puzzle ON attempts(puzzle_id);`,
    `CREATE INDEX IF NOT EXISTS idx_events_attempt ON events(attempt_id);`,
    `CREATE INDEX IF NOT EXISTS idx_movements_attempt ON movements(attempt_id);`,
    `CREATE INDEX IF NOT EXISTS idx_progress_user_puzzle ON puzzle_progress(user_id, puzzle_id);`
];
}),
"[project]/multi-agent-producer_V0/Project_3_education/lib/db/migrations.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MIGRATIONS",
    ()=>MIGRATIONS,
    "applyMigrations",
    ()=>applyMigrations
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/lib/db/schema.ts [app-route] (ecmascript)");
;
const MIGRATIONS = [
    {
        id: '0001-core-schema',
        statements: [
            __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TABLES"].users,
            __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TABLES"].sessions,
            __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TABLES"].puzzles,
            __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TABLES"].attempts,
            __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TABLES"].events,
            __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TABLES"].movements,
            __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TABLES"].puzzleProgress,
            ...__TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["INDEXES"]
        ]
    }
];
function applyMigrations(db) {
    db.exec(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id TEXT PRIMARY KEY,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
    const applied = new Set(db.prepare('SELECT id FROM schema_migrations').all().map((row)=>row.id));
    for (const migration of MIGRATIONS){
        if (applied.has(migration.id)) continue;
        const run = db.transaction(()=>{
            for (const statement of migration.statements){
                db.exec(statement);
            }
            db.prepare('INSERT INTO schema_migrations (id) VALUES (?)').run(migration.id);
        });
        run();
    }
}
}),
"[project]/multi-agent-producer_V0/Project_3_education/lib/puzzles/data.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PUZZLES",
    ()=>PUZZLES,
    "syncPuzzleCatalog",
    ()=>syncPuzzleCatalog
]);
const BASE_PATH_ENTITIES = [
    {
        id: 'path-1',
        asset: 'place.png',
        x: 1,
        y: 2
    },
    {
        id: 'path-2',
        asset: 'place.png',
        x: 2,
        y: 2
    },
    {
        id: 'path-3',
        asset: 'place.png',
        x: 4,
        y: 2
    },
    {
        id: 'path-4',
        asset: 'place.png',
        x: 5,
        y: 2
    }
];
const PUZZLES = [
    {
        id: 'puzzle-01',
        title: 'Treat Trail',
        story: 'Guide Pixel Pup across the stepping stones, jump past the bubble pit, and grab the treat. Focus on simple sequencing under the On Start block.',
        goal: 'Reach the snack without touching the hazard.',
        sceneId: 'sunlit-path',
        order: 1,
        grid: {
            width: 6,
            height: 3,
            floorY: 2,
            start: {
                x: 0,
                y: 2
            },
            goal: {
                x: 6,
                y: 2
            },
            hazard: {
                x: 3,
                y: 2,
                type: 'obstacle.png'
            },
            waypoints: [
                {
                    x: 1,
                    y: 2
                },
                {
                    x: 2,
                    y: 2
                },
                {
                    x: 4,
                    y: 2
                },
                {
                    x: 5,
                    y: 2
                }
            ]
        },
        entities: [
            {
                id: 'player',
                asset: 'main_character.png',
                role: 'player',
                x: 0,
                y: 2
            },
            ...BASE_PATH_ENTITIES.map((entity, idx)=>({
                    ...entity,
                    id: `seq-path-${idx}`
                })),
            {
                id: 'hazard',
                asset: 'obstacle.png',
                role: 'hazard',
                x: 3,
                y: 2
            },
            {
                id: 'goal',
                asset: 'food.png',
                role: 'goal',
                x: 6,
                y: 2
            }
        ],
        availableBlocks: [
            {
                category: 'movement',
                blocks: [
                    'move_forward',
                    'turn_left',
                    'turn_right',
                    'jump'
                ]
            },
            {
                category: 'actions',
                blocks: [
                    'collect_item'
                ]
            },
            {
                category: 'control',
                blocks: []
            },
            {
                category: 'logic',
                blocks: []
            },
            {
                category: 'sensing',
                blocks: [
                    'is_path_clear'
                ]
            }
        ],
        constraints: {
            maxBlocks: 6,
            requiredConcept: 'sequencing'
        },
        successCriteria: {
            steps: [
                'Start at Pixel Pup',
                'Move across stones',
                'Jump obstacle',
                'Collect treat'
            ]
        },
        hints: [
            {
                reason: 'target_not_reached',
                message: 'The pup stopped early. Double-check that every walkway tile has a move command.'
            },
            {
                reason: 'obstacle_collision',
                message: 'You must jump when you reach the bubble pit. Try inserting Jump after the second move.'
            },
            {
                reason: 'wrong_order',
                message: 'Put Collect Treat after the pup lands on the final tile.'
            }
        ]
    },
    {
        id: 'puzzle-02',
        title: 'Loop Lagoon',
        story: 'Repeat tidy movements across the floating pads. Use loops to avoid writing the same Move block again and again.',
        goal: 'Use a loop to cross the lagoon and grab the item.',
        sceneId: 'loop-lagoon',
        order: 2,
        grid: {
            width: 7,
            height: 3,
            floorY: 2,
            start: {
                x: 0,
                y: 2
            },
            goal: {
                x: 6,
                y: 2
            },
            hazard: {
                x: 3,
                y: 2,
                type: 'obstacle.png'
            },
            waypoints: [
                {
                    x: 1,
                    y: 2
                },
                {
                    x: 2,
                    y: 2
                },
                {
                    x: 3,
                    y: 2
                },
                {
                    x: 4,
                    y: 2
                },
                {
                    x: 5,
                    y: 2
                }
            ]
        },
        entities: [
            {
                id: 'player',
                asset: 'main_character.png',
                role: 'player',
                x: 0,
                y: 2
            },
            ...BASE_PATH_ENTITIES.map((entity, idx)=>({
                    ...entity,
                    id: `loop-path-${idx}`
                })),
            {
                id: 'hazard',
                asset: 'obstacle.png',
                role: 'hazard',
                x: 3,
                y: 2
            },
            {
                id: 'goal',
                asset: 'food.png',
                role: 'goal',
                x: 6,
                y: 2
            }
        ],
        availableBlocks: [
            {
                category: 'movement',
                blocks: [
                    'move_forward',
                    'jump'
                ]
            },
            {
                category: 'actions',
                blocks: [
                    'collect_item'
                ]
            },
            {
                category: 'control',
                blocks: [
                    'repeat_times'
                ]
            },
            {
                category: 'logic',
                blocks: []
            },
            {
                category: 'sensing',
                blocks: [
                    'is_path_clear'
                ]
            }
        ],
        constraints: {
            maxBlocks: 8,
            requiredConcept: 'loops'
        },
        successCriteria: {
            steps: [
                'Use repeat block for forward steps',
                'Jump hazard inside loop exit',
                'Collect treat'
            ]
        },
        hints: [
            {
                reason: 'wrong_order',
                message: 'Make sure Jump happens immediately before the obstacle tile.'
            },
            {
                reason: 'missing_condition',
                message: 'Wrap repeated moves in Repeat so you have room for jump + collect.'
            }
        ]
    },
    {
        id: 'puzzle-03',
        title: 'Crystal Conditions',
        story: 'Sensors reveal surprise obstacles. Use conditionals to choose whether to jump or keep walking, and finish with the special treat.',
        goal: 'Reach the rightmost food using if/else to avoid hazards.',
        sceneId: 'conditional-ridge',
        order: 3,
        grid: {
            width: 7,
            height: 3,
            floorY: 2,
            start: {
                x: 0,
                y: 2
            },
            goal: {
                x: 6,
                y: 2
            },
            hazard: {
                x: 2,
                y: 2,
                type: 'obstacle.png'
            },
            waypoints: [
                {
                    x: 1,
                    y: 2
                },
                {
                    x: 3,
                    y: 2
                },
                {
                    x: 4,
                    y: 2
                },
                {
                    x: 5,
                    y: 2
                }
            ]
        },
        entities: [
            {
                id: 'player',
                asset: 'main_character.png',
                role: 'player',
                x: 0,
                y: 2
            },
            ...BASE_PATH_ENTITIES.map((entity, idx)=>({
                    ...entity,
                    id: `cond-path-${idx}`
                })),
            {
                id: 'hazard',
                asset: 'obstacle.png',
                role: 'hazard',
                x: 2,
                y: 2
            },
            {
                id: 'bonus',
                asset: 'food.png',
                role: 'goal',
                x: 6,
                y: 2
            }
        ],
        availableBlocks: [
            {
                category: 'movement',
                blocks: [
                    'move_forward',
                    'jump'
                ]
            },
            {
                category: 'actions',
                blocks: [
                    'collect_item',
                    'inspect'
                ]
            },
            {
                category: 'control',
                blocks: [
                    'repeat_until'
                ]
            },
            {
                category: 'logic',
                blocks: [
                    'if_else'
                ]
            },
            {
                category: 'sensing',
                blocks: [
                    'is_obstacle_ahead',
                    'is_item_nearby'
                ]
            }
        ],
        constraints: {
            maxBlocks: 12,
            requiredConcept: 'conditionals'
        },
        successCriteria: {
            steps: [
                'Check for hazards each step',
                'Jump only when sensor is true',
                'Collect treat at end'
            ]
        },
        hints: [
            {
                reason: 'missing_condition',
                message: 'Use If/Else with the obstacle sensor to decide when to Jump.'
            },
            {
                reason: 'target_not_reached',
                message: 'Repeat Until Goal ensures you keep moving until you land on the treat.'
            }
        ]
    }
];
function syncPuzzleCatalog(db) {
    const insert = db.prepare(`
    INSERT INTO puzzles (
      id,
      title,
      story,
      goal,
      scene_id,
      order_index,
      grid,
      entities,
      available_blocks,
      constraints,
      success_criteria,
      hints,
      updated_at
    ) VALUES (@id, @title, @story, @goal, @sceneId, @order, @grid, @entities, @availableBlocks, @constraints, @successCriteria, @hints, datetime('now'))
    ON CONFLICT(id) DO UPDATE SET
      title = excluded.title,
      story = excluded.story,
      goal = excluded.goal,
      scene_id = excluded.scene_id,
      order_index = excluded.order_index,
      grid = excluded.grid,
      entities = excluded.entities,
      available_blocks = excluded.available_blocks,
      constraints = excluded.constraints,
      success_criteria = excluded.success_criteria,
      hints = excluded.hints,
      updated_at = datetime('now');
  `);
    const txn = db.transaction(()=>{
        for (const puzzle of PUZZLES){
            insert.run({
                ...puzzle,
                grid: JSON.stringify(puzzle.grid),
                entities: JSON.stringify(puzzle.entities),
                availableBlocks: JSON.stringify(puzzle.availableBlocks),
                constraints: JSON.stringify(puzzle.constraints),
                successCriteria: JSON.stringify(puzzle.successCriteria),
                hints: JSON.stringify(puzzle.hints)
            });
        }
    });
    txn();
}
}),
"[project]/multi-agent-producer_V0/Project_3_education/lib/db/sqlite.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDb",
    ()=>getDb,
    "resetDbForTests",
    ()=>resetDbForTests
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$better$2d$sqlite3__$5b$external$5d$__$28$better$2d$sqlite3$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/better-sqlite3 [external] (better-sqlite3, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$db$2f$migrations$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/lib/db/migrations.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$puzzles$2f$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/lib/puzzles/data.ts [app-route] (ecmascript)");
;
;
;
;
;
let instance = null;
const DEFAULT_DB_PATH = process.env.BLOCK_CODING_DB_PATH ? __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].resolve(process.env.BLOCK_CODING_DB_PATH) : __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'db', 'block_coding.db');
function configure(db) {
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    db.pragma('synchronous = NORMAL');
    db.pragma('cache_size = -16000');
    db.pragma('busy_timeout = 5000');
}
function ensureDirectory(targetPath) {
    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].mkdirSync(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].dirname(targetPath), {
        recursive: true
    });
}
function getDb() {
    if (instance) return instance;
    ensureDirectory(DEFAULT_DB_PATH);
    instance = new __TURBOPACK__imported__module__$5b$externals$5d2f$better$2d$sqlite3__$5b$external$5d$__$28$better$2d$sqlite3$2c$__cjs$29$__["default"](DEFAULT_DB_PATH);
    configure(instance);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$db$2f$migrations$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["applyMigrations"])(instance);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$puzzles$2f$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["syncPuzzleCatalog"])(instance);
    return instance;
}
function resetDbForTests() {
    if ("TURBOPACK compile-time truthy", 1) {
        throw new Error('resetDbForTests can only run in test mode');
    }
    if (instance) {
        instance.close();
        instance = null;
    }
    if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(DEFAULT_DB_PATH)) {
        __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].rmSync(DEFAULT_DB_PATH, {
            force: true
        });
    }
}
}),
"[project]/multi-agent-producer_V0/Project_3_education/lib/telemetry/analytics.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAnalyticsSummary",
    ()=>getAnalyticsSummary,
    "getPuzzleAnalytics",
    ()=>getPuzzleAnalytics,
    "getReplayPayload",
    ()=>getReplayPayload
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$db$2f$sqlite$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/lib/db/sqlite.ts [app-route] (ecmascript)");
;
function getAnalyticsSummary() {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$db$2f$sqlite$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const totals = db.prepare(`SELECT 
        (SELECT COUNT(*) FROM users) AS users,
        (SELECT COUNT(*) FROM sessions) AS sessions,
        (SELECT COUNT(*) FROM attempts) AS attempts,
        (SELECT COALESCE(AVG(CAST(json_extract(metadata, '$.commands') AS REAL)), 0) FROM attempts WHERE metadata IS NOT NULL) AS avgCommands,
        (SELECT SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END) FROM attempts) AS clears
    `).get();
    const eventsByType = db.prepare(`
    SELECT type, COUNT(*) as count FROM events GROUP BY type ORDER BY count DESC LIMIT 12
  `).all();
    const leaderboard = db.prepare(`
    SELECT p.id, p.title, COUNT(a.id) as attempts, SUM(CASE WHEN a.status = 'success' THEN 1 ELSE 0 END) as clears
    FROM puzzles p
    LEFT JOIN attempts a ON a.puzzle_id = p.id
    GROUP BY p.id, p.title
    ORDER BY p.order_index ASC
  `).all();
    const successRate = totals.attempts ? totals.clears / totals.attempts : 0;
    return {
        totalUsers: totals.users ?? 0,
        totalSessions: totals.sessions ?? 0,
        totalAttempts: totals.attempts ?? 0,
        successRate,
        averageCommands: totals.avgCommands ?? 0,
        eventsByType,
        puzzleLeaderboard: leaderboard
    };
}
function getPuzzleAnalytics(puzzleId) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$db$2f$sqlite$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const info = db.prepare(`SELECT title FROM puzzles WHERE id = ?`).get(puzzleId);
    if (!info) {
        throw new Error('Puzzle not found');
    }
    const attemptStats = db.prepare(`
    SELECT COUNT(*) as attempts, SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END) as clears,
           AVG(CAST(json_extract(metadata, '$.durationMs') AS REAL)) as avgDuration
    FROM attempts
    WHERE puzzle_id = ?
  `).get(puzzleId);
    const failureReasons = db.prepare(`
    SELECT COALESCE(failure_reason, 'unknown') as reason, COUNT(*) as count
    FROM attempts
    WHERE puzzle_id = ? AND status = 'failure'
    GROUP BY reason
    ORDER BY count DESC
  `).all(puzzleId);
    const recentAttempts = db.prepare(`
    SELECT id as attemptId, status, failure_reason as failureReason, ended_at as endedAt
    FROM attempts
    WHERE puzzle_id = ?
    ORDER BY (ended_at IS NULL), ended_at DESC, started_at DESC
    LIMIT 20
  `).all(puzzleId);
    return {
        puzzleId,
        title: info.title,
        attempts: attemptStats.attempts ?? 0,
        clears: attemptStats.clears ?? 0,
        averageDurationMs: attemptStats.avgDuration ?? 0,
        failureReasons,
        recentAttempts
    };
}
function getReplayPayload(attemptId) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$db$2f$sqlite$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const attempt = db.prepare('SELECT id, puzzle_id as puzzleId, session_id as sessionId, status, failure_reason as failureReason, code_snapshot as codeSnapshot FROM attempts WHERE id = ?').get(attemptId);
    if (!attempt) {
        throw new Error('Attempt not found');
    }
    const events = db.prepare('SELECT type, detail, created_at as createdAt FROM events WHERE attempt_id = ? ORDER BY created_at ASC').all(attemptId).map((event)=>({
            type: event.type,
            detail: event.detail ? JSON.parse(event.detail) : null,
            createdAt: event.createdAt
        }));
    const movements = db.prepare('SELECT step_index as stepIndex, x, y, action, timestamp FROM movements WHERE attempt_id = ? ORDER BY step_index ASC').all(attemptId);
    return {
        attempt,
        events,
        movements
    };
}
}),
"[project]/multi-agent-producer_V0/Project_3_education/app/api/analytics/summary/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$telemetry$2f$analytics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/lib/telemetry/analytics.ts [app-route] (ecmascript)");
;
;
async function GET() {
    try {
        const summary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$telemetry$2f$analytics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAnalyticsSummary"])();
        return __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true,
            summary
        });
    } catch (error) {
        console.error('summary analytics failed', error);
        const message = error instanceof Error ? error.message : 'Unknown error';
        return __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: false,
            error: message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c542cefe._.js.map