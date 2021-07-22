
export enum ActionTypes {
    PRODUCTS_WEB_LIST = "[Products web list] START LOAD",
    PRODUCTS_WEB_LIST_SUCCESS = "[Products web list] LOAD SUCCESS",
    PRODUCTS_WEB_LIST_FAILED = "[Products web list] LOAD FAILED",

    PRODUCT_WEB = "[Product web] START LOAD",
    PRODUCTS_WEB_SUCCESS = "[Product web] LOAD SUCCESS",
    PRODUCTS_WEB_FAILED = "[Product web] LOAD FAILED",

    PRODUCT_WEB_INSERT_UPDATE = "[Product web insert/update ] START LOAD",
    PRODUCTS_WEB_INSERT_UPDATE_SUCCESS = "[Product web insert/update ] LOAD SUCCESS",
    PRODUCTS_WEB_INSERT_UPDATE_FAILED = "[Product web insert/update ] LOAD FAILED",

    PRODUCT_WEB_DELETE = "[Product web delete ] START ",
    PRODUCTS_WEB_DELETE_SUCCESS = "[Product web delete ]  SUCCESS",
    PRODUCTS_WEB_DELETE_FAILED = "[Product web delete ]  FAILED",

    PRODUCT_WEB_GROUPS = "[Product web groups ] START LOAD",
    PRODUCTS_WEB_GROUPS_SUCCESS = "[Product web groups ] LOAD SUCCESS",
    PRODUCTS_WEB_GROUPS_FAILED = "[Product web groups ] LOAD FAILED",

    ATTRIBUTES_WEB_LIST = "[Product web attributes ] START LOAD",
    ATTRIBUTES_WEB_LIST_SUCCESS = "[Product web attributes ] LOAD SUCCESS",
    ATTRIBUTES_WEB_LIST_FAILED = "[Product web attributes ] LOAD FAILED",

    ATTRIBUTE_WEB = "[Product web attribute ] START LOAD",
    ATTRIBUTE_WEB_SUCCESS = "[Product web attribute ] LOAD SUCCESS",
    ATTRIBUTE_WEB_FAILED = "[Product web attribute ] LOAD FAILED",

    ATTRIBUTE_WEB_INSERT_UPDATE = "[Product web attribute ] START INSERT/UPDATE",
    ATTRIBUTE_WEB_INSERT_UPDATE_SUCCESS = "[Product web attribute ] INSERT/UPDATE SUCCESS",
    ATTRIBUTE_WEB_INSERT_UPDATE_FAILED = "[Product web attribute ] INSERT/UPDATE FAILED",
}