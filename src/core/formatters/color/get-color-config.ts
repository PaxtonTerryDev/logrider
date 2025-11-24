import type { ColorName } from "chalk";
import type { LogRiderConfig } from "../../../config/global-config";
import type { LogLevel, LogSegment } from "../../constants";

export function getColorForSegment(config: LogRiderConfig, level: LogLevel, segment: LogSegment): ColorName | undefined {
    return config.levels?.[level]?.segments?.[segment]?.color
        ?? config.levels?.[level]?.color
        ?? config.color;
}

export function getColorForLevel(config: LogRiderConfig, level: LogLevel): ColorName | undefined {
    return config.levels?.[level]?.color
        ?? config.color;
}