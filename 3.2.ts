// 3.2 N-Gram Models with DP-Backoff

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

const H =
(u: Str) =>
(alpha: Char_) => {
    console.log("H(", u, alpha, ")")
    return 0.1
}

const f =
(n: number) =>
(u: Str) =>
    u.slice(-(n-1)) as Str

const K =
(N: number, u: Str) =>
(alpha: Str): number =>
    alpha.length == 0
        ? 1
        : H(f(N)(u))(hd(alpha))*K(N, [...u, hd(alpha)])
            (tl(alpha))


console.log(
    K(3, [START])(["a", "b", STOP])
)
