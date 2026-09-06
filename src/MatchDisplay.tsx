import { jitter, seedOf } from "./seededJitter";

interface MatchDisplayProps {
  seed: string;
  count: number;
}

const GROUP_SIZE = 5;

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size));
  }
  return out;
}

export function MatchDisplay({ seed, count }: MatchDisplayProps) {
  const safeCount = Math.max(0, Math.floor(count));
  const base = seedOf(seed);
  const matchIndices = Array.from({ length: safeCount }, (_, i) => i);

  return (
    <div className="match-display" aria-label={`${safeCount} Streichhölzer`}>
      {chunk(matchIndices, GROUP_SIZE).map((group, groupIndex) => (
        <div className="match-group" key={groupIndex}>
          {group.map((matchIndex) => {
            const s = base + matchIndex * 101;
            return (
              <img
                key={matchIndex}
                src="/match.png"
                alt=""
                className="match"
                style={{
                  transform: `translate(${jitter(s, 3)}px, ${jitter(s + 1, 3)}px) rotate(${jitter(s + 2, 10)}deg)`,
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}