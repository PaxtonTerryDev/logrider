import { defineConfig } from "./src/config/global-config";
import { LogLevel, Transport } from "./src/core/constants";

export default defineConfig({
    transports: {
        [Transport.STDOUT]: {
          enabled: false,
        },
      },
      levels: {
        [LogLevel.TRACE]: {
          enabled: true,
        },
      },
})