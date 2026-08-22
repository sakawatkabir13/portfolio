export type BackgroundMode = "network" | "matrix" | "off";

export const BACKGROUND_MODE_STORAGE_KEY = "portfolio-background-mode";
export const LEGACY_MATRIX_STORAGE_KEY = "matrix-rain-enabled";
export const BACKGROUND_MODE_EVENT = "portfolio-background-mode-change";

export const BACKGROUND_MODES: BackgroundMode[] = ["network", "matrix", "off"];

export function isBackgroundMode(value: string | null): value is BackgroundMode {
  return value !== null && BACKGROUND_MODES.includes(value as BackgroundMode);
}

export function readBackgroundMode(storage: Pick<Storage, "getItem">): BackgroundMode {
  const storedMode = storage.getItem(BACKGROUND_MODE_STORAGE_KEY);
  if (isBackgroundMode(storedMode)) return storedMode;

  return storage.getItem(LEGACY_MATRIX_STORAGE_KEY) === "false" ? "off" : "network";
}

export function nextBackgroundMode(mode: BackgroundMode): BackgroundMode {
  const currentIndex = BACKGROUND_MODES.indexOf(mode);
  return BACKGROUND_MODES[(currentIndex + 1) % BACKGROUND_MODES.length];
}
