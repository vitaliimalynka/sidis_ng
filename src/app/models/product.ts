import IProduct from 'app/interfaces/product'

export class Product implements IProduct {
  public title: string
  public image: string
  public price: number

  constructor(obj: IProduct) {
    const {
      title,
      image,
      price
    } = obj
    this.title = title
    this.image = image
    this.price = price
  }
}
