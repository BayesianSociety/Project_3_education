(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/multi-agent-producer_V0/Project_3_education/components/analytics/ReplaysList.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ReplaysList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function ReplaysList({ attempts, selected, onSelect }) {
    if (!attempts.length) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "tablet-panel",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-muted",
                children: "No attempts logged for this puzzle."
            }, void 0, false, {
                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/ReplaysList.tsx",
                lineNumber: 18,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/ReplaysList.tsx",
            lineNumber: 17,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "tablet-panel",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                style: {
                    marginTop: 0
                },
                children: "Recent Attempts"
            }, void 0, false, {
                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/ReplaysList.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                style: {
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8
                },
                children: attempts.map((attempt)=>{
                    const isActive = attempt.attemptId === selected;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>onSelect(attempt.attemptId),
                            style: {
                                width: '100%',
                                textAlign: 'left',
                                borderRadius: 12,
                                border: isActive ? '2px solid var(--color-mint-400)' : '1px solid rgba(255,255,255,0.15)',
                                background: isActive ? 'rgba(92, 242, 210, 0.12)' : 'rgba(255,255,255,0.02)',
                                color: 'white',
                                padding: '10px 14px',
                                cursor: 'pointer'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        fontWeight: 600
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: attempt.status
                                        }, void 0, false, {
                                            fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/ReplaysList.tsx",
                                            lineNumber: 46,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 12,
                                                opacity: 0.7
                                            },
                                            children: attempt.endedAt ? new Date(attempt.endedAt).toLocaleString() : 'In progress'
                                        }, void 0, false, {
                                            fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/ReplaysList.tsx",
                                            lineNumber: 47,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/ReplaysList.tsx",
                                    lineNumber: 45,
                                    columnNumber: 17
                                }, this),
                                attempt.failureReason && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        margin: '6px 0 0',
                                        fontSize: 12
                                    },
                                    children: [
                                        "Reason: ",
                                        attempt.failureReason
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/ReplaysList.tsx",
                                    lineNumber: 49,
                                    columnNumber: 43
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/ReplaysList.tsx",
                            lineNumber: 31,
                            columnNumber: 15
                        }, this)
                    }, attempt.attemptId, false, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/ReplaysList.tsx",
                        lineNumber: 30,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/ReplaysList.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/ReplaysList.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_c = ReplaysList;
var _c;
__turbopack_context__.k.register(_c, "ReplaysList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/multi-agent-producer_V0/Project_3_education/components/analytics/EventStream.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EventStream
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function EventStream({ events }) {
    if (!events.length) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "tablet-panel",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-muted",
                children: "No events recorded for this attempt yet."
            }, void 0, false, {
                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/EventStream.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/EventStream.tsx",
            lineNumber: 14,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "tablet-panel",
        "aria-live": "polite",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                style: {
                    marginTop: 0
                },
                children: "Event Stream"
            }, void 0, false, {
                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/EventStream.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                style: {
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8
                },
                children: events.map((event, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        style: {
                            border: '1px solid rgba(255,255,255,0.12)',
                            borderRadius: 12,
                            padding: '8px 12px',
                            color: 'white',
                            background: 'rgba(255,255,255,0.03)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 12,
                                    opacity: 0.7
                                },
                                children: new Date(event.createdAt).toLocaleTimeString()
                            }, void 0, false, {
                                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/EventStream.tsx",
                                lineNumber: 35,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontWeight: 600
                                },
                                children: event.type
                            }, void 0, false, {
                                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/EventStream.tsx",
                                lineNumber: 36,
                                columnNumber: 13
                            }, this),
                            event.detail && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                style: {
                                    fontSize: 12,
                                    margin: 0,
                                    whiteSpace: 'pre-wrap',
                                    color: 'rgba(255,255,255,0.8)'
                                },
                                children: JSON.stringify(event.detail, null, 2)
                            }, void 0, false, {
                                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/EventStream.tsx",
                                lineNumber: 38,
                                columnNumber: 15
                            }, this)
                        ]
                    }, `${event.type}-${index}`, true, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/EventStream.tsx",
                        lineNumber: 25,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/EventStream.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/EventStream.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = EventStream;
