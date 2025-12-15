# 1. tại sao cần serializableCheck: false,

# 2. so sánh 2 cách create redux hook, nên viết cách nào là tốt cho product code:
cách 1:
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

cách 2: 
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <TSelected>(
  selector: (state: RootState) => TSelected
) => useSelector<RootState, TSelected>(selector);

# 3. nếu dashboard page có nhiều reducer thì có thể thêm tiếp được không? VD:
export const dashboardReducers = combineReducers({
  filters: filterReducer,
  chart: ChartReducer,
});

-----

**Giải đáp chi tiết:**

---

## **1. Tại sao cần `serializableCheck: false`?**

### **Redux yêu cầu:**
- ✅ **State phải serializable** (có thể convert sang JSON)
- ✅ **Actions phải serializable**
- ❌ Không được chứa: Functions, Promises, Date objects, class instances

---

### **Redux Saga vi phạm quy tắc này:**

````typescript
// Redux Saga dispatch actions với generator functions
function* fetchDataSaga() {
  const data = yield call(api.getData); // ← yield không serializable
  yield put({ type: 'SUCCESS', payload: data });
}
````

**Error nếu không tắt:**
```
A non-serializable value was detected in an action, in the path: `payload.meta`
Value: [Function: generatorFunction]
```

---

### **Khi nào cần tắt `serializableCheck`:**

| Use Case | Cần tắt? | Lý do |
|----------|---------|-------|
| **Redux Saga** | ✅ Yes | Generator functions không serializable |
| **Redux Thunk với Date** | ✅ Yes | `new Date()` không serializable |
| **File uploads** | ✅ Yes | `File`, `Blob` objects |
| **Pure Redux Toolkit** | ❌ No | Actions/State đều serializable |

---

### **Tắt an toàn:**

````typescript
middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    thunk: false,
    serializableCheck: {
      // Ignore specific action types
      ignoredActions: [
        'saga/TRIGGER',
        'filters/fetchFiltersRequest',
      ],
      // Ignore specific paths in state
      ignoredPaths: ['dashboardFilters.tempDate'],
      // Ignore action paths
      ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
    },
  }).concat(sagaMiddleware),
````

---

### **Best Practice:**

````typescript
// ✅ Recommended: Chỉ tắt cho Saga actions
middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    thunk: false,
    serializableCheck: {
      ignoredActions: [
        // Ignore all saga actions
        (action) => action.type.endsWith('Request'),
        (action) => action.type.endsWith('Success'),
        (action) => action.type.endsWith('Failure'),
      ],
    },
  }).concat(sagaMiddleware),
````

---

## **2. So sánh 2 cách tạo Redux Hooks:**

### **Cách 1: Type Assertion (Simpler)**

````typescript
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
````

**Pros:**
- ✅ Code ngắn gọn
- ✅ Type inference tốt
- ✅ Theo chuẩn Redux official docs
- ✅ Dễ hiểu

**Cons:**
- ❌ Không customize được

---

### **Cách 2: Wrapper Function (More Control)**

````typescript
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <TSelected>(
  selector: (state: RootState) => TSelected
) => useSelector<RootState, TSelected>(selector);
````

**Pros:**
- ✅ Có thể thêm logic custom (logging, middleware)
- ✅ Có thể memoization
- ✅ Có thể error handling

**Cons:**
- ❌ Code dài hơn
- ❌ Phức tạp hơn khi không cần custom logic

---

### **Recommendation: Cách 1 (cho production)**

````typescript
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// ✅ Recommended: Simple & follows Redux docs
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
````

---

### **Khi nào dùng Cách 2:**

````typescript
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// ✅ Use when you need custom logic
export const useAppDispatch = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  // Add custom logic (logging, analytics, etc.)
  return (action: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Redux Action]', action);
    }
    return dispatch(action);
  };
};

