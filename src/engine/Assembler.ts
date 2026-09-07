// Implementiert den Assembler für die Maschine. Gegenüber der reinen Maschinensprache
// werden Labels und Kommentare unterstützt und bei der Assemblierung aufgelöst.

// Ergebnis einer Assemblierung ist entweder ein Programm in Maschinensprache oder 
// eine Fehlermeldung.
export type AssembleResult =
    | { ok: true; program: string[] }
    | { ok: false; error: string };

// Hauptfunktion des Assemblers.
export function assemble(
    sourceLines: string[],
    validRegisterNames: readonly string[],
): AssembleResult {
    // Kommentare ausfiltern.
    const lines = sourceLines.map((line) => {
        const i = line.indexOf(";");
        return (i !== -1 ? line.substring(0, i) : line).trim();
    });

    const labels: Record<string, number> = {};
    let addr = 0;
    
    // Labels suchen und Adressen zuordnen.
    for (let i = 0; i < lines.length; i++) {
        // Höchstens drei Token: Label, Befehl, Operand.
        const tokens = lines[i].split(" ", 3);

        // Am Doppelpunkt erkennen wir ein Label. Name und Adresse merken.
        if (tokens.length && tokens[0].endsWith(":")) {
            const label = tokens[0].slice(0, -1);

            // Regel für Labelnamen durchsetzen.
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

        // Nur Zeilen mit Befehl erhöhen die Adresse.
        if (lines[i]) addr += 1;
    }

    const program: string[] = [];
    for (let i = 0; i < lines.length; i++) {
        // Leerzeile tut gar nix.
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