import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      dataGrid: {
        noRowsLabel: "No rows",
        noResultsOverlayLabel: "No results found.",

        errorOverlayDefaultLabel: "An error occurred.",

        toolbarDensity: "Density",
        toolbarDensityLabel: "Density",
        toolbarDensityCompact: "Compact",
        toolbarDensityStandard: "Standard",
        toolbarDensityComfortable: "Comfortable",
        toolbarColumns: "Columns",
        toolbarColumnsLabel: "Select columns",
        toolbarFilters: "Filters",
        toolbarFiltersLabel: "Show filters",
        toolbarFiltersTooltipHide: "Hide filters",
        toolbarFiltersTooltipShow: "Show filters",
        toolbarFiltersTooltipActive_one: "{{count}} active filter",
        toolbarFiltersTooltipActive_other: "{{count}} active filters",
        toolbarQuickFilterPlaceholder: "Search…",
        toolbarQuickFilterLabel: "Search",
        toolbarQuickFilterDeleteIconLabel: "Clear",
        toolbarExport: "Export",
        toolbarExportLabel: "Export",
        toolbarExportCSV: "Download as CSV",
        toolbarExportPrint: "Print",
        toolbarExportExcel: "Download as Excel",

        columnsPanelTextFieldLabel: "Find column",
        columnsPanelTextFieldPlaceholder: "Column title",
        columnsPanelDragIconLabel: "Reorder column",
        columnsPanelShowAllButton: "Show all",
        columnsPanelHideAllButton: "Hide all",

        columnsManagementShowHideAllText: "Show/Hide All",

        filterPanelAddFilter: "Add filter",
        filterPanelDeleteIconLabel: "Delete",
        filterPanelLinkOperator: "Logic operator",
        filterPanelOperator: "Operator",
        filterPanelOperatorAnd: "And",
        filterPanelOperatorOr: "Or",
        filterPanelColumns: "Column",
        filterPanelInputLabel: "Value",
        filterPanelInputPlaceholder: "Filter value",

        filterOperatorContains: "contains",
        filterOperatorDoesNotContain: "does not contain",
        filterOperatorEquals: "equals",
        filterOperatorDoesNotEqual: "does not equal",
        filterOperatorStartsWith: "starts with",
        filterOperatorEndsWith: "ends with",
        filterOperatorIs: "is",
        filterOperatorNot: "is not",
        filterOperatorAfter: "is after",
        filterOperatorOnOrAfter: "is on or after",
        filterOperatorBefore: "is before",
        filterOperatorOnOrBefore: "is on or before",
        filterOperatorIsEmpty: "is empty",
        filterOperatorIsNotEmpty: "is not empty",
        filterOperatorIsAnyOf: "is any of",

        filterValueAny: "any",
        filterValueTrue: "true",
        filterValueFalse: "false",

        columnsManagementSearchTitle: "Search",
        columnsManagementNoColumns: "No columns",
        columnsManagementShowHideToolbarLabel: "Show/Hide columns",
        columnsManagementReset: "Reset",

        columnMenuLabel: "Menu",
        columnMenuShowColumns: "Manage columns",
        columnMenuHideColumn: "Hide column",
        columnMenuUnsort: "Unsort",
        columnMenuSortAsc: "Sort by ASC",
        columnMenuSortDesc: "Sort by DESC",
        columnMenuFilter: "Filter",
        columnMenuManageColumns: "Manage columns",
        footerRowSelected_one: "Selected {{count}} row",
        footerRowSelected_other: "Selected {{count}} rows",
        footerTotalRows: "Total Rows:",
        footerTotalVisibleRows: "{{visibleCount}} of {{totalCount}}",
        footerPaginationRowsPerPage: "Rows per page:",
        MuiTablePagination: {
          labelRowsPerPage: "Rows per page:",
          labelDisplayedRows: "Showing {{from}}–{{to}} of {{count}}",
          "getItemAriaLabel.first": "Go to first page",
          "getItemAriaLabel.last": "Go to last page",
          "getItemAriaLabel.next": "Go to next page",
          "getItemAriaLabel.previous": "Go to previous page",
          labelGotoPage: "Go to {{page}} page",
        },
      },
      datePicker: {
        dateFormat: "YYYY-MM-DD",

        previousMonth: "Previous Month",
        nextMonth: "Next Month",
        cancelButtonLabel: "Cancel",
        clearButtonLabel: "Clear",
        okButtonLabel: "Ok",
        todayButtonLabel: "Today",

        fieldYearPlaceholder: "Year",
        fieldMonthPlaceholder: "Month",
        fieldDayPlaceholder: "Day",
      },
    },
  },
  zh: {
    translation: {
      dataGrid: {
        noRowsLabel: "沒有資料",
        noResultsOverlayLabel: "沒有找到結果。",

        errorOverlayDefaultLabel: "發生錯誤。",

        toolbarDensity: "密度",
        toolbarDensityLabel: "密度",
        toolbarDensityCompact: "緊湊",
        toolbarDensityStandard: "標準",
        toolbarDensityComfortable: "舒適",
        toolbarColumns: "欄位",
        toolbarColumnsLabel: "選擇欄位",
        toolbarFilters: "篩選",
        toolbarFiltersLabel: "顯示篩選",
        toolbarFiltersTooltipHide: "隱藏篩選",
        toolbarFiltersTooltipShow: "顯示篩選",
        toolbarFiltersTooltipActive: "{{count}} 個啟用篩選",
        toolbarQuickFilterPlaceholder: "搜尋…",
        toolbarQuickFilterLabel: "搜尋",
        toolbarQuickFilterDeleteIconLabel: "清除",
        toolbarExport: "匯出",
        toolbarExportLabel: "匯出",
        toolbarExportCSV: "下載為 CSV",
        toolbarExportPrint: "列印",
        toolbarExportExcel: "下載為 Excel",

        columnsPanelTextFieldLabel: "搜尋欄位",
        columnsPanelTextFieldPlaceholder: "欄位名稱",
        columnsPanelDragIconLabel: "重新排序欄位",
        columnsPanelShowAllButton: "顯示全部",
        columnsPanelHideAllButton: "隱藏全部",

        columnsManagementShowHideAllText: "顯示/隱藏全部",

        filterPanelAddFilter: "新增篩選",
        filterPanelDeleteIconLabel: "刪除",
        filterPanelLinkOperator: "邏輯運算子",
        filterPanelOperator: "條件",
        filterPanelOperatorAnd: "與",
        filterPanelOperatorOr: "或",
        filterPanelColumns: "欄位",
        filterPanelInputLabel: "值",
        filterPanelInputPlaceholder: "篩選值",

        filterOperatorContains: "包含",
        filterOperatorDoesNotContain: "不包含",
        filterOperatorEquals: "等於",
        filterOperatorDoesNotEqual: "不等於",
        filterOperatorStartsWith: "開始於",
        filterOperatorEndsWith: "結束於",
        filterOperatorIs: "是",
        filterOperatorNot: "不是",
        filterOperatorAfter: "晚於",
        filterOperatorOnOrAfter: "等於或晚於",
        filterOperatorBefore: "早於",
        filterOperatorOnOrBefore: "等於或早於",
        filterOperatorIsEmpty: "為空",
        filterOperatorIsNotEmpty: "不為空",
        filterOperatorIsAnyOf: "是任一",

        filterValueAny: "任何",
        filterValueTrue: "真",
        filterValueFalse: "假",

        columnsManagementSearchTitle: "搜尋",
        columnsManagementNoColumns: "無欄位",
        columnsManagementShowHideToolbarLabel: "顯示/隱藏欄位",
        columnsManagementReset: "重置",

        columnMenuLabel: "選單",
        columnMenuShowColumns: "管理欄位",
        columnMenuHideColumn: "隱藏欄位",
        columnMenuUnsort: "取消排序",
        columnMenuSortAsc: "升序排序",
        columnMenuSortDesc: "降序排序",
        columnMenuFilter: "篩選",
        columnMenuManageColumns: "管理欄位",

        footerRowSelected: "已選擇 {{count}} 行",
        footerTotalRows: "總行數：",
        footerTotalVisibleRows: "{{visibleCount}} / {{totalCount}}",
        footerPaginationRowsPerPage: "每頁行數：",
        MuiTablePagination: {
          labelRowsPerPage: "每頁行數：",
          labelDisplayedRows: "顯示 {{from}}–{{to}} / {{count}}",
          "getItemAriaLabel.first": "前往第一頁",
          "getItemAriaLabel.last": "前往最後一頁",
          "getItemAriaLabel.next": "前往下一頁",
          "getItemAriaLabel.previous": "前往上一頁",
          labelGotoPage: "前往第{{page}}頁",
        },
      },
      datePicker: {
        dateFormat: "YYYY年MM月DD日",

        previousMonth: "上個月",
        nextMonth: "下個月",
        cancelButtonLabel: "取消",
        clearButtonLabel: "清除",
        okButtonLabel: "確定",
        todayButtonLabel: "今天",

        fieldYearPlaceholder: "年",
        fieldMonthPlaceholder: "月",
        fieldDayPlaceholder: "日",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "zh",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  // debug: true,
});

i18n.on("languageChanged", (lng) => {
  console.log("Language changed to:", lng);
});

export default i18n;
