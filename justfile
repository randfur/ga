check-deno:
    deno check --config=deno.json

check-tsc:
    npx tsc -p jsconfig.json --noEmit

install-tsc:
    npm install -g typescript

watch-deno:
    watch --color deno check --config=deno.json

watchman-deno:
    watchman-make -p '**/*.js' '**/*.d.ts' --run "deno check --config=deno.json"

watch-tsc:
    watch --color npx tsc -p jsconfig.json --noEmit

watchman-tsc:
    watchman-make -p '**/*.js' '**/*.d.ts' --run "npx tsc -p jsconfig.json --noEmit"