import type { LogLevel, Transport } from "./constants";

export interface LogRiderConfig {
    enabledTransports: Transport[];
    levels: Record<keyof LogLevel, boolean>
}

export const defaultGlobalConfig: LogRiderConfig = {
    enabledTransports: ['stdout'],
    levels: {
        "trace"
    }
} 