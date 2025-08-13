export const tuple =
// deno-lint-ignore no-explicit-any
<Args extends any[]>
(...args: Args) =>
    args

export class MF<T> {
    p
    constructor(p = new Map<T, number>) {
        this.p = p
    }

    map<O>(f: ([k, v]: [T, number]) => [O, number]) {
        return new MF(new Map(this.p.entries().map(f)))
    }
    flatMap<O>(f: ([k, v]: [T, number]) => MF<O>) {
        return new MF(new Map(this.p.entries().flatMap(x =>
            f(x).p.entries()
        )))
    }

    mul(scalar: number) {
        return this.map(([k, v]) => [k, v*scalar])
    }

    static sum<T>(...mfs: MF<T>[]) {
        return new MF(mfs
            .values()
            .flatMap(mf => mf.p.entries())
            .reduce(
                (map, [k, v]) => map.set(k, (map.get(k) || 0) + v),
                new Map<T, number>(),
            )
        )
    }
    private static join<T>(a: MF<T[]>, ...[b, ...rest]: MF<T>[]): MF<T[]> {
        if (rest.length == 0) {
            return a.flatMap(([k1, v1]) => 
                b.map(([k2, v2]) =>
                    tuple([...k1, k2], v1*v2)
                )
            )
        }
        return MF.join(MF.join(a, b), ...rest)
    }
    static prod<T>(...[a, ...mfs]: MF<T>[]) {
        return MF.join(
            a.map(([k, v]) => [[k], v]),
            ...mfs,
        )
    }
}

export class PMF<T> extends MF<T> {
    set(k: T, p: number) {
        this.p.set(k, p)
    }

    toCMF() {
        let sum = 0
        return new CMF(this.p.entries()
            .reduce(
                (m, [k, v]) => m.set(k, sum += v),
                new Map<T, number>,
            )
        )
    }
    sample(seed = Math.random()) {
        return this.toCMF().sample(seed)
    }
}

export class CMF<T> extends MF<T> {
    sample(seed = Math.random()) {
        return this.p.entries()
            .find(([_, v]) => seed < v)!
            [0]
    }
}
