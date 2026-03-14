import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { isTruthyEnvValue } from "./env.js";
import { sanitizeHostExecEnv } from "./host-env-security.js";

const DEFAULT_TIMEOUT_MS = 15_000;
const DEFAULT_MAX_BUFFER_BYTES = 2 * 1024 * 1024;
const DEFAULT_SHELL = "/bin/sh";
let lastAppliedKeys: string[] = [];
let cachedShellPath: string | null | undefined;
let cachedEtcShells: Set<string> | null | undefined;

function resolveShellExecEnv(env: NodeJS.ProcessEnv): NodeJS.ProcessEnv {
  const execEnv = sanitizeHostExecEnv({ baseEnv: env });

  // Startup-file resolution must stay pinned to the real user home.
  const home = os.homedir().trim();
  if (home) {
    execEnv.HOME = home;
  } else {
    delete execEnv.HOME;
  }

  // Avoid zsh startup-file redirection via env poisoning.
  delete execEnv.ZDOTDIR;
  return execEnv;
}

function resolveTimeoutMs(timeoutMs: number | undefined): number {
  if (typeof timeoutMs !== "number" || !Number.isFinite(timeoutMs)) {
    return DEFAULT_TIMEOUT_MS;
  }
  return Math.max(0, timeoutMs);
}

function readEtcShells(): Set<string> | null {
  if (cachedEtcShells !== undefined) {
    return cachedEtcShells;
  }
  try {
    const raw = fs.readFileSync("/etc/shells", "utf8");
    const entries = raw
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0 && !line.startsWith("#") && path.isAbsolute(line));
    cachedEtcShells = new Set(entries);
  } catch {
    cachedEtcShells = null;
  }
  return cachedEtcShells;
}

export { resolveShellExecEnv, resolveTimeoutMs, readEtcShells, DEFAULT_TIMEOUT_MS, DEFAULT_MAX_BUFFER_BYTES, DEFAULT_SHELL };
