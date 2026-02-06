'use client';

import { useMemo } from 'react';
import Image from 'next/image';

export default function BlogPost({ post }) {
  const featured = post._embedded?.['wp:featuredmedia']?.[0];
  const author = post._embedded?.author?.[0];

  const toc = useMemo(() => {
    if (!post.content?.rendered) return [];
    const headings = [];
    const regex = /<h[2-3][^>]*id="([^"]*)"[^>]*>([^<]+)<\/h[2-3]>/g;
    let match;
    while ((match = regex.exec(post.content.rendered)) !== null) {
      headings.push({
        id: match[1],
        text: match[2].replace(/<[^>]*>/g, ''),
        level: parseInt(match[0][2]),
      });
    }
    return headings;
  }, [post.content?.rendered]);

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
        <div className="post-toc mb-4">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h5 className="mb-0">Table of Contents</h5>
            <button
              className="btn btn-sm btn-outline-primary toc-toggle"
              data-bs-toggle="collapse"
              data-bs-target="#tocList"
            >
              Hide
            </button>
          </div>
          <div id="tocList" className="collapse show">
            <ul className="toc-list list-unstyled mt-2">
              {toc.map((heading) => (
                <li key={heading.id} style={{ marginLeft: `${(heading.level - 2) * 1.25}rem` }}>
                  <a href={`#${heading.id}`} className="toc-link">
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="post-content mb-5" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />

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
