import React from "react";
import Link from "next/link";
import Head from "next/head";

export interface BreadcrumbItem {
    name: string;
    url: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };

    return (
        <nav aria-label="Breadcrumb" className="text-white mb-4 w-full">
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </Head>
            <ol className="flex space-x-2 text-sm">
                {items.map((item, index) => (
                    <li key={index}>
                        { index < items.length - 1 ? (
                            <Link href={item.url} className="text-yellow-400 hover:underline">
                                {item.name}
                            </Link>
                        ) : (
                            <span className="text-gray-300">{item.name}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
