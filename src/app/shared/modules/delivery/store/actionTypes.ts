export enum ActionTypes {
  DELIVERYS = '[DELIVERYS] start load',
  DELIVERYS_SUCCESS = '[DELIVERYS] load success',
  DELIVERYS_FAILED = '[DELIVERYS] load failure',

  DELIVERY_ID = '[DELIVERY] start load',
  DELIVERY_ID_SUCCESS = '[DELIVERY] load success',
  DELIVERY_ID_FAILED = '[DELIVERY] load failed',

  ADD_DELIVERY = '[Add DELIVERY] add fetch start',
  ADD_DELIVERY_SUCCESS = '[Add DELIVERY] add fetch success',
  ADD_DELIVERY_FAILURE = '[Add DELIVERY] add fetch failure',

  CLOSE_DELIVERY = '[Close DELIVERY] close fetch start',
  CLOSE_DELIVERY_SUCCESS = '[Close DELIVERY] close fetch success',
  CLOSE_DELIVERY_FAILURE = '[Close DELIVERY] close fetch failure'
}
