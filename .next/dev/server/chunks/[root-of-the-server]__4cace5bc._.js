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
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

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
"[project]/multi-agent-producer_V0/Project_3_education/lib/telemetry/ingest.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "endSession",
    ()=>endSession,
    "recordEventBatch",
    ()=>recordEventBatch,
    "startSession",
    ()=>startSession
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$db$2f$sqlite$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/lib/db/sqlite.ts [app-route] (ecmascript)");
;
;
function ensureUser(userId, playerName) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$db$2f$sqlite$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const resolvedId = userId ?? (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomUUID"])();
    const existing = db.prepare('SELECT id FROM users WHERE id = ?').get(resolvedId);
    if (!existing) {
        db.prepare('INSERT INTO users (id, display_name) VALUES (?, ?)').run(resolvedId, playerName ?? 'Player');
    } else if (playerName) {
        db.prepare('UPDATE users SET display_name = ? WHERE id = ?').run(playerName, resolvedId);
    }
    return resolvedId;
}
function startSession(body) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$db$2f$sqlite$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const now = body.startedAt ?? new Date().toISOString();
    const userId = ensureUser(body.userId, body.playerName);
    const sessionId = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomUUID"])();
    db.prepare(`INSERT INTO sessions (id, user_id, client_version, platform, started_at, metadata)
     VALUES (@id, @userId, @clientVersion, @platform, @startedAt, @metadata)`).run({
        id: sessionId,
        userId,
        clientVersion: body.clientVersion ?? 'frontend',
        platform: body.platform ?? 'browser',
        startedAt: now,
        metadata: body.metadata ? JSON.stringify(body.metadata) : null
    });
    return {
        sessionId,
        userId,
        startedAt: now
    };
}
function endSession(body) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$db$2f$sqlite$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const endedAt = body.endedAt ?? new Date().toISOString();
    const result = db.prepare('UPDATE sessions SET ended_at = ?, status = ? WHERE id = ?').run(endedAt, body.status ?? 'completed', body.sessionId);
    if (result.changes === 0) {
        throw new Error('Session not found');
    }
    return {
        sessionId: body.sessionId,
        endedAt
    };
}
function upsertAttempt(db, payload, sessionId) {
    const attemptId = payload.attemptId ?? (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomUUID"])();
    db.prepare(`INSERT INTO attempts (id, session_id, puzzle_id, started_at, ended_at, status, failure_reason, code_snapshot, metadata)
     VALUES (@id, @sessionId, @puzzleId, @startedAt, @endedAt, @status, @failureReason, @codeSnapshot, @metadata)
     ON CONFLICT(id) DO UPDATE SET
       ended_at = excluded.ended_at,
       status = excluded.status,
       failure_reason = excluded.failure_reason,
       code_snapshot = COALESCE(excluded.code_snapshot, attempts.code_snapshot),
       metadata = excluded.metadata`).run({
        id: attemptId,
        sessionId,
        puzzleId: payload.puzzleId,
        startedAt: payload.startedAt,
        endedAt: payload.endedAt ?? null,
        status: payload.status,
        failureReason: payload.failureReason ?? null,
        codeSnapshot: payload.codeSnapshot ?? null,
        metadata: payload.metrics ? JSON.stringify(payload.metrics) : null
    });
    return attemptId;
}
function insertEvents(db, attemptId, sessionId, puzzleId, events) {
    if (!events.length) return 0;
    const stmt = db.prepare(`INSERT INTO events (attempt_id, session_id, puzzle_id, type, detail, created_at)
     VALUES (@attemptId, @sessionId, @puzzleId, @type, @detail, @createdAt)`);
    const now = new Date().toISOString();
    const txn = db.transaction(()=>{
        for (const event of events){
            const mergedDetail = event.blockId ? {
                ...event.detail ?? {},
                blockId: event.blockId
            } : event.detail ?? null;
            stmt.run({
                attemptId,
                sessionId,
                puzzleId,
                type: event.type,
                detail: mergedDetail ? JSON.stringify(mergedDetail) : null,
                createdAt: event.timestamp ?? now
            });
        }
    });
    txn();
    return events.length;
}
function insertMovements(db, attemptId, movements = []) {
    if (!movements.length) return 0;
    const stmt = db.prepare(`INSERT INTO movements (attempt_id, step_index, x, y, action, timestamp)
     VALUES (?, ?, ?, ?, ?, ?)`);
    const txn = db.transaction(()=>{
        for (const movement of movements){
            stmt.run(attemptId, movement.stepIndex, movement.x, movement.y, movement.action, movement.timestamp ?? new Date().toISOString());
        }
    });
    txn();
    return movements.length;
}
function recordEventBatch(body) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$db$2f$sqlite$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const session = db.prepare('SELECT id, user_id FROM sessions WHERE id = ?').get(body.sessionId);
    if (!session) {
        throw new Error('Session not found');
    }
    const result = db.transaction(()=>{
        const attemptId = upsertAttempt(db, body.attempt, body.sessionId);
        const eventCount = insertEvents(db, attemptId, body.sessionId, body.attempt.puzzleId, body.events);
        const movementCount = insertMovements(db, attemptId, body.movements ?? []);
        const status = body.attempt.status === 'success' ? 'completed' : 'attempted';
        db.prepare(`INSERT INTO puzzle_progress (user_id, puzzle_id, status, updated_at)
       VALUES (?, ?, ?, datetime('now'))
       ON CONFLICT(user_id, puzzle_id) DO UPDATE SET status = excluded.status, updated_at = excluded.updated_at`).run(session.user_id, body.attempt.puzzleId, status);
        return {
            attemptId,
            eventCount,
            movementCount
        };
    })();
    return {
        attemptId: result.attemptId,
        sessionId: body.sessionId,
        eventsStored: result.eventCount,
        movementsStored: result.movementCount
    };
}
}),
"[project]/multi-agent-producer_V0/Project_3_education/types/telemetry.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "analyticsPuzzleParamsSchema",
    ()=>analyticsPuzzleParamsSchema,
    "analyticsReplayParamsSchema",
    ()=>analyticsReplayParamsSchema,
    "attemptPayloadSchema",
    ()=>attemptPayloadSchema,
    "eventBatchSchema",
    ()=>eventBatchSchema,
    "eventSchema",
    ()=>eventSchema,
    "failureReasons",
    ()=>failureReasons,
    "movementSchema",
    ()=>movementSchema,
    "sessionEndSchema",
    ()=>sessionEndSchema,
    "sessionStartSchema",
    ()=>sessionStartSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/node_modules/zod/lib/index.mjs [app-route] (ecmascript)");
