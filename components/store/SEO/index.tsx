import Head from 'next/head';
import { settings } from './helpers';
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
    { name: 'og:image:type', content: 'image/webp' },
    { name: 'og:image:width', content: '1080' },
    { name: 'og:image:height', content: '1080' },
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

const SEO = ({ product, images }) => {
  const url = `${baseUrl}/product/${product?.url}`;

  return (
    <Head>
      <title>{`${product?.name} | NBHOZ`}</title>
      <meta name="robots" content="index, follow" />
      <meta name="title" content={product?.name} />
      <meta name="description" content={product?.shortDesc} />
      <meta name="image" content={images[0]} />
      <meta name="keywords" content={product?.keywords} />
      <link rel="canonical" href={url} key="canonical" />
      {socialTags({
        openGraphType: 'website',
        url: url,
        title: product?.name,
        description: product?.shortDesc,
        image: images[0],
        createdAt: product?.createdAt,
        updatedAt: product?.updatedAt,
      }).map(({ name, content }) => {
        return (
          <meta key={name} property={name} name={name} content={content} />
        );
      })}
      {product?.reviews?.length != 0 ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'http://schema.org',
              '@type': 'Product',
              name: product?.name,
              description: product?.shortDesc,
              image: images,
              sku: product?.productVariants[0]?.artical,
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: product?.rating?.avg ?? 0,
                reviewCount: product?.reviews?.length ?? 0,
              },
              offers: {
                '@type': 'Offer',
                url: url,
                priceCurrency: 'RUB',
                price: product?.productVariants[0]?.price,
                itemCondition: 'https://schema.org/NewCondition',
                availability: 'https://schema.org/InStock',
              },
            }),
          }}
        />
      ) : (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'http://schema.org',
              '@type': 'Product',
              name: product?.name,
              description: product?.shortDesc,
              // image: image[0],
              image: images,
              sku: product?.productVariants[0]?.article,
              offers: {
                '@type': 'Offer',
                url: url,
                priceCurrency: 'RUB',
                price: product?.productVariants[0]?.price,
                itemCondition: 'https://schema.org/NewCondition',
                availability: 'https://schema.org/InStock',
              },
            }),
          }}
        />
      )}
    </Head>
  );
};

export default SEO;
