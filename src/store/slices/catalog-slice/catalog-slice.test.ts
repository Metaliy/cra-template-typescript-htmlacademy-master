import { SortOrderParameter, SortTypeParameter } from '../../../consts/const';
import { CatalogSliceType } from '../../../types/state-types';
import { catalogSlice, categoryFilter, typeFilter, priceMaxFilter, priceMinFilter, sortOrder, sortType, levelFilter, filtersInitialState } from './catalog-slice';

describe('Reducer test: catalog-slice', () => {
  let mockState: CatalogSliceType;


  beforeEach(() => {
    mockState = {
      currentPage: 1,
      sort: {
        sortType: SortTypeParameter.Price,
        order:  SortOrderParameter.LowToHigh
      },
      filters: {
        priceMin: [],
        priceMax: [],
        category: [],
        filterType: [],
        level: []
      }
    };
  });

  it('return initial state', () => {
    expect(catalogSlice.reducer(undefined, {type: 'undefiend-action'}))
      .toEqual(mockState);
  });


  it('Update sortType if dispatched sortType',
    () => {
      expect(catalogSlice.reducer(mockState, sortType(SortTypeParameter.Rating)))
        .toEqual({
          ...mockState,
          sort:{
            order: SortOrderParameter.LowToHigh,
            sortType: SortTypeParameter.Rating
          }
        });
    });

  it('Update sord order if dispatched sortOrder',
    () => {
      expect(catalogSlice.reducer(mockState, sortOrder(SortOrderParameter.HighToLow)))
        .toEqual({
          ...mockState,
          sort:{
            order: SortOrderParameter.HighToLow,
            sortType: SortTypeParameter.Price
          }
        });
    });

  it('Update priceMin if dispatched priceMinFilter',
    () => {
      expect(catalogSlice.reducer(mockState, priceMinFilter('1000')))
        .toEqual({
          ...mockState,
          filters: {
            priceMin: '1000',
            priceMax: [],
            category: [],
            filterType: [],
            level: []
          }
        });
    });

  it('Update priceMax if dispatched priceMaxFilter',
    () => {
      expect(catalogSlice.reducer(mockState, priceMaxFilter('100000')))
        .toEqual({
          ...mockState,
          filters: {
            priceMin: [],
            priceMax: '100000',
            category: [],
            filterType: [],
            level: []
          }
        });
    });

  it('Update category if dispatched categoryFilter',
    () => {
      expect(catalogSlice.reducer(mockState, categoryFilter('Фотоаппарат')))
        .toEqual({
          ...mockState,
          filters: {
            priceMin: [],
            priceMax: [],
            category: ['Фотоаппарат'],
            filterType: [],
            level: []
          }
        });
    });

  it('Update category if dispatched categoryFilter with existing filter',
    () => {
      expect(catalogSlice.reducer(
        {...mockState,
          filters: {
            priceMin: [],
            priceMax: [],
            category: ['Фотоаппарат'],
            filterType: [],
            level: []
          }}, categoryFilter('Фотоаппарат')))
        .toEqual({
          ...mockState,
          filters: {
            priceMin: [],
            priceMax: [],
            category: [],
            filterType: [],
            level: []
          }
        });
    });

  it('Update filterType if dispatched typeFilter',
    () => {
      expect(catalogSlice.reducer(mockState, typeFilter('Цифровая')))
        .toEqual({
          ...mockState,
          filters: {
            priceMin: [],
            priceMax: [],
            category: [],
            filterType: ['Цифровая'],
            level: []
          }
        });
    });

  it('Update filterType if dispatched typeFilter with existing filter',
    () => {
      expect(catalogSlice.reducer(
        {...mockState,
          filters: {
            priceMin: [],
            priceMax: [],
            category: [],
            filterType: ['Цифровая'],
            level: []
          }}, typeFilter('Цифровая')))
        .toEqual({
          ...mockState,
          filters: {
            priceMin: [],
            priceMax: [],
            category: [],
            filterType: [],
            level: []
          }
        });
    });

  it('Update level if dispatched levelFilter',
    () => {
      expect(catalogSlice.reducer(mockState, levelFilter('Нулевой')))
        .toEqual({
          ...mockState,
          filters: {
            priceMin: [],
            priceMax: [],
            category: [],
            filterType: [],
            level: ['Нулевой']
          }
        });
    });

  it('Update level if dispatched levelFilter with existing filter',
    () => {
      expect(catalogSlice.reducer(
        {...mockState,
          filters: {
            priceMin: [],
            priceMax: [],
            category: [],
            filterType: [],
            level: ['Нулевой']
          }}, levelFilter('Нулевой')))
        .toEqual({
          ...mockState,
          filters: {
            priceMin: [],
            priceMax: [],
            category: [],
            filterType: [],
            level: []
          }
        });
    });

  it('Update state to initial if dispatched filtersInitialState',
    () => {
      expect(catalogSlice.reducer({
        currentPage: 1,
        sort:{
          order: SortOrderParameter.HighToLow,
          sortType: SortTypeParameter.Rating
        },
        filters: {
          priceMin: ['1000'],
          priceMax: ['100000'],
          category: ['Фотоаппарат'],
          filterType: ['Цифровая'],
          level: ['Нулевой']
        }}, filtersInitialState()))
        .toEqual(mockState);
    });
});