;
const failureReasons = [
    'target_not_reached',
    'wrong_item',
    'wrong_order',
    'obstacle_collision',
    'missing_condition',
    'timeout',
    'unknown'
];
const sessionStartSchema = __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].object({
    userId: __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().uuid().optional(),
    playerName: __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().min(1).max(64).optional(),
    metadata: __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].any()).optional(),
    clientVersion: __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().optional(),
    platform: __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().optional(),
    startedAt: __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().datetime().optional()
});
const sessionEndSchema = __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].object({
    sessionId: __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().uuid(),
    endedAt: __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().datetime().optional(),
    status: __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].enum([
        'completed',
        'abandoned',
        'timeout'
    ]).optional()
});
const attemptPayloadSchema = __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].object({
    attemptId: __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().uuid().optional(),
    puzzleId: __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().min(3),
    startedAt: __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().datetime(),
    endedAt: __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().datetime().optional(),
    status: __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].enum([
        'in_progress',
        'success',
        'failure'
    ]),
    failureReason: __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].enum(failureReasons).optional(),
    codeSnapshot: __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().max(20000).optional(),
    metrics: __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].object({
        commands: __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].number().int().nonnegative().optional(),
        durationMs: __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].number().int().nonnegative().optional()
    }).optional()
});
const eventSchema = __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].object({
    type: __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().min(1),
    timestamp: __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().datetime().optional(),
    blockId: __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().optional(),
    detail: __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].any()).optional()
});
const movementSchema = __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].object({
    stepIndex: __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].number().int().nonnegative(),
    x: __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].number().int(),
    y: __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].number().int(),
    action: __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().default('move'),
    timestamp: __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().datetime().optional()
});
const eventBatchSchema = __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].object({
    sessionId: __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().uuid(),
    attempt: attemptPayloadSchema,
    events: __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].array(eventSchema).max(500),
    movements: __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].array(movementSchema).max(500).optional()
});
const analyticsPuzzleParamsSchema = __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].object({
    puzzleId: __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().min(3)
});
const analyticsReplayParamsSchema = __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].object({
    attemptId: __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().uuid()
});
}),
"[project]/multi-agent-producer_V0/Project_3_education/app/api/events/batch/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$telemetry$2f$ingest$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/lib/telemetry/ingest.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$types$2f$telemetry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/types/telemetry.ts [app-route] (ecmascript)");
;
;
;
async function POST(request) {
    try {
        const payload = __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$types$2f$telemetry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eventBatchSchema"].parse(await request.json());
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$telemetry$2f$ingest$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["recordEventBatch"])(payload);
        return __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true,
            result
        });
    } catch (error) {
        console.error('event batch failed', error);
        const message = error instanceof Error ? error.message : 'Unknown error';
        const normalized = message.toLowerCase();
        const status = normalized.includes('not found') ? 404 : 400;
        return __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: false,
            error: message
        }, {
            status
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4cace5bc._.js.map