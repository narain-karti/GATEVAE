import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
}

export function useSEO({ title, description }: SEOProps) {
  useEffect(() => {
    // Update the document title
    document.title = `${title} | GATEVAE`;

    // Update the meta description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      } else {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        metaDescription.setAttribute('content', description);
        document.head.appendChild(metaDescription);
      }
    }

    // Cleanup function to reset title if necessary (optional, but good practice for SPAs)
    // For this app, setting it on mount is usually sufficient, as the next page will overwrite it.
  }, [title, description]);
}
