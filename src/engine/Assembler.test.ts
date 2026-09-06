import { describe, it, expect } from "vitest";
import { assemble } from "./Assembler";
import { Machine, REGISTER_NAMES } from "./Machine";

describe("Assembler", () => {
    it("rejects a label that collides with a register name", () => {
        const result = assemble(["A: inc A", "stp"], REGISTER_NAMES);
        expect(result.ok).toBe(false);
    });
    // ...rest unchanged, "REGISTER_NAMES" constant deleted from this file...
});

describe("Assembler", () => {
    it("rejects a label that collides with a register name", () => {
        const result = assemble(
            ["A: inc A", "stp"], 
            REGISTER_NAMES
        );
        expect(result.ok).toBe(false);
    });

    it("resolves jmp targets by label to addresses", () => {
        const result = assemble(
            ["start: inc A", "jmp start"], 
            REGISTER_NAMES
        );
        expect(result).toEqual({ ok: true, program: ["inc A", "jmp 0"] });
    });

    it("assembles and runs a program that clears register A", () => {
        const result = assemble(
            ["isz A", "jmp 3", "jmp 5", "dec A", "jmp 0", "stp"],
            REGISTER_NAMES
        );
        expect(result.ok).toBe(true);
        if (!result.ok) return; // narrows the type for the rest of the test

        const m = new Machine();
        m.registers.A = 7;
        m.program = result.program;

        for (let i = 0; i < 100 && m.status === "ok"; i++) {
            m.step();
        }

        expect(m.registers.A).toBe(0);
        expect(m.status).toBe("stopped");
    });
});