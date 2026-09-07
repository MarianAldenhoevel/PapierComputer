// Hook, der die Papiercomputer-Engine kapselt und den React-Komponenten eine einfache Schnittstelle bietet.
import { useCallback, useEffect, useRef, useState } from "react";
import { Machine, REGISTER_NAMES, type MachineRunState, type Registers, type RegisterName } from "./engine/Machine";
import { assemble } from "./engine/Assembler";

export interface MachineSnapshot {
    pc: number;
    status: MachineRunState;
    fault: string;
    registers: Registers;
    program: string[];
}

function snapshot(machine: Machine): MachineSnapshot {
    return {
        pc: machine.pc,
        status: machine.status,
        fault: machine.fault,
        registers: { ...machine.registers },
        program: [...machine.program],
    };
}

function lastFilledIndex(program: string[]): number {
    for (let i = program.length - 1; i >= 0; i--) {
        if (program[i]) return i;
    }
    return -1;
}

const MIN_VISIBLE_ROWS = 20;
const TRAILING_BLANK_ROWS = 3;

function desiredRowCount(program: string[]): number {
    return Math.max(MIN_VISIBLE_ROWS, lastFilledIndex(program) + 1 + TRAILING_BLANK_ROWS);
}

export function usePaperComputer() {
    // Die Maschine lebt in einer Ref, nicht in State. Sie ist mutable. State ist ein Snapshot der Maschine.
    const machineRef = useRef(new Machine());

    // eslint-disable-next-line react-hooks/refs
    const [state, setState] = useState<MachineSnapshot>(() =>
        snapshot(machineRef.current),
    );
    
    // eslint-disable-next-line react-hooks/refs
    const [visibleRows, setVisibleRows] = useState(() =>
        desiredRowCount(machineRef.current.program),
    );

    const [isRunning, setIsRunning] = useState(false);
    const [delay, setDelay] = useState(100);
    const [assemblerError, setAssemblerError] = useState<string | null>(null);

    const notify = useCallback(() => {
        const next = snapshot(machineRef.current);
        setState(next);
        setVisibleRows((prev) => Math.max(prev, desiredRowCount(next.program)));
    }, []);

    const step = useCallback(() => {
        machineRef.current.step();
        notify();
    }, [notify]);

    const run = useCallback(() => setIsRunning(true), []);
    const pause = useCallback(() => setIsRunning(false), []);

    const reset = useCallback(() => {
        setIsRunning(false);
        machineRef.current.warmReset();
        notify();
    }, [notify]);

    const setCommand = useCallback((addr: number, cmd: string) => {
        machineRef.current.setCommand(addr, cmd);
        notify();
    }, [notify]);

    const setRegister = useCallback((name: RegisterName, value: number) => {
        machineRef.current.setRegister(name, value);
        notify();
    }, [machineRef, notify]);

    const loadProgram = useCallback((program: string[]) => {
        machineRef.current.program = program;
        machineRef.current.warmReset();
        notify();
    }, [notify]);

    const assembleSource = useCallback((source: string) => {
        const lines = source.split("\n");
        const result = assemble(lines, REGISTER_NAMES);

        if (!result.ok) {
            setAssemblerError(result.error);
        } else {
            setAssemblerError(null);
            loadProgram(result.program);
        }
    }, [loadProgram]);

    const running = isRunning && state.status === "ok";

    useEffect(() => {
        if (!running) return;
        const id = setTimeout(step, delay);
        return () => clearTimeout(id);
    }, [running, delay, state, step]);

    return {
        state,
        visibleRows,
        isRunning: running,
        delay,
        assemblerError,
        step,
        run,
        pause,
        reset,
        setCommand,
        setRegister,
        setDelay,
        assembleSource,
    };
}