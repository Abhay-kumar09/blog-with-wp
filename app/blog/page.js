import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '../../lib/posts'
import BannerSecond from '../components/BannerSecond'
import Featuredimage from '../components/Featuredimage'
import Date from '../components/Date'

export const metadata = {
  title: 'Blog - Cool Nomad',
}

const page = async () => {
  const allPosts = await getAllPosts()

  return (
    <>
      <BannerSecond title={"Blog"} description="Read our latest articles" />
      <main>
        <section className='post-list mt-4'>
          <div className='container'>
            <ul>
              {
                allPosts?.nodes?.map((post) => (
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