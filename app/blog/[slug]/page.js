import React from 'react'
import { getSinglePost, getPostSlugs } from '../../../lib/posts'
import BlogFeatureImage from '@/app/components/BlogFeatureImage';
import Date from '@/app/components/Date';

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
            <section className='hero-area min-h-120 relative pb-10 flex flex-wrap justify-center items-center'>
                <div className='absolute bg-slate-900 inset-0 z-1 opacity-40'></div>
                <div className='bg-image absolute top-0 left-0 w-full h-full'>
                    <BlogFeatureImage post={pageData} />
                </div>
                <div className="container">
                    <h1 className="text-4xl md:text-5xl font-bold z-2 relative text-center text-white mb-4 mt-6">{pageData.title}</h1>
                    <div className='pb-4 text-slate-100  text-center z-10'>
                       Posted by nextjs_user, last update on
                       <Date dateString={pageData.modified}/>
                    </div>
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