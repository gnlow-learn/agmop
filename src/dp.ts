import { beta, uniform } from "./deps.ts"

import { PMF } from "./util.ts"

export const gem =
function* (a: number, seed = Math.random()) {
    let b = 1
    const seededBeta = beta.factory({ seed })
    while (1) {
        const v = seededBeta(1, a)
        yield v * b
        b *= (1-v)
    }
}

export const dp =
<T>
(
    a: number,
    h: (seed: number) => T,
    sample = 1000,
    seed = Math.random(),
) => {
    const pmf = new PMF<T>()
    const rand = uniform.factory({ seed })
    gem(a, seed)
        .take(sample)
        .forEach(b => {
            const k = h(rand(0, 1))
            pmf.set(k, (pmf.p.get(k) || 0) + b)
        })
    return pmf
}
