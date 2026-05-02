export {}

declare global {
  interface Window {
    chatbase?: ((...args: unknown[]) => unknown) & { q?: unknown[] }
  }
}

