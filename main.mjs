/**
    Creates a storage interface that will automatically serialize and
    deserialize values.
    @param {Storage} source &#32;
        The storage object to use as the source for the
        store (localStorage, sessionStorage, etc.).
    @param {String} [prefix = null] &#32;
        If provided, all storage keys will be prefixed. Useful if testing
        multiple things on localhost (or just similar domain+port combos).
    @returns {any} &#32;
        Returns any valid JS value
*/

const store = (source, prefix = null) => {
    const header = prefix ? `${prefix}:` : ""
    return new Proxy(
        {},
        {
            get(_, name) {
                if (name === Symbol.iterator) {
                    const keys = Object.keys(source).filter(
                        key => key.startsWith(header)
                    )
                    let i = 0
                    return () => ({
                        next() {
                            if (i === keys.length) {
                                return { done: true }
                            }
                            const key = keys[i]
                            const raw = source.getItem(key)
                            i += 1
                            return {
                                done: false,
                                value: [
                                    key,
                                    raw === null ? undefined : JSON.parse(raw)
                                ]
                            }
                        },
                        get done() { return i === keys.length }
                    })
                }
                const key = `${header}${name}`

                const raw = source.getItem(key)
                if (raw === null) {
                    return undefined
                }
                return JSON.parse(raw)
            },
            set(_, name, value) {
                const key = `${header}${name}`
                source.setItem(
                    key,
                    JSON.stringify(value)
                )
                return true
            },
            deleteProperty(_, name) {
                const key = `${header}${name}`
                source.removeItem(key)
                return true
            }
        }
    )
}

export default store
