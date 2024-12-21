import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TGlobalState, TGlobalUIState } from 'redux/types';
import styled from 'styled-components';
import { Product } from 'swagger/services';
import Link from 'next/link';
import {
  changeCatelogState,
  changeCatelogDisplayState,
} from 'redux/slicers/store/globalUISlicer';
import { handleMenuStateRedux } from '../../helpers';
import { emptyLoading } from '../../../../../common/constants';
type Props = {
  category: string;
  subCategory: string;
};
const TagsModal: React.FC<Props> = ({ category, subCategory }) => {
  const { tags, loading } = useAppSelector<TGlobalState>(
    (state) => state.global,
  );
  const dispatch = useAppDispatch();
  const { isCatalogOpen, catelogDisplay } = useAppSelector<TGlobalUIState>(
    (state) => state.globalUI,
  );
  const filteredTags: any = tags.filter((tag) => {
    if (
      tag.url?.match(/(?:^|\W)best_product(?:$|\W)/) ||
      tag.url?.match(/(?:^|\W)main_page(?:$|\W)/) ||
      tag.url == '-' ||
      tag.url == '_' ||
      tag.url == ' ' ||
      !tag.products?.find((product: Product) => {
        return product.category?.url === subCategory;
      })
    ) {
      return;
    }
    return tag;
  });

  return (
    <TagsWrapper>
      {!loading && tags.length !== 0
        ? filteredTags.map((tag, index) => {
            return (
              <Link
                key={`${tags}-${index}`}
                onClick={handleMenuStateRedux(
                  dispatch,
                  changeCatelogState,
                  changeCatelogDisplayState,
                  isCatalogOpen,
                  catelogDisplay,
                )}
                href={`/catalog?categories=${category}&subCategories=${subCategory}&tags=${tag.url}`}
                prefetch={false}
              >
                <span>{tag.name}</span>
              </Link>
            );
          })
        : emptyLoading.map(() => <TagsLoader />)}
    </TagsWrapper>
  );
};

const TagsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 5px;
`;

const TagsLoader = styled.div`
  width: 100px;
  height: 12px;
  border-radius: 3px;
  background: #cccccca3;
  position: relative;
  overflow: hidden;
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    transform: translateX(-100px);
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    animation: loading 0.8s infinite;
  }

  @keyframes loading {
    100% {
      transform: translateX(100%);
    }
  }
`;

export default TagsModal;
