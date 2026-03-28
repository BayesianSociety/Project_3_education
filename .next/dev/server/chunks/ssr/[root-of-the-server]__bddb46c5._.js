module.exports = [
"[externals]/jsdom [external] (jsdom, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("jsdom", () => require("jsdom"));

module.exports = mod;
}),
"[project]/multi-agent-producer_V0/Project_3_education/lib/blockly/definitions.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CATEGORY_DETAILS",
    ()=>CATEGORY_DETAILS,
    "buildToolbox",
    ()=>buildToolbox,
    "ensureBlocklyBlocks",
    ()=>ensureBlocklyBlocks
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$blockly$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/node_modules/blockly/index.mjs [app-ssr] (ecmascript)");
;
const CATEGORY_DETAILS = {
    movement: {
        label: 'Movement',
        description: 'Walk, turn, and jump across the path.',
        accent: '#f154c0',
        icon: '↪'
    },
    actions: {
        label: 'Actions',
        description: 'Collect treats or inspect the scene.',
        accent: '#ffa158',
        icon: '⚡'
    },
    control: {
        label: 'Control',
        description: 'Loops and program structure.',
        accent: '#7f5dff',
        icon: '⟳'
    },
    logic: {
        label: 'Logic',
        description: 'If/else decisions.',
        accent: '#5cf2d2',
        icon: '✦'
    },
    sensing: {
        label: 'Sensing',
        description: 'Read the world with sensors.',
        accent: '#ffd6f1',
        icon: '👀'
    }
};
const BLOCK_DEFINITIONS = [
    {
        type: 'custom_on_start',
        message0: 'On Start %1 %2',
        args0: [
            {
                type: 'field_image',
                src: '/assets/sprites/main_character.png',
                width: 36,
                height: 36,
                alt: '*'
            },
            {
                type: 'input_statement',
                name: 'STACK'
            }
        ],
        style: 'movement',
        previousStatement: null,
        nextStatement: null,
        tooltip: 'All code under On Start executes when you press Play.',
        helpUrl: '',
        enableContextMenu: false,
        deletable: false,
        movable: false
    },
    {
        type: 'move_forward',
        message0: 'Move forward',
        previousStatement: null,
        nextStatement: null,
        style: 'movement',
        tooltip: 'Advance one tile.'
    },
    {
        type: 'turn_left',
        message0: 'Turn left',
        previousStatement: null,
        nextStatement: null,
        style: 'movement',
        tooltip: 'Rotate left.'
    },
    {
        type: 'turn_right',
        message0: 'Turn right',
        previousStatement: null,
        nextStatement: null,
        style: 'movement',
        tooltip: 'Rotate right.'
    },
    {
        type: 'jump',
        message0: 'Jump over hazard',
        previousStatement: null,
        nextStatement: null,
        style: 'movement',
        tooltip: 'Leap straight ahead.'
    },
    {
        type: 'collect_item',
        message0: 'Collect treat',
        previousStatement: null,
        nextStatement: null,
        style: 'actions',
        tooltip: 'Grab the tasty goal.'
    },
    {
        type: 'inspect',
        message0: 'Inspect surroundings',
        previousStatement: null,
        nextStatement: null,
        style: 'actions',
        tooltip: 'Look for conditions or surprises.'
    },
    {
        type: 'repeat_times',
        message0: 'Repeat %1 times',
        args0: [
            {
                type: 'field_number',
                name: 'TIMES',
                value: 2,
                min: 1,
                max: 12
            }
        ],
        message1: '%1',
        args1: [
            {
                type: 'input_statement',
                name: 'DO'
            }
        ],
        previousStatement: null,
        nextStatement: null,
        style: 'control',
        tooltip: 'Run the nested steps a number of times.'
    },
    {
        type: 'repeat_until',
        message0: 'Repeat until %1',
        args0: [
            {
                type: 'field_dropdown',
                name: 'CONDITION',
                options: [
                    [
                        'goal reached',
                        'goal_reached'
                    ],
                    [
                        'item collected',
                        'item_collected'
                    ]
                ]
            }
        ],
        message1: '%1',
        args1: [
            {
                type: 'input_statement',
                name: 'DO'
            }
        ],
        previousStatement: null,
        nextStatement: null,
        style: 'control',
        tooltip: 'Repeat until the condition is true.'
    },
    {
        type: 'if_else',
        message0: 'If %1',
        args0: [
            {
                type: 'input_value',
                name: 'CONDITION',
                check: 'Boolean'
            }
        ],
        message1: 'do %1',
        args1: [
            {
                type: 'input_statement',
                name: 'IF'
            }
        ],
        message2: 'else %1',
        args2: [
            {
                type: 'input_statement',
                name: 'ELSE'
            }
        ],
        previousStatement: null,
        nextStatement: null,
        style: 'logic',
        tooltip: 'Choose between two paths based on the sensor.'
    },
    {
        type: 'is_path_clear',
        message0: 'Path is clear',
        output: 'Boolean',
        style: 'sensing',
        tooltip: 'Returns true when the next tile is safe.'
    },
    {
        type: 'is_obstacle_ahead',
        message0: 'Obstacle ahead',
        output: 'Boolean',
        style: 'sensing',
        tooltip: 'True if something blocks the way.'
    },
    {
        type: 'is_item_nearby',
        message0: 'Item nearby',
        output: 'Boolean',
        style: 'sensing',
        tooltip: 'True if a collectible is close.'
    }
];
let registered = false;
function ensureBlocklyBlocks() {
    if (registered) return;
    __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$blockly$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["common"].defineBlocksWithJsonArray(BLOCK_DEFINITIONS);
    registered = true;
}
function buildToolbox(palette) {
    return {
        kind: 'categoryToolbox',
        contents: palette.map((entry)=>({
                kind: 'category',
                name: CATEGORY_DETAILS[entry.category].label,
                categorystyle: entry.category,
                contents: entry.blocks.length > 0 ? entry.blocks.map((block)=>({
                        kind: 'block',
                        type: block
                    })) : [
                    {
                        kind: 'label',
                        text: 'Locked for this puzzle'
                    }
                ]
            }))
    };
}
}),
"[project]/multi-agent-producer_V0/Project_3_education/lib/blockly/theme.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getBlocklyTheme",
    ()=>getBlocklyTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$blockly$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/node_modules/blockly/index.mjs [app-ssr] (ecmascript)");
