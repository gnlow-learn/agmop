type Vertex = string

type G = {
    v: Set<Vertex>
    a: Set<[Vertex, Vertex]>
    t: (v: Vertex) => "and" | "or"
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
            t: x => g1.t(x) || g2.t(x),
            r: s,
        }), {
            v: new Set(s),
            a: new Set(),
            t: g.t,
            r: s,
        })


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
