import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getErrorMassage, handleError, handlePending } from 'common/helpers';
import { TCatalogState, TFilters } from 'redux/types';
import {
  Brand,
  BrandService,
  Category,
  CategoryService,
  Color,
  ColorService,
  PriceRange,
  Product,
  ProductService,
  Tag,
  TagService,
  Size,
  SizeService,
} from 'swagger/services';

export const fetchParentCategories = createAsyncThunk<
  Category[],
  undefined,
  { rejectValue: string }
>(
  'catalog/fetchParentCategories',
  async function (_, { rejectWithValue }): Promise<any> {
    try {
      const response = await CategoryService.getCategories({ limit: '1000' });
      return response.rows?.filter((category) => !category.parent);
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchSubCategories = createAsyncThunk<
  Category[],
  string,
  { rejectValue: string }
>(
  'catalog/fetchSubCategories',
  async function (categoryUrl, { rejectWithValue }): Promise<any> {
    try {
      const response = (await CategoryService.getCategories({
        parent: categoryUrl,
        limit: '1000',
      })) as unknown as { rows: Category[] };
      return response.rows;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchBrands = createAsyncThunk<
  Brand[],
  { category?: string; parent?: string },
  { rejectValue: string }
>(
  'catalog/fetchBrands',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      const response = await BrandService.getBrands({
        ...payload,
        limit: '1000',
      });
      return response.rows;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchColors = createAsyncThunk<
  Color[],
  { category?: string; parent?: string },
  { rejectValue: string }
>(
  'catalog/fetchColors',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      const response = (await ColorService.getColors({
        ...payload,
        limit: '1000',
      })) as unknown as {
        rows: Color[];
      };
      return response.rows;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchProducts = createAsyncThunk<
  { rows: Product[]; length: number },
  TFilters,
  { rejectValue: string }
>(
  'catalog/fetchProducts',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      const response = (await ProductService.getProducts(
        payload,
      )) as unknown as { rows: Product[]; length: number };
      return response;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchPriceRange = createAsyncThunk<
  PriceRange,
  TFilters,
  { rejectValue: string }
>(
  'catalog/fetchPiceRange',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      return await ProductService.getPriceRange(payload);
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchTags = createAsyncThunk<
  Tag[],
  { category?: string; children?: string },
  { rejectValue: string }
>(
  'catalog/fetchTags',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      const response = (await TagService.getTags({
        ...payload,
        limit: '1000',
      })) as unknown as { rows: Tag[] };
      return response.rows;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

export const fetchSizes = createAsyncThunk<
  Size[],
  { category?: string; parent?: string },
  { rejectValue: string }
>(
  'catalog/fetchSizes',
  async function (payload, { rejectWithValue }): Promise<any> {
    try {
      const response = (await SizeService.getSizes({
        ...payload,
        limit: '1000',
      })) as unknown as { rows: Size[] };
      return response.rows;
    } catch (error: any) {
      return rejectWithValue(getErrorMassage(error.response.status));
    }
  },
);

// export const fetchProductsInExcelFile = createAsyncThunk<
//   any,
//   undefined,
//   { rejectValue: string }
// >(
//   'tags/fetchProductsInExcelFile',
//   async function (_, { rejectWithValue }): Promise<any> {
//     try {
//       const response = (await ProductService.getProducts({
//         limit: 10000,
//       })) as unknown as { rows: Product[]; length: number };
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(getErrorMassage(error.response.status));
//     }
//   },
// );

const initialState: TCatalogState = {
  categories: [],
  subCategories: [],
  brands: [],
  colors: [],
  tags: [],
  sizes: [],
  priceRange: {
    minPrice: 0,
    maxPrice: 0,
  },
  products: [],
  productsLoading: false,
  productsLength: 0,
  filters: {},
  loading: false,
  page: 1,
  uiPriceRang: {
    minPrice: 0,
    maxPrice: 0,
  },
};

const cartSlicer = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    clearSubCategories(state) {
      state.subCategories = initialState.subCategories;
    },
    clearBrands(state) {
      state.brands = initialState.brands;
    },
    clearColors(state) {
      state.colors = initialState.colors;
    },
    clearTags(state) {
      state.tags = initialState.tags;
    },
    clearSizes(state) {
      state.sizes = initialState.sizes;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setUIPriceRange(state, action) {
      state.uiPriceRang = action.payload;
    },
    clearProducts(state) {
      state.products = initialState.products;
      state.productsLength = initialState.productsLength;
    },
  },
  extraReducers: (builder) => {
    builder
      //fetchCategories
      .addCase(fetchParentCategories.pending, handlePending)
      .addCase(fetchParentCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(fetchParentCategories.rejected, handleError)
      //fetchSubCategories
      .addCase(fetchSubCategories.pending, handlePending)
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.subCategories = action.payload;
        state.loading = false;
      })
      .addCase(fetchSubCategories.rejected, handleError)
      //fetchBrands
      .addCase(fetchBrands.pending, handlePending)
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brands = action.payload;
        state.loading = false;
      })
      .addCase(fetchBrands.rejected, handleError)
      //fetchColors
      .addCase(fetchColors.pending, handlePending)
      .addCase(fetchColors.fulfilled, (state, action) => {
        state.colors = action.payload;
        state.loading = false;
      })
      .addCase(fetchColors.rejected, handleError)
      //fetchPriceRange
      .addCase(fetchPriceRange.pending, handlePending)
      .addCase(fetchPriceRange.fulfilled, (state, action) => {
        state.priceRange = action.payload;
        state.loading = false;
      })
      .addCase(fetchPriceRange.rejected, handleError)
      //fetchProducts
      .addCase(fetchProducts.pending, (state: { productsLoading: boolean }) => {
        state.productsLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.rows;
        state.productsLength = action.payload.length;
        state.productsLoading = false;
      })
      .addCase(fetchProducts.rejected, handleError)
      //fetchTags
      .addCase(fetchTags.pending, handlePending)
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tags = action.payload;
        state.loading = false;
      })
      .addCase(fetchTags.rejected, handleError)
      //fetchSizes
      .addCase(fetchSizes.pending, handlePending)
      .addCase(fetchSizes.fulfilled, (state, action) => {
        state.sizes = action.payload;
        state.loading = false;
      })
      .addCase(fetchSizes.rejected, handleError);
    // fetchProductsInExcelFile
    // .addCase(
    //   fetchProductsInExcelFile.pending,
    //   (state: { loadingProgress: any; loading: boolean }, action) => {
    //     state.loading = true;
    //     state.loadingProgress = action.payload;
    //   },
    // )
    // .addCase(fetchProductsInExcelFile.fulfilled, (state, action) => {
    //   state.loadingProgress = action.payload;
    //   state.loading = false;
    // })
    // .addCase(fetchProductsInExcelFile.rejected, handleError);
  },
});

export const {
  clearSubCategories,
  clearBrands,
  clearColors,
  clearTags,
  clearSizes,
  clearProducts,
  setPage,
  setUIPriceRange,
} = cartSlicer.actions;

export default cartSlicer.reducer;
