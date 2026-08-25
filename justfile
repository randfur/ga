check:
    deno check --config=deno.json src/*.js tests/*.js

watch:
    watch --color just check
