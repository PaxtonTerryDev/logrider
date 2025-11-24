import type { LogRiderConfig } from "../../config/global-config";
import type { LogLevel } from "../constants";
import { applyColor } from "./color/apply-color";
import { getColorForSegment } from "./color/get-color-config";
import { isSegmentEnabled } from "./segments/get-segment-include-config";
import { formatTimestamp } from "./segments/format-timestamp";
import { formatLevel } from "./segments/format-level";
import { formatName } from "./segments/format-name";

export function formatMessage(
    message: string,
    level: LogLevel,
    config: LogRiderConfig,
    loggerName?: string
): string {
    if (!config.colorEnabled) {
        const parts: string[] = [];

        if (isSegmentEnabled(config, level, "timestamp")) {
            parts.push(formatTimestamp());
        }
        if (isSegmentEnabled(config, level, "level")) {
            parts.push(formatLevel(level));
        }
        if (loggerName && isSegmentEnabled(config, level, "name")) {
            parts.push(formatName(loggerName));
        }
        if (isSegmentEnabled(config, level, "message")) {
            parts.push(message);
        }

        return parts.join(" ");
    }

    const parts: string[] = [];

    if (isSegmentEnabled(config, level, "timestamp")) {
        const text = formatTimestamp();
        const color = getColorForSegment(config, level, "timestamp");
        parts.push(color ? applyColor(text, color) : text);
    }

    if (isSegmentEnabled(config, level, "level")) {
        const text = formatLevel(level);
        const color = getColorForSegment(config, level, "level");
        parts.push(color ? applyColor(text, color) : text);
    }

    if (loggerName && isSegmentEnabled(config, level, "name")) {
        const text = formatName(loggerName);
        const color = getColorForSegment(config, level, "name");
        parts.push(color ? applyColor(text, color) : text);
    }

    if (isSegmentEnabled(config, level, "message")) {
        const color = getColorForSegment(config, level, "message");
        parts.push(color ? applyColor(message, color) : message);
    }

    return parts.join(" ");
}