import React from 'react'
import { getPageSlugs, getSinglePage } from "../../lib/pages";
import BannerSecond from '../components/BannerSecond';
import { getSections } from '../../lib/acf';

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
    const acfData = await getSections(slug);

    if (!pageData) {
        return <div>page not found</div>;
    }

    const blocks = acfData?.pageSections?.pageSections || [];
    const bannerData = blocks.find(block => block.__typename === 'PageSectionsPageSectionsBannerSecondLayout');

    const bannerTitle = bannerData?.title || pageData.title;
    const bannerDescription = bannerData?.description || "";
    const bgImage = bannerData?.backgroundImage?.node?.sourceUrl || null;

    return (
        <>
            <BannerSecond title={bannerTitle} description={bannerDescription} bgImage={bgImage} />
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