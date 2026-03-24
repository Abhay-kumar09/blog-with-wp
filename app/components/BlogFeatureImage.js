import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Featuredimage = ({ post }) => {
    let img = ''

    const defaultFeaturedImage = "https://dev-blog-with-wp.pantheonsite.io/wp-content/uploads/2022/12/hiking-backpack.jpg";
    const defaultWidth = "900";
    const defaultHeight = "600";

    if (post.featuredImage) {
        let size = post.featuredImage.node.mediaDetails.sizes[0]
        img = {
            src: size.sourceUrl,
            width: size.width,
            height: size.height
        }
    }
    else {
        img = {
            src: defaultFeaturedImage,
            width: defaultWidth,
            height: defaultHeight
        }
    }
    return (
        <Image src={img.src} width={img.width} height={img.height} alt={post.title} className="h-full object-cover w-full" />
    )
}

export default Featuredimage