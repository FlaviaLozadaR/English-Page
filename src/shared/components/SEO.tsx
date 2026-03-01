import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface CourseInfo {
  name: string;
  description: string;
  provider: string;
}

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  breadcrumbs?: BreadcrumbItem[];
  faq?: FAQItem[];
  course?: CourseInfo;
  noindex?: boolean;
  alternateLanguages?: { lang: string; url: string }[];
}

export function SEO({
  title = 'English Learning Platform - Aprende Inglés Online',
  description = 'Plataforma completa para aprender inglés con ejercicios de reading, vocabulario, gramática, quizzes interactivos y práctica guiada.',
  keywords = 'aprender inglés, english learning, vocabulario inglés, gramática inglesa, reading comprehension',
  ogImage = 'https://english-learning-platform.com/og-image.jpg',
  canonical = 'https://english-learning-platform.com/',
  type = 'website',
  author = 'English Learning Platform',
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  breadcrumbs = [],
  faq = [],
  course,
  noindex = false,
  alternateLanguages = []
}: SEOProps) {
  
  const siteName = 'English Learning Platform';
  const twitterHandle = '@englishlearning';
  
  // Generate structured data
  const generateStructuredData = () => {
    const structuredData: any[] = [];

    // Organization Schema
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: siteName,
      url: 'https://english-learning-platform.com',
      logo: 'https://english-learning-platform.com/logo.png',
      sameAs: [
        'https://facebook.com/englishlearningplatform',
        'https://twitter.com/englishlearning',
        'https://instagram.com/englishlearningplatform',
        'https://linkedin.com/company/englishlearningplatform'
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        availableLanguage: ['Spanish', 'English'],
        email: 'contact@english-learning-platform.com'
      }
    });

    // WebSite Schema with SearchAction
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      url: 'https://english-learning-platform.com',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://english-learning-platform.com/search?q={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      }
    });

    // Breadcrumb Schema
    if (breadcrumbs.length > 0) {
      structuredData.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url
        }))
      });
    }

    // FAQ Schema
    if (faq.length > 0) {
      structuredData.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer
          }
        }))
      });
    }

    // Course Schema
    if (course) {
      structuredData.push({
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: course.name,
        description: course.description,
        provider: {
          '@type': 'Organization',
          name: course.provider,
          sameAs: 'https://english-learning-platform.com'
        },
        educationalLevel: 'Beginner to Advanced',
        inLanguage: ['es', 'en'],
        availableLanguage: ['Spanish', 'English'],
        isAccessibleForFree: true,
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'online',
          courseWorkload: 'PT10H'
        }
      });
    }

    // Article Schema (for content pages)
    if (type === 'article' && publishedTime) {
      structuredData.push({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: description,
        image: ogImage,
        datePublished: publishedTime,
        dateModified: modifiedTime || publishedTime,
        author: {
          '@type': 'Organization',
          name: author
        },
        publisher: {
          '@type': 'Organization',
          name: siteName,
          logo: {
            '@type': 'ImageObject',
            url: 'https://english-learning-platform.com/logo.png'
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonical
        }
      });
    }

    return structuredData;
  };

  const structuredData = generateStructuredData();
  const robotsContent = noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  useEffect(() => {
    // Update title
    document.title = title;
    
    // Update or create meta tags
    updateMetaTag('name', 'description', description);
    updateMetaTag('name', 'keywords', keywords);
    updateMetaTag('name', 'author', author);
    updateMetaTag('name', 'robots', robotsContent);
    updateMetaTag('name', 'googlebot', robotsContent);
    
    // Open Graph
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:image', ogImage);
    updateMetaTag('property', 'og:image:width', '1200');
    updateMetaTag('property', 'og:image:height', '630');
    updateMetaTag('property', 'og:image:alt', title);
    updateMetaTag('property', 'og:type', type);
    updateMetaTag('property', 'og:url', canonical);
    updateMetaTag('property', 'og:site_name', siteName);
    updateMetaTag('property', 'og:locale', 'es_ES');
    
    // Twitter Card
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:site', twitterHandle);
    updateMetaTag('name', 'twitter:creator', twitterHandle);
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', ogImage);
    updateMetaTag('name', 'twitter:image:alt', title);
    
    // Article-specific tags
    if (type === 'article') {
      if (publishedTime) updateMetaTag('property', 'article:published_time', publishedTime);
      if (modifiedTime) updateMetaTag('property', 'article:modified_time', modifiedTime);
      if (author) updateMetaTag('property', 'article:author', author);
      if (section) updateMetaTag('property', 'article:section', section);
      tags.forEach(tag => {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'article:tag');
        meta.content = tag;
        document.head.appendChild(meta);
      });
    }
    
    // Update canonical link
    updateCanonicalLink(canonical);
    
    // Alternate languages
    alternateLanguages.forEach(alt => {
      updateAlternateLink(alt.lang, alt.url);
    });
  }, [title, description, keywords, ogImage, canonical, type, author, publishedTime, modifiedTime, robotsContent, tags, alternateLanguages]);
  
  return (
    <Helmet>
      {structuredData.map((data, index) => (
        <script key={`structured-data-${index}`} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
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

function updateAlternateLink(lang: string, url: string) {
  let link = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`) as HTMLLinkElement;
  
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'alternate');
    link.setAttribute('hreflang', lang);
    document.head.appendChild(link);
  }
  
  link.href = url;
}
