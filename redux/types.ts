import {
  AnalyticsBrand,
  AnalyticsCategory,
  AnalyticsProduct,
  AnalyticsUser,
  DynamicData,
} from 'common/interfaces/data-analytics.interfaces';
import { PopupDisplay } from 'components/store/storeLayout/constants';
import {
  Advertisement,
  Basket,
  Brand,
  Category,
  CategoryInTree,
  Checkout,
  Color,
  Image,
  PriceRange,
  Product,
  ProductVariant,
  Review,
  Slide,
  Tag,
  Size,
  User,
  Wishlist,
  NewsPosts,
  News,
  ProductResponse,
  BrandResponse,
  CategoryResponse,
  SubscribersResponse,
  Question,
  Scanner,
} from 'swagger/services';

type TCategoryState = {
  categories: Category[];
  category: Category | null;
  loading: boolean;
  saveLoading: boolean;
};

type TAuthState = {
  user: User | null;
  serverErr?: number;
  loading: boolean;
  users: User[];
};

type TUsersQuary = {
  firstName?: string;
  lastName?: string;
  email?: string;
  isVerified?: boolean;
  role?: string;
  sortBy?: string;
  offset?: string;
  limit?: string;
};

type TColorState = {
  colors: Color[];
  chosenColor: Color | null;
  loading: boolean;
  saveLoading: boolean;
};

type TBrandState = {
  brands: Brand[];
  chosenBrand: Brand | null;
  loading: boolean;
  saveLoading: boolean;
};

type TProductState = {
  products: Product[];
  chosenProduct: Product | null;
  loading: boolean;
  saveLoading: boolean;
};

interface SlideImage {
  name?: string;
  uid?: number;
  url?: string;
}

type TImageState = {
  imageList: (Image | SlideImage)[];
  imageListInDB?: Image[];
  singleImage?: string;
  paginationLength?: number;
  loading: boolean;
};

type TMultipleImageState = {
  imagesMap: Object;
  loading: boolean;
};

interface PayloadCreateImage {
  config: {};
  file: any;
  slideNum?: number;
  index?: number;
}

interface TTagState {
  tags: Tag[];
  tag: Tag | null;
  loading: boolean;
  saveLoading: boolean;
}

interface TSizeState {
  sizes: Size[];
  size: Size | null;
  loading: boolean;
  saveLoading: boolean;
}

interface TNewsState {
  newsPosts: News[];
  news: News | null;
  loading: boolean;
  saveLoading: boolean;
  newsLenght: number;
}

interface TSubscribers {
  Subscribers: SubscribersResponse[];
  Subscriber: SubscribersResponse | null;
  loading: boolean;
  saveLoading: boolean;
  SubscriberLenght: number;
}

interface MailOptionsDTO {
  to: string;
  subject: string;
  html: string;
}

interface TNewsRequest {
  limit: string;
  offset: string;
  skip?: string;
  title?: string;
  showOnMain?: boolean;
  sortBy?: string;
  orderBy?: string;
}

type TReviewState = {
  reviews: Review[];
  loading: boolean;
  saveLoading: boolean;
  reviewsLenght: number;
};

type TQuestionState = {
  questions?: Question[];
  question: Question | undefined;
  loading: boolean;
  saveLoading: boolean;
  questionsLenght?: number;
};

type TGlobalState = {
  searchQuery: string;
  wishlist: Wishlist | null;
  categories: CategoryInTree[];
  tags: Tag[];
  newsPosts: NewsPosts;
  products: Product[];
  caroselProducts: Product[];
  bestProduct: Product[];
  loading: boolean;
  loadingAddRemoveWishlist: boolean;
  loadingCarosel: boolean;
  productsLoading: boolean;
  bestProductLoading: boolean;
};

type TGlobalUIState = {
  isCatalogOpen: boolean;
  isAuthFormOpen: boolean;
  isBasketOpen: boolean;
  isWishlistOpen: boolean;
  isSearchFormActive: boolean;
  isOrderCallFormActive: boolean;
  isDropDownOpen: boolean;
  catelogDisplay: PopupDisplay;
  searchDisplay: PopupDisplay;
  wishlistDisplay: PopupDisplay;
  cartDisplay: PopupDisplay;
  authDisplay: PopupDisplay;
};

type ImageDTO = {
  products?: ProductResponse;
  brands?: BrandResponse;
  categories?: CategoryResponse;
};

