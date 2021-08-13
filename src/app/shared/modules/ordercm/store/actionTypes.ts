export enum ActionTypes {
    ORDERS_CM_LIST = "[Orders cm list] START LOAD",
    ORDERS_CM_LIST_SUCCESS = "[Orders cm list] LOAD SUCCESS",
    ORDERS_CM_LIST_FAILED = "[Orders cm list] LOAD FAILED",

    ORDER_CM = "[Order cm] START LOAD",
    ORDER_CM_SUCCESS = "[Order cm] LOAD SUCCESS",
    ORDER_CM_FAILED = "[Order cm] LOAD FAILED",

    ORDERS_CM_INSERT = "[Orders cm insert] START LOAD",
    ORDERS_CM_INSERT_SUCCESS = "[Orders cm insert] LOAD SUCCESS",
    ORDERS_CM_INSERT_FAILED = "[Orders cm insert] LOAD FAILED",

    ORDER_DATA_CM_REMOVE = "[Order data cm remove] START LOAD",
    ORDER_DATA_CM_REMOVE_SUCCESS = "[Order data cm remove] LOAD SUCCESS",
    ORDER_DATA_CM_REMOVE_FAILED = "[Order data cm remove] LOAD FAILED",

    ORDER_DATA_CM_SEND = "[Order data cm send] START LOAD",
    ORDER_DATA_CM_SEND_SUCCESS = "[Order data cm send] LOAD SUCCESS",
    ORDER_DATA_CM_SEND_FAILED = "[Order data cm send] LOAD FAILED"
}