## Error Type
Build Error

## Error Message
Module not found: Can't resolve './globals.css'

## Build Output
./multi-agent-producer_V0/Project_3_education/app/layout.tsx:3:1
Module not found: Can't resolve './globals.css'
  1 | import type { Metadata } from 'next';
  2 | import { cookies } from 'next/headers';
> 3 | import './globals.css';
    | ^^^^^^^^^^^^^^^^^^^^^^^
  4 | import TopBar from '@/components/layout/TopBar';
  5 | import { PUZZLES } from '@/lib/puzzles/data';
  6 |

https://nextjs.org/docs/messages/module-not-found

Next.js version: 16.0.0 (Turbopack)
