import BlogSection from '../BlogSection'
import { blogPosts } from '../../data/siteData'

function BlogSectionContainer() {
  return <BlogSection blogPosts={blogPosts} />
}

export default BlogSectionContainer
