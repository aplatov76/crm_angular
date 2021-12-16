export interface ProductInterface {
  id: number;
  articul: string;
  title: string;
  visible?: boolean;
  stock: number;
  description?: string;
  createAt?: Date;
  updateAt?: Date;
  price: number;
  trade_price?: number;
  parent: number;
  isDeleted: boolean;

  /** К удалению */
  info?: string;
  attribute_id?: number | null;
  color?: number;
  img_url?: string;
}
