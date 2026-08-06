import { DiscussionEmbed } from 'disqus-react';

export function DisqusComments() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-8">
      <DiscussionEmbed
        shortname="jrp-crew-brickmine"
        config={{
          url: window.location.href,
          identifier: window.location.pathname,
          title: "JRP Crew - Brickmine",
        }}
      />
    </div>
  );
}
