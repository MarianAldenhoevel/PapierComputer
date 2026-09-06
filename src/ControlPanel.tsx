interface ControlPanelProps {
    isRunning: boolean;
    status: string;
    fault: string;
    delay: number;
    onStep: () => void;
    onRun: () => void;
    onPause: () => void;
    onReset: () => void;
    onDelayChange: (delay: number) => void;
}

export function ControlPanel({
    isRunning,
    status,
    fault,
    delay,
    onStep,
    onRun,
    onPause,
    onReset,
    onDelayChange
}: ControlPanelProps) {
    return (
        <div className="control-bar">
            <button className="btn" onClick={onStep} disabled={isRunning  || status==='faulted' || status==='stopped'}>Step</button>
            <button className="btn" onClick={onRun} disabled={isRunning || status==='faulted' || status==='stopped'}>Run</button>
            <button className="btn" onClick={onPause} disabled={!isRunning}>Pause</button>
            <button className="btn" onClick={onReset}>Reset</button>

            <span className="control">
                step delay{" "}
                <input
                    type="number"
                    min={0}
                    step={5}
                    value={delay}
                    onChange={(e) => onDelayChange(Math.max(0, parseInt(e.target.value, 10) || 0))}
                />{" "}
                ms
            </span>

            {status==='stopped' && <span className="control">Status: {status}</span>}
            {fault && <span className="control error">{fault}</span>}
        </div>
    );
}