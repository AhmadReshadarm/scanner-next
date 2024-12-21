import { ProductVariant } from "swagger/services";

export const getProductVariantsImages = (productVariants?: ProductVariant[]) => {
  let images: string[] = [];
  productVariants?.forEach((variant) => {
    const variantImages = variant.images ? variant.images.split(', ') : [];
    images = images.concat(variantImages);
  });

  return images;
}