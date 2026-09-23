"use client";

import { useEffect, useRef } from "react";
import { runEntrySequence } from "@/app/animations/hero/entry";
import { applyMagneticMotion } from "@/app/animations/transitions/magnetic";

export function EntrySequence({ onEnter }: { onEnter?: () => void }) {
  const enterRef = useRef<HTMLButtonElement | null>(null);
  const skipRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    runEntrySequence();

    const cleanup = applyMagneticMotion(enterRef.current);
    const skipCleanup = applyMagneticMotion(skipRef.current);

    return () => {
      cleanup?.();
      skipCleanup?.();
    };
  }, []);

  return (
    <div className="entry-shell" data-entry-overlay>
      <div className="entry-stage">
        <div className="entry-logo" data-entry-logo>
          VINI VICI VIDI
        </div>
        <h1 className="entry-title" data-entry-title>
          SILVER ATELIER
        </h1>
        <div className="entry-actions">
          <button
            ref={enterRef}
            type="button"
            className="entry-button"
            data-entry-button
            onClick={onEnter}
          >
            ENTER THE COLLECTION
          </button>
          <button
            ref={skipRef}
            type="button"
            className="entry-skip"
            onClick={onEnter}
          >
            SKIP
          </button>
        </div>
      </div>
    </div>
  );
}
