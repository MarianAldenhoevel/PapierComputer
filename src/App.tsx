import { usePaperComputer } from "./usePaperComputer";
import { Panel } from "./Panel";
import { ControlPanel } from "./ControlPanel";
import { ProgramTable } from "./ProgramTable";
import { RegisterTable } from "./RegisterTable";
import { AssemblerPanel } from "./AssemblerPanel";
import { AboutSection } from "./AboutSection";
import { LevelUpSection } from "./LevelUpSection";

function App() {
  const pc = usePaperComputer();

  return (
    <div className="page">
      <header>
        <h1>Paper Computer</h1>
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
        <Panel title="Program" className="machine-program">
          <ProgramTable
            program={pc.state.program}
            pc={pc.state.pc}
            rowCount={pc.visibleRows}
            onChange={pc.setCommand}
          />
        </Panel>

        <Panel title="Registers" className="machine-registers">
          <RegisterTable registers={pc.state.registers} onChange={pc.setRegister} />
        </Panel>
      </div>

      <LevelUpSection />

      <AssemblerPanel error={pc.assemblerError} onAssemble={pc.assembleSource} />
    </div>
  );
}

export default App;