# Typescript checking

## Command line

### Dependencies

- [Just](https://just.systems/) for executing commands in the justfile.
- [Deno](https://deno.com/) for typechecking
- [watch](https://man7.org/linux/man-pages/man1/watch.1.html) for directory watching.

### Install commands

```sh
curl https://sh.rustup.rs -sSf | sh

cargo install just

curl -fsSL https://deno.land/install.sh | sh
```

### Usage

`just` or `just check` to do a single check.

`just watch` to do continuous checking for the current directory.

## VSCode

Should just work due to the presence of the jsconfig.json file.