type TCartState = {
  cart: Basket | null;
  variant: ProductVariant | null;
  productSize: string;
  isOneClickBuy: boolean;
  loading: boolean;
  countLoading: boolean;
};

type TFilters = {
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  desc?: string;
  available?: boolean;
  colors?: string[];
  categories?: string[];
  subCategories?: string[];
  parent?: string | undefined;
  brands?: string[];
  tags?: string[];
  sizes?: string[];
};

type TCatalogState = {
  categories: Category[];
  subCategories: Category[];
  brands: Brand[];
  colors: Color[];
  tags: Tag[];
  sizes: Size[];
  priceRange: PriceRange;
  products: Product[];
  productsLoading: boolean;
  productsLength: number;
  loading: boolean;
  filters: TFilters;
  page: number;
  uiPriceRang: PriceRange;
};

type TCheckoutState = {
  checkout: Checkout;
  checkouts: Checkout[];
  loading: boolean;
  saveLoading: boolean;
};

type TAnalyticsState = {
  analyticsData:
    | DynamicData[]
    | AnalyticsCategory[]
    | AnalyticsBrand[]
    | AnalyticsProduct[]
    | AnalyticsUser[]
    | User[];
  loading: boolean;
};

type TProductInfoState = {
  product?: Product;
  products: Product[];
  productsLength: number;
  loading: boolean;
  saveLoading: boolean;
};

type TBannerState = {
  advertisement: Advertisement[];
  slides: Slide[];
  loading: boolean;
  advertisementLoading: boolean;
  saveLoading: boolean;
};

interface FetchPayload {
  limit: string;
  offset: string;
  originalName?: string;
  filename?: string;
  available?: boolean;
  showOnMain?: boolean;
}

interface RequestResponse {
  data:
    | Category[]
    | Brand[]
    | Checkout[]
    | Color[]
    | Product[]
    | Review[]
    | Tag[]
    | User[]
    | Image[];
  length: number;
}

interface Banner {
  advertisement: Advertisement;
  slides: Slide[];
}

type THomePageState = {
  reviews: Review[];
  brands: Brand[];
  banner: Banner | undefined;
  loading: boolean;
};

type TDeliveryInfo = {
  id?: string;
  userId?: string;
  receiverName?: string;
  receiverPhone?: string;
  receiverEmail?: string;
  address?: string;
  roomOrOffice?: string;
  door?: string;
  floor?: string;
  rignBell?: string;
  zipCode?: string;
};

type TOrderInfo = {
  comment: string;
  leaveNearDoor: boolean;
};

type TStoreCheckoutState = {
  checkouts: Checkout[];
  loading: boolean;
  saveLoading: boolean;
  deliveryInfo?: TDeliveryInfo | null;
  orderInfo: TOrderInfo | null;
};

type TWishlistState = {
  wishlist: Wishlist | null;
  loading: boolean;
};

type TScanner = {
  scanner: Scanner | null;
  scanners: Scanner[];
  length: number;
  loading: boolean;
  updatingLoading: boolean;
};

type TProductReviewsState = {
  reviews: Review[];
  loading: boolean;
};

type TProfileState = {
  reviews: Review[];
  loading: boolean;
  saveLoading: boolean;
};

type TScannerPayload = {
  id?: string;
  qrCode?: string;
  tags?: string[];
  sortBy?: 'id';
  orderBy?: 'DESC' | 'ASC';
  limit?: number;
  offset?: number;
};

export type {
  TCategoryState,
  TAuthState,
  TUsersQuary,
  TColorState,
  TBrandState,
  TProductState,
  TImageState,
  PayloadCreateImage,
  TTagState,
  TSizeState,
  TReviewState,
  TQuestionState,
  TGlobalState,
  TGlobalUIState,
  TCartState,
  TFilters,
  TCatalogState,
  TCheckoutState,
  TProductInfoState,
  TAnalyticsState,
  FetchPayload,
  RequestResponse,
  THomePageState,
  TBannerState,
  Banner,
  TStoreCheckoutState,
  TDeliveryInfo,
  TOrderInfo,
  TMultipleImageState,
  TWishlistState,
  TProductReviewsState,
  TProfileState,
  TNewsState,
  TNewsRequest,
  ImageDTO,
  TSubscribers,
  MailOptionsDTO,
  TScanner,
  TScannerPayload,
};
