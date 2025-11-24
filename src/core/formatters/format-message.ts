import type { LogRiderConfig } from "../../config/global-config";
import type { LogLevel } from "../constants";
import { applyColor } from "./color/apply-color";
import { getColorForLevel } from "./color/get-color-config";

export function formatMessage(message: string, level: LogLevel, config: LogRiderConfig): string {
    if (config.colorEnabled) {
        const color = getColorForLevel(config, level);
        message = color ? applyColor(message, color) : message;
    }

    
    return message

}