import { MF, PMF } from "./src/util.ts";

type Vertex = { p: string, t: "and" | "or" }

type G = {
    v: Set<Vertex>
    a: Set<[Vertex, Vertex]>
    r: Vertex
}

const ch =
(g: G) =>
(n: Vertex) =>
    g.a.values()
        .filter(([from]) => from == n)
        .map(([, to]) => to)

const subgraph =
(g: G) =>
(s: Vertex): G =>
    ch(g)(s)
        .map(subgraph(g))
        .reduce((g1, g2) => ({
            v: g1.v.union(g2.v),
            a: g1.a.union(g2.a).add([g1.r, g2.r]),
            r: s,
        }), {
            v: new Set([s]),
            a: new Set(),
            r: s,
        })
    
const Hs: (s: Vertex, g: G) => PMF<number> = 0 as any // todo
const PSIs = (s: Vertex, g: G) => 0 // todo

const Gs =
(s: Vertex, g: G) =>
    s.t == "and"
        ? MF.prod(...ch(g)(s).map(s_ => Hs(s_, g)))
        : MF.sum(...ch(g)(s).map(s_ => Hs(s_, g).mul(PSIs(s_, g))))
/*
const gs = subgraph({
    v: new Set(["a", "b", "c", "d", "e"]),
    a: new Set([
        ["a", "b"], ["a", "c"],
        ["b", "d"],
        ["d", "e"],
    ]),
    t: _ => "or",
    r: "a",
})("b")

console.log(gs)
*/
