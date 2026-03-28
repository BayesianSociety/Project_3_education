module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

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
"[project]/multi-agent-producer_V0/Project_3_education/components/layout/PuzzleProgress.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PuzzleProgress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const STATUS_LABEL = {
    locked: 'Locked',
    available: 'Ready',
    complete: 'Cleared'
};
function stepClass(status) {
    switch(status){
        case 'complete':
            return 'progress-step progress-step--complete';
        case 'available':
            return 'progress-step progress-step--active';
        default:
            return 'progress-step';
    }
}
function PuzzleProgress({ entries }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "progress-track",
        role: "list",
        "aria-label": "Puzzle progression",
        children: entries.sort((a, b)=>a.order - b.order).map((entry, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "listitem",
                className: stepClass(entry.status),
                "aria-label": `${entry.title}: ${STATUS_LABEL[entry.status]}`,
                children: index + 1
            }, entry.id, false, {
                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/layout/PuzzleProgress.tsx",
                lineNumber: 35,
                columnNumber: 11
            }, this))
    }, void 0, false, {
        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/layout/PuzzleProgress.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
}),
"[project]/multi-agent-producer_V0/Project_3_education/components/layout/TopBar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TopBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$components$2f$layout$2f$PuzzleProgress$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/multi-agent-producer_V0/Project_3_education/components/layout/PuzzleProgress.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const PROGRESS_COOKIE = 'blockCodingProgress';
const NAV_LINKS = [
    {
        href: '/',
        label: 'Home'
    },
    {
        href: '/puzzles',
        label: 'Puzzle Map'
    },
    {
        href: '/analytics',
        label: 'Analytics'
    }
];
function serializeProgress(entries) {
    const payload = {};
    entries.forEach((entry)=>{
        payload[entry.id] = entry.status;
    });
    return JSON.stringify(payload);
}
function readCookie() {
    if (typeof document === 'undefined') return {};
    return document.cookie.split(';').reduce((acc, part)=>{
        const [key, ...value] = part.trim().split('=');
        if (!key) return acc;
        acc[key] = decodeURIComponent(value.join('='));
        return acc;
    }, {});
}
function loadFromLocalStorage(puzzles) {
    if ("TURBOPACK compile-time truthy", 1) return puzzles;
    //TURBOPACK unreachable
    ;
    const stored = undefined;
}
function TopBar({ puzzles }) {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>puzzles);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setProgress(puzzles);
    }, [
        puzzles
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setProgress((prev)=>loadFromLocalStorage(prev));
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        function handleProgressEvent(event) {
            const custom = event;
            if (!custom.detail) return;
            setProgress(custom.detail.progress);
            const serialized = serializeProgress(custom.detail.progress);
            window.localStorage.setItem(PROGRESS_COOKIE, serialized);
            document.cookie = `${PROGRESS_COOKIE}=${encodeURIComponent(serialized)};path=/;max-age=${60 * 60 * 24 * 365}`;
        }
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        const cookieBag = undefined;
    }, [
        progress
    ]);
    const activePath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>pathname ?? '/', [
        pathname
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        style: {
            position: 'sticky',
            top: 0,
            zIndex: 20,
            backdropFilter: 'blur(12px)',
            background: 'rgba(14, 5, 24, 0.88)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "page-shell",
            style: {
                paddingTop: 18,
                paddingBottom: 18,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 24
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            "aria-label": "Go to landing",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: 'var(--font-display)',
                                    fontSize: '1.2rem',
                                    color: 'white',
                                    fontWeight: 700,
                                    letterSpacing: '0.08em'
                                },
                                children: "BLOCK CODING PUZZLES"
                            }, void 0, false, {
                                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/layout/TopBar.tsx",
                                lineNumber: 120,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/layout/TopBar.tsx",
                            lineNumber: 119,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            "aria-label": "Primary",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                style: {
                                    listStyle: 'none',
                                    display: 'flex',
                                    gap: 12,
                                    margin: 0,
                                    padding: 0
                                },
                                children: NAV_LINKS.map((link)=>{
                                    const isActive = activePath === link.href || link.href !== '/' && activePath.startsWith(link.href);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: link.href,
                                            style: {
                                                color: isActive ? 'var(--color-mint-200)' : 'rgba(255, 255, 255, 0.8)',
                                                fontWeight: 600,
                                                textTransform: 'uppercase',
                                                fontSize: '0.85rem',
                                                letterSpacing: '0.08em'
                                            },
                                            children: link.label
                                        }, void 0, false, {
                                            fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/layout/TopBar.tsx",
                                            lineNumber: 138,
                                            columnNumber: 21
                                        }, this)
                                    }, link.href, false, {
                                        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/layout/TopBar.tsx",
                                        lineNumber: 137,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/layout/TopBar.tsx",
                                lineNumber: 133,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/layout/TopBar.tsx",
                            lineNumber: 132,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/layout/TopBar.tsx",
                    lineNumber: 118,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$multi$2d$agent$2d$producer_V0$2f$Project_3_education$2f$components$2f$layout$2f$PuzzleProgress$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    entries: progress
                }, void 0, false, {
                    fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/layout/TopBar.tsx",
                    lineNumber: 156,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/layout/TopBar.tsx",
            lineNumber: 107,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/multi-agent-producer_V0/Project_3_education/components/layout/TopBar.tsx",
        lineNumber: 97,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__bfb1a1ca._.js.map