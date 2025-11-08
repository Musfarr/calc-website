import { Fragment, useMemo, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import Layout from '../components/Layout';

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const assignHeadingId = (heading, idTracker, fallbackIndex) => {
  let id = heading.getAttribute('id');

  if (!id) {
    const nestedWithId = heading.querySelector('[id]');
    if (nestedWithId) {
      id = nestedWithId.getAttribute('id');
      heading.setAttribute('id', id);
    }
  }

  if (!id) {
    const baseText = heading.textContent.replace(/\s+/g, ' ').trim();
    const baseId = slugify(baseText) || `section-${fallbackIndex}`;
    let uniqueId = baseId;
    let suffix = 1;
    while (idTracker.has(uniqueId)) {
      uniqueId = `${baseId}-${suffix++}`;
    }
    id = uniqueId;
    heading.setAttribute('id', id);
  }

  if (idTracker.has(id)) {
    const baseId = slugify(id) || `section-${fallbackIndex}`;
    let uniqueId = baseId;
    let suffix = 1;
    while (idTracker.has(uniqueId)) {
      uniqueId = `${baseId}-${suffix++}`;
    }
    id = uniqueId;
    heading.setAttribute('id', id);
  }

  idTracker.set(id, true);
  return id;
};

const buildTocTree = (items) => {
  if (!items.length) {
    return [];
  }

  const root = [];
  const stack = [{ level: 1, children: root }];

  items.forEach((item) => {
    const node = { ...item, children: [] };
    while (stack.length && item.level <= stack[stack.length - 1].level) {
      stack.pop();
    }
    stack[stack.length - 1].children.push(node);
    stack.push({ level: item.level, children: node.children });
  });

  return root;
};

const processPostContent = (html) => {
  if (!html) {
    return { content: '', toc: [] };
  }

  if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
    return { content: html, toc: [] };
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  doc.querySelectorAll('#ez-toc-container').forEach((node) => node.remove());

  const idTracker = new Map();
  const headingElements = Array.from(doc.querySelectorAll('h2, h3, h4'));

  const headingItems = headingElements
    .map((heading, index) => {
      const text = heading.textContent.replace(/\s+/g, ' ').trim();
      if (!text) {
        return null;
      }

      const level = Number(heading.tagName.replace('H', ''));
      const id = assignHeadingId(heading, idTracker, index + 1);

      return { id, text, level };
    })
    .filter(Boolean);

  const cleanedHtml = doc.body.innerHTML || html;

  return {
    content: cleanedHtml,
    toc: buildTocTree(headingItems),
  };
};

function TocList({ items }) {
  if (!items?.length) {
    return null;
  }

  return (
    <ol className="list-unstyled mb-0 toc-list">
      {items.map((item) => (
        <li key={item.id} className={`mb-2 toc-level-${item.level}`}>
          <a href={`#${item.id}`} className="toc-link">
            {item.text}
          </a>
          {item.children?.length ? <TocList items={item.children} /> : null}
        </li>
      ))}
    </ol>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const [isTocOpen, setIsTocOpen] = useState(true);

  const location = useLocation();
  console.log(location, 'loc')
  const tocListId = useMemo(() => (slug ? `toc-list-${slug}` : 'post-toc-list'), [slug]);

  const fetchPost = async () => {
    const response = await axios.get(
      `https://wp-calc-blog.page.gd/wp-json/wp/v2/posts?slug=${slug}&_embed`
    );
    return response.data[0]; // WordPress returns an array, get first item
  };

  const { data: post, isLoading, isError, error } = useQuery({
    queryKey: ['post', slug],
    queryFn: fetchPost,
  });

  const meta = post?.yoast_head_json;

  const robotsContent = useMemo(() => {
    if (!meta?.robots) {
      return null;
    }
    const parts = Object.entries(meta.robots)
      .map(([key, value]) => {
        if (!value) {
          return null;
        }
        if (key === 'index' || key === 'follow') {
          return value;
        }
        return String(value);
      })
      .filter(Boolean);
    return parts.length ? parts.join(', ') : null;
  }, [meta]);

  const schemaJson = useMemo(() => {
    if (!meta?.schema) {
      return null;
    }
    try {
      return JSON.stringify(meta.schema);
    } catch (err) {
      return null;
    }
  }, [meta]);

  const ogImages = meta?.og_image || [];

  const { content: processedContent, toc } = useMemo(
    () => processPostContent(post?.content?.rendered),
    [post?.content?.rendered]
  );

  const author = useMemo(() => {
    const authorData = post?._embedded?.author?.[0];
    if (!authorData) {
      return null;
    }

    const avatarUrls = authorData.avatar_urls || {};
    const avatar = avatarUrls['96'] || avatarUrls['48'] || avatarUrls['24'] || null;

    return {
      name: authorData.name || 'Author',
      description: authorData.description || '',
      url: 'https://www.linkedin.com/in/mudassir-ahmed-0991261b9',
      avatar,
    };
  }, [post]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getFeaturedImage = (post) => {
    if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
      return post._embedded['wp:featuredmedia'][0].source_url;
    }
    return 'https://via.placeholder.com/800x400/6c757d/ffffff?text=Blog+Post';
  };

  return (
    <Fragment>
      <Helmet>
        <title>{meta?.title || post?.title?.rendered || 'Blog Post'}</title>
        {meta?.description ? (
          <meta name="description" content={meta.description} />
        ) : null}
        {robotsContent ? <meta name="robots" content={robotsContent} /> : null}
        {meta?.og_locale ? <meta property="og:locale" content={meta.og_locale} /> : null}
        {meta?.og_type ? <meta property="og:type" content={meta.og_type} /> : null}
        {meta?.og_title ? <meta property="og:title" content={meta.og_title} /> : null}
        {meta?.og_description ? (
          <meta property="og:description" content={meta.og_description} />
        ) : null}
        {meta?.og_url ? <meta property="og:url" content={meta.og_url} /> : null}
        {meta?.og_site_name ? (
          <meta property="og:site_name" content={meta.og_site_name} />
        ) : null}
        {meta?.article_published_time ? (
          <meta property="article:published_time" content={meta.article_published_time} />
        ) : null}
        {meta?.article_modified_time ? (
          <meta property="article:modified_time" content={meta.article_modified_time} />
        ) : null}
        {ogImages.map((image) => {
          if (!image?.url) {
            return null;
          }
          return (
            <Fragment key={image.url}>
              <meta property="og:image" content={image.url} />
              {image.width ? <meta property="og:image:width" content={String(image.width)} /> : null}
              {image.height ? <meta property="og:image:height" content={String(image.height)} /> : null}
              {image.type ? <meta property="og:image:type" content={image.type} /> : null}
            </Fragment>
          );
        })}
        {meta?.author ? <meta name="author" content={meta.author} /> : null}
        {meta?.twitter_card ? <meta name="twitter:card" content={meta.twitter_card} /> : null}
        {meta?.twitter_misc?.['Written by'] ? (
          <meta name="twitter:label1" content="Written by" />
        ) : null}
        {meta?.twitter_misc?.['Written by'] ? (
          <meta name="twitter:data1" content={meta.twitter_misc['Written by']} />
        ) : null}
        {meta?.twitter_misc?.['Est. reading time'] ? (
          <meta name="twitter:label2" content="Est. reading time" />
        ) : null}
        {meta?.twitter_misc?.['Est. reading time'] ? (
          <meta name="twitter:data2" content={meta.twitter_misc['Est. reading time']} />
        ) : null}
        {schemaJson ? (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson }} />
        ) : null}
        <link rel="canonical" href={'https://www.finalgradescalculator.com' +   location?.pathname} />
      </Helmet>
      <Layout title={post?.title.rendered || 'Blog Post'}>
        <div className="calculator-container">
          {/* Back to Blog Link */}
          <Link to="/blog/" className="btn btn-outline-secondary mb-4">
            ← Back to Blog
          </Link>

          {isLoading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {isError && (
            <div className="alert alert-danger">
              <strong>Error loading post:</strong> {error.message}
            </div>
          )}

          {post && (
            <article>
            {/* Post Header */}
            <header className="mb-4">
              <h1 className="mb-3 text-white">{post.title.rendered}</h1>
              <p className="text-muted">
                <small>Published on {formatDate(post.date)}</small>
              </p>
            </header>

            {/* Featured Image */}
            <img
              src={getFeaturedImage(post)}
              alt={post.title.rendered}
              className="img-fluid rounded mb-4"
              style={{ objectFit: 'cover', width: '100%' }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x400/6c757d/ffffff?text=Blog+Post';
              }}
            />

            {toc.length > 0 && (
              <nav className="post-toc mb-4 p-4 bg-light rounded">
                <div className="d-flex justify-content-between align-items-start mb-3 gap-3">
                  <h2 className="h5 text-dark mb-0">Table of Contents</h2>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary toc-toggle"
                    onClick={() => setIsTocOpen((prev) => !prev)}
                    aria-expanded={isTocOpen}
                    aria-controls={tocListId}
                  >
                    {isTocOpen ? 'Hide' : 'Show'}
                  </button>
                </div>
                {isTocOpen && (
                  <div id={tocListId}>
                    <TocList items={toc} />
                  </div>
                )}
              </nav>
            )}

            {/* Post Content */}
            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: processedContent || post.content.rendered }}
            />

            {author && (
              <section className="author-bio mt-5">
                <div className="d-flex flex-column flex-md-row align-items-start gap-3">
                  {author.avatar && (
                    <img
                      className="author-avatar"
                      src={author.avatar}
                      alt={author.name}
                      loading="lazy"
                    />
                  )}
                  <div>
                    <h3 className="author-heading">About the author</h3>
                    {author.url ? (
                      <a href={author.url} className="author-name" target="_blank" rel="noopener noreferrer">
                        {author.name}
                      </a>
                    ) : (
                      <p className="author-name mb-2">{author.name}</p>
                    )}
                    {author.description && (
                      <p
                        className="author-description mb-0"
                        dangerouslySetInnerHTML={{ __html: author.description }}
                      />
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* Back to Blog Link (bottom) */}
            <div className="mt-5 pt-4 border-top">
              <Link to="/blog/" className="btn btn-outline-secondary">
                ← Back to Blog
              </Link>
            </div>
            </article>
          )}
        </div>
      </Layout>
    </Fragment>
  );
}
