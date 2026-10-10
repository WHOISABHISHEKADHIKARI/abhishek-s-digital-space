import { useEffect, useState } from "react";
import type { ProfileData } from "./profile-data";

function readInjected(): ProfileData | null {
  const g = globalThis as unknown as { __PROFILE_DATA__?: ProfileData };
  if (g.__PROFILE_DATA__) return g.__PROFILE_DATA__;
  if (typeof document === "undefined") return null;
  const el = document.getElementById("profile-data") as HTMLScriptElement | null;
  if (el?.textContent) {
    try {
      return JSON.parse(el.textContent) as ProfileData;
    } catch {
      return null;
    }
  }
  return null;
}

export function useProfileData(): ProfileData | null {
  const [data, setData] = useState<ProfileData | null>(readInjected);

  useEffect(() => {
    if (data) return;
    let cancelled = false;
    fetch("/abhishek_profile.json")
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setData(d as ProfileData);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [data]);

  return data;
}
