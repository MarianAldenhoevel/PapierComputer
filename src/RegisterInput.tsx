// RegisterInput.tsx
import { useEffect, useState } from "react";
import type { RegisterName } from "./engine/Machine";

interface RegisterInputProps {
  name: RegisterName;
  value: number;
  onChange: (name: RegisterName, value: number) => void;
}

export function RegisterInput({ name, value, onChange }: RegisterInputProps) {
  const [text, setText] = useState(String(value));

  // Resync the displayed text whenever the *actual* register value changes
  // for a reason other than this input's own typing (e.g. a Step just ran).
  // This intentionally does NOT fire on every keystroke — only when `value`
  // itself changes, which is exactly the "someone else changed it" signal.
  useEffect(() => {
    setText(String(value));
  }, [value]);

  return (
    <input
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      value={text}
      onChange={(e) => {
        const raw = e.target.value;
        setText(raw); // always show exactly what was typed, no interference
        const parsed = parseInt(raw, 10);
        onChange(name, isNaN(parsed) ? 0 : parsed);
      }}
    />
  );
}