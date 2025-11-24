import { LogLevel } from "../../constants";

export function formatLevel(level: LogLevel): string {
    switch(level) {
        case LogLevel.INFO:
            return "INFO "
        case LogLevel.WARN:
            return "WARN "
        default:
            return LogLevel[level];
    }
}
