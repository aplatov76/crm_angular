export interface ProductsInterface{
    id: number,
    title: string,
    articul: string,
    stock: number,
    price: number,
    parent: number,
    visible?: number,
    children?: ProductsInterface[]
}