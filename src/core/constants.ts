export enum LogLevel {
    TRACE,
    DEBUG,
    INFO,
    WARN,
    ERROR,
    FATAL
}

export const LOG_LEVEL_VALUES: Record<LogLevel, number> = {
  [LogLevel.TRACE]: 0,
  [LogLevel.DEBUG]: 1,
  [LogLevel.INFO]: 2,
  [LogLevel.WARN]: 3,
  [LogLevel.ERROR]: 4,
  [LogLevel.FATAL]: 5
};

export enum Transport {
    STDOUT,
    FILE,
    HTTPS
}

export type Format = "stdout" | "json"