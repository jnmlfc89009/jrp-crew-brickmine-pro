import { SAMPLE_IMAGE } from '../data';

export function SampleImage() {
  return (
    <section className="w-full text-left space-y-4">
      <h2 className="text-lg font-semibold pl-2 text-on-surface font-headline">Sample Image</h2>
      <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-outline-variant">
        <img
          src={SAMPLE_IMAGE}
          alt="Sample Lego Transformation"
          className="w-full h-auto object-cover"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </div>
    </section>
  );
}