;
let cachedTheme = null;
function getBlocklyTheme() {
    if (cachedTheme) return cachedTheme;
    cachedTheme = __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$blockly$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Theme"].defineTheme('pixelPastel', {
        base: __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$blockly$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Themes"].Classic,
        blockStyles: {
            movement: {
                colourPrimary: '#f154c0',
                colourSecondary: '#ff84d1',
                colourTertiary: '#d333a7'
            },
            actions: {
                colourPrimary: '#ffa158',
                colourSecondary: '#ffbb80',
                colourTertiary: '#f68534'
            },
            control: {
                colourPrimary: '#7f5dff',
                colourSecondary: '#a083ff',
                colourTertiary: '#5b37ec'
            },
            logic: {
                colourPrimary: '#5cf2d2',
                colourSecondary: '#10c4a1',
                colourTertiary: '#c7fff3'
            },
            sensing: {
                colourPrimary: '#ffd6f1',
                colourSecondary: '#fff2fb',
                colourTertiary: '#ffb3e5'
            }
        },
        categoryStyles: {
            movement: {
                colour: '#f154c0'
            },
            actions: {
                colour: '#ffa158'
            },
            control: {
                colour: '#7f5dff'
            },
            logic: {
                colour: '#5cf2d2'
            },
            sensing: {
                colour: '#ffd6f1'
            }
        },
        componentStyles: {
            workspaceBackgroundColour: '#1f102c',
            toolboxBackgroundColour: '#130b1d',
            toolboxForegroundColour: '#ffffff',
            flyoutBackgroundColour: '#23112f',
            flyoutForegroundColour: '#ffffff',
            flyoutOpacity: 0.95,
            scrollbarColour: '#ff84d1',
            scrollbarOpacity: 0.6,
            insertionMarkerColour: '#5cf2d2',
            insertionMarkerOpacity: 0.5
        },
        fontStyle: {
            family: 'Inter, var(--font-sans), sans-serif',
            weight: '600',
            size: 13
        }
    });
    return cachedTheme;
}
}),
"[project]/multi-agent-producer_V0/Project_3_education/lib/blockly/serialization.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ensureOnStartBlock",
    ()=>ensureOnStartBlock,
    "extractProgram",
    ()=>extractProgram,
    "getDisconnectedBlockCount",
    ()=>getDisconnectedBlockCount,
    "programToText",
    ()=>programToText,
    "restoreWorkspace",
    ()=>restoreWorkspace,
    "serializeWorkspace",
    ()=>serializeWorkspace
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$blockly$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/node_modules/blockly/index.mjs [app-ssr] (ecmascript)");
;
function blockToCondition(block) {
    if (!block) return 'path_clear';
    switch(block.type){
        case 'is_obstacle_ahead':
            return 'obstacle_ahead';
        case 'is_item_nearby':
            return 'item_nearby';
        case 'is_path_clear':
            return 'path_clear';
        default:
            return 'path_clear';
    }
}
function walkStack(block) {
    const instructions = [];
    let cursor = block;
    while(cursor){
        const instruction = blockToInstruction(cursor);
        if (instruction) {
            instructions.push(instruction);
        }
        cursor = cursor.getNextBlock();
    }
    return instructions;
}
function blockToInstruction(block) {
    if (!block) return null;
    switch(block.type){
        case 'move_forward':
        case 'turn_left':
        case 'turn_right':
        case 'jump':
        case 'collect_item':
        case 'inspect':
            return {
                kind: block.type,
                blockId: block.id
            };
        case 'repeat_times':
            {
                const times = block.getFieldValue('TIMES');
                return {
                    kind: 'repeat_times',
                    blockId: block.id,
                    times: typeof times === 'number' ? times : parseInt(times ?? '2', 10),
                    body: walkStack(block.getInputTargetBlock('DO'))
                };
            }
        case 'repeat_until':
            {
                const field = block.getFieldValue('CONDITION');
                return {
                    kind: 'repeat_until',
                    blockId: block.id,
                    condition: field ?? 'goal_reached',
                    body: walkStack(block.getInputTargetBlock('DO'))
                };
            }
        case 'if_else':
            {
                const condition = blockToCondition(block.getInputTargetBlock('CONDITION'));
                return {
                    kind: 'if_else',
                    blockId: block.id,
                    condition,
                    ifBody: walkStack(block.getInputTargetBlock('IF')),
                    elseBody: walkStack(block.getInputTargetBlock('ELSE'))
                };
            }
        default:
            return null;
    }
}
function ensureOnStartBlock(workspace) {
    const roots = workspace.getBlocksByType('custom_on_start', false);
    if (!roots.length) {
        const block = workspace.newBlock('custom_on_start');
        block.initSvg();
        block.render();
        block.moveBy(32, 32);
    } else {
        roots.forEach((root)=>{
            root.setMovable(false);
            root.setDeletable(false);
        });
    }
}
function extractProgram(workspace) {
    if (!workspace) return [];
    const start = workspace.getBlocksByType('custom_on_start', false)[0];
    if (!start) return [];
    const stack = start.getInputTargetBlock('STACK');
    return walkStack(stack);
}
function programToText(program, depth = 0) {
    const indent = '  '.repeat(depth);
    const lines = [];
    program.forEach((instruction)=>{
        switch(instruction.kind){
            case 'move_forward':
            case 'turn_left':
            case 'turn_right':
            case 'jump':
            case 'collect_item':
            case 'inspect':
                lines.push(`${indent}${instruction.kind}()`);
                break;
            case 'repeat_times':
                lines.push(`${indent}repeat ${instruction.times} times {`);
                lines.push(programToText(instruction.body, depth + 1));
                lines.push(`${indent}}`);
                break;
            case 'repeat_until':
                lines.push(`${indent}repeat until ${instruction.condition} {`);
                lines.push(programToText(instruction.body, depth + 1));
                lines.push(`${indent}}`);
                break;
            case 'if_else':
                lines.push(`${indent}if ${instruction.condition} {`);
                lines.push(programToText(instruction.ifBody, depth + 1));
                lines.push(`${indent}} else {`);
                lines.push(programToText(instruction.elseBody, depth + 1));
                lines.push(`${indent}}`);
                break;
            default:
                break;
        }
    });
    return lines.filter(Boolean).join('\n');
}
function serializeWorkspace(workspace) {
    if (!workspace) return null;
    const json = __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$blockly$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serialization"].workspaces.save(workspace);
    return JSON.stringify(json);
}
function restoreWorkspace(workspace, snapshot) {
    if (!workspace || !snapshot) return;
    const payload = typeof snapshot === 'string' ? JSON.parse(snapshot) : snapshot;
    __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$blockly$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serialization"].workspaces.load(payload, workspace);
    ensureOnStartBlock(workspace);
}
function getDisconnectedBlockCount(workspace) {
    if (!workspace) return 0;
    return workspace.getTopBlocks(false).filter((block)=>block.type !== 'custom_on_start' && !block.getParent()).length;
}
}),
"[project]/multi-agent-producer_V0/Project_3_education/hooks/useBlocklyWorkspace.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBlocklyWorkspace",
    ()=>useBlocklyWorkspace
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$blockly$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/node_modules/blockly/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$blockly$2f$definitions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/lib/blockly/definitions.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$blockly$2f$theme$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/lib/blockly/theme.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$blockly$2f$serialization$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/lib/blockly/serialization.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function useBlocklyWorkspace({ puzzleId, palette, maxBlocks, initialState, onWorkspaceReady }) {
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const workspaceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const initialSnapshotRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [code, setCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [blockCount, setBlockCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [hasDisconnected, setHasDisconnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [snapshot, setSnapshot] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialState ? typeof initialState === 'string' ? initialState : JSON.stringify(initialState) : null);
    const toolbox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$blockly$2f$definitions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildToolbox"])(palette), [
        palette
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$blockly$2f$definitions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ensureBlocklyBlocks"])();
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const normalized = initialState ? typeof initialState === 'string' ? initialState : JSON.stringify(initialState) : null;
        initialSnapshotRef.current = normalized;
        setSnapshot(normalized);
    }, [
        initialState,
        puzzleId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!containerRef.current) return;
        const workspace = __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$blockly$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["inject"](containerRef.current, {
            toolbox,
            theme: (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$blockly$2f$theme$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBlocklyTheme"])(),
            maxBlocks,
            trashcan: true,
            move: {
                scrollbars: true,
                drag: true,
                wheel: true
            },
            zoom: {
                controls: true,
                wheel: true,
                startScale: 0.9
            },
            grid: {
                spacing: 24,
                length: 3,
                snap: true,
                colour: '#301a44'
            }
        });
        workspaceRef.current = workspace;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$blockly$2f$serialization$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ensureOnStartBlock"])(workspace);
        const seedState = initialSnapshotRef.current;
        if (seedState) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$blockly$2f$serialization$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["restoreWorkspace"])(workspace, seedState);
        }
        onWorkspaceReady?.(workspace);
        const listener = ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$blockly$2f$serialization$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ensureOnStartBlock"])(workspace);
            const instructions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$blockly$2f$serialization$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extractProgram"])(workspace);
            setCode((0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$blockly$2f$serialization$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["programToText"])(instructions));
            const activeBlocks = workspace.getAllBlocks(false).filter((block)=>block.type !== 'custom_on_start').length;
            setBlockCount(activeBlocks);
            setHasDisconnected((0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$blockly$2f$serialization$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDisconnectedBlockCount"])(workspace) > 0);
            const saved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$blockly$2f$serialization$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serializeWorkspace"])(workspace);
            if (saved) {
                setSnapshot(saved);
            }
        };
        workspace.addChangeListener(listener);
        listener();
        return ()=>{
            workspace.removeChangeListener(listener);
            workspace.dispose();
            workspaceRef.current = null;
        };
    }, [
        toolbox,
        maxBlocks,
        puzzleId,
        onWorkspaceReady
    ]);
    const getProgram = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$blockly$2f$serialization$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extractProgram"])(workspaceRef.current), []);
    const getSnapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$blockly$2f$serialization$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serializeWorkspace"])(workspaceRef.current), []);
    const reset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const workspace = workspaceRef.current;
        if (!workspace) return;
        workspace.clear();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$blockly$2f$serialization$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ensureOnStartBlock"])(workspace);
    }, []);
    const focus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        workspaceRef.current?.markFocused();
    }, []);
    return {
        containerRef,
        workspaceRef,
        code,
        blockCount,
        hasDisconnected,
        snapshot,
        getProgram,
        getSnapshot,
        reset,
        focus
    };
}
}),
"[project]/multi-agent-producer_V0/Project_3_education/components/blockly/Palette.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Palette
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$blockly$2f$definitions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/lib/blockly/definitions.ts [app-ssr] (ecmascript)");
;
;
function Palette({ palette, layout = 'stack' }) {
    const horizontal = layout === 'row';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-label": "Block categories",
        style: {
            display: 'flex',
            flexDirection: horizontal ? 'row' : 'column',
            flexWrap: horizontal ? 'wrap' : 'nowrap',
            gap: 16
        },
        children: palette.map((entry)=>{
            const meta = __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$blockly$2f$definitions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CATEGORY_DETAILS"][entry.category];
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                style: {
                    flex: horizontal ? '1 1 220px' : '0 1 auto',
                    minWidth: horizontal ? 220 : undefined,
                    background: 'rgba(255, 255, 255, 0.04)',
                    borderRadius: 16,
                    padding: 16,
                    border: `1px solid ${meta.accent}44`,
                    color: 'white'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'baseline'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        "aria-hidden": true,
                                        style: {
                                            fontSize: 20
                                        },
                                        children: meta.icon
                                    }, void 0, false, {
                                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/blockly/Palette.tsx",
                                        lineNumber: 38,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        style: {
                                            margin: 0
                                        },
                                        children: meta.label
                                    }, void 0, false, {
                                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/blockly/Palette.tsx",
                                        lineNumber: 41,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/blockly/Palette.tsx",
                                lineNumber: 37,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 12,
                                    letterSpacing: '0.08em',
                                    textTransform: 'uppercase',
                                    color: meta.accent
                                },
                                children: entry.blocks.length ? `${entry.blocks.length} blocks` : 'Not in this puzzle'
                            }, void 0, false, {
                                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/blockly/Palette.tsx",
                                lineNumber: 43,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/blockly/Palette.tsx",
                        lineNumber: 36,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            marginTop: 8,
                            color: 'rgba(255,255,255,0.7)'
                        },
                        children: meta.description
                    }, void 0, false, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/blockly/Palette.tsx",
                        lineNumber: 47,
                        columnNumber: 13
                    }, this),
                    entry.blocks.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        style: {
                            display: 'flex',
                            gap: 8,
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            padding: 0,
                            margin: 0
                        },
                        children: entry.blocks.map((block)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                style: {
                                    background: 'rgba(255,255,255,0.12)',
                                    borderRadius: 999,
                                    padding: '4px 12px',
                                    fontSize: 12,
                                    letterSpacing: '0.05em',
                                    textTransform: 'uppercase'
                                },
                                children: block.replace(/_/g, ' ')
                            }, block, false, {
                                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/blockly/Palette.tsx",
                                lineNumber: 51,
                                columnNumber: 19
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/blockly/Palette.tsx",
                        lineNumber: 49,
                        columnNumber: 15
                    }, this)
                ]
            }, entry.category, true, {
                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/blockly/Palette.tsx",
                lineNumber: 24,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/blockly/Palette.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
}),
"[project]/multi-agent-producer_V0/Project_3_education/components/blockly/CodeWarning.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CodeWarning
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function CodeWarning({ hasDisconnected, blockCount, maxBlocks }) {
    if (!hasDisconnected && blockCount <= maxBlocks) return null;
    const overLimit = blockCount > maxBlocks;
    const message = overLimit ? `Too many blocks (${blockCount}/${maxBlocks}). Remove a few commands.` : 'Blocks that are not connected to On Start will not run.';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "alert",
        style: {
            marginTop: 12,
            padding: '12px 16px',
            borderRadius: 16,
            background: 'rgba(255, 161, 88, 0.18)',
            border: '1px solid rgba(255, 161, 88, 0.7)',
            color: 'white',
            fontSize: 14
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                style: {
                    display: 'block',
                    marginBottom: 4
                },
                children: "Heads up"
            }, void 0, false, {
                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/blockly/CodeWarning.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: message
            }, void 0, false, {
                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/blockly/CodeWarning.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/blockly/CodeWarning.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
}),
"[project]/multi-agent-producer_V0/Project_3_education/components/game/ShowCodePanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ShowCodePanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
'use client';
;
function ShowCodePanel({ code, open, onClose }) {
    if (!open) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "dialog",
        "aria-modal": "true",
        "aria-label": "Program text",
        style: {
            position: 'absolute',
            top: 24,
            right: 24,
            width: 360,
            maxWidth: '80vw',
            background: 'rgba(10, 9, 30, 0.95)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 20,
            padding: 20,
            color: 'white',
            boxShadow: 'var(--shadow-soft)',
            zIndex: 30
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 12
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: "Show Code"
                    }, void 0, false, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/ShowCodePanel.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onClose,
                        style: {
                            background: 'transparent',
                            border: 'none',
                            color: 'white',
                            fontSize: 18,
                            cursor: 'pointer'
                        },
                        "aria-label": "Close code preview",
                        children: "×"
                    }, void 0, false, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/ShowCodePanel.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/ShowCodePanel.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                style: {
                    whiteSpace: 'pre-wrap',
                    fontFamily: 'monospace',
                    fontSize: 13,
                    lineHeight: 1.5,
                    maxHeight: 320,
                    overflowY: 'auto',
                    margin: 0
                },
                children: code || '// No commands yet'
            }, void 0, false, {
                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/ShowCodePanel.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/ShowCodePanel.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
}),
"[project]/multi-agent-producer_V0/Project_3_education/components/blockly/Workspace.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$hooks$2f$useBlocklyWorkspace$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/hooks/useBlocklyWorkspace.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$components$2f$blockly$2f$Palette$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/components/blockly/Palette.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$components$2f$blockly$2f$CodeWarning$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/components/blockly/CodeWarning.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$components$2f$game$2f$ShowCodePanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/components/game/ShowCodePanel.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
const Workspace = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(function Workspace({ puzzleId, palette, maxBlocks, initialState, showCode, onShowCodeChange, onProgramChange }, ref) {
    const { containerRef, workspaceRef, code, blockCount, hasDisconnected, snapshot, getProgram, getSnapshot, reset, focus } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$hooks$2f$useBlocklyWorkspace$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useBlocklyWorkspace"])({
        puzzleId,
        palette,
        maxBlocks,
        initialState
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useImperativeHandle"])(ref, ()=>({
            getProgram,
            getSnapshot,
            reset,
            focus,
            highlight: (blockId)=>{
                if (!workspaceRef.current) return;
                workspaceRef.current.highlightBlock(blockId ?? '');
            }
        }), [
        getProgram,
        getSnapshot,
        reset,
        focus,
        workspaceRef
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!onProgramChange) return;
        const program = getProgram();
        onProgramChange({
            program,
            code,
            snapshot,
            blockCount,
            hasDisconnected
        });
    }, [
        code,
        snapshot,
        blockCount,
        hasDisconnected,
        getProgram,
        onProgramChange
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            position: 'relative'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: 'rgba(12, 4, 25, 0.8)',
                    borderRadius: 24,
                    border: '1px solid rgba(255,255,255,0.1)',
                    minHeight: 640,
                    position: 'relative',
                    overflow: 'hidden'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '16px 20px',
                            color: 'white'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Program Workspace"
                                    }, void 0, false, {
                                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/blockly/Workspace.tsx",
                                        lineNumber: 115,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            margin: 0,
                                            fontSize: 12,
                                            opacity: 0.7
                                        },
                                        children: [
                                            "Blocks under On Start run when you press Play (",
                                            blockCount,
                                            "/",
                                            maxBlocks,
                                            " blocks)."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/blockly/Workspace.tsx",
                                        lineNumber: 116,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/blockly/Workspace.tsx",
                                lineNumber: 114,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>onShowCodeChange(!showCode),
                                "aria-pressed": showCode,
                                style: {
                                    borderRadius: 999,
                                    border: showCode ? '2px solid var(--color-mint-400)' : '1px solid rgba(255,255,255,0.25)',
                                    background: showCode ? 'rgba(92,242,210,0.15)' : 'transparent',
                                    color: 'white',
                                    padding: '6px 14px',
                                    fontWeight: 600
                                },
                                children: showCode ? 'Hide Code' : 'Show Code'
                            }, void 0, false, {
                                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/blockly/Workspace.tsx",
                                lineNumber: 120,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/blockly/Workspace.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: containerRef,
                        style: {
                            height: 480
                        }
                    }, void 0, false, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/blockly/Workspace.tsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$components$2f$game$2f$ShowCodePanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        code: code,
                        open: showCode,
                        onClose: ()=>onShowCodeChange(false)
                    }, void 0, false, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/blockly/Workspace.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/blockly/Workspace.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                style: {
                    background: 'rgba(12, 4, 25, 0.72)',
                    borderRadius: 24,
                    border: '1px solid rgba(255,255,255,0.08)',
                    padding: 20
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        style: {
                            color: 'white',
                            marginTop: 0,
                            marginBottom: 16
                        },
                        children: "Command Library"
                    }, void 0, false, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/blockly/Workspace.tsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$components$2f$blockly$2f$Palette$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        palette: palette,
                        layout: "row"
                    }, void 0, false, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/blockly/Workspace.tsx",
                        lineNumber: 153,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 16
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$components$2f$blockly$2f$CodeWarning$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            hasDisconnected: hasDisconnected,
                            blockCount: blockCount,
                            maxBlocks: maxBlocks
                        }, void 0, false, {
                            fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/blockly/Workspace.tsx",
                            lineNumber: 155,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/blockly/Workspace.tsx",
                        lineNumber: 154,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/blockly/Workspace.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/blockly/Workspace.tsx",
        lineNumber: 87,
        columnNumber: 5
    }, this);
});
const __TURBOPACK__default__export__ = Workspace;
}),
"[project]/multi-agent-producer_V0/Project_3_education/components/game/SpeedToggle.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SpeedToggle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
'use client';
;
const SPEED_LABEL = {
    slow: 'Slow',
    normal: 'Normal',
    fast: 'Fast'
};
function SpeedToggle({ value, onChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "group",
        "aria-label": "Playback speed",
        style: {
            display: 'flex',
            gap: 8
        },
        children: Object.keys(SPEED_LABEL).map((speed)=>{
            const active = value === speed;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>onChange(speed),
                "aria-pressed": active,
                style: {
                    borderRadius: 999,
                    border: active ? '2px solid var(--color-mint-400)' : '1px solid rgba(255,255,255,0.25)',
                    background: active ? 'rgba(92, 242, 210, 0.15)' : 'transparent',
                    color: 'white',
                    padding: '6px 12px',
                    fontWeight: 600,
                    cursor: 'pointer'
                },
                children: SPEED_LABEL[speed]
            }, speed, false, {
                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/SpeedToggle.tsx",
                lineNumber: 22,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/SpeedToggle.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
}),
"[project]/multi-agent-producer_V0/Project_3_education/components/game/RunControls.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RunControls
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$components$2f$game$2f$SpeedToggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/components/game/SpeedToggle.tsx [app-ssr] (ecmascript)");
'use client';
;
;
function RunControls({ isPlaying, onPlay, onReset, disablePlay, speed, onSpeedChange, onToggleCode, showCode, auxiliary }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-label": "Run controls",
        style: {
            display: 'flex',
            gap: 16,
            alignItems: 'center',
            flexWrap: 'wrap',
            background: 'rgba(18, 6, 32, 0.8)',
            padding: 16,
            borderRadius: 24,
            border: '1px solid rgba(255,255,255,0.08)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    gap: 12
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: isPlaying ? 'button' : 'submit',
                        onClick: onPlay,
                        disabled: disablePlay,
                        style: {
                            border: 'none',
                            borderRadius: 24,
                            padding: '10px 22px',
                            fontWeight: 700,
                            letterSpacing: '0.06em',
                            background: disablePlay ? 'rgba(255,255,255,0.2)' : '#ffa158',
                            color: disablePlay ? 'rgba(0,0,0,0.4)' : '#1b1024',
                            cursor: disablePlay ? 'not-allowed' : 'pointer'
                        },
                        children: isPlaying ? 'Running…' : 'Play'
                    }, void 0, false, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/RunControls.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onReset,
                        style: {
                            borderRadius: 24,
                            border: '1px solid rgba(255,255,255,0.3)',
                            background: 'transparent',
                            color: 'white',
                            padding: '10px 22px',
                            fontWeight: 600
                        },
                        children: "Reset"
                    }, void 0, false, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/RunControls.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/RunControls.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$components$2f$game$2f$SpeedToggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                value: speed,
                onChange: onSpeedChange
            }, void 0, false, {
                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/RunControls.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: onToggleCode,
                style: {
                    borderRadius: 999,
                    border: showCode ? '2px solid var(--color-mint-400)' : '1px solid rgba(255,255,255,0.25)',
                    background: showCode ? 'rgba(92, 242, 210, 0.15)' : 'transparent',
                    color: 'white',
                    padding: '8px 16px',
                    fontWeight: 600
                },
                "aria-pressed": showCode,
                children: showCode ? 'Hide Code' : 'Show Code'
            }, void 0, false, {
                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/RunControls.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this),
            auxiliary
        ]
    }, void 0, true, {
        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/RunControls.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
}),
"[project]/multi-agent-producer_V0/Project_3_education/components/game/HintPanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HintPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
'use client';
;
function HintPanel({ status, hint }) {
    if (status === 'idle') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                borderRadius: 20,
                border: '1px dashed rgba(255,255,255,0.2)',
                padding: 16,
                color: 'rgba(255,255,255,0.8)'
            },
            children: "Assemble blocks and press Play to see Pixel Pup move. If something goes wrong, you will see an Oops! hint here."
        }, void 0, false, {
            fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/HintPanel.tsx",
            lineNumber: 11,
            columnNumber: 7
        }, this);
    }
    const isSuccess = status === 'success';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "status",
        style: {
            borderRadius: 20,
            padding: 16,
            background: isSuccess ? 'rgba(92, 242, 210, 0.15)' : 'rgba(255, 132, 209, 0.15)',
            border: isSuccess ? '1px solid rgba(92, 242, 210, 0.5)' : '1px solid rgba(255, 132, 209, 0.5)',
            color: 'white'
        },
        children: isSuccess ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                    children: "Great run!"
                }, void 0, false, {
                    fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/HintPanel.tsx",
                    lineNumber: 38,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        margin: '4px 0 0'
                    },
                    children: "Pixel Pup reached the treat. Queue up the next puzzle."
                }, void 0, false, {
                    fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/HintPanel.tsx",
                    lineNumber: 39,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                    children: "Oops!"
                }, void 0, false, {
                    fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/HintPanel.tsx",
                    lineNumber: 43,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        margin: '4px 0 0'
                    },
                    children: hint ?? 'Something blocked the run. Adjust your blocks and try again.'
                }, void 0, false, {
                    fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/HintPanel.tsx",
                    lineNumber: 44,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/HintPanel.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
}),
"[project]/multi-agent-producer_V0/Project_3_education/components/game/TextToSpeechToggle.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TextToSpeechToggle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
'use client';
;
function TextToSpeechToggle({ enabled, onToggle }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: ()=>onToggle(!enabled),
        "aria-pressed": enabled,
        style: {
            borderRadius: 999,
            border: enabled ? '2px solid var(--color-mint-400)' : '1px solid rgba(255,255,255,0.25)',
            background: enabled ? 'rgba(92, 242, 210, 0.2)' : 'transparent',
            color: 'white',
            padding: '8px 16px',
            fontWeight: 600,
            cursor: 'pointer'
        },
        children: enabled ? 'Narration: On' : 'Narration: Off'
    }, void 0, false, {
        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/TextToSpeechToggle.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
}),
"[project]/multi-agent-producer_V0/Project_3_education/hooks/useAccessibility.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAccessibility",
    ()=>useAccessibility
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
const STORAGE_KEY = 'blockCodingPuzzles.tts';
function useAccessibility() {
    const [ttsEnabled, setTtsEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        const stored = undefined;
        const media = undefined;
        const listener = undefined;
    }, []);
    const toggleTts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setTtsEnabled((prev)=>{
            const next = !prev;
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            return next;
        });
    }, []);
    const speak = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((text)=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        const utterance = undefined;
    }, [
        ttsEnabled
    ]);
    return {
        ttsEnabled,
        toggleTts,
        speak,
        prefersReducedMotion
    };
}
}),
"[project]/multi-agent-producer_V0/Project_3_education/hooks/useTelemetryBuffer.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTelemetryBuffer",
    ()=>useTelemetryBuffer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
