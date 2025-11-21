// config/loader.ts
import { pathToFileURL } from 'url';
import { resolve } from 'path';
import { existsSync } from 'fs';
import { type LogRiderConfig, defaultConfig } from './global-config';

const CONFIG_FILES = [
    'logrider.config.ts',
    'logrider.config.js',
    'logrider.config.mjs',
];

export async function loadConfig(cwd: string = process.cwd()): Promise<LogRiderConfig> {
    for (const filename of CONFIG_FILES) {
        const configPath = resolve(cwd, filename);
        
        if (existsSync(configPath)) {
            try {
                const fileUrl = pathToFileURL(configPath).href;
                
                const configModule = await import(fileUrl);
                
                const config = configModule.default;
                
                if (config) {
                    return config as LogRiderConfig;
                }
            } catch (error) {
                console.error(`Failed to load config from ${configPath}:`, error);
            }
        }
    }
    
    return defaultConfig;
}