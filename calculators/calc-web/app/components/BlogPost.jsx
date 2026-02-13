'use client';

import { useMemo, useState } from 'react';

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

export default function BlogPost({ post }) {
  const [isTocOpen, setIsTocOpen] = useState(true);
  const tocListId = useMemo(() => (post?.slug ? `toc-list-${post.slug}` : 'post-toc-list'), [post?.slug]);
  const featured = post._embedded?.['wp:featuredmedia']?.[0];
  const author = post._embedded?.author?.[0];

  const { content: processedContent, toc } = useMemo(
    () => processPostContent(post?.content?.rendered),
    [post?.content?.rendered]
  );

  return (
    <>
      {featured && (
        <div style={{ marginBottom: '2rem' }}>
          <img
            src={featured.source_url}
            alt={post.title.rendered}
            style={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          />
        </div>
      )}

      <h1>{post.title.rendered}</h1>

      {toc.length > 0 && (
        <nav className="post-toc mb-4">
          <div className="d-flex justify-content-between align-items-start mb-3 gap-3">
            <h2 className="h5 text-dark mb-0">Table of Contents</h2>
            <button
              className="btn btn-sm btn-outline-primary toc-toggle"
              type="button"
              onClick={() => setIsTocOpen(!isTocOpen)}
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

      <div className="post-content mb-5" dangerouslySetInnerHTML={{ __html: processedContent }} />

      {author && (
        <div className="author-bio">
          <div className="d-flex gap-3">
            {author.avatar_urls?.['96'] && (
              <img
                src={author.avatar_urls['96']}
                alt={author.name}
                className="author-avatar"
              />
            )}
            <div>
              <div className="author-heading">About the Author</div>
              <a href={author.link} className="author-name">
                {author.name}
              </a>
              <p className="author-description">{author.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
