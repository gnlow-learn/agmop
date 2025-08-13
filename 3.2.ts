// 3.2 N-Gram Models with DP-Backoff

type Char = string
type T_star = Char[]

const START = Symbol("START")
type START = typeof START
const STOP = Symbol("STOP")
type STOP = typeof STOP

type U = [START, ...T_star]
type Char_ = START | Char | STOP
type Str = Char_[]

const hd =
(alpha: Str) =>
    alpha[0]

const tl =
(alpha: Str) =>
    alpha.slice(1)

const H =
(u: U) =>
(alpha: Char_) => {
    console.log("H(", u, alpha, ")")
    return 0.1
}

const f =
(n: number) =>
(u: U) =>
    u.slice(-(n-1)) as U | T_star

const K =
(N: number, u: U) =>
(alpha: Str): number =>
    alpha.length == 0
        ? 1
        : H(f(N)(u) as U)(hd(alpha))*K(N, [...u, hd(alpha)] as U)
            (tl(alpha))


console.log(
    K(3, [START])(["a", "b", STOP])
)
