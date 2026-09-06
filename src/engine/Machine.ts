export type MachineRunState = "ok" | "stopped" | "faulted";

export const REGISTER_NAMES = ["A", "B", "C", "D", "E", "F", "G", "H", "X", "Y"] as const;
export type RegisterName = (typeof REGISTER_NAMES)[number];

export type Registers = Record<RegisterName, number>;

function isRegisterName(name: string): name is RegisterName {
    return (REGISTER_NAMES as readonly string[]).includes(name);
}

function randomRegisterValue(): number {
    return Math.floor(Math.random() * 16);
}

export class Machine {
    program: string[] = [];
    registers: Registers = {} as Registers; // populated immediately by coldReset()
    pc = 0;
    fault = "";
    status: MachineRunState = "ok";

    constructor() {
        this.coldReset();
    }

    coldReset(): void {
        this.program = [];
        const registers = {} as Registers;
        for (const name of REGISTER_NAMES) {
            registers[name] = randomRegisterValue();
        }
        this.registers = registers;
        this.warmReset();
    }

    warmReset(): void {
        this.pc = 0;
        this.fault = "";
        this.status = "ok";
    }

    private setFault(reason: string): void {
        this.fault = reason;
        this.status = "faulted";
    }

    private isz(regname: string): void {
        if (!isRegisterName(regname)) {
            this.setFault(`exec: Invalid register name "${regname}"`);
            return;
        }
        this.pc += this.registers[regname] === 0 ? 2 : 1;
    }

    private inc(regname: string): void {
        if (!isRegisterName(regname)) {
            this.setFault(`exec: Invalid register name "${regname}"`);
            return;
        }
        this.registers[regname] += 1;
        this.pc += 1;
    }

    private dec(regname: string): void {
        if (!isRegisterName(regname)) {
            this.setFault(`exec: Invalid register name "${regname}"`);
            return;
        }
        if (this.registers[regname] > 0) {
            this.registers[regname] -= 1;
        }
        this.pc += 1;
    }

    private jmp(addr: string): void {
        const target = parseInt(addr, 10);
        if (isNaN(target) || target < 0) {
            this.setFault(`jmp: Invalid address "${addr}"`);
            return;
        }
        this.pc = target;
    }

    step(): void {
        if (this.status !== "ok") return;

        const cmd = this.program[this.pc];
        if (!cmd) {
            this.setFault("exec: No command");
            return;
        }

        const [opcode, operand] = cmd.trim().split(" ", 2);
        switch (opcode.toLowerCase()) {
            case "stp": this.status = "stopped"; break;
            case "isz": this.isz(operand); break;
            case "inc": this.inc(operand); break;
            case "dec": this.dec(operand); break;
            case "jmp": this.jmp(operand); break;
            default: this.setFault(`exec: Invalid opcode "${opcode}"`);
        }
    }

    setCommand(addr: number, cmd: string): void {
        this.program[addr] = cmd;
    }

    // Called from the assembler/parsed program text: name is not statically
    // known to be valid, so it stays a plain string, guarded at runtime.
    setRegisterByName(regname: string, regval: number): void {
        if (!isRegisterName(regname)) {
            this.setFault(`exec: Invalid register name "${regname}"`);
            return;
        }
        this.registers[regname] = regval;
    }

    // Called from UI code that already only ever has a real RegisterName
    // (e.g. mapped from REGISTER_NAMES) — no runtime guard needed, TS
    // guarantees this at every call site.
    setRegister(regname: RegisterName, regval: number): void {
        this.registers[regname] = regval;
    }
}