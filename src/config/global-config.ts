import { LogLevel, Transport, type Colorable, type LogSegment, type LogSegmentConfig, type Toggleable } from "../core/constants";
import _ from 'lodash'

export interface TransportConfig extends Toggleable, Colorable {}

export interface LogLevelConfig extends Toggleable, Colorable {
    segments?: Partial<Record<LogSegment, LogSegmentConfig>>;
}

export interface LogRiderConfig extends Colorable {
    colorEnabled?: boolean;
    filter?: LogLevel;
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
                "message": {
                    enabled: true,
                }
            }
        },
        [LogLevel.DEBUG]: {
            enabled: true,
            color: "cyan",
            segments: {
                "message": {
                    enabled: true,
                }
            }
        },
        [LogLevel.INFO]: {
            enabled: true,
            color: "blue",
            segments: {
                "message": {
                    enabled: true,
                }
            }
        },
        [LogLevel.WARN]: {
            enabled: true,
            color: "yellow",
            segments: {
                "message": {
                    enabled: true,
                }
            }
        },
        [LogLevel.ERROR]: {
            enabled: true,
            color: "red",
            segments: {
                "message": {
                    enabled: true,
                }
            }
        },
        [LogLevel.FATAL]: {
            enabled: true,
            color: "magenta",
            segments: {
                "message": {
                    enabled: true,
                }
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