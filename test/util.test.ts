import { assertEquals } from "https://esm.sh/jsr/@std/assert@1.0.13"

import { MF } from "../src/util.ts"

Deno.test("MF.sum", () => {
    assertEquals(
        MF.sum(
            new MF(new Map([
                ["a", 0.6],
                ["b", 0.1],
                ["c", 0.3]
            ])),
            new MF(new Map([
                ["c", 0.8],
                ["d", 0.2],
            ])),
        ),
        new MF(new Map([
            ["a", 0.6],
            ["b", 0.1],
            ["c", 1.1],
            ["d", 0.2],
        ])),
    )
})

Deno.test("MF.prod(a, b)", () => {
    assertEquals(
        MF.prod(
            new MF(new Map([
                ["a", 0.6],
                ["b", 0.4],
            ])),
            new MF(new Map([
                ["c", 0.8],
                ["d", 0.2],
            ])),
        ),
        new MF(new Map([
            [["a", "c"], 0.6*0.8],
            [["b", "c"], 0.4*0.8],
            [["a", "d"], 0.6*0.2],
            [["b", "d"], 0.4*0.2],
        ])),
    )
})

Deno.test("MF.prod(a, b, c)", () => {
    assertEquals(
        MF.prod(
            new MF(new Map([
                ["a", 0.6],
                ["b", 0.4],
            ])),
            new MF(new Map([
                ["c", 0.8],
                ["d", 0.2],
            ])),
            new MF(new Map([
                ["e", 0.3],
                ["f", 0.7],
            ])),
        ),
        new MF(new Map([
            [["a", "c", "e"], 0.6*0.8*0.3],
            [["b", "c", "e"], 0.4*0.8*0.3],
            [["a", "d", "e"], 0.6*0.2*0.3],
            [["b", "d", "e"], 0.4*0.2*0.3],
            [["a", "c", "f"], 0.6*0.8*0.7],
            [["b", "c", "f"], 0.4*0.8*0.7],
            [["a", "d", "f"], 0.6*0.2*0.7],
            [["b", "d", "f"], 0.4*0.2*0.7],
        ])),
    )
})
