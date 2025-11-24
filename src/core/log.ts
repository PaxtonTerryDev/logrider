import chalk from "chalk";
import {
  type LogLevelConfig,
  type LogRiderConfig,
  defaultConfig,
  mergeConfig,
} from "../config/global-config";
import { loadConfig } from "../config/loader";
import { LogLevel } from "./constants";
import { applyColor } from "./formatters/color/apply-color";
import { formatMessage } from "./formatters/format-message";
import _ from "lodash";

export default class Log {
  private static configPromise: Promise<LogRiderConfig> | null = null;
  private static globalConfig: LogRiderConfig = defaultConfig;

  private static async getUserDefinedConfig(): Promise<LogRiderConfig> {
    if (!this.configPromise) {
      this.configPromise = loadConfig();
      this.globalConfig = await this.configPromise;
    }
    return this.globalConfig;
  }

  public static async init(): Promise<void> {
    await this.getUserDefinedConfig();
  }

  public static getGlobalConfig() {
    return this.globalConfig;
  }

  /// END OF STATIC ///

  public name: string;
  private localConfig: LogRiderConfig;

  constructor(name: string, overrides: LogRiderConfig = {}) {
    this.name = name;
    this.localConfig = mergeConfig(Log.globalConfig, overrides);
  }

  public getConfig(): LogRiderConfig {
    return this.localConfig;
  }

  private isFiltered(level: LogLevel): boolean {
    return level < this.localConfig.filter!;
  }

  private out(
    level: LogLevel,
    message: string,
    overrides?: Omit<LogLevelConfig, "enabled">,
    ...args: unknown[]
  ) {
    const isExplicitlyEnabled = this.localConfig.levels?.[level]?.enabled === true;
    const passesFilter = !this.isFiltered(level);

    if (!isExplicitlyEnabled && !passesFilter) {
        return;
    }

    const localConfig = overrides
      ? _.merge({}, this.localConfig, { levels: { [level]: overrides } })
      : this.localConfig;
    console.log(formatMessage(message, level, localConfig));
  }

  public trace(
    message: string,
    overrides?: Omit<LogLevelConfig, "enabled">,
    ...args: unknown[]
  ) {
    this.out(LogLevel.TRACE, message, overrides, args);
  }

  public debug(
    message: string,
    overrides?: Omit<LogLevelConfig, "enabled">,
    ...args: unknown[]
  ) {
    this.out(LogLevel.DEBUG, message, overrides, args);
  }

  public info(
    message: string,
    overrides?: Omit<LogLevelConfig, "enabled">,
    ...args: unknown[]
  ) {
    this.out(LogLevel.INFO, message, overrides, args);
  }

  public warn(
    message: string,
    overrides?: Omit<LogLevelConfig, "enabled">,
    ...args: unknown[]
  ) {
    this.out(LogLevel.WARN, message, overrides, args);
  }

  public error(
    message: string,
    overrides?: Omit<LogLevelConfig, "enabled">,
    ...args: unknown[]
  ) {
    this.out(LogLevel.ERROR, message, overrides, args);
  }

  public fatal(
    message: string,
    overrides?: Omit<LogLevelConfig, "enabled">,
    ...args: unknown[]
  ) {
    this.out(LogLevel.FATAL, message, overrides, args);
  }
}
