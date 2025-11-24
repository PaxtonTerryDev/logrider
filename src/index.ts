import Log from "./core/log";

async function main() {
    await Log.init();
    const log = new Log("Main");

    log.trace("trace");
    log.debug("debug");
    log.info("info");
    log.warn("warn");
    log.error("error");
    log.fatal("fatal");
}

main();