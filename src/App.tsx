// MAIN. Verwendet den usePaperComputer-Hook und baut alle Komponenten zur UI zusammen.
import { usePaperComputer } from "./usePaperComputer";
import { Panel } from "./Panel";
import { ControlPanel } from "./ControlPanel";
import { ProgramTable } from "./ProgramTable";
import { RegisterTable } from "./RegisterTable";
import { AssemblerPanel } from "./AssemblerPanel";
import { AboutSection } from "./AboutSection";
import { LevelUpSection } from "./LevelUpSection";

export default function App() {
  const pc = usePaperComputer();

  return (
    <div className="page">
      <header>
        <h1>Papiercomputer</h1>
      </header>

      <AboutSection />

      <Panel title="Control panel">
        <ControlPanel
          isRunning={pc.isRunning}
          status={pc.state.status}
          fault={pc.state.fault}
          delay={pc.delay}
          onStep={pc.step}
          onRun={pc.run}
          onPause={pc.pause}
          onReset={pc.reset}
          onDelayChange={pc.setDelay}
        />
      </Panel>

      <div className="machine-grid">
        <Panel title="Program" className="machine_program">
          <ProgramTable
            program={pc.state.program}
            pc={pc.state.pc}
            rowCount={pc.visibleRows}
            onChange={pc.setCommand}
          />
        </Panel>

        <Panel title="Registers" className="machine_registers">
          <RegisterTable registers={pc.state.registers} onChange={pc.setRegister} />
        </Panel>
      </div>

      <LevelUpSection />

      <AssemblerPanel error={pc.assemblerError} onAssemble={pc.assembleSource} />
    </div>
  );
}