import { useState } from "react";
import { SAMPLES } from "./samples";

interface AssemblerPanelProps {
  error: string | null;
  onAssemble: (source: string) => void;
}

export function AssemblerPanel({ error, onAssemble }: AssemblerPanelProps) {
  const [source, setSource] = useState("");

  return (
    <>
      <div className="panel">
        <div className="panel-heading assembler-heading">
          Assembler
          {error && <span className="control error">{error}</span>}
          <button className="btn assemble-button" onClick={() => onAssemble(source)}>
            übersetzen
          </button>
        </div>
        <div className="panel-body">
          <textarea
            className="code"
            rows={20}
            placeholder="Assemblerprogramm hier eingeben"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </div>
      </div>

      <h2>Beispielprogramme</h2>
      <p>
        Die Beispielprogramme sind für den PC-Assembler geschrieben und können
        direkt in ihn geladen, assembliert und dann gestartet werden.
      </p>
      <ul className="samples">
        {SAMPLES.map((sample) => (
          <li key={sample.name}>
            <button className="btn" onClick={() => setSource(sample.source)}>
              {sample.name}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}