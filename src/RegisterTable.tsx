import { REGISTER_NAMES, type Registers, type RegisterName } from "./engine/Machine";
import { RegisterInput } from "./RegisterInput";
import { MatchDisplay } from "./MatchDisplay";

interface RegisterTableProps {
  registers: Registers;
  onChange: (name: RegisterName, value: number) => void;
}

export function RegisterTable({ registers, onChange }: RegisterTableProps) {
  return (
    <table className="machine_registers">
      <thead>
        <tr>
            <th className="col_name">Name</th>
            <th className="col_value">Value</th>
            <th className="col_matches"></th>
        </tr>
      </thead>
      <tbody>
        {REGISTER_NAMES.map((name) => (
          <tr key={name}>
            <td className="col_name">{name}</td>
            <td className="col_value"><RegisterInput name={name} value={registers[name]} onChange={onChange} /></td>
            <td className="col_matches"><MatchDisplay seed={name} count={registers[name]} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}