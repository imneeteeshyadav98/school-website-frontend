// src/components/CurrentTime.tsx
'use client';

export function CurrentTime() {
  return <p>{new Date().toLocaleTimeString()}</p>;
}
