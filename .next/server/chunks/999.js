exports.id=999,exports.ids=[999],exports.modules={5043:(a,b,c)=>{"use strict";c.d(b,{L:()=>p});var d=c(3024),e=c.n(d),f=c(6760),g=c.n(f),h=c(7550),i=c.n(h);let j="/assets",k={character:`${j}/sprites/main_character.png`,path:`${j}/sprites/place.png`,obstacle:`${j}/sprites/obstacle.png`,goal:`${j}/sprites/food.png`},l=`${j}/backgrounds/background.jpg`,m=[{id:"garden-stroll",sequence:1,concept:"sequencing",difficulty:1,title:"Garden Stroll",story:"Guide Lumi along the garden path to deliver a snack. Use simple steps to cross the walkway without hitting the hurdle.",goal:"Reach the picnic basket on the far right without bumping into the obstacle.",background:l,palette:{primary:"#f7a2f7",accent:"#7b4bce",glow:"#ffe0ff",canvas:"#fff4fb"},scene:{gridCols:6,gridRows:3,tileSize:96,startEntity:{id:"hero",sprite:k.character,x:0,y:2,facing:"east",role:"player"},entities:[{id:"path-a",sprite:k.path,x:1,y:2,role:"path"},{id:"path-b",sprite:k.path,x:2,y:2,role:"path"},{id:"center-obstacle",sprite:k.obstacle,x:3,y:2,role:"obstacle",interactions:["jump","avoid"]},{id:"path-c",sprite:k.path,x:4,y:2,role:"path"},{id:"path-d",sprite:k.path,x:5,y:2,role:"path"},{id:"goal",sprite:k.goal,x:6,y:2,role:"goal"}],camera:{floorLineY:.75,focalX:.5}},allowedBlocks:{movement:["moveForward","jump"],actions:[],control:[],logic:[],sensing:[]},constraints:{maxBlocks:6,lockedUntil:null,speedOptions:["slow","normal","fast"]},successCriteria:["Hero stands on the goal tile","No collisions detected","Program finishes execution"],hintRules:[{reason:"target_not_reached",message:"Use enough move blocks to land directly on the snack tile."},{reason:"obstacle_collision",message:"Insert a jump over the center block so Lumi clears the barrier."}],progression:{unlocks:["loop-lane"]},motionDirectives:{workspace:"Library stays on the left with soft violet glassmorphism; animate On Start root sliding down slightly when Play begins.",scene:"Character should ease-in across the walkway with a subtle glow trail to match the pink/violet palette."},instrumentation:{captureCodeSnapshot:!0,trackMovements:!0}},{id:"loop-lane",sequence:2,concept:"loops",difficulty:2,title:"Loop Lane Delivery",story:"Deliver treats to each tile in the loop lane. Optimize the path using repeats without losing the upbeat rhythm.",goal:"Visit every path tile and reach the goal while reusing a loop to save blocks.",background:l,palette:{primary:"#f794d2",accent:"#8b5cf6",glow:"#ffd6ff",canvas:"#fff1fb"},scene:{gridCols:8,gridRows:4,tileSize:88,startEntity:{id:"hero",sprite:k.character,x:0,y:2,facing:"east",role:"player"},entities:[{id:"path-1",sprite:k.path,x:1,y:2,role:"path"},{id:"path-2",sprite:k.path,x:2,y:2,role:"path"},{id:"path-3",sprite:k.path,x:3,y:2,role:"path"},{id:"path-4",sprite:k.path,x:4,y:2,role:"path"},{id:"obstacle-mid",sprite:k.obstacle,x:4,y:2,role:"obstacle",interactions:["jump"]},{id:"path-5",sprite:k.path,x:5,y:2,role:"path"},{id:"path-6",sprite:k.path,x:6,y:2,role:"path"},{id:"path-7",sprite:k.path,x:7,y:2,role:"path"},{id:"goal",sprite:k.goal,x:8,y:2,role:"goal"},{id:"treat-a",sprite:k.goal,x:2,y:2,role:"collectible",interactions:["pickup"]},{id:"treat-b",sprite:k.goal,x:6,y:2,role:"collectible",interactions:["pickup"]}],camera:{floorLineY:.7,focalX:.55}},allowedBlocks:{movement:["moveForward","jump","turnLeft","turnRight"],actions:["pickUp"],control:["repeat","repeatUntil"],logic:[],sensing:["pathAhead"]},constraints:{maxBlocks:10,requiredBlocks:["repeat"],lockedUntil:"garden-stroll",speedOptions:["normal","fast"]},successCriteria:["All collectibles visited","Goal tile reached","Program ends without collisions"],hintRules:[{reason:"wrong_order",message:"Pick up the treats on the lane before stepping onto the final goal tile on the far right."},{reason:"obstacle_collision",message:"Combine jump inside the loop when the lane reaches the middle hurdle."}],progression:{unlocks:["conditional-crossing"]},motionDirectives:{workspace:"When a loop is added, pulse the block spine to reinforce rhythm; keep code column narrower than scene for clarity.",scene:"Use staggered easing so repeated moves feel musical; highlight collectibles with a shimmer when picked."},instrumentation:{captureCodeSnapshot:!0,trackMovements:!0}},{id:"conditional-crossing",sequence:3,concept:"conditionals",difficulty:3,title:"Conditional Crossing",story:"Storm clouds roll in, so Lumi must react to hazards in real time. Use conditionals to dodge puddles and grab the glowing treat.",goal:"Reach the glowing treat only if the puddle sensor is clear; otherwise reroute using conditionals.",background:l,palette:{primary:"#f568c1",accent:"#6d28d9",glow:"#ffd0ff",canvas:"#ffe8fb"},scene:{gridCols:9,gridRows:4,tileSize:84,startEntity:{id:"hero",sprite:k.character,x:0,y:2,facing:"east",role:"player"},entities:[{id:"path-a",sprite:k.path,x:1,y:2,role:"path"},{id:"path-b",sprite:k.path,x:2,y:2,role:"path"},{id:"puddle-sensor",sprite:k.obstacle,x:3,y:2,role:"obstacle",interactions:["senseMoisture"]},{id:"path-c",sprite:k.path,x:4,y:2,role:"path"},{id:"path-d",sprite:k.path,x:5,y:2,role:"path"},{id:"branch-upper",sprite:k.path,x:5,y:1,role:"path"},{id:"branch-lower",sprite:k.path,x:5,y:3,role:"path"},{id:"hazard-upper",sprite:k.obstacle,x:6,y:1,role:"obstacle"},{id:"hazard-lower",sprite:k.obstacle,x:6,y:3,role:"obstacle"},{id:"path-middle",sprite:k.path,x:6,y:2,role:"path"},{id:"path-e",sprite:k.path,x:7,y:2,role:"path"},{id:"path-f",sprite:k.path,x:8,y:2,role:"path"},{id:"goal",sprite:k.goal,x:9,y:2,role:"goal"}],camera:{floorLineY:.68,focalX:.6}},allowedBlocks:{movement:["moveForward","turnLeft","turnRight","jump"],actions:["pickUp","placeItem"],control:["repeat","repeatUntil","while"],logic:["if","ifElse","compareSensor"],sensing:["isPuddleAhead","isHazardLeft","isHazardRight"]},constraints:{maxBlocks:16,requiredBlocks:["ifElse"],lockedUntil:"loop-lane",speedOptions:["slow","normal","fast"]},successCriteria:["Conditional branch chosen appropriately based on puddle sensor","Goal reached with snack collected","No hazard collisions occur"],hintRules:[{reason:"missing_condition",message:"Wrap the hazard dodge code in an if/else so Lumi can react to puddles."},{reason:"wrong_item",message:"Be sure the glowing snack is picked up before finishing."},{reason:"obstacle_collision",message:"Use turn blocks within the conditional to route around whichever hazard spawns."}],progression:{unlocks:[]},motionDirectives:{workspace:"When conditionals are selected, animate a quick highlight sweep across the branch labels to keep hierarchy sharp.",scene:"Trigger a soft violet flash whenever sensors fire so the scene remains legible even as blocks animate."},instrumentation:{captureCodeSnapshot:!0,trackMovements:!0}}];m.map(a=>[a.id,a]);let n=[`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    display_name TEXT,
    created_at DATETIME DEFAULT (datetime('now'))
  )`,`CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    device TEXT,
    locale TEXT,
    created_at DATETIME DEFAULT (datetime('now')),
    ended_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`,`CREATE TABLE IF NOT EXISTS puzzles (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    concept TEXT NOT NULL CHECK (concept IN ('sequencing','loops','conditionals')),
    difficulty INTEGER NOT NULL,
    scene_slug TEXT NOT NULL,
    goal TEXT NOT NULL,
    created_at DATETIME DEFAULT (datetime('now'))
  )`,`CREATE TABLE IF NOT EXISTS attempts (
    id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL,
    puzzle_id TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('running','success','failure')),
    failure_reason TEXT,
    duration_ms INTEGER,
    code_snapshot TEXT,
    started_at DATETIME DEFAULT (datetime('now')),
    completed_at DATETIME,
    FOREIGN KEY (session_id) REFERENCES sessions(id),
    FOREIGN KEY (puzzle_id) REFERENCES puzzles(id)
  )`,`CREATE TABLE IF NOT EXISTS events (
    id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL,
    attempt_id TEXT,
    puzzle_id TEXT,
    kind TEXT NOT NULL,
    payload TEXT,
    occurred_at DATETIME DEFAULT (datetime('now')),
    FOREIGN KEY (session_id) REFERENCES sessions(id),
    FOREIGN KEY (attempt_id) REFERENCES attempts(id)
  )`,`CREATE TABLE IF NOT EXISTS movements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    attempt_id TEXT NOT NULL,
    step_index INTEGER NOT NULL,
    x INTEGER NOT NULL,
    y INTEGER NOT NULL,
    facing TEXT,
    state TEXT,
    occurred_at DATETIME DEFAULT (datetime('now')),
    FOREIGN KEY (attempt_id) REFERENCES attempts(id)
  )`,`CREATE TABLE IF NOT EXISTS puzzle_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    puzzle_id TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('locked','unlocked','complete')),
    last_attempt_id TEXT,
    updated_at DATETIME DEFAULT (datetime('now')),
    UNIQUE(user_id, puzzle_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (last_attempt_id) REFERENCES attempts(id)
  )`,"CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id)","CREATE INDEX IF NOT EXISTS idx_attempts_session ON attempts(session_id)","CREATE INDEX IF NOT EXISTS idx_attempts_puzzle ON attempts(puzzle_id)","CREATE INDEX IF NOT EXISTS idx_events_attempt ON events(attempt_id)","CREATE INDEX IF NOT EXISTS idx_events_session ON events(session_id)","CREATE INDEX IF NOT EXISTS idx_movements_attempt ON movements(attempt_id)","CREATE INDEX IF NOT EXISTS idx_progress_user ON puzzle_progress(user_id)"],o=process.env.DB_PATH??g().join(process.cwd(),"db","telemetry.sqlite");function p(){let a=globalThis;if(!a.__blockCodingDb){e().mkdirSync(g().dirname(o),{recursive:!0});let b=new(i())(o);b.pragma("journal_mode = WAL");for(let a of(b.pragma("foreign_keys = ON"),n))b.prepare(a).run();!function(a,b){let c=a.prepare(`
    INSERT INTO puzzles (id, title, concept, difficulty, scene_slug, goal)
    VALUES (@id, @title, @concept, @difficulty, @sceneSlug, @goal)
    ON CONFLICT(id) DO UPDATE SET
      title = excluded.title,
      concept = excluded.concept,
      difficulty = excluded.difficulty,
      scene_slug = excluded.scene_slug,
      goal = excluded.goal
  `),d=new Set;if(a.transaction(a=>{for(let b of a)c.run(b),d.add(b.id)})(b),0===d.size)return;let e=Array.from(d).map(()=>"?").join(", "),f=`SELECT id FROM puzzles WHERE id NOT IN (${e})`;for(let b of a.prepare(f).all(...Array.from(d)))a.prepare("DELETE FROM puzzles WHERE id = ?").run(b.id)}(b,m.map(a=>({id:a.id,title:a.title,concept:a.concept,difficulty:a.difficulty,sceneSlug:a.id,goal:a.goal}))),a.__blockCodingDb=b}return a.__blockCodingDb}},6487:()=>{},8335:()=>{}};