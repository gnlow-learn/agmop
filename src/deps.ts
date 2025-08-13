// @ts-types="https://esm.sh/@stdlib/random@0.3.3/base/beta/docs/types/index.d.ts"
import beta_ from "https://esm.sh/@stdlib/random@0.3.3/base/beta/lib?standalone"

// @ts-types="https://esm.sh/@stdlib/random@0.3.3/base/uniform/docs/types/index.d.ts"
import uniform_ from "https://esm.sh/@stdlib/random@0.3.3/base/uniform/lib?standalone"

const seedConvert =
(seed: number) =>
    Math.floor(seed*2**32)

export const beta = {
    ...beta_,
    factory({ seed } = { seed: Math.random() }) {
        return beta_.factory({ seed: seedConvert(seed) })
    },
}

export const uniform = {
    ...uniform_,
    factory({ seed } = { seed: Math.random() }) {
        return uniform_.factory({ seed: seedConvert(seed) })
    },
}
