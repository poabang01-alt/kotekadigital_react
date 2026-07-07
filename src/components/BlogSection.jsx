function BlogSection({ blogPosts }) {
  return (
    <section className="blog-section" id="blog" aria-labelledby="blog-heading">
      <div className="container">
        <div className="section-heading" data-reveal>
          <span className="eyebrow">Blog</span>
          <h2 id="blog-heading">Artikel lama tetap aman dan sekarang tetap mudah diakses</h2>
          <p>
            Semua artikel penting dari website sebelumnya tetap disediakan di folder publik agar
            SEO dan link baca selengkapnya tidak hilang.
          </p>
        </div>
        <div className="card-grid card-grid-three" role="list">
          {blogPosts.map((post) => (
            <article className="blog-card" key={post.title} data-reveal role="listitem">
              <img src={post.image} alt={post.title} loading="lazy" decoding="async" />
              <div className="blog-card-body">
                <span className="blog-meta">{post.category}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <a className="button button-tertiary blog-cta" href={post.link}>
                  <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                  Baca Selengkapnya
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogSection
