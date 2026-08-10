import type { EngineResult } from "@/lib/types";

interface RoutineTimelineProps {
  routine: EngineResult["routine"];
}

function TimelineGroup({
  title,
  steps,
}: {
  title: string;
  steps: string[];
}) {
  if (steps.length === 0) return null;

  return (
    <div className="relative pl-8 pb-8">
      <div className="absolute left-0 top-0 bottom-0 w-px bg-sage/40" />
      <div className="absolute left-[-4px] top-1 w-[9px] h-[9px] rounded-full bg-sage" />
      <h4 className="text-eyebrow text-stone mb-3">{title}</h4>
      <ul className="space-y-2">
        {steps.map((step, i) => (
          <li key={i} className="text-body text-forest">
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RoutineTimeline({ routine }: RoutineTimelineProps) {
  return (
    <div className="py-2">
      <TimelineGroup title="On wash days" steps={routine.washDays} />
      <TimelineGroup title="Nightly" steps={routine.nightly} />
      <TimelineGroup title="Once a week" steps={routine.weekly} />
    </div>
  );
}
