import React from 'react'
import { getPageSlugs, getSinglePage } from "../../lib/pages";
import BannerSecond from '../components/BannerSecond';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const pageData = await getSinglePage(slug);

    return {
        title: pageData?.title ? `${pageData.title} - Cool Nomad` : 'defult page',
    }
}

export async function generateStaticParams() {
    const pageSlugs = await getPageSlugs();

    return pageSlugs.map((s) => ({
        slug: s.slug
    }));
}

const page = async ({ params }) => {
    const { slug } = await params;
    const pageData = await getSinglePage(slug);

    if (!pageData) {
        return <div>page not found</div>;
    }
    return (
        <>
            <BannerSecond title={pageData.title} description="Read our latest articles" />
            <section className="content-area mb-24">
                <div className="container">
                    <div
                        className="prose max-w-none text-lg mt-8"
                        dangerouslySetInnerHTML={{ __html: pageData.content }}
                    />
                </div>
            </section>
        </>
    )
}

export default page