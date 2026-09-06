export type AssembleResult =
    | { ok: true; program: string[] }
    | { ok: false; error: string };

export function assemble(
    sourceLines: string[],
    validRegisterNames: readonly string[],
): AssembleResult {
    // Remove comments
    const lines = sourceLines.map((line) => {
        const i = line.indexOf(";");
        return (i !== -1 ? line.substring(0, i) : line).trim();
    });

    const labels: Record<string, number> = {};
    let addr = 0;

    for (let i = 0; i < lines.length; i++) {
        const tokens = lines[i].split(" ", 3);
        if (tokens.length && tokens[0].endsWith(":")) {
        const label = tokens[0].slice(0, -1);

        if (validRegisterNames.includes(label)) {
            return { ok: false, error: `Line ${i}: Label "${label}" matches a machine register name` };
        }
        if (!isNaN(parseInt(label, 10))) {
            return { ok: false, error: `Line ${i}: Number "${label}" not valid as label name` };
        }

        labels[label] = addr;
        tokens.shift();
        lines[i] = tokens.join(" ");
        }
        if (lines[i]) addr += 1;
    }

    const program: string[] = [];
    for (let i = 0; i < lines.length; i++) {
        if (!lines[i]) continue;
        const tokens = lines[i].split(" ", 2);
        if (tokens[0].toLowerCase() === "jmp" && tokens.length > 1 && isNaN(parseInt(tokens[1], 10))) {
        const label = tokens[1];
        if (!(label in labels)) {
            return { ok: false, error: `Line ${i}: Unknown label "${label}"` };
        }
        program.push(`jmp ${labels[label]}`);
        } else {
        program.push(lines[i]);
        }
    }

    return { ok: true, program };
}