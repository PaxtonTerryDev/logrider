import type { ColorName } from "chalk";
import type { LogRiderConfig } from "../../../config/global-config";
import type { LogLevel, LogSegment } from "../../constants";
import { getColorForSegment } from "../color/get-color-config";

export function isSegmentEnabled(
    config: LogRiderConfig,
    level: LogLevel,
    segment: LogSegment
): boolean {
    const levelSegmentEnabled = config.levels?.[level]?.segments?.[segment]?.enabled;
    if (levelSegmentEnabled !== undefined) {
        return levelSegmentEnabled;
    }

    const rootSegmentEnabled = config.segments?.[segment]?.enabled;
    if (rootSegmentEnabled !== undefined) {
        return rootSegmentEnabled;
    }

    return true;
}

export function getSegmentColor(
    config: LogRiderConfig,
    level: LogLevel,
    segment: LogSegment
): ColorName | undefined {
    return getColorForSegment(config, level, segment);
}