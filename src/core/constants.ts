import type { ColorName } from "chalk";

export enum LogLevel {
    TRACE = 0,
    DEBUG = 1,
    INFO = 2,
    WARN = 3,
    ERROR = 4,
    FATAL = 5
}

export enum LogConfigGrain {
  GLOBAL = 0,
  PROJECT = 1,
  INLINE = 2,
}

export enum ColorConfigGrain {
  LEVEL,
  SEGMENT,
}

export enum Transport {
    STDOUT,
    FILE,
    HTTPS
}

export type LogSegment = "timestamp" | "name" | "message"

export interface LogSegmentConfig extends Toggleable, Colorable {}

export type Format = "stdout" | "json"


export interface Toggleable {
    enabled?: boolean;
}

export interface Colorable {
      /** Color is hierarchical.  More fine-grained definitions will override their parents. */
    color?: ColorName;
}

export interface LogPortion extends Toggleable, Colorable {}
