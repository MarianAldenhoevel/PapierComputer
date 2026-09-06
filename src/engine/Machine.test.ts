import { describe, it, expect } from "vitest";
import { Machine } from "./Machine";

describe("Machine", () => {
    it("increments a register and advances pc by one", () => {
        const m = new Machine();
        m.registers.A = 0;
        m.setCommand(0, "inc A");
        m.step();
        expect(m.registers.A).toBe(1);
        expect(m.pc).toBe(1);
    });

    it("isz skips the next instruction when the register is zero", () => {
        const m = new Machine();
        m.registers.A = 0;
        m.setCommand(0, "isz A");
        m.step();
        expect(m.pc).toBe(2);
    });

    it("dec never goes below zero", () => {
        const m = new Machine();
        m.registers.A = 0;
        m.setCommand(0, "dec A");
        m.step();
        expect(m.registers.A).toBe(0);
    });

    it("faults on an unknown opcode", () => {
        const m = new Machine();
        m.setCommand(0, "xyz A");
        m.step();
        expect(m.status).toBe("faulted");
    });
});