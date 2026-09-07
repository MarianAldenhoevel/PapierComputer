// Ein Eingabefeld für eine Zahl für einen Registerwert. Die Besonderheit ist, dass hier
// eine beliebige Ziffer über den vorhandenen Wert eingegeben werden kann. Bei der direkten
// Eingabe in das Registerfeld kann man sonst nicht von 0 -> 4 gehen, sondern muss 0 -> 04 sagen.
import { useState } from "react";
import type { RegisterName } from "./engine/Machine";

interface RegisterInputProps {
  name: RegisterName;
  value: number;
  onChange: (name: RegisterName, value: number) => void;
}

export function RegisterInput({ name, value, onChange }: RegisterInputProps) {
  const [text, setText] = useState(String(value));
  const [lastSeenValue, setLastSeenValue] = useState(value);

  if (value !== lastSeenValue) {
    setLastSeenValue(value);
    setText(String(value));
  }

  return (
    <input
      type="number"
      value={text}
      onChange={(e) => {
        const raw = e.target.value;
        setText(raw);
        const parsed = parseInt(raw, 10);
        onChange(name, isNaN(parsed) ? 0 : parsed);
      }}
    />
  );
}