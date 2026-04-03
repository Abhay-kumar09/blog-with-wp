import React from 'react'
import { getSinglePost, getPostSlugs } from '../../../lib/posts'
import BlogFeatureImage from '@/app/components/BlogFeatureImage';
import Date from '@/app/components/Date';
import { getSeo } from '@/lib/seo';
import { getContact } from '../../../lib/acf'
import Link from 'next/link';

// Dynamic Metadata setting for the Next.js App Router
export async function generateMetadata({ params }) {
    const { slug } = await params;
    const pageData = await getSinglePost(slug);
    const seoData = await getSeo('post', slug)

    return {
        title: seoData?.title ? `${seoData.title} - Cool Nomad` : 'Blog Post',
        description: seoData?.metaDesc,
        openGraph: {
            title: seoData?.opengraphTitle,
            description: seoData?.opengraphDescription,
            url: seoData?.opengraphUrl,
            siteName: seoData?.opengraphSiteName,
            images: [
                {
                    url: seoData?.opengraphImage?.mediaItemUrl,
                },
            ],
            type: seoData?.opengraphType,
        },
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
    const details = await getContact(slug)

    console.log(details);



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
                        <Date dateString={pageData.modified} />
                    </div>
                    {details?.contactType && (
                        <div className='text-center'>
                            <p className='text-white mb-2'>
                                email: <span className='text-yellow-400'>{details.contactType.email}</span>
                            </p>

                            <p className='text-white'>
                                contact: <span className='text-green-400'>{details.contactType.contact}</span>
                            </p>
                        </div>
                    )}
                </div>
            </section>
            <section className="content-area mb-24">
                <div className="container">
                    <div
                        className="prose max-w-none text-lg mt-8"
                        dangerouslySetInnerHTML={{ __html: pageData.content }}
                    />
                    {details?.contactType?.embed && (
                        <div
                            className="mt-6 mx"
                            dangerouslySetInnerHTML={{ __html: details.contactType.embed }}
                        />
                    )}
                </div>
            </section>
        </article>
    )
}

export default page