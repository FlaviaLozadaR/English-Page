import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  type?: string;
}

export function SEO({
  title = 'English Learning Platform - Aprende Inglés Online',
  description = 'Plataforma completa para aprender inglés con ejercicios de reading, vocabulario, gramática, quizzes interactivos y práctica guiada.',
  keywords = 'aprender inglés, english learning, vocabulario inglés, gramática inglesa, reading comprehension',
  ogImage = 'https://english-learning-platform.com/og-image.jpg',
  canonical = 'https://english-learning-platform.com/',
  type = 'website'
}: SEOProps) {
  
  useEffect(() => {
    // Update title
    document.title = title;
    
    // Update or create meta tags
    updateMetaTag('name', 'description', description);
    updateMetaTag('name', 'keywords', keywords);
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:image', ogImage);
    updateMetaTag('property', 'og:type', type);
    updateMetaTag('property', 'og:url', canonical);
    updateMetaTag('property', 'twitter:title', title);
    updateMetaTag('property', 'twitter:description', description);
    updateMetaTag('property', 'twitter:image', ogImage);
    
    // Update canonical link
    updateCanonicalLink(canonical);
  }, [title, description, keywords, ogImage, canonical, type]);
  
  return null;
}

function updateMetaTag(attribute: string, key: string, content: string) {
  let element = document.querySelector(`meta[${attribute}="${key}"]`);
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  
  element.setAttribute('content', content);
}

function updateCanonicalLink(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  
  link.href = url;
}
