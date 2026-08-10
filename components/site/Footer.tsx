export function Footer() {
  return (
    <footer className="bg-forest-deep text-cream/60">
      <div className="content-width py-16 flex flex-col items-center gap-6 text-center">
        <p className="font-display tracking-[0.3em] uppercase font-medium text-cream">
          ROOTED
        </p>
        <p className="text-caption">A concept for L&rsquo;Or&eacute;al India</p>
        <p className="font-display italic text-sage-pale text-lg">
          Fix the Root, Not the Reel.
        </p>
        <p className="text-caption text-cream/40">
          &copy; {new Date().getFullYear()} ROOTED &middot; Concept project
        </p>
      </div>
    </footer>
  );
}