function useTelemetryBuffer(initialSessionId) {
    const [sessionId, setSessionId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialSessionId ?? null);
    const [isFlushing, setIsFlushing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lastAttemptId, setLastAttemptId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const attemptRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const eventsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const movementsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const beginAttempt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(({ puzzleId, codeSnapshot, metrics })=>{
        const now = new Date().toISOString();
        attemptRef.current = {
            puzzleId,
            status: 'in_progress',
            startedAt: now,
            endedAt: undefined,
            codeSnapshot: codeSnapshot ?? undefined,
            metrics
        };
        eventsRef.current = [];
        movementsRef.current = [];
    }, []);
    const updateAttemptSnapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((codeSnapshot)=>{
        if (!attemptRef.current) return;
        attemptRef.current = {
            ...attemptRef.current,
            codeSnapshot
        };
    }, []);
    const markAttemptStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((status, failureReason)=>{
        if (!attemptRef.current) return;
        attemptRef.current = {
            ...attemptRef.current,
            status,
            failureReason,
            endedAt: new Date().toISOString()
        };
    }, []);
    const recordEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((event)=>{
        eventsRef.current.push({
            ...event,
            timestamp: event.timestamp ?? new Date().toISOString()
        });
    }, []);
    const recordMovement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((movement)=>{
        movementsRef.current.push({
            ...movement,
            timestamp: movement.timestamp ?? new Date().toISOString()
        });
    }, []);
    const flush = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!sessionId || !attemptRef.current) {
            return {
                ok: false,
                error: 'Missing session or attempt.'
            };
        }
        setIsFlushing(true);
        try {
            const response = await fetch('/api/events/batch', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sessionId,
                    attempt: attemptRef.current,
                    events: eventsRef.current,
                    movements: movementsRef.current
                })
            });
            const payload = await response.json().catch(()=>({}));
            if (!response.ok) {
                return {
                    ok: false,
                    error: payload.error ?? 'Failed to write telemetry'
                };
            }
            const attemptId = payload.attemptId ?? attemptRef.current.attemptId ?? null;
            if (attemptId) {
                attemptRef.current = {
                    ...attemptRef.current,
                    attemptId
                };
            }
            eventsRef.current = [];
            movementsRef.current = [];
            setLastAttemptId(attemptId);
            return {
                ok: true,
                attemptId
            };
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown telemetry error';
            return {
                ok: false,
                error: message
            };
        } finally{
            setIsFlushing(false);
        }
    }, [
        sessionId
    ]);
    return {
        sessionId,
        setSessionId,
        beginAttempt,
        updateAttemptSnapshot,
        markAttemptStatus,
        recordEvent,
        recordMovement,
        flush,
        isFlushing,
        lastAttemptId
    };
}
}),
"[project]/multi-agent-producer_V0/Project_3_education/lib/game/world.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cloneWorld",
    ()=>cloneWorld,
    "createWorld",
    ()=>createWorld,
    "isAtGoal",
    ()=>isAtGoal,
    "isItemNearby",
    ()=>isItemNearby,
    "isObstacleAhead",
    ()=>isObstacleAhead,
    "isPathClear",
    ()=>isPathClear,
    "jumpForward",
    ()=>jumpForward,
    "moveForward",
    ()=>moveForward,
    "turnLeft",
    ()=>turnLeft,
    "turnRight",
    ()=>turnRight
]);
function createWorld(puzzle) {
    return {
        puzzleId: puzzle.id,
        width: puzzle.grid.width,
        height: puzzle.grid.height,
        floorY: puzzle.grid.floorY,
        cellSize: 96,
        goal: puzzle.grid.goal,
        hazard: puzzle.grid.hazard,
        waypoints: puzzle.grid.waypoints,
        player: {
            x: puzzle.grid.start.x,
            y: puzzle.grid.start.y,
            facing: 'east',
            hasTreat: false,
            collided: false,
            misCollected: false
        }
    };
}
function cloneWorld(world) {
    return JSON.parse(JSON.stringify(world));
}
function moveForward(world) {
    world.player.x += world.player.facing === 'east' ? 1 : -1;
    clampPlayer(world);
    checkCollision(world, false);
}
function jumpForward(world) {
    const startX = world.player.x;
    world.player.x += world.player.facing === 'east' ? 2 : -2;
    clampPlayer(world);
    checkJumpCollision(world, startX);
}
function clampPlayer(world) {
    if (world.player.x < 0) world.player.x = 0;
    if (world.player.x > world.goal.x) world.player.x = world.goal.x;
}
function checkCollision(world, jumped) {
    if (!world.hazard) return;
    if (world.player.x === world.hazard.x && !jumped) {
        world.player.collided = true;
    }
}
function checkJumpCollision(world, startX) {
    if (!world.hazard) return;
    const minX = Math.min(startX, world.player.x);
    const maxX = Math.max(startX, world.player.x);
    if (world.hazard.x > minX && world.hazard.x < maxX) {
        return;
    }
    if (world.player.x === world.hazard.x) {
        world.player.collided = true;
    }
}
function turnLeft(world) {
    world.player.facing = 'west';
}
function turnRight(world) {
    world.player.facing = 'east';
}
function isAtGoal(world) {
    return world.player.x >= world.goal.x && world.player.y === world.goal.y;
}
function isPathClear(world) {
    if (world.player.facing === 'west') return world.player.x > 0;
    const nextX = world.player.x + 1;
    if (world.hazard && world.hazard.x === nextX) {
        return false;
    }
    return nextX <= world.goal.x;
}
function isObstacleAhead(world) {
    if (!world.hazard) return false;
    return world.player.facing === 'east' && world.hazard.x === world.player.x + 1;
}
function isItemNearby(world) {
    return world.player.facing === 'east' && world.goal.x <= world.player.x + 1;
}
}),
"[project]/multi-agent-producer_V0/Project_3_education/lib/game/runtime.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "executeProgram",
    ()=>executeProgram
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$game$2f$world$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/lib/game/world.ts [app-ssr] (ecmascript)");
;
const MAX_STEPS = 120;
function executeProgram(program, puzzle) {
    const context = {
        world: (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$game$2f$world$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createWorld"])(puzzle),
        movements: [],
        events: [],
        steps: 0,
        sawConditional: program.some((instruction)=>instruction.kind === 'if_else')
    };
    runSequence(program, context);
    const success = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$game$2f$world$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAtGoal"])(context.world) && context.world.player.hasTreat && !context.world.player.collided;
    let failureReason;
    if (!success) {
        if (context.world.player.collided) {
            failureReason = 'obstacle_collision';
        } else if (!context.world.player.hasTreat && (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$game$2f$world$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAtGoal"])(context.world)) {
            failureReason = 'wrong_order';
        } else if (!context.world.player.hasTreat) {
            failureReason = 'target_not_reached';
        } else if (puzzle.constraints.requiredConcept === 'conditionals' && !context.sawConditional) {
            failureReason = 'missing_condition';
        } else {
            failureReason = 'unknown';
        }
    }
    const hint = failureReason ? puzzle.hints.find((h)=>h.reason === failureReason)?.message : undefined;
    return {
        world: context.world,
        movements: context.movements,
        events: context.events,
        success,
        failureReason,
        hint
    };
}
function runSequence(sequence, context) {
    for (const instruction of sequence){
        if (shouldStopExecution(context)) break;
        executeInstruction(instruction, context);
    }
}
function executeInstruction(instruction, context) {
    if (shouldStopExecution(context)) return;
    context.steps += 1;
    switch(instruction.kind){
        case 'move_forward':
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$game$2f$world$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["moveForward"])(context.world);
            syncGoalCollection(context.world);
            pushMovement(context, instruction.blockId, 'move');
            break;
        case 'turn_left':
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$game$2f$world$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["turnLeft"])(context.world);
            pushMovement(context, instruction.blockId, 'turn');
            break;
        case 'turn_right':
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$game$2f$world$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["turnRight"])(context.world);
            pushMovement(context, instruction.blockId, 'turn');
            break;
        case 'jump':
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$game$2f$world$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jumpForward"])(context.world);
            syncGoalCollection(context.world);
            pushMovement(context, instruction.blockId, 'jump');
            break;
        case 'collect_item':
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$game$2f$world$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAtGoal"])(context.world)) {
                context.world.player.hasTreat = true;
            } else {
                context.world.player.misCollected = true;
            }
            pushEvent(context, instruction.blockId, 'collect_item');
            break;
        case 'inspect':
            pushEvent(context, instruction.blockId, 'inspect');
            break;
        case 'repeat_times':
            for(let i = 0; i < instruction.times; i += 1){
                if (shouldStopExecution(context)) break;
                runSequence(instruction.body, context);
            }
            break;
        case 'repeat_until':
            for(let i = 0; i < MAX_STEPS && !shouldStopExecution(context); i += 1){
                if (evaluateCondition(context.world, instruction.condition)) break;
                runSequence(instruction.body, context);
            }
            break;
        case 'if_else':
            context.sawConditional = true;
            if (evaluateCondition(context.world, instruction.condition)) {
                runSequence(instruction.ifBody, context);
            } else {
                runSequence(instruction.elseBody, context);
            }
            break;
        default:
            break;
    }
}
function shouldStopExecution(context) {
    return context.steps >= MAX_STEPS || context.world.player.collided || (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$game$2f$world$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAtGoal"])(context.world) && context.world.player.hasTreat;
}
function syncGoalCollection(world) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$game$2f$world$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAtGoal"])(world)) {
        world.player.hasTreat = true;
    }
}
function evaluateCondition(world, condition) {
    switch(condition){
        case 'obstacle_ahead':
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$game$2f$world$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isObstacleAhead"])(world);
        case 'item_nearby':
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$game$2f$world$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isItemNearby"])(world);
        case 'goal_reached':
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$game$2f$world$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAtGoal"])(world);
        case 'item_collected':
            return world.player.hasTreat;
        case 'path_clear':
        default:
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$game$2f$world$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isPathClear"])(world);
    }
}
function pushMovement(context, blockId, action) {
    const frame = {
        stepIndex: context.movements.length,
        x: context.world.player.x,
        y: context.world.player.y,
        action,
        blockId,
        facing: context.world.player.facing
    };
    context.movements.push(frame);
    pushEvent(context, blockId, `movement:${action}`);
}
function pushEvent(context, blockId, type) {
    context.events.push({
        type,
        blockId,
        detail: {
            puzzleId: context.world.puzzleId
        }
    });
}
}),
"[project]/multi-agent-producer_V0/Project_3_education/lib/webgl/shaders.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FRAGMENT_SHADER",
    ()=>FRAGMENT_SHADER,
    "VERTEX_SHADER",
    ()=>VERTEX_SHADER
]);
const VERTEX_SHADER = `
attribute vec2 a_position;
attribute vec2 a_texCoord;
uniform vec2 u_resolution;
uniform vec2 u_translation;
uniform vec2 u_scale;
varying vec2 v_texCoord;

void main() {
  vec2 position = a_position * u_scale + u_translation;
  vec2 zeroToOne = position / u_resolution;
  vec2 zeroToTwo = zeroToOne * 2.0;
  vec2 clipSpace = zeroToTwo - 1.0;
  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
  v_texCoord = a_texCoord;
}
`;
const FRAGMENT_SHADER = `
precision mediump float;
varying vec2 v_texCoord;
uniform sampler2D u_image;

void main() {
  gl_FragColor = texture2D(u_image, v_texCoord);
}
`;
}),
"[project]/multi-agent-producer_V0/Project_3_education/lib/webgl/renderer.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CandyRenderer",
    ()=>CandyRenderer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$webgl$2f$shaders$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/lib/webgl/shaders.ts [app-ssr] (ecmascript)");