// ✅ Use when you need memoization
export const useAppSelector = <TSelected>(
  selector: (state: RootState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
) => {
  return useSelector<RootState, TSelected>(selector, equalityFn);
};
````

---

### **Final Recommendation:**

````typescript
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false, // Required for Redux Saga
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

// Export types
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// ✅ Recommended: Simple typed hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
````

---

## **3. Thêm nhiều reducers vào dashboard:**

### **✅ Có thể! Đây là pattern chuẩn:**

````typescript
import { combineReducers } from '@reduxjs/toolkit';
import { filterReducer } from './slices/filter-slice';
import { chartReducer } from './slices/chart-slice';
import { metricsReducer } from './slices/metrics-slice';

export const dashboardReducers = combineReducers({
  filters: filterReducer,
  chart: chartReducer,        // ← New reducer
  metrics: metricsReducer,    // ← New reducer
});

export type DashboardState = ReturnType<typeof dashboardReducers>;
````

---

### **State shape sẽ là:**

````typescript
{
  dashboard: {
    filters: {
      filters: { practice: {}, frontend: {}, backend: {} },
      savedFilters: [],
      isLoading: false,
      isSyncing: false,
      error: null,
    },
    chart: {
      data: [],
      isLoading: false,
      error: null,
    },
    metrics: {
      data: {},
      isLoading: false,
      error: null,
    },
  }
}
````

---

### **Access trong components:**

````typescript
import { useAppSelector } from '@/core/redux/store';

export const PracticeExecutiveSummary: React.FC = () => {
  // ✅ Access filters
  const filters = useAppSelector((state) => state.dashboard.filters.filters);
  
  // ✅ Access chart data
  const chartData = useAppSelector((state) => state.dashboard.chart.data);
  
  // ✅ Access metrics
  const metrics = useAppSelector((state) => state.dashboard.metrics.data);

  return (
    <div>
      <p>Filters: {JSON.stringify(filters)}</p>
      <p>Chart: {JSON.stringify(chartData)}</p>
      <p>Metrics: {JSON.stringify(metrics)}</p>
    </div>
  );
};
````

---

### **Best Practice: Create Selectors:**

````typescript
import type { RootState } from '@/core/redux/store';
import type { TAB_KEY } from '../../types';

// Base selector
export const selectFilterState = (state: RootState) => state.dashboard.filters;

// Derived selectors
export const selectAllFilters = (state: RootState) =>
  selectFilterState(state).filters;

export const selectFilterByTab = (state: RootState, tabKey: TAB_KEY) =>
  selectFilterState(state).filters[tabKey];

export const selectSavedFilters = (state: RootState) =>
  selectFilterState(state).savedFilters;

export const selectIsLoading = (state: RootState) =>
  selectFilterState(state).isLoading;

export const selectIsSyncing = (state: RootState) =>
  selectFilterState(state).isSyncing;

export const selectError = (state: RootState) =>
  selectFilterState(state).error;
````

````typescript
import type { RootState } from '@/core/redux/store';

export const selectChartState = (state: RootState) => state.dashboard.chart;

export const selectChartData = (state: RootState) =>
  selectChartState(state).data;

export const selectChartLoading = (state: RootState) =>
  selectChartState(state).isLoading;

export const selectChartError = (state: RootState) =>
  selectChartState(state).error;
````

---

### **Usage with selectors:**

````typescript
import { useAppSelector } from '@/core/redux/store';
import {
  selectFilterByTab,
  selectIsLoading,
} from '../redux/selectors/filter-selectors';
import {
  selectChartData,
  selectChartLoading,
} from '../redux/selectors/chart-selectors';
import { TAB_KEY } from '../types';

export const PracticeExecutiveSummary: React.FC = () => {
  // ✅ Use selectors
  const filters = useAppSelector((state) =>
    selectFilterByTab(state, TAB_KEY.PRACTICE)
  );
  const isLoadingFilters = useAppSelector(selectIsLoading);
  const chartData = useAppSelector(selectChartData);
  const isLoadingChart = useAppSelector(selectChartLoading);

  return (
    <div>
      {isLoadingFilters && <p>Loading filters...</p>}
      {isLoadingChart && <p>Loading chart...</p>}
      
      <p>Filters: {JSON.stringify(filters)}</p>
      <p>Chart: {JSON.stringify(chartData)}</p>
    </div>
  );
};
````

---

### **Folder Structure:**

```
src/modules/dashboard/
├── redux/
│   ├── dashboard-reducer.ts       ← Combine reducers
│   ├── slices/
│   │   ├── filter-slice.ts        ← Filter reducer
│   │   ├── chart-slice.ts         ← Chart reducer
│   │   └── metrics-slice.ts       ← Metrics reducer
│   ├── sagas/
│   │   ├── filter-saga.ts         ← Filter saga
│   │   ├── chart-saga.ts          ← Chart saga
│   │   └── metrics-saga.ts        ← Metrics saga
│   └── selectors/
│       ├── filter-selectors.ts    ← Filter selectors
│       ├── chart-selectors.ts     ← Chart selectors
│       └── metrics-selectors.ts   ← Metrics selectors
```

---

## **Tóm tắt:**

### **1. `serializableCheck: false`:**
- ✅ Cần thiết cho Redux Saga
- ✅ Hoặc config ignore specific actions
- ⚠️ Chỉ tắt khi cần, không phải mặc định

### **2. Redux Hooks:**
- ✅ **Cách 1 recommended** cho production (simple & standard)
- ✅ **Cách 2** khi cần custom logic (logging, analytics)

### **3. Multiple Reducers:**
- ✅ Hoàn toàn có thể thêm nhiều reducers
- ✅ Dùng `combineReducers` để combine
- ✅ Tạo selectors để access state dễ dàng
- ✅ Scalable và maintainable

---

**Có câu hỏi gì nữa không? 🚀**