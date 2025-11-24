import { type LogRiderConfig, type LogRiderConfigOverride, defaultConfig, mergeConfig } from "../config/global-config";
import { loadConfig } from "../config/loader";

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
    private config: LogRiderConfig

    constructor(overrides: LogRiderConfigOverride = {}) {
        this.config = mergeConfig(Log.globalConfig, overrides);
    }

    public getConfig(): LogRiderConfig {
        return this.config;
    }
}