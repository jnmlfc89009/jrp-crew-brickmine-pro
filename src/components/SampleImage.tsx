import { SAMPLE_IMAGES } from '../data';

export function SampleImage({ src }: { src?: string }) {
  if (src) {
    return (
      <section className="w-full text-left space-y-4">
        <h2 className="text-lg font-semibold pl-2 text-on-surface font-headline">Generated Artwork</h2>
        <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-outline-variant">
          <img
            src={src}
            alt="Lego Transformation"
            className="w-full h-auto object-cover"
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="w-full text-left space-y-4">
      <h2 className="text-lg font-semibold pl-2 text-on-surface font-headline">Sample Images</h2>
      <div className="grid grid-cols-2 gap-4">
        {SAMPLE_IMAGES.map((imgSrc, index) => (
          <div key={index} className="w-full rounded-2xl overflow-hidden shadow-lg border border-outline-variant">
            <img
              src={imgSrc}
              alt={`Lego Transformation ${index + 1}`}
              className="w-full h-auto object-cover aspect-square"
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
