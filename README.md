# LogRider

## Overview

`LogRider` is an opinionated system logging library for use in nodejs typescript projects.  It is designed to give production ready logging out of the box.  

The library was designed to be used in applications that are OOP oriented, but can be used in any application where named logging is desired.  This library can only be used in NodeJS environments, so it is not accessible in the browser.

## Features

- Formatted output for stdout with configurable options.
- Multiple transport methods(stdout, file, https).
    - Files can be automatically rotated based on a variety of parameters (size, date).
- Configurable coloring for stdout.

## Getting Started

You must call `await Log.init()` at your application's entry point.

```typescript
import { Log } from 'logrider'

await Log.init()
```

This loads the `logrider.config.ts` file from the root of your project, if you have one defined.  If not, you can utilize the project defaults.

You can see more about defining a config file in the [Configuration](#configuration) section of this document.

You can override this config on a per instance basis as well - 

```typescript
    const log = new Log({
        levels: {
            [LogLevel.FATAL]: {
                enabled: false
            }
        }
    })
```

This will only apply to this instance of the Log class - 

## Configuration


### Developer Note

If you are looking at the source code, you'll notice that I am using the bang (non-null assertion, or "variableName!") This is most likely in reference to the config file. This is safe to do, as it applies the overrides sequentially from a default config.