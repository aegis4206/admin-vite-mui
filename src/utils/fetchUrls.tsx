import useFetchActions from './fetchActions';

export const useFetch = <T=unknown>() => useFetchActions<T>("");

export const useAdminUser = <T=unknown>() => useFetchActions<T>("auth/user");
export const useSystemImportRecords = <T=unknown>() => useFetchActions<T>("system/import-records");

// 基本資料 -> 通路商
export const useSalesChannel = <T=unknown>() => useFetchActions<T>("scm/sales-channel");
export const useSalesChannelLogistics = <T=unknown>() => useFetchActions<T>("scm/sales-channel-logistics");
export const useDeliveryAgent = <T=unknown>() => useFetchActions<T>("scm/delivery-agent");
export const useDeliveryAgentStores = <T=unknown>() => useFetchActions<T>("scm/delivery-agent-stores");
export const useDeliveryAgentWarehouse = <T=unknown>() => useFetchActions<T>("scm/delivery-agent-warehouses");
export const useSalesChannelStores = <T=unknown>() => useFetchActions<T>("scm/sales-channel-stores");
export const useProductSkus = <T=unknown>() => useFetchActions<T>("scm/product-skus");
export const useSalesChannelStoreProductSkus = <T=unknown>() => useFetchActions<T>("scm/sales-channel-store-product-skus");
export const useProductSkuAcceptableDate = <T=unknown>() => useFetchActions<T>("scm/product-sku-acceptable-date");
export const useProductSkuUnitConversion = <T=unknown>() => useFetchActions<T>("scm/product-sku-unit-conversion");
// 通路商品、通路門市商品匯出匯入
export const useProductSkusImport = <T=unknown>() => useFetchActions<T>("scm/product-skus/import");
export const useSalesChannelStoreProductSkusImport = <T=unknown>() => useFetchActions<T>("scm/sales-channel-store-product-skus/import");


// 基本資料 -> 馬修
export const useWarehouses = <T=unknown>() => useFetchActions<T>("matthews/warehouses");
export const useErpProductSkus = <T=unknown>() => useFetchActions<T>("matthews/erp-product-skus");
export const useProductSkuMapping = <T=unknown>() => useFetchActions<T>("matthews/product-sku-mapping");
export const useProductSkuMappingHeader = <T=unknown>() => useFetchActions<T>("matthews/product-sku-mapping/header");

// 全聯
export const useDp = <T=unknown>() => useFetchActions<T>("px-mart/dp");
export const useSal = <T=unknown>() => useFetchActions<T>("px-mart/sal");
export const useDpin = <T=unknown>() => useFetchActions<T>("px-mart/dpin");
export const useDpout = <T=unknown>() => useFetchActions<T>("px-mart/dpout");
