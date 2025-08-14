// 3.2 N-Gram Models with DP-Backoff

import { PMF } from "./src/util.ts"

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
        ? Hf(n-1, u).dp(theta(f(n)(u)))
        : PMF.uniform<Char_>(...T, STOP).dp(theta(f(n)(u)))

const K =
(N: number, u: Str) =>
(alpha: Str): number =>
    alpha.length == 0
        ? 1
        : (Hf(N, u).p.get(hd(alpha))||0)*K(N, [...u, hd(alpha)])
            (tl(alpha))

const k0 =
(n: number, u: Str, maxLength = 4): PMF<Str> =>
    u.slice(-1)[0] == STOP
        ? new PMF(new Map([[u, 1]]))
        :
    u.length < maxLength
        ? Hf(n, u)
            .flatMap(([k, v]) =>
                k0(n, [...u, k], maxLength)
                    .map(([str, v]) => [str, v])
                    .mul(v)
            )
            .as(PMF)
        : new PMF(new Map([[[...u, STOP], 1]]))

console.log(
    K(3, [START])(["a", "b", STOP]),
    Hf(3, [START]),
    k0(3, [START], 4)
)
