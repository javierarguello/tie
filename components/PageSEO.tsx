import { SITE_URL } from "@/data/websiteData";
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

const CommonSEO = (
    { title, description, ogType, ogImage, twImage, canonicalUrl }:
        { title: string; description: string; ogType: string; ogImage: string; twImage: string; canonicalUrl?: string; }) => {
    const router = useRouter()
    return (
        <Head>
            <title>{title}</title>
            <meta property="title" content={title} key="title" />
            <meta name="robots" content="follow, index" />
            <meta name="description" content={description} key="description" />
            <meta property="og:url" content={`${SITE_URL}${router.asPath}`} />
            <meta property="og:type" content={ogType} />
            <meta property="og:site_name" content="Mi TIE" />
            <meta property="og:description" content={description} key="og:description" />
            <meta property="og:title" content={title} key="og:title" />
            <meta property="og:image" content={ogImage} key={ogImage} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={twImage} />
            <meta
                http-equiv="Content-Security-Policy"
                content="default-src 'self'; img-src https://*; child-src 'none'; content-src https://*.stripe.com; script-src https://*.stripe.com;" />
            <link
                rel="canonical"
                href={canonicalUrl ? canonicalUrl : `${SITE_URL}${router.asPath}`}
            />
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9882318829765955" crossOrigin="anonymous"></script>
        </Head>
    )
}

export const PageSEO = ({ title, description }: { title: string; description: string; }) => {
    const siteLogo = "/mitie.png";
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
