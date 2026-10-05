"use client";

import { useSyncExternalStore } from "react";

const subscribe = (cb: () => void) => {
  const id = setInterval(cb, 10_000);
  return () => clearInterval(id);
};
// Minute number: stable between renders, changes once a minute.
const getSnapshot = () => Math.floor(Date.now() / 60_000);
const getServerSnapshot = () => null;

export function LocalTime({ timeZone }: { timeZone: string }) {
  const minute = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (minute === null) return <span className="tabular-nums">--:--</span>;
  const date = new Date(minute * 60_000);
  const label = new Intl.DateTimeFormat("en-IN", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
  return (
    <time className="tabular-nums" dateTime={date.toISOString()}>
      {label.toUpperCase()} IST
    </time>
  );
}
