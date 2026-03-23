import React from 'react'
import { getSinglePost, getPostSlugs } from '../../../lib/posts'
import Featuredimage from '@/app/components/Featuredimage';

// Dynamic Metadata setting for the Next.js App Router
export async function generateMetadata({ params }) {
    const { slug } = await params;
    const pageData = await getSinglePost(slug);

    return {
        title: pageData?.title ? `${pageData.title} - Cool Nomad` : 'Blog Post',
    }
}

// Generate static routes at build time (optional but recommended for App Router static pages)
export async function generateStaticParams() {
    const pageSlugs = await getPostSlugs();

    return pageSlugs.map((s) => ({
        slug: s.slug
    }));
}

const page = async ({ params }) => {
    const { slug } = await params;
    const pageData = await getSinglePost(slug);

    if (!pageData) {
        return <div>Post not found</div>;
    }

    return (
        <article>
            <section className='hero-area min-h-[30rem] relative pb-10 flex flex-wrap justify-center items-center'>
                <div className='bg-image absolute top-0 left-0 w-full h-full'>
                    <Featuredimage post={pageData} />
                </div>
                <div className="container">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 mt-6">{pageData.title}</h1>
                </div>
            </section>
            <section className="content-area mb-24">
                <div className="container">
                    <div
                        className="prose max-w-none text-lg mt-8"
                        dangerouslySetInnerHTML={{ __html: pageData.content }}
                    />
                </div>
            </section>
        </article>
    )
}

export default page