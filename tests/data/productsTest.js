import { Product, Clothing } from "../../data/products.js";

describe('test-suite: Product', () => {
    let product;

    beforeEach(() => {
        product = new Product({
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
              stars: 4.5,
              count: 87
            },
            priceCents: 1090,
            keywords: [
              "socks",
              "sports",
              "apparel"
            ]
          });
    });


    it('has the correct properties', () => {
        expect(product.id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(product.name).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
        expect(product.rating.stars).toEqual(4.5);
      });

    it('gets the stars url', () => {
        expect(product.getStarsUrl()).toEqual(`images/ratings/rating-45.png`);
    });

    it('gets the price', () => {
        expect(product.getPrice()).toEqual('$10.90');
    });

    it('does not display any extra Info', () => {
        expect(product.extraInfoHTML()).toEqual('');
    });
});

describe('test-suite: Clothing', () => {
    let clothing;

    beforeEach(() => {
        clothing = new Clothing({
            id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
            name: "Adults Plain Cotton T-Shirt - 2 Pack",
            rating: {
              stars: 4.5,
              count: 56
            },
            priceCents: 799,
            keywords: [
              "tshirts",
              "apparel",
              "mens"
            ],
            type: "clothing",
            sizeChartLink: "images/clothing-size-chart.png"
          });
    });

    it('has the correct properties', () => {
        expect(clothing.id).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
        expect(clothing.name).toEqual('Adults Plain Cotton T-Shirt - 2 Pack');
        expect(clothing.sizeChartLink).toEqual('images/clothing-size-chart.png');
    });

    it('gets the stars url', () => {
        expect(clothing.getStarsUrl()).toEqual(`images/ratings/rating-45.png`);
    });

    it('gets the price', () => {
        expect(clothing.getPrice()).toEqual('$7.99');
    });

    it('displays a size chart link in extraInfoHTML', () => {
        expect(clothing.extraInfoHTML()).toContain(
        `
    <a href="images/clothing-size-chart.png" target="_blank">
    Size chart
    </a>
    `
    );
    });
});