var _c;
__turbopack_context__.k.register(_c, "EventStream");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/multi-agent-producer_V0/Project_3_education/components/analytics/MovementReplay.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MovementReplay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function MovementReplay({ movements, grid, goal, hazard }) {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MovementReplay.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            const { width, height } = canvas;
            ctx.clearRect(0, 0, width, height);
            drawGrid(ctx, width, height, grid);
            highlightCell(ctx, goal, width, height, grid, 'rgba(92, 242, 210, 0.4)');
            if (hazard) {
                highlightCell(ctx, hazard, width, height, grid, 'rgba(255, 132, 209, 0.4)');
            }
            if (movements.length) {
                ctx.beginPath();
                movements.forEach({
                    "MovementReplay.useEffect": (move, index)=>{
                        const { px, py } = project(move, width, height, grid);
                        if (index === 0) ctx.moveTo(px, py);
                        else ctx.lineTo(px, py);
                    }
                }["MovementReplay.useEffect"]);
                ctx.strokeStyle = '#f154c0';
                ctx.lineWidth = 3;
                ctx.stroke();
                movements.forEach({
                    "MovementReplay.useEffect": (move)=>{
                        const { px, py } = project(move, width, height, grid);
                        ctx.fillStyle = '#f154c0';
                        ctx.beginPath();
                        ctx.arc(px, py, 4, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }["MovementReplay.useEffect"]);
            }
        }
    }["MovementReplay.useEffect"], [
        movements,
        grid,
        goal,
        hazard
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "tablet-panel",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                style: {
                    marginTop: 0
                },
                children: "Movement Replay"
            }, void 0, false, {
                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/MovementReplay.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-muted",
                style: {
                    marginTop: 0
                },
                children: "The pink trail visualizes stored movement coordinates coming from telemetry data."
            }, void 0, false, {
                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/MovementReplay.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                ref: canvasRef,
                width: 360,
                height: 220,
                style: {
                    width: '100%',
                    borderRadius: 16,
                    border: '1px solid rgba(255,255,255,0.1)'
                }
            }, void 0, false, {
                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/MovementReplay.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/MovementReplay.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_s(MovementReplay, "UJgi7ynoup7eqypjnwyX/s32POg=");
_c = MovementReplay;
function drawGrid(ctx, width, height, grid) {
    const cellWidth = width / grid.width;
    const cellHeight = height / grid.height;
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    for(let x = 0; x <= grid.width; x += 1){
        ctx.beginPath();
        ctx.moveTo(x * cellWidth, 0);
        ctx.lineTo(x * cellWidth, height);
        ctx.stroke();
    }
    for(let y = 0; y <= grid.height; y += 1){
        ctx.beginPath();
        ctx.moveTo(0, y * cellHeight);
        ctx.lineTo(width, y * cellHeight);
        ctx.stroke();
    }
}
function highlightCell(ctx, point, width, height, grid, color) {
    const cellWidth = width / grid.width;
    const cellHeight = height / grid.height;
    ctx.fillStyle = color;
    ctx.fillRect(point.x * cellWidth, height - (point.y + 1) * cellHeight, cellWidth, cellHeight);
}
function project(point, width, height, grid) {
    const cellWidth = width / grid.width;
    const cellHeight = height / grid.height;
    return {
        px: point.x * cellWidth + cellWidth / 2,
        py: height - (point.y * cellHeight + cellHeight / 2)
    };
}
var _c;
__turbopack_context__.k.register(_c, "MovementReplay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Dashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$components$2f$analytics$2f$ReplaysList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/components/analytics/ReplaysList.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$components$2f$analytics$2f$EventStream$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/components/analytics/EventStream.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$components$2f$analytics$2f$MovementReplay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/components/analytics/MovementReplay.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function Dashboard({ puzzleMetas }) {
    _s();
    const [summary, setSummary] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [summaryError, setSummaryError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedPuzzle, setSelectedPuzzle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [puzzleAnalytics, setPuzzleAnalytics] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [puzzleError, setPuzzleError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedAttempt, setSelectedAttempt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [replay, setReplay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [replayError, setReplayError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Dashboard.useEffect": ()=>{
            fetchJSON('/api/analytics/summary').then({
                "Dashboard.useEffect": (payload)=>{
                    if (!payload.ok) throw new Error(payload.error ?? 'Summary fetch failed');
                    setSummary(payload.summary);
                    setSummaryError(null);
                    if (!selectedPuzzle && payload.summary.puzzleLeaderboard.length) {
                        setSelectedPuzzle(payload.summary.puzzleLeaderboard[0].id);
                    }
                }
            }["Dashboard.useEffect"]).catch({
                "Dashboard.useEffect": (error)=>setSummaryError(error.message)
            }["Dashboard.useEffect"]);
        }
    }["Dashboard.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Dashboard.useEffect": ()=>{
            if (!selectedPuzzle) return;
            setPuzzleAnalytics(null);
            setPuzzleError(null);
            fetchJSON(`/api/analytics/puzzle/${selectedPuzzle}`).then({
                "Dashboard.useEffect": (payload)=>{
                    if (!payload.ok) throw new Error(payload.error ?? 'Puzzle analytics fetch failed');
                    setPuzzleAnalytics(payload.detail);
                    setPuzzleError(null);
                    if (payload.detail.recentAttempts.length) {
                        setSelectedAttempt(payload.detail.recentAttempts[0].attemptId);
                    } else {
                        setSelectedAttempt(null);
                        setReplay(null);
                    }
                }
            }["Dashboard.useEffect"]).catch({
                "Dashboard.useEffect": (error)=>setPuzzleError(error.message)
            }["Dashboard.useEffect"]);
        }
    }["Dashboard.useEffect"], [
        selectedPuzzle
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Dashboard.useEffect": ()=>{
            if (!selectedAttempt) {
                setReplay(null);
                return;
            }
            setReplayError(null);
            fetchJSON(`/api/analytics/replay/${selectedAttempt}`).then({
                "Dashboard.useEffect": (payload)=>{
                    if (!payload.ok) throw new Error(payload.error ?? 'Replay fetch failed');
                    setReplay(payload.replay);
                    setReplayError(null);
                }
            }["Dashboard.useEffect"]).catch({
                "Dashboard.useEffect": (error)=>setReplayError(error.message)
            }["Dashboard.useEffect"]);
        }
    }["Dashboard.useEffect"], [
        selectedAttempt
    ]);
    const selectedPuzzleMeta = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Dashboard.useMemo[selectedPuzzleMeta]": ()=>puzzleMetas.find({
                "Dashboard.useMemo[selectedPuzzleMeta]": (meta)=>meta.id === selectedPuzzle
            }["Dashboard.useMemo[selectedPuzzleMeta]"]) ?? puzzleMetas[0]
    }["Dashboard.useMemo[selectedPuzzleMeta]"], [
        puzzleMetas,
        selectedPuzzle
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        style: {
            marginTop: 48,
            display: 'flex',
            flexDirection: 'column',
            gap: 32
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCards, {
                summary: summary,
                error: summaryError
            }, void 0, false, {
                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                lineNumber: 133,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Leaderboard, {
                summary: summary
            }, void 0, false, {
                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tablet-panel",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 12,
                            alignItems: 'center'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                style: {
                                    margin: 0
                                },
                                children: "Puzzle Detail"
                            }, void 0, false, {
                                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                                lineNumber: 137,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: selectedPuzzle ?? '',
                                onChange: (event)=>setSelectedPuzzle(event.target.value),
                                style: {
                                    borderRadius: 999,
                                    padding: '6px 16px',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    background: 'transparent',
                                    color: 'white'
                                },
                                children: puzzleMetas.map((meta)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: meta.id,
                                        style: {
                                            color: 'black'
                                        },
                                        children: meta.title
                                    }, meta.id, false, {
                                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                                        lineNumber: 144,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                                lineNumber: 138,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this),
                    puzzleError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted",
                        children: [
                            "Failed to load puzzle analytics: ",
                            puzzleError
                        ]
                    }, void 0, true, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                        lineNumber: 150,
                        columnNumber: 25
                    }, this),
                    puzzleAnalytics ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PuzzleDetail, {
                        analytics: puzzleAnalytics
                    }, void 0, false, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                        lineNumber: 151,
                        columnNumber: 28
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted",
                        children: "Loading puzzle analytics…"
                    }, void 0, false, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                        lineNumber: 151,
                        columnNumber: 75
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                lineNumber: 135,
                columnNumber: 7
            }, this),
            puzzleAnalytics && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'minmax(240px, 1fr) minmax(240px, 1fr)',
                    gap: 24
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            gridColumn: '1 / span 2'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$components$2f$analytics$2f$ReplaysList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            attempts: puzzleAnalytics.recentAttempts,
                            selected: selectedAttempt,
                            onSelect: setSelectedAttempt
                        }, void 0, false, {
                            fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                            lineNumber: 156,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                        lineNumber: 155,
                        columnNumber: 11
                    }, this),
                    replayError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tablet-panel",
                        style: {
                            gridColumn: '1 / span 2'
                        },
                        children: [
                            "Failed to load replay: ",
                            replayError
                        ]
                    }, void 0, true, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                        lineNumber: 159,
                        columnNumber: 13
                    }, this),
                    !replay && !replayError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tablet-panel",
                        style: {
                            gridColumn: '1 / span 2'
                        },
                        children: "Select an attempt to view the movement replay and event stream."
                    }, void 0, false, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                        lineNumber: 164,
                        columnNumber: 13
                    }, this),
                    replay && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$components$2f$analytics$2f$MovementReplay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                movements: replay.movements,
                                grid: {
                                    width: selectedPuzzleMeta?.grid.width ?? 6,
                                    height: selectedPuzzleMeta?.grid.height ?? 3
                                },
                                goal: selectedPuzzleMeta?.grid.goal ?? {
                                    x: 0,
                                    y: 0
                                },
                                hazard: selectedPuzzleMeta?.grid.hazard
                            }, void 0, false, {
                                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                                lineNumber: 170,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$components$2f$analytics$2f$EventStream$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                events: replay.events
                            }, void 0, false, {
                                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                                lineNumber: 176,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                lineNumber: 154,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
        lineNumber: 132,
        columnNumber: 5
    }, this);
}
_s(Dashboard, "uyHi/i/FW+3QxETUdfu98YEr0L4=");
_c = Dashboard;
function SummaryCards({ summary, error }) {
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "tablet-panel",
            children: [
                "Failed to load summary: ",
                error
            ]
        }, void 0, true, {
            fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
            lineNumber: 187,
            columnNumber: 12
        }, this);
    }
    if (!summary) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "tablet-panel",
            children: "Loading summary…"
        }, void 0, false, {
            fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
            lineNumber: 190,
            columnNumber: 12
        }, this);
    }
    const cards = [
        {
            label: 'Players',
            value: summary.totalUsers
        },
        {
            label: 'Sessions',
            value: summary.totalSessions
        },
        {
            label: 'Attempts',
            value: summary.totalAttempts
        },
        {
            label: 'Success rate',
            value: `${Math.round(summary.successRate * 100)}%`
        },
        {
            label: 'Avg commands',
            value: summary.averageCommands.toFixed(1)
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "card-grid",
        children: [
            cards.map((card)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                    className: "card",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            style: {
                                marginTop: 0
                            },
                            children: card.label
                        }, void 0, false, {
                            fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                            lineNumber: 203,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: 24,
                                fontWeight: 700
                            },
                            children: card.value
                        }, void 0, false, {
                            fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                            lineNumber: 204,
                            columnNumber: 11
                        }, this)
                    ]
                }, card.label, true, {
                    fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                    lineNumber: 202,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                className: "card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        style: {
                            marginTop: 0
                        },
                        children: "Events by Type"
                    }, void 0, false, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                        lineNumber: 208,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        style: {
                            listStyle: 'none',
                            padding: 0,
                            margin: 0
                        },
                        children: summary.eventsByType.map((event)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                style: {
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: event.type
                                    }, void 0, false, {
                                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                                        lineNumber: 212,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: event.count
                                    }, void 0, false, {
                                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                                        lineNumber: 213,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, event.type, true, {
                                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                                lineNumber: 211,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                        lineNumber: 209,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                lineNumber: 207,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
        lineNumber: 200,
        columnNumber: 5
    }, this);
}
_c1 = SummaryCards;
function Leaderboard({ summary }) {
    if (!summary) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "tablet-panel",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                style: {
                    marginTop: 0
                },
                children: "Puzzle Leaderboard"
            }, void 0, false, {
                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                lineNumber: 226,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                style: {
                    width: '100%',
                    borderCollapse: 'collapse',
                    color: 'white'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            style: {
                                textAlign: 'left'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    children: "Title"
                                }, void 0, false, {
                                    fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                                    lineNumber: 230,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    children: "Attempts"
                                }, void 0, false, {
                                    fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                                    lineNumber: 231,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    children: "Clears"
                                }, void 0, false, {
                                    fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                                    lineNumber: 232,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                            lineNumber: 229,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                        lineNumber: 228,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                        children: summary.puzzleLeaderboard.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        children: row.title
                                    }, void 0, false, {
                                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                                        lineNumber: 238,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        children: row.attempts
                                    }, void 0, false, {
                                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                                        lineNumber: 239,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        children: row.clears
                                    }, void 0, false, {
                                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                                        lineNumber: 240,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, row.id, true, {
                                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                                lineNumber: 237,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                        lineNumber: 235,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                lineNumber: 227,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
        lineNumber: 225,
        columnNumber: 5
    }, this);
}
_c2 = Leaderboard;
function PuzzleDetail({ analytics }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: 'grid',
            gap: 16,
            gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
            marginTop: 16
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: 16,
                    padding: 16
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        style: {
                            marginTop: 0
                        },
                        children: "Attempts"
                    }, void 0, false, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                        lineNumber: 253,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 32,
                            margin: 0
                        },
                        children: analytics.attempts
                    }, void 0, false, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                        lineNumber: 254,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted",
                        children: [
                            "Clears: ",
                            analytics.clears
                        ]
                    }, void 0, true, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                        lineNumber: 255,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                lineNumber: 252,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: 16,
                    padding: 16
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        style: {
                            marginTop: 0
                        },
                        children: "Average Duration"
                    }, void 0, false, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                        lineNumber: 258,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 32,
                            margin: 0
                        },
                        children: [
                            Math.round(analytics.averageDurationMs),
                            " ms"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                        lineNumber: 259,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                lineNumber: 257,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: 16,
                    padding: 16
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        style: {
                            marginTop: 0
                        },
                        children: "Failures"
                    }, void 0, false, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                        lineNumber: 262,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        style: {
                            listStyle: 'none',
                            padding: 0,
                            margin: 0
                        },
                        children: analytics.failureReasons.map((reason)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: [
                                    reason.reason,
                                    ": ",
                                    reason.count
                                ]
                            }, reason.reason, true, {
                                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                                lineNumber: 265,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                        lineNumber: 263,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
                lineNumber: 261,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/analytics/Dashboard.tsx",
        lineNumber: 251,
        columnNumber: 5
    }, this);
}
_c3 = PuzzleDetail;
async function fetchJSON(url) {
    const response = await fetch(url);
    if (!response.ok) {
        const body = await response.json().catch(()=>({}));
        throw new Error(body.error ?? `Request failed: ${response.status}`);
    }
    return response.json();
}
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "Dashboard");
__turbopack_context__.k.register(_c1, "SummaryCards");
__turbopack_context__.k.register(_c2, "Leaderboard");
__turbopack_context__.k.register(_c3, "PuzzleDetail");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=multi-agent-producer_V0_Project_3_education_components_analytics_8612023e._.js.map