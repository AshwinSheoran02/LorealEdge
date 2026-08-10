interface SafetyBannerProps {
  reasons: string[];
  thyroidNote?: boolean;
  pregnancyNote?: boolean;
}

export function SafetyBanner({
  reasons,
  thyroidNote,
  pregnancyNote,
}: SafetyBannerProps) {
  return (
    <div className="space-y-3">
      {reasons.length > 0 && (
        <div className="bg-terracotta/8 border border-terracotta/20 rounded-md p-5">
          <p className="text-body text-forest font-medium mb-1">
            Worth seeing a dermatologist.
          </p>
          <p className="text-body text-stone">
            What you&apos;ve described — {reasons.join(", ")} — can have a
            medical cause. A scalp routine can sit alongside medical care, but
            it should not replace it.
          </p>
        </div>
      )}
      {thyroidNote && (
        <div className="bg-sage/8 border border-sage/20 rounded-md p-5">
          <p className="text-body text-stone">
            Thyroid and PCOS both affect hair. Your routine still helps the
            scalp, but the underlying cause is worth managing with your doctor.
          </p>
        </div>
      )}
      {pregnancyNote && (
        <div className="bg-sage/8 border border-sage/20 rounded-md p-5">
          <p className="text-body text-stone">
            We&apos;ve left the salicylic acid scrub out — worth clearing any
            active with your doctor first.
          </p>
        </div>
      )}
    </div>
  );
}
