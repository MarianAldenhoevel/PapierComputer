import { jitter, seedOf } from "./seededJitter";
import { publicUrl } from "./publicUrl";

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
  const safeCount = Math.max(0, Math.min(count, 99)); // Nur zwischen 0 un 99 Streichhölzer rendern.
  const base = seedOf(seed);
  const matchIndices = Array.from({ length: safeCount }, (_, i) => i);

  return (
    <div className="match-display" aria-label={`${safeCount} Streichhölzer`}>
      {chunk(matchIndices, GROUP_SIZE).map((group, groupIndex) => (
        <div className="match-group" key={groupIndex}>
          {group.map((matchIndex, posInGroup) => {
            const s = base + matchIndex * 101;
            const isDiagonal = group.length === GROUP_SIZE && posInGroup === GROUP_SIZE - 1;

            if (isDiagonal) {
              return (
                <img
                  key={matchIndex}
                  src={publicUrl("match.png")}
                  alt=""
                  className="match match-diagonal"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${45 + jitter(s, 8)}deg)`,
                  }}
                />
              );
            }

            return (
              <img
                key={matchIndex}
                src={publicUrl("match.png")}
                alt=""
                className="match"
                style={{
                  transform: `translate(${jitter(s, 2)}px, ${jitter(s + 1, 2)}px) rotate(${jitter(s + 2, 10)}deg)`,
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}