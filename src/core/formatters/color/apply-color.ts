import type { ColorName } from "chalk";
import chalk from "chalk";

export function applyColor(text: string, color: ColorName) {
    return chalk[color](text);
}