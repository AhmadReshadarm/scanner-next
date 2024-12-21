import React from 'react';
import Head from 'next/head';
import { settings } from './helpers';
import { News } from 'swagger/services';
import { baseUrl } from 'common/constant';
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
type Props = {
  newsPost: News;
};
const SEOnews: React.FC<Props> = ({ newsPost }) => {
  const url = `${baseUrl}/prodcut/${newsPost?.url}`;
  const image = `${baseUrl}/api/images/${newsPost.image}`;

  return (
    <Head>
      <title>{`${newsPost?.title} | NBHOZ`}</title>
      <meta name="robots" content="index, follow" />
      <meta name="title" content={newsPost?.title} />
      <meta name="description" content={newsPost?.description} />
      <meta name="image" content={image} />
      {socialTags({
        openGraphType: 'blog',
        url: url,
        title: newsPost?.title,
        description: newsPost?.description,
        image: image,
        createdAt: newsPost?.createdAt,
        updatedAt: newsPost?.updatedAt,
      }).map(({ name, content }) => {
        return <meta key={name} name={name} content={content} />;
      })}
    </Head>
  );
};

export default SEOnews;
