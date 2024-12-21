import React from 'react';
import Head from 'next/head';
import { settings } from './helpers';

const socialTags = ({
  openGraphType,
  url,
  title,
  description,
  image,
  createdAt,
  updatedAt,
}) => {
  const metaTags = [
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:site',
      content:
        settings &&
        settings.meta &&
        settings.meta.social &&
        settings.meta.social.twitter,
    },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    {
      name: 'twitter:creator',
      content:
        settings &&
        settings.meta &&
        settings.meta.social &&
        settings.meta.social.twitter,
    },
    { name: 'twitter:image:src', content: image },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'og:title', content: title },
    { name: 'og:type', content: openGraphType },
    { name: 'og:url', content: url },
    { name: 'og:image', content: image },
    { name: 'og:image:type', content: 'image/png' },
    { name: 'og:image:width', content: '800' },
    { name: 'og:image:height', content: '800' },
    { name: 'og:description', content: description },
    {
      name: 'og:site_name',
      content: settings && settings.meta && settings.meta.title,
    },
    {
      name: 'og:published_time',
      content: createdAt || new Date().toISOString(),
    },
    {
      name: 'og:modified_time',
      content: updatedAt || new Date().toISOString(),
    },
  ];

  return metaTags;
};

const SEOstatic = ({ page, image }) => {
  const url = `https://nbhoz.ru${page.url}`; // no need to add / it will be provided by router

  return (
    <Head>
      <title>{page?.realName}</title>
      <meta name="robots" content="index, follow" />
      <meta name="title" content={page?.name} />
      <meta name="description" content={page?.desc} />
      <meta name="image" content={image} />
      <meta name="keywords" content={page?.keywords} />
      {socialTags({
        openGraphType: 'website',
        url: url,
        title: page?.name,
        description: page?.desc,
        image: image,
        createdAt: page?.createdAt,
        updatedAt: page?.updatedAt,
      }).map(({ name, content }) => {
        return (
          <meta key={name} property={name} name={name} content={content} />
        );
      })}
    </Head>
  );
};

export default SEOstatic;
