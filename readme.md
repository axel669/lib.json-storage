# JSON Storage
Small wrapper around localStorage and sessionStorage (and whatever else
implements getItem/setItem/deleteItem).
> Uses JSON.parse and JSON.stringify, so anything not serializable with those
> won't work with this lib.

## Installation
Yarn/NPM/PNPM - `@axel669/json-storage`

## Usage
```js
import store from "@axel669/json-storage"
// or use without downloading
// import store from "https://esm.sh/@axel669/json-storage@0.1.1"

const local = store(localStorage)

// set value, serialized into json
local.value = [ 1, 2, 3, 4 ]

// logs "[1,2,3,4]"
console.log(localStorage.getItem("value"))
// logs the array (not string) [1, 2, 3, 4]
console.log(local.value)

// remove from storage
delete local.value
```
