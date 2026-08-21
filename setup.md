# Type checking with JSDoc (Command Line)

1. Install just in order to run the `justfile`

https://just.systems/man/en/installation.html

- If you have `cargo` the rust package manager you can run `cargo install just` to install it
- Otherwise: https://just.systems/man/en/pre-built-binaries.html

2. Install `deno` or `tsc`

- Deno:
- https://docs.deno.com/runtime/getting_started/installation/
- Tsc: `npm install -g typescript`

3. Running checks via just

See justfile for commands

- Typecheck with deno: `just` or `just check-deno`
- Typecheck with tsc: `just check-tsc`


4. Watching

- If you want to continuously watch your changes
- Linux/Windows Linux Subsystem: Assume you have `watch` (check) and run `just watch-deno`

- Alternatively you can use `watchman`: and run `just watchman-deno`
- https://facebook.github.io/watchman/docs/install



# Vscode

- Vscode should automatically handle this setup and type check based on the current configuration
- It looks for the `jsconfig.json` to determine how the JSDoc checking will work which is also how the `tsc` check works