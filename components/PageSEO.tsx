import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

const SITE_URL = "https://mi-tie.es";
const CommonSEO = (
    { title, description, ogType, ogImage, twImage, canonicalUrl }:
        { title: string; description: string; ogType: string; ogImage: string; twImage: string; canonicalUrl?: string; }) => {
    const router = useRouter()
    return (
        <Head>
            <title>{title}</title>
            <meta name="robots" content="follow, index" />
            <meta name="description" content={description} />
            <meta property="og:url" content={`${SITE_URL}${router.asPath}`} />
            <meta property="og:type" content={ogType} />
            <meta property="og:site_name" content="Mi TIE" />
            <meta property="og:description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:image" content={ogImage} key={ogImage} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={twImage} />
            <link
                rel="canonical"
                href={canonicalUrl ? canonicalUrl : `${SITE_URL}${router.asPath}`}
            />
        </Head>
    )
}

export const PageSEO = ({ title, description }: { title: string; description: string; }) => {
    const siteLogo = "mitie.png";
    const ogImageUrl = SITE_URL + siteLogo;
    const twImageUrl = SITE_URL + siteLogo;
    return (
        <CommonSEO
            title={title}
            description={description}
            ogType="website"
            ogImage={ogImageUrl}
            twImage={twImageUrl}
        />
    )
}
