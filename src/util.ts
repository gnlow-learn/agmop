export class MF<T> {
    p
    constructor(p = new Map<T, number>) {
        this.p = p
    }
}

export class PMF<T> extends MF<T> {
    add(k: T, p: number) {
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
