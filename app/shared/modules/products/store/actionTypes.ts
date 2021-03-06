
export enum ActionTypes {
    PRODUCTS_LIST = "[Products list] START LOAD",
    PRODUCTS_LIST_SUCCESS = "[Products list] LOAD SUCCESS",
    PRODUCTS_LIST_FAILED = "[Products list] LOAD FAILED",

    PRODUCT = "[Product ] START LOAD",
    PRODUCTS_SUCCESS = "[Product ] LOAD SUCCESS",
    PRODUCTS_FAILED = "[Product ] LOAD FAILED",

    PRODUCT_INSERT_UPDATE = "[Product insert/update ] START LOAD",
    PRODUCTS_INSERT_UPDATE_SUCCESS = "[Product insert/update ] LOAD SUCCESS",
    PRODUCTS_INSERT_UPDATE_FAILED = "[Product insert/update ] LOAD FAILED",

    PRODUCT_GROUPS = "[Product groups ] START LOAD",
    PRODUCTS_GROUPS_SUCCESS = "[Product groups ] LOAD SUCCESS",
    PRODUCTS_GROUPS_FAILED = "[Product groups ] LOAD FAILED",
}