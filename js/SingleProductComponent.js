Vue.component('favorite', {
    data(){
      return {
          products: [],
          filtered: [],
          imageCart: `img/cart-white.svg`,
          imageUpdate: `img/update.svg`,
          imageLike: `img/Like.svg`,
          imageAlt: `add to cart`,
          link: `singlePage.html`
      }
    },
    methods: {
        filter(value){
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.$parent.getJson(`getSingleProduct.json`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            })
    },
    template: `<div class="favorites__products">
        <product 
        v-for="product of filtered" 
        :key="product.id_product"
        :product="product"
        :img="product.image"
        :link="link"
        :imgCart="imageCart"
        :alt="imageAlt"
        :imgUpdate="imageUpdate"
        :imgLike="imageLike"></product>
    </div>`
});
Vue.component('product', {
    props: ['product', 'img', 'link', 'alt', 'img-cart', 'img-update', 'img-like'],
    template: `
    <div class="catalog__product">
                <a :href="link" class="catalog__link"><img class="catalog__img" :src="img" alt="product.product_name"></a>
                <div class="product__info">
                    <a :href="link">
                        <p class="catalog__text">{{product.product_name}}</p>
                    </a>
                    <span class="catalog__price">$ {{product.price}}</span>
                    <a href="#" class="catalog__add" @click="$root.$refs.cart.addProduct(product)"><img :src="imgCart" :alt="alt">add to cart</a>
                    <a href="#" class="catalog__update"><img :src="imgUpdate" alt="product update"></a>
                    <a href="#" class="catalog__like"><img :src="imgLike" alt="product like"></a>
                </div>
    </div>`
});