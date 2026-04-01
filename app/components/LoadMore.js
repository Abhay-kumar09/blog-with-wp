'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Featuredimage from './Featuredimage'
import Date from './Date'
import { loadMorePosts } from '@/lib/actions'

export default function LoadMore({ initialPageInfo }) {
    const [posts, setPosts] = useState([])
    const [pageInfo, setPageInfo] = useState(initialPageInfo)
    const [loading, setLoading] = useState(false)

    const handleLoadMore = async () => {
        setLoading(true)
        try {
            const morePosts = await loadMorePosts(pageInfo.endCursor)
            setPosts((prev) => [...prev, ...morePosts.nodes])
            setPageInfo(morePosts.pageInfo)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {posts.length > 0 && (
                <ul className="mt-4">
                    {posts.map((post) => (
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
                    ))}
                </ul>
            )}
            {pageInfo?.hasNextPage ? (
                <div className="py-4">
                    <button
                        onClick={handleLoadMore}
                        disabled={loading}
                        className="load-more font-bold bg-blue-400 mx-auto block  text-slate-900 px-4 py-2 hover:bg-blue-500 disabled:opacity-50"
                    >
                        {loading ? 'Loading...' : 'Load More Posts'}
                    </button>
                </div>
            ) : (
                <p className="text-gray-500 text-center py-4">No more posts to load.</p>
            )}
        </>
    )
}