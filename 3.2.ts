// 3.2 N-Gram Models with DP-Backoff

import { dp } from "./src/dp.ts"
import { uniform } from "./src/deps.ts"
import { PMF, tuple } from "./src/util.ts"

type Char = string

const START = Symbol("START")
type START = typeof START
const STOP = Symbol("STOP")
type STOP = typeof STOP

type Char_ = START | Char | STOP
type Str = Char_[]

const hd =
(alpha: Str) =>
    alpha[0]

const tl =
(alpha: Str) =>
    alpha.slice(1)

const f =
(n: number) =>
(u: Str) =>
    u.slice(-(n-1)) as Str

const theta =
(_: Str) =>
    100 // todo

const T = ["a", "b", "c"] as const

const Hf =
(n: number, u: Str): PMF<Char_> =>
    n >= 1
        ? dp(theta(f(n)(u)), Hf(n-1, u).sample)
        : dp(theta(f(n)(u)),
            seed => tuple(...T, STOP)[Math.floor(uniform.factory({ seed })(0, T.length + 1))]
        )

const K =
(N: number, u: Str) =>
(alpha: Str): number =>
    alpha.length == 0
        ? 1
        : (Hf(N, u).p.get(hd(alpha))||0)*K(N, [...u, hd(alpha)])
            (tl(alpha))

console.log(
    K(3, [START])(["a", "b", STOP])
)
