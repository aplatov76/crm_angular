import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "../actionTypes";
import { ProductsInterface } from "../../interfaces/products.interface";
import { ProductInterface } from "../../../../interfaces/product.interface";
import { GroupsInterface } from "../../interfaces/groups.interface";
import { AttributesInterface } from "src/app/shared/interfaces/attributes.interface";

export const productsAction = createAction(ActionTypes.PRODUCTS_WEB_LIST);
export const productsActionSuccess = createAction(ActionTypes.PRODUCTS_WEB_LIST_SUCCESS, props<{products: ProductsInterface[]}>());
export const productsActionFailed = createAction(ActionTypes.PRODUCTS_WEB_LIST_FAILED, props<{err: any}>());

export const productAction = createAction(ActionTypes.PRODUCT_WEB, props<{id: number}>());
export const productActionSuccess = createAction(ActionTypes.PRODUCTS_WEB_SUCCESS, props<{product: ProductsInterface}>());
export const productActionFailed = createAction(ActionTypes.PRODUCTS_WEB_FAILED, props<{err: any}>());

export const productInsertUpdate = createAction(ActionTypes.PRODUCT_WEB_INSERT_UPDATE, props<{product: FormData}>());
export const productInsertUpdateSuccess = createAction(ActionTypes.PRODUCTS_WEB_INSERT_UPDATE_SUCCESS, props<{res: any}>());
export const productInsertUpdateFailed = createAction(ActionTypes.PRODUCTS_WEB_INSERT_UPDATE_FAILED, props<{err: any}>());

export const productDelete = createAction(ActionTypes.PRODUCT_WEB_DELETE, props<{id: number}>());
export const productDeleteSuccess = createAction(ActionTypes.PRODUCTS_WEB_DELETE_SUCCESS, props<{res: any}>());
export const productDeleteFailed = createAction(ActionTypes.PRODUCTS_WEB_DELETE_FAILED, props<{err: any}>());

export const productGroups = createAction(ActionTypes.PRODUCT_WEB_GROUPS);
export const productGroupsSuccess = createAction(ActionTypes.PRODUCTS_WEB_GROUPS_SUCCESS, props<{groups: GroupsInterface[]}>());
export const productGroupsFailed = createAction(ActionTypes.PRODUCTS_WEB_GROUPS_FAILED, props<{err: any}>());

export const attributes = createAction(ActionTypes.ATTRIBUTES_WEB_LIST);
export const attributesSuccess = createAction(ActionTypes.ATTRIBUTES_WEB_LIST_SUCCESS, props<{attributes: AttributesInterface[]}>());
export const attributesFailed = createAction(ActionTypes.ATTRIBUTES_WEB_LIST_FAILED, props<{err: any}>());

export const attribute = createAction(ActionTypes.ATTRIBUTE_WEB, props<{id: number}>());
export const attributeSuccess = createAction(ActionTypes.ATTRIBUTE_WEB_SUCCESS, props<{attribute: AttributesInterface}>());
export const attributeFailed = createAction(ActionTypes.ATTRIBUTE_WEB_FAILED, props<{err: any}>());

export const attributeInsertUpdate = createAction(ActionTypes.ATTRIBUTE_WEB_INSERT_UPDATE, props<{attribute: AttributesInterface}>());
export const attributeInsertUpdateSuccess = createAction(ActionTypes.ATTRIBUTE_WEB_INSERT_UPDATE_SUCCESS, props<{attribute: AttributesInterface}>());
export const attributeInsertUpdateFailed = createAction(ActionTypes.ATTRIBUTE_WEB_INSERT_UPDATE_FAILED, props<{err: any}>());

