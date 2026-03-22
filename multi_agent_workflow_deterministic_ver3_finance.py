#!/usr/bin/env python3
"""Compatibility wrapper for the production orchestrator."""

from orchestrator import main
import asyncio
import sys


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("Interrupted.", file=sys.stderr)
        sys.exit(130)
