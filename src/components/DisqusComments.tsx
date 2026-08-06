import { useEffect } from 'react';

export function DisqusComments() {
  useEffect(() => {
    const disqusEmbedId = 'disqus-embed-script';
    const disqusCountId = 'dsq-count-scr';
    const d = document;

    if (!d.getElementById(disqusEmbedId)) {
      const s = d.createElement('script');
      s.id = disqusEmbedId;
      s.src = 'https://jrp-crew-brickmine.disqus.com/embed.js';
      s.setAttribute('data-timestamp', new Date().getTime().toString());
      (d.head || d.body).appendChild(s);
    }

    if (!d.getElementById(disqusCountId)) {
      const countScript = d.createElement('script');
      countScript.id = disqusCountId;
      countScript.src = 'https://jrp-crew-brickmine.disqus.com/count.js';
      countScript.async = true;
      (d.head || d.body).appendChild(countScript);
    }
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-8">
      <div id="disqus_thread"></div>
      <noscript>
        Please enable JavaScript to view the{' '}
        <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
      </noscript>
    </div>
  );
}
