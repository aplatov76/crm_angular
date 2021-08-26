export enum ActionTypes {
    ORDERS = '[Orders] Orders',
    ORDERS_SUCCESS = '[Orders] Orders success',
    ORDERS_FAILED = '[Orders] Orders failure',

    ORDER_ID = '[Order] start load',
    ORDER_ID_SUCCESS = '[Order] load success',
    ORDER_ID_FAILED = '[Order] load failed',

    ADD_ORDER = '[Add order] Add order start',
    ADD_ORDER_SUCCESS = '[Add order] Add order success',
    ADD_ORDER_FAILURE = '[Add order] Add order failure',

    ORDER_PAY = '[Pay order] pay order start',
    ORDER_PAY_SUCCESS = '[Pay order] pay order success',
    ORDER_PAY_FAILED = '[Pay order] pay order failed'

}