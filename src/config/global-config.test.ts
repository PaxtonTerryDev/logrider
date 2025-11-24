import { expect, test } from "vitest";
import {
  defineConfig,
} from "./global-config";
import { LogLevel, Transport } from "../core/constants";

// const userConfigTest: LogRiderConfigOverride = {
//   transports: {
//     [Transport.STDOUT]: {
//       enabled: false,
//     },
//   },
//   levels: {
//     [LogLevel.TRACE]: {
//       enabled: true,
//     },
//   },
// };

// test("returns an entire config", () => {
//   // Pretty sure this tests the whole object is returned? Since userConfigTest
//   // is not overwriting this field, it should be true + exist
//   expect(defineConfig(userConfigTest).levels[LogLevel.FATAL].enabled).toBe(true)
// });

// test("overwrites the default config with the user defined config", () => {
//   expect(defineConfig(userConfigTest).levels[LogLevel.TRACE].enabled).toBe(
//     true
//   );
// });


