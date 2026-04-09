import React from "react";
import Image from "next/image";

const Cards = ({ data }) => {
    const defaultData = [
        {
            img: 'https://www.lightbeam.ai/wp-content/uploads/2025/08/Group-2.svg',
            heading: 'Sensitive data is everywhere',
            paragraph: 'Data sprawl makes it harder to find and secure what matters, especially sensitive data.'
        },
        {
            img: 'https://www.lightbeam.ai/wp-content/uploads/2025/08/Group-2.svg',
            heading: 'Sensitive data is everywhere',
            paragraph: 'Data sprawl makes it harder to find and secure what matters, especially sensitive data.'
        },
        {
            img: 'https://www.lightbeam.ai/wp-content/uploads/2025/08/Group-2.svg',
            heading: 'Sensitive data is everywhere',
            paragraph: 'Data sprawl makes it harder to find and secure what matters, especially sensitive data.'
        }
    ]
    const cardsData = data || defaultData;
    return (
        <section className="cards py-8">
            <div className="container">
                <div className="wrapper flex flex-wrap ml-[-12px] w-[calc(100%+24px)]">
                    {cardsData.map((item, idx) => {
                        return (
                            <div className="card border-2 border-sliver w-[calc(33.33%-24px)] mx-[12px] p-5" key={idx}>
                                <div className="img-wrap max-w-[70px] h-[70px]">
                                    <Image src={item.img} alt="img" width={70} height={70} className="w-full h-full object-contain" />
                                </div>
                                <div className="content-wrap mt-[60px]">
                                    <h3 className="text-[30px]">{item.heading} </h3>
                                    <p className="pt-[14px]">{item.paragraph}</p>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </section>
    )
}

export default Cards;