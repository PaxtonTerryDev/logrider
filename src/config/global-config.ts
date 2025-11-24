import { LogLevel, Transport } from "../core/constants";
import _ from 'lodash'

export interface TransportConfig {
    enabled: boolean;
}

export interface LogLevelConfig {
    enabled: boolean;
}

export interface LogRiderConfig {
    transports: Record<Transport, TransportConfig>;
    levels: Record<LogLevel, LogLevelConfig>;
}

export interface LogRiderConfigOverride {
    transports?: Partial<Record<Transport, TransportConfig>>;
    levels?: Partial<Record<LogLevel, LogLevelConfig>>;
}

export const defaultConfig: LogRiderConfig = {
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
        },
        [LogLevel.DEBUG]: {
            enabled: false,
        },
        [LogLevel.INFO]: {
            enabled: true
        },
        [LogLevel.WARN]: {
            enabled: true
        },
        [LogLevel.ERROR]: {
            enabled: true
        },
        [LogLevel.FATAL]: {
            enabled: true
        }
    },

}

export function mergeConfig(baseConfig: LogRiderConfig, inConfig: LogRiderConfigOverride): LogRiderConfig {
    const copy = {...baseConfig};
    _.merge(copy, inConfig)
    return copy;
}

function overwriteDefaultConfig(inConfig: LogRiderConfigOverride): LogRiderConfig {
    return mergeConfig(defaultConfig, inConfig);
}

export function defineConfig(inConfig: LogRiderConfigOverride): LogRiderConfig {
    return overwriteDefaultConfig(inConfig);
}