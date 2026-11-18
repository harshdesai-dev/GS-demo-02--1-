import { useEffect } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { trackPageView } from './analytics';

interface PageSeoOptions {
  title: string;
  description: string;
  path: string;
}

function setMetaTag(selector: string, attribute: 'name' | 'property', key: string, content: string): void {
  let tag = document.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

export function usePageSeo({ title, description, path }: PageSeoOptions): void {
  useEffect(() => {
    const fullTitle = title.includes(SITE_CONFIG.brand.name)
      ? title
      : `${title} – ${SITE_CONFIG.brand.name}`;

    document.title = fullTitle;
    setMetaTag('meta[name="description"]', 'name', 'description', description);
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    const configuredSiteUrl = import.meta.env.VITE_SITE_URL?.trim().replace(/\/$/, '');
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (configuredSiteUrl) {
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', `${configuredSiteUrl}${path}`);
      setMetaTag('meta[property="og:url"]', 'property', 'og:url', `${configuredSiteUrl}${path}`);
    } else {
      canonical?.remove();
    }

    trackPageView(path, fullTitle);
  }, [title, description, path]);
}