;
class CandyRenderer {
    canvas;
    gl = null;
    program = null;
    positionBuffer = null;
    texcoordBuffer = null;
    ctx2d = null;
    textures = new Map();
    constructor(canvas){
        this.canvas = canvas;
        this.gl = canvas.getContext('webgl');
        if (this.gl) {
            this.initWebGL();
        } else {
            this.ctx2d = canvas.getContext('2d');
        }
    }
    initWebGL() {
        if (!this.gl) return;
        const gl = this.gl;
        const program = gl.createProgram();
        const vertex = this.compileShader(gl.VERTEX_SHADER, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$webgl$2f$shaders$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VERTEX_SHADER"]);
        const fragment = this.compileShader(gl.FRAGMENT_SHADER, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$webgl$2f$shaders$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FRAGMENT_SHADER"]);
        if (!program || !vertex || !fragment) return;
        gl.attachShader(program, vertex);
        gl.attachShader(program, fragment);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.warn('Failed to link WebGL program', gl.getProgramInfoLog(program));
            return;
        }
        this.program = program;
        this.positionBuffer = gl.createBuffer();
        this.texcoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            0,
            0,
            1,
            0,
            0,
            1,
            0,
            1,
            1,
            0,
            1,
            1
        ]), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            0,
            0,
            1,
            0,
            0,
            1,
            0,
            1,
            1,
            0,
            1,
            1
        ]), gl.STATIC_DRAW);
    }
    compileShader(type, source) {
        if (!this.gl) return null;
        const shader = this.gl.createShader(type);
        if (!shader) return null;
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.warn('Failed to compile shader', this.gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    }
    async prepareAssets(assets) {
        await Promise.all(assets.map((asset)=>this.loadAsset(asset)));
    }
    async loadAsset(asset) {
        if (this.textures.has(asset)) return;
        const image = await loadImage(asset);
        const info = {
            image,
            width: image.width,
            height: image.height
        };
        if (this.gl) {
            const texture = this.gl.createTexture();
            if (texture) {
                this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
                this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
                info.texture = texture;
            }
        }
        this.textures.set(asset, info);
    }
    render(payload) {
        if (this.gl && this.program) {
            this.renderWebGL(payload);
        } else if (this.ctx2d) {
            this.renderCanvas(payload);
        }
    }
    renderWebGL(payload) {
        if (!this.gl || !this.program || !this.positionBuffer || !this.texcoordBuffer) return;
        const gl = this.gl;
        gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        gl.clearColor(0.07, 0.02, 0.18, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(this.program);
        const positionLocation = gl.getAttribLocation(this.program, 'a_position');
        const texcoordLocation = gl.getAttribLocation(this.program, 'a_texCoord');
        const resolutionLocation = gl.getUniformLocation(this.program, 'u_resolution');
        const translationLocation = gl.getUniformLocation(this.program, 'u_translation');
        const scaleLocation = gl.getUniformLocation(this.program, 'u_scale');
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer);
        gl.enableVertexAttribArray(texcoordLocation);
        gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);
        gl.uniform2f(resolutionLocation, this.canvas.width, this.canvas.height);
        for (const sprite of [
            createBackgroundSprite(payload.background, this.canvas),
            ...payload.sprites
        ]){
            const asset = this.textures.get(sprite.asset);
            if (!asset || !asset.texture) continue;
            gl.bindTexture(gl.TEXTURE_2D, asset.texture);
            const flip = sprite.flip ? -1 : 1;
            const translateX = sprite.flip ? sprite.x + sprite.width : sprite.x;
            gl.uniform2f(translationLocation, translateX, sprite.y);
            gl.uniform2f(scaleLocation, sprite.width * flip, sprite.height);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        }
    }
    renderCanvas(payload) {
        if (!this.ctx2d) return;
        const ctx = this.ctx2d;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const sprites = [
            createBackgroundSprite(payload.background, this.canvas),
            ...payload.sprites
        ];
        for (const sprite of sprites){
            const asset = this.textures.get(sprite.asset);
            if (!asset) continue;
            ctx.save();
            if (sprite.flip) {
                ctx.translate(sprite.x + sprite.width, sprite.y);
                ctx.scale(-1, 1);
                ctx.drawImage(asset.image, 0, 0, sprite.width, sprite.height);
            } else {
                ctx.drawImage(asset.image, sprite.x, sprite.y, sprite.width, sprite.height);
            }
            ctx.restore();
        }
    }
}
function createBackgroundSprite(asset, canvas) {
    return {
        id: 'background',
        asset,
        x: 0,
        y: 0,
        width: canvas.width,
        height: canvas.height
    };
}
function loadImage(src) {
    return new Promise((resolve, reject)=>{
        const image = new Image();
        image.src = src;
        image.onload = ()=>resolve(image);
        image.onerror = reject;
    });
}
}),
"[project]/multi-agent-producer_V0/Project_3_education/components/game/SceneCanvas.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PuzzleExperience",
    ()=>PuzzleExperience,
    "default",
    ()=>SceneCanvas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$components$2f$blockly$2f$Workspace$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/components/blockly/Workspace.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$components$2f$game$2f$RunControls$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/components/game/RunControls.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$components$2f$game$2f$HintPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/components/game/HintPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$components$2f$game$2f$TextToSpeechToggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/components/game/TextToSpeechToggle.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$hooks$2f$useAccessibility$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/hooks/useAccessibility.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$hooks$2f$useTelemetryBuffer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/hooks/useTelemetryBuffer.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/lib/game/runtime.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$webgl$2f$renderer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/lib/webgl/renderer.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
