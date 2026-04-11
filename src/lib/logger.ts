type LogLevel = "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: string;
  data?: unknown;
}

function log(level: LogLevel, message: string, context?: string, data?: unknown) {
  const entry: LogEntry = {
    level,
    message,
    timestamp: new Date().toISOString(),
  };
  if (context) entry.context = context;
  if (data !== undefined) entry.data = data;

  const output = JSON.stringify(entry);

  switch (level) {
    case "error":
      console.error(output);
      break;
    case "warn":
      console.warn(output);
      break;
    default:
      console.log(output);
  }
}

export const logger = {
  info: (message: string, context?: string, data?: unknown) => log("info", message, context, data),
  warn: (message: string, context?: string, data?: unknown) => log("warn", message, context, data),
  error: (message: string, context?: string, data?: unknown) =>
    log("error", message, context, data),
};
