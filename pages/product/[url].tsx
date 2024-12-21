import SEO from 'components/store/SEO';
import StoreLayout from 'components/store/storeLayout/layouts';
import { useEffect, useRef, useState } from 'react';
import { getProductVariantsImages } from 'common/helpers/getProductVariantsImages.helper';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { Product } from 'swagger/services';
import dynamic from 'next/dynamic';
import ProductInfo from 'components/store/product/productInfo';
import { LoaderMask } from 'ui-kit/generalLoaderMask';
import axios from 'axios';
import { handleHistory } from 'common/helpers/history.helper';
import { baseUrl } from 'common/constant';
const Recomendation = dynamic(
  () => import('components/store/product/recomendation'),
  {
    ssr: false,
    loading: () => <LoaderMask />,
  },
);

const ReveiwsAndQuastions = dynamic(
  () => import('components/store/product/reviewsAndQuastions'),
  {
    ssr: false,
    loading: () => <LoaderMask />,
  },
);

export const getServerSideProps = (async (context) => {
  const { url } = context.query;
  let images: string[] = [];

  // Fetch data from external API
  try {
    const res = await fetch(`${process.env.API_URL}/products/by-url/${url}`);
    const repo: Product = await res.json();

    images = getProductVariantsImages(repo?.productVariants);
    const imagesWithUrl: string[] = [];
    const imagesWithUrlUI: string[] = [];
    for (let i = 0; i < images?.length; i++) {
      imagesWithUrl.push(`${baseUrl}/api/images/${images[i]}`);
      imagesWithUrlUI.push(`/api/images/${images[i]}`);
    }
    const getBase64Image = async (imageUrl) => {
      const response = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
      });
      const buffer = Buffer.from(response.data, 'binary');
      const base64Image = buffer.toString('base64');
      return `data:image/webp;base64,${base64Image}`;
    };

    const base64Image = await getBase64Image(
      `${process.env.API_URL}/images/compress/${
        images[0]
      }?qlty=1&width=${100}&height=${100}&lossless=false`,
    );

    // Pass data to the page via props
    return {
      props: { repo, imagesWithUrl, imagesWithUrlUI, base64Image },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}) as GetServerSideProps<{
  repo: Product;
  imagesWithUrl: string[];
  imagesWithUrlUI: string[];
  base64Image: any;
}>;

// -----------------------------------------------------------

const ProductInfoPage = ({
  repo,
  imagesWithUrl,
  imagesWithUrlUI,
  base64Image,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const reviewBtnRef = useRef(null);
  const questionBtnRef = useRef(null);
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);
  useEffect(() => {
    handleHistory(repo.id);
  }, [isClient]);

  return (
    <>
      <SEO images={imagesWithUrl} product={repo} />
      <ProductInfo
        reviewRef={reviewBtnRef}
        questionRef={questionBtnRef}
        product={repo}
        base64Image={base64Image}
        images={imagesWithUrlUI}
      />
      <>
        {isClient ? (
          <>
            <Recomendation product={repo} />
            <ReveiwsAndQuastions
              product={repo}
              reviewRef={reviewBtnRef}
              questionRef={questionBtnRef}
            />
          </>
        ) : (
          <LoaderMask />
        )}
      </>
    </>
  );
};

ProductInfoPage.PageLayout = StoreLayout;
export default ProductInfoPage;
