import { expect, test } from "vitest";
import Log from "./log";
import { isEqual } from "lodash";
import { LogLevel } from "./constants";

test('creates a log object from no provided overrides', async () => {
    await Log.init()
    const log = new Log("TestLog")
    expect(isEqual(log.getConfig(), Log.getGlobalConfig()))

})

test('creates a local config by merging provided config options with globalConfig', async () => {
    await Log.init()

    const override = {
        levels: {
            [LogLevel.FATAL]: {
                enabled: false
            }
        }
    };

    const log = new Log("TestLog", override)

    expect(log.getConfig().levels![5]!.enabled).toBe(false);
})

