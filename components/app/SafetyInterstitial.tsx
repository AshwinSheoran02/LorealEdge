"use client";

interface SafetyInterstitialProps {
  onContinue: () => void;
  onBack: () => void;
}

export function SafetyInterstitial({
  onContinue,
  onBack,
}: SafetyInterstitialProps) {
  return (
    <div className="min-h-dvh bg-cream flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <h2 className="text-display-lg text-forest mb-6">
          Worth seeing a dermatologist.
        </h2>
        <p className="text-body-lg text-stone mb-10 leading-relaxed">
          What you&apos;ve described can have a medical cause — patchy loss,
          scalp pain and a rapidly widening part are things a doctor should look
          at. A scalp routine can sit alongside that, but it shouldn&apos;t
          replace it.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={onContinue}
            className="px-6 py-3 bg-sage text-cream rounded-sm font-body text-sm font-medium hover:bg-sage-light transition-colors"
          >
            I understand, show my routine
          </button>
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 text-stone hover:text-forest font-body text-sm transition-colors"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
