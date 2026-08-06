import { SAMPLE_IMAGE_PAIRS } from '../data';
import { ArrowRight } from 'lucide-react';

export function SampleImage({ src }: { src?: string }) {
  if (src) {
    return (
      <section className="w-full text-left space-y-4">
        <h2 className="text-lg font-semibold pl-2 text-on-surface font-headline">Generated Artwork</h2>
        <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-outline-variant">
          <img
            src={src}
            alt="Brick Transformation"
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
      <h2 className="text-lg font-semibold pl-2 text-on-surface font-headline">Sample Transformations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SAMPLE_IMAGE_PAIRS.map((pair, index) => (
          <div key={index} className="flex items-center justify-center gap-2 sm:gap-4">
            <div className="w-full flex-1 rounded-2xl overflow-hidden shadow-md border border-outline-variant">
              <img
                src={pair.original}
                alt={`Original ${index + 1}`}
                className="w-full h-auto object-cover aspect-square"
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-shrink-0 flex flex-col items-center justify-center bg-surface-container rounded-full p-2 sm:p-3 shadow-sm border border-outline-variant">
               <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-on-surface-variant" />
            </div>
            <div className="w-full flex-1 rounded-2xl overflow-hidden shadow-md border border-outline-variant">
              <img
                src={pair.generated}
                alt={`Brick Transformation ${index + 1}`}
                className="w-full h-auto object-cover aspect-square"
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
