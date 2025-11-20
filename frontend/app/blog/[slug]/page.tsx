import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Container } from "@/components/layout/Container"
import { Button } from "@/components/ui/Button"
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { strapiClient, BlogPost } from "@/lib/strapiClient"

async function fetchPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await strapiClient.getBlogPost(slug)
    return response.data?.[0]?.attributes || null
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await fetchPost(params.slug)
  if (!post) notFound()

  const imageUrl = post.featuredImage?.data?.attributes?.url
  const imageAlt = post.featuredImage?.data?.attributes?.alternativeText || post.title
  const authorName = post.author?.data?.attributes?.name || 'GIGIL Team'
  const publishDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="min-h-screen bg-gigil-cream">
      <Container>
        <div className="py-3xl">
          {/* Navigation */}
          <motion.nav
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mb-8"
          >
            <Button asChild variant="ghost" size="sm">
              <Link href="/blog">
                ← Back to blog
              </Link>
            </Button>
          </motion.nav>

          {/* Article */}
          <motion.article
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <motion.header
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <div className="inline-block bg-gigil-peach text-gigil-teal px-3 py-1 rounded-full text-sm font-medium mb-4">
                GIGIL Blog
              </div>
              
              <h1 className="font-playfair font-semibold text-gigil-teal mb-6">
                {post.title}
              </h1>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gigil-teal/60 text-sm">
                <span>By {authorName}</span>
                <span className="hidden sm:block">•</span>
                <span>{publishDate}</span>
              </div>
            </motion.header>

            {/* Featured Image */}
            {imageUrl && (
              <motion.div
                variants={fadeInUp}
                className="mb-12"
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 80vw"
                    priority
                  />
                </div>
              </motion.div>
            )}

            {/* Content */}
            <motion.div
              variants={fadeInUp}
              className="prose prose-lg max-w-none prose-headings:font-playfair prose-headings:text-gigil-teal prose-p:text-gigil-teal/80 prose-a:text-gigil-peach prose-strong:text-gigil-teal"
            >
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </motion.div>

            {/* Author Bio */}
            {post.author?.data?.attributes && (
              <motion.div
                variants={fadeInUp}
                className="mt-16 p-8 bg-gigil-off-white rounded-2xl border border-gigil-border"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gigil-peach rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-gigil-teal font-semibold text-lg">
                      {authorName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-playfair font-semibold text-gigil-teal mb-2">
                      {authorName}
                    </h3>
                    <p className="text-gigil-teal/70">
                      {post.author.data.attributes.bio}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Back to Blog */}
            <motion.div
              variants={fadeInUp}
              className="mt-12 text-center"
            >
            <Button asChild variant="secondary">
              <Link href="/blog">
                Read More Stories
              </Link>
            </Button>
            </motion.div>
          </motion.article>
        </div>
      </Container>
    </div>
  )
}



