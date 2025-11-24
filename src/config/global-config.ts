import { LogLevel, Transport, type Colorable, type LogSegment, type LogSegmentConfig, type Toggleable } from "../core/constants";
import _ from 'lodash'

export interface TransportConfig extends Toggleable, Colorable {}

export interface LogLevelConfig extends Toggleable, Colorable {
    segments?: Partial<Record<LogSegment, LogSegmentConfig>>;
}

export interface LogRiderConfig extends Colorable {
    colorEnabled?: boolean;
    filter?: LogLevel;
    segments?: Partial<Record<LogSegment, LogSegmentConfig>>;
    transports?: Partial<Record<Partial<Transport>, Partial<TransportConfig>>>;
    levels?: Partial<Record<Partial<LogLevel>, Partial<LogLevelConfig>>>;
}

// TODO - Candidate for name refactor
/**
 * Defines a portion of a log.  
 */

export const defaultConfig: LogRiderConfig = {
    filter: LogLevel.DEBUG,
    colorEnabled: true,
    color: "white",

    segments: {
        timestamp: { enabled: true, color: "gray" },
        name: { enabled: true, color: "cyan" },
        level: { enabled: true },
        message: { enabled: true }
    },

    transports: {
        [Transport.STDOUT]: {
            enabled: true
        },
        [Transport.FILE]: {
            enabled: false
        },
        [Transport.HTTPS]: {
            enabled: false
        }
    },
    levels: {
        [LogLevel.TRACE]: {
            enabled: false,
            color: "gray",
            segments: {
                timestamp: { enabled: true },
                level: { enabled: true }
            }
        },
        [LogLevel.DEBUG]: {
            enabled: true,
            color: "cyan",
            segments: {
                level: { enabled: true }
            }
        },
        [LogLevel.INFO]: {
            enabled: true,
            color: "blue",
            segments: {
                timestamp: { enabled: false },
                level: { enabled: false }
            }
        },
        [LogLevel.WARN]: {
            enabled: true,
            color: "yellow",
            segments: {
                level: { enabled: true, color: "bgYellow" }
            }
        },
        [LogLevel.ERROR]: {
            enabled: true,
            color: "red",
            segments: {
                level: { enabled: true, color: "bgRed" }
            }
        },
        [LogLevel.FATAL]: {
            enabled: true,
            color: "magenta",
            segments: {
                level: { enabled: true, color: "bgMagenta" }
            }
        }
    },
}

export function mergeConfig(baseConfig: LogRiderConfig, inConfig: LogRiderConfig): LogRiderConfig {
    const copy = {...baseConfig};
    _.merge(copy, inConfig)
    return copy;
}

function overwriteDefaultConfig(inConfig: LogRiderConfig): LogRiderConfig {
    return mergeConfig(defaultConfig, inConfig);
}

export function defineConfig(inConfig: LogRiderConfig): LogRiderConfig {
    return overwriteDefaultConfig(inConfig);
}