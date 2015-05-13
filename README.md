
glued-autocomplete
===

### Try Demo

1. Trun on your static resources server such as nginx or apache.
    - Suppose `$HOME/Sites` is its public root.
    - Suppose 4000 is the port.
2. `cd $HOME/Sites`
3. `git clone xxx`
4. `cd xxx`
5. `npm install`
6. Go `http://localhost:4000/xxx/`

### Start Develop

1. `npm run plovr`
2. Go `http://localhost:4000/xxx/dev.html`

#### Want fixclosure?

`npm run fixclosure`

#### Want recompile less?

`npm run less`

or

`npm run watch-less`

#### Want deploy to `./dest` directory?

`npm run build`