const tileSize = 96;
const backgroundTexture = '/assets/backgrounds/background.jpg';
function SceneCanvas({ puzzle, frames, speed, onFrame, onComplete }) {
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rendererRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const onFrameRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(onFrame);
    const onCompleteRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(onComplete);
    const [playerState, setPlayerState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>({
            x: puzzle.grid.start.x,
            y: puzzle.grid.start.y,
            facing: 'east',
            lift: 0
        }));
    const assetList = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const assets = new Set([
            backgroundTexture
        ]);
        puzzle.entities.forEach((entity)=>assets.add(resolveSprite(entity.asset)));
        assets.add(resolveSprite('main_character.png'));
        return Array.from(assets);
    }, [
        puzzle
    ]);
    const staticSprites = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return puzzle.entities.filter((entity)=>entity.role !== 'player').map((entity)=>toSprite({
                id: entity.id,
                asset: resolveSprite(entity.asset),
                x: entity.x,
                y: entity.y,
                width: tileSize,
                height: tileSize
            }));
    }, [
        puzzle
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        onFrameRef.current = onFrame;
    }, [
        onFrame
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        onCompleteRef.current = onComplete;
    }, [
        onComplete
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!canvasRef.current) return;
        const renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$webgl$2f$renderer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CandyRenderer"](canvasRef.current);
        rendererRef.current = renderer;
        renderer.prepareAssets(assetList).then(()=>renderScene(staticSprites, playerState, renderer));
        return ()=>{
            rendererRef.current = null;
        };
    }, [
        assetList,
        staticSprites
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!frames.length) {
            setPlayerState({
                x: puzzle.grid.start.x,
                y: puzzle.grid.start.y,
                facing: 'east',
                lift: 0
            });
            onFrameRef.current?.(null);
            return;
        }
        let cancelled = false;
        const timers = [];
        const durations = {
            slow: 700,
            normal: 450,
            fast: 250
        };
        const duration = durations[speed];
        const playFrame = (index)=>{
            if (cancelled) return;
            if (index >= frames.length) {
                onCompleteRef.current?.();
                return;
            }
            const frame = frames[index];
            const previous = index === 0 ? {
                x: puzzle.grid.start.x,
                y: puzzle.grid.start.y,
                facing: 'east'
            } : frames[index - 1];
            onFrameRef.current?.(frame);
            if (frame.action === 'jump') {
                setPlayerState({
                    x: previous.x,
                    y: previous.y,
                    facing: frame.facing ?? previous.facing,
                    lift: 28
                });
                timers.push(window.setTimeout(()=>{
                    if (cancelled) return;
                    setPlayerState({
                        x: frame.x,
                        y: frame.y,
                        facing: frame.facing ?? previous.facing,
                        lift: 0
                    });
                }, duration / 2));
            } else {
                setPlayerState({
                    x: frame.x,
                    y: frame.y,
                    facing: frame.facing ?? previous.facing,
                    lift: 0
                });
            }
            timers.push(window.setTimeout(()=>{
                playFrame(index + 1);
            }, duration));
        };
        playFrame(0);
        return ()=>{
            cancelled = true;
            timers.forEach((timer)=>window.clearTimeout(timer));
        };
    }, [
        frames,
        speed,
        puzzle.grid.start.x,
        puzzle.grid.start.y
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!rendererRef.current) return;
        renderScene(staticSprites, playerState, rendererRef.current);
    }, [
        playerState,
        staticSprites
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        width: 960,
        height: 420,
        style: {
            width: '100%',
            borderRadius: 32,
            border: '1px solid rgba(255,255,255,0.1)'
        }
    }, void 0, false, {
        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/SceneCanvas.tsx",
        lineNumber: 161,
        columnNumber: 5
    }, this);
}
function renderScene(staticSprites, playerState, renderer) {
    const playerSprite = toSprite({
        id: 'player',
        asset: resolveSprite('main_character.png'),
        x: playerState.x,
        y: playerState.y,
        width: tileSize,
        height: tileSize
    });
    playerSprite.flip = playerState.facing === 'west';
    playerSprite.y -= playerState.lift;
    const payload = {
        background: backgroundTexture,
        sprites: [
            ...staticSprites,
            playerSprite
        ]
    };
    renderer.render(payload);
}
function toSprite({ id, asset, x, y, width, height }) {
    return {
        id,
        asset,
        ...gridToPixels(x, y, width, height)
    };
}
function gridToPixels(x, y, width, height) {
    const offsetX = 80;
    const baseY = 280;
    const px = offsetX + x * (tileSize * 0.9);
    const py = baseY - y * (tileSize * 0.35);
    return {
        x: px,
        y: py,
        width,
        height
    };
}
function resolveSprite(asset) {
    if (asset.startsWith('/')) return asset;
    return `/assets/sprites/${asset}`;
}
function PuzzleExperience({ puzzle, locked, progressOrder }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const workspaceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const nextPuzzleIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [frames, setFrames] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [speed, setSpeed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('normal');
    const [showCode, setShowCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('idle');
    const [hint, setHint] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])();
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const telemetry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$hooks$2f$useTelemetryBuffer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTelemetryBuffer"])();
    const { setSessionId } = telemetry;
    const accessibility = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$hooks$2f$useAccessibility$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAccessibility"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        ensureSession(setSessionId, puzzle.id);
    }, [
        puzzle.id,
        setSessionId
    ]);
    const handleFrame = (frame)=>{
        workspaceRef.current?.highlight(frame?.blockId ?? null);
    };
    const canRun = !locked && Boolean(telemetry.sessionId);
    const handleRun = ()=>{
        if (!canRun || isPlaying) return;
        if (!telemetry.sessionId) {
            setStatus('failure');
            setHint('Starting session. Try again in a second.');
            return;
        }
        const program = workspaceRef.current?.getProgram() ?? [];
        if (!program.length) {
            setStatus('failure');
            setHint('Connect blocks under On Start before pressing Play.');
            return;
        }
        setIsPlaying(true);
        telemetry.beginAttempt({
            puzzleId: puzzle.id,
            codeSnapshot: workspaceRef.current?.getSnapshot() ?? '',
            metrics: {
                commands: program.length
            }
        });
        telemetry.recordEvent({
            type: 'run_started',
            detail: {
                puzzleId: puzzle.id
            }
        });
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$lib$2f$game$2f$runtime$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["executeProgram"])(program, puzzle);
        setFrames(result.movements);
        result.events.forEach((event)=>telemetry.recordEvent(event));
        result.movements.forEach((movement)=>telemetry.recordMovement({
                stepIndex: movement.stepIndex,
                x: movement.x,
                y: movement.y,
                action: movement.action
            }));
        setStatus(result.success ? 'success' : 'failure');
        setHint(result.hint);
        if (result.success) {
            nextPuzzleIdRef.current = updateProgress(puzzle, progressOrder);
        } else {
            nextPuzzleIdRef.current = null;
        }
        telemetry.recordEvent({
            type: 'run_finished',
            detail: {
                success: result.success,
                failureReason: result.failureReason
            }
        });
        telemetry.markAttemptStatus(result.success ? 'success' : 'failure', result.failureReason);
        if (!result.movements.length) {
            setIsPlaying(false);
            telemetry.flush();
        }
    };
    const handleReset = ()=>{
        setFrames([]);
        setShowCode(false);
        setStatus('idle');
        setHint(undefined);
        setIsPlaying(false);
        workspaceRef.current?.reset();
        workspaceRef.current?.highlight(null);
        telemetry.recordEvent({
            type: 'reset_clicked',
            detail: {
                puzzleId: puzzle.id
            }
        });
    };
    const handleComplete = ()=>{
        setIsPlaying(false);
        telemetry.flush();
        if (nextPuzzleIdRef.current) {
            router.push(`/puzzles/${nextPuzzleIdRef.current}`);
        }
    };
    const hearGoal = ()=>accessibility.speak(puzzle.goal);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                style: {
                    color: 'white'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "badge",
                        children: [
                            "Puzzle ",
                            puzzle.order
                        ]
                    }, void 0, true, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/SceneCanvas.tsx",
                        lineNumber: 335,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        style: {
                            fontFamily: 'var(--font-display)',
                            marginBottom: 4
                        },
                        children: puzzle.title
                    }, void 0, false, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/SceneCanvas.tsx",
                        lineNumber: 336,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted",
                        style: {
                            maxWidth: 720
                        },
                        children: puzzle.story
                    }, void 0, false, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/SceneCanvas.tsx",
                        lineNumber: 337,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/SceneCanvas.tsx",
                lineNumber: 334,
                columnNumber: 7
            }, this),
            locked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: 16,
                    borderRadius: 16,
                    background: 'rgba(255, 132, 209, 0.15)',
                    border: '1px solid rgba(255,132,209,0.4)',
                    color: 'white',
                    marginBottom: 16
                },
                children: "Complete the previous puzzle to unlock this scene."
            }, void 0, false, {
                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/SceneCanvas.tsx",
                lineNumber: 340,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: 12,
                    display: 'flex',
                    gap: 12,
                    alignItems: 'center',
                    flexWrap: 'wrap'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        style: {
                            color: 'white'
                        },
                        children: "Goal:"
                    }, void 0, false, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/SceneCanvas.tsx",
                        lineNumber: 354,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: 'rgba(255,255,255,0.85)'
                        },
                        children: puzzle.goal
                    }, void 0, false, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/SceneCanvas.tsx",
                        lineNumber: 355,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: hearGoal,
                        disabled: !accessibility.ttsEnabled,
                        style: {
                            borderRadius: 999,
                            border: '1px solid rgba(255,255,255,0.3)',
                            background: 'transparent',
                            color: accessibility.ttsEnabled ? 'var(--color-mint-200)' : 'rgba(255,255,255,0.4)',
                            padding: '4px 12px'
                        },
                        children: "Hear goal"
                    }, void 0, false, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/SceneCanvas.tsx",
                        lineNumber: 356,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$components$2f$game$2f$TextToSpeechToggle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        enabled: accessibility.ttsEnabled,
                        onToggle: accessibility.toggleTts
                    }, void 0, false, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/SceneCanvas.tsx",
                        lineNumber: 370,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/SceneCanvas.tsx",
                lineNumber: 353,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
                    gap: 24,
                    alignItems: 'start'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 16
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SceneCanvas, {
                                puzzle: puzzle,
                                frames: frames,
                                speed: speed,
                                onFrame: handleFrame,
                                onComplete: handleComplete
                            }, void 0, false, {
                                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/SceneCanvas.tsx",
                                lineNumber: 381,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$components$2f$game$2f$RunControls$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                isPlaying: isPlaying,
                                onPlay: handleRun,
                                onReset: handleReset,
                                disablePlay: !canRun,
                                speed: speed,
                                onSpeedChange: setSpeed,
                                showCode: showCode,
                                onToggleCode: ()=>setShowCode((prev)=>!prev),
                                auxiliary: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setFrames([]),
                                    style: {
                                        borderRadius: 999,
                                        border: '1px solid rgba(255,255,255,0.25)',
                                        background: 'transparent',
                                        color: 'rgba(255,255,255,0.8)',
                                        padding: '6px 14px'
                                    },
                                    children: "Clear animation"
                                }, void 0, false, {
                                    fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/SceneCanvas.tsx",
                                    lineNumber: 392,
                                    columnNumber: 15
                                }, void 0)
                            }, void 0, false, {
                                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/SceneCanvas.tsx",
                                lineNumber: 382,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$components$2f$game$2f$HintPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                status: status,
                                hint: hint
                            }, void 0, false, {
                                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/SceneCanvas.tsx",
                                lineNumber: 407,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/SceneCanvas.tsx",
                        lineNumber: 380,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            transition: 'transform 240ms ease, opacity 240ms ease',
                            transform: isPlaying ? 'scale(0.985)' : 'scale(1)',
                            opacity: isPlaying ? 0.96 : 1
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$components$2f$blockly$2f$Workspace$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            ref: workspaceRef,
                            puzzleId: puzzle.id,
                            palette: puzzle.availableBlocks,
                            maxBlocks: puzzle.constraints.maxBlocks,
                            showCode: showCode,
                            onShowCodeChange: setShowCode
                        }, void 0, false, {
                            fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/SceneCanvas.tsx",
                            lineNumber: 416,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/SceneCanvas.tsx",
                        lineNumber: 409,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/SceneCanvas.tsx",
                lineNumber: 372,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/game/SceneCanvas.tsx",
        lineNumber: 333,
        columnNumber: 5
    }, this);
}
function ensureSession(setSessionId, puzzleId) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
    const stored = undefined;
}
function updateProgress(puzzle, progressOrder) {
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
    const key = undefined;
    let stored;
    const rawCookie = undefined;
    const sorted = undefined;
    const next = undefined;
    const serialized = undefined;
    const detail = undefined;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__bddb46c5._.js.map