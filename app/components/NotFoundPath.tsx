"use client";

import { usePathname } from "next/navigation";

function safeDecode(s: string) {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

export default function NotFoundPath() {
  return <>{safeDecode(usePathname())}</>;
}
