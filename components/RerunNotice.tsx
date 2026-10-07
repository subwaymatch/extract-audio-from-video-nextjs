"use client";

import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "./ui/Button";
import styles from "./ToolApp.module.css";

interface RerunNoticeProps {
  /** Files on the page that the settings as they stand would make differently. */
  count: number;
  onRerun: () => void;
  /** What a rerun does to the cards, which differs between the two queues. */
  effect: string;
}

/**
 * The foot of the settings panel once it no longer matches the files below.
 *
 * Every queue captures the settings a file was added under, so a change to
 * the panel never alters work already done. That is right for the work and
 * awkward for the visitor who resized to 1024, wanted 2048, and found the
 * only way there was to remove each file and drop it again. This says the
 * panel and the files have parted company and offers to bring them back.
 */
export function RerunNotice({ count, onRerun, effect }: RerunNoticeProps) {
  /*
   * Not shown on the first render after mounting. A tool restores its stored
   * settings in an effect, so coming back to a page whose files are still in
   * the queue renders once with the defaults - and every file would look out
   * of date for a frame. This effect runs in the same pass as that one, so
   * both changes land in the same render.
   */
  const [settled, setSettled] = useState(false);
  useEffect(() => setSettled(true), []);

  if (!settled || count === 0) return null;
  return (
    <div role="status" className={styles.settingsRerun}>
      <p className={styles.settingsRerunText}>
        {count === 1 ? "1 file was" : `${count} files were`} added before the settings changed. {effect}
      </p>
      <Button onClick={onRerun}>
        <RotateCcw aria-hidden="true" size={13} strokeWidth={2} />
        Rerun with new settings
      </Button>
    </div>
  );
}
