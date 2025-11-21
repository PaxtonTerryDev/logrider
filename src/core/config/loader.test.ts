import { expect, test } from "vitest";
import Log from "../log";
import { Transport } from "../constants";

test('loads a user config file from the root of the project', async () => {
    await Log.init()
    expect(Log.getGlobalConfig().transports[Transport.STDOUT].enabled).toBe(false)
})