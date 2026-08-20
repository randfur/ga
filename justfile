check-deno:
    deno check --config=deno.json

check-tsc:
    npx tsc -p jsconfig.json --noEmit

install-tsc:
    npm install -g typescript
