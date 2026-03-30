import React from 'react'
import Link from 'next/link'
import { getCategorySlugs, getCategoryDetails } from '@/lib/posts'
import BannerSecond from '../../components/BannerSecond'
import Featuredimage from '../../components/Featuredimage'
import Date from '../../components/Date'

export async function generateMetadata({ params }) {
  const { categoryName } = await params
  const pagedata = await getCategoryDetails(categoryName)

  return {
    title: pagedata?.name ? `${pagedata.name} - Cool Nomad` : 'Category - Cool Nomad'
  }
}

export async function generateStaticParams() {
  const categories = await getCategorySlugs()

  return categories.map((cat) => ({
    categoryName: cat.slug
  }))
}

const page = async ({ params }) => {
  const { categoryName } = await params
  const pagedata = await getCategoryDetails(categoryName)

  if (!pagedata) {
    return <div>Category not found</div>
  }

  return (
    <>
      <BannerSecond title={pagedata.name} description={`Explore all posts in ${pagedata.name}`} />
      <main>
        <section className='post-list mt-4'>
          <div className='container'>
            <ul>
              {
                pagedata.posts?.nodes?.map((post) => (
                  <li key={post.slug} className='grid grid-cols-5 gap-4 mb-4'>
                    <div className='col-span-2 '>
                      <Featuredimage post={post} />
                    </div>
                    <div className='col-span-3'>
                      <h2 className='py-4'>
                        <Link href={`/blog/${post.slug}`} className='text-blue-400 text-2xl hover:text-blue-600'>
                          {post.title}
                        </Link>
                      </h2>
                      <div className='py-4'>
                        Published on: <Date dateString={post.date} />
                      </div>
                      <div className='text-lg' dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                      <div className='py-4'>
                        Posted under {
                          post.categories?.nodes?.map((cat) => (
                            <Link className='text-blue-400 hover:text-blue-500' key={cat.slug} href={`/category/${cat.slug}`}>
                              {cat.name}
                            </Link>
                          ))
                        }
                      </div>
                    </div>

                  </li>
                ))
              }
            </ul>
          </div>
        </section>
      </main>
    </>
  )
}

export default page