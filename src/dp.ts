// @ts-types="https://esm.sh/@stdlib/random@0.3.3/base/beta/docs/types/index.d.ts"
import beta from "https://esm.sh/@stdlib/random@0.3.3/base/beta/lib?standalone"

// @ts-types="https://esm.sh/@stdlib/random@0.3.3/base/uniform/docs/types/index.d.ts"
import uniform from "https://esm.sh/@stdlib/random@0.3.3/base/uniform/lib?standalone"

import { PMF } from "./util.ts"

const randSeed =
() =>
    Math.floor(
        Math.random() * 2**16
    )

export const gem =
function* (a: number, seed = randSeed()) {
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
    sample = 10,
    seed = randSeed(),
) => {
    const pmf = new PMF<T>()
    const rand = uniform.factory({ seed })
    gem(a, seed)
        .take(sample)
        .forEach(b => pmf.set(h(rand(0, 1)), b))
    return pmf
}
