interface ProgramTableProps {
    program: string[];
    pc: number;
    rowCount: number;
    onChange: (addr: number, cmd: string) => void;
}

export function ProgramTable({ program, pc, rowCount, onChange }: ProgramTableProps) {
  return (
    <table className="machine_program">
      <thead>
        <tr>
          <th className="col_addr">Addr</th>
          <th className="col_cmd">Command</th>
          <th className="col_pen"></th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rowCount }, (_, addr) => (
          <tr key={addr} className={addr === pc ? "pc" : undefined}>
            <td className="col_addr">{addr}</td>
            <td className="col_cmd">
              <input
                type="text"
                className="code"
                value={program[addr] ?? ""}
                onChange={(e) => onChange(addr, e.target.value)}
              />
            </td>
            <td className="col_pen">
              {addr === pc && (
                <img src="/pen.png" alt="Programmzeiger" className="pen-icon" />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}