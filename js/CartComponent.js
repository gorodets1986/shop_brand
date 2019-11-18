Vue.component('cart', {
    data(){
      return {
          cartItems: [],
          showCart: false,
          image: `img/cart.svg`,
          alt: `shopping`,
          link: `singlePage.html`,
          checkout: `checkout.html`,
          shoppingCart: `shoppingCart.html`
      }
    },
    methods: {
        addProduct(product){
            this.$parent.getJson(`addToBasket.json`)
                .then(data => {
                    if(data.result){
                        let find = this.cartItems.find(el => el.id_product === product.id_product);
                        if(find){
                            find.quantity++
                        } else {
                            let prod = Object.assign({quantity: 1}, product);
                            this.cartItems.push(prod);
                        }
                    } else {
                        console.log('error!')
                    }
                })
        },
        remove(product){
            this.$parent.getJson(`deleteFromBasket.json`)
                .then(data => {
                    if(data.result){
                        if(product.quantity > 1){
                            product.quantity--
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        }
                    } else {
                        console.log('error!')
                    }
                })
        }
    },
    mounted(){
        this.$parent.getJson(`getBasket.json`)
            .then(data => {
                for(let el of data.contents){
                    this.cartItems.push(el);
                }
            });
    },
    template: `
<div>
        <a href="#" class="header__cart" type="button" @click="showCart = !showCart"><img :src="image" :alt="alt"></a>
        <div class="header__cart-drop" v-show="showCart">
            <p v-if="!cartItems.length">Cart is empty</p>
            <cart-item 
            v-for="item of cartItems" 
            :key="item.id_product"
            :cart-item="item"
            :link="link"
            @remove="remove"></cart-item>
            <div class="header__cart-sum">
                        <div class="header__cart-total">TOTAL</div>
                        <div class="header__cart-price">$ 104</div>
                    </div>
                    <a href="checkout.html" class="header__cart-checkout">Checkout</a>
                    <a href="shoppingCart.html" class="header__cart-buy">Go to cart</a>
        </div>
</div>`
});

Vue.component('cart-item', {
    props: ['cartItem', 'img', 'link'],
    template: `<div class="header__cart-product">
                            <div class="header__cart-block">
                                <a :href="link" class="header__cart-link"><img class="header__cart-image" :src="cartItem.image"
                                                                                         :alt="cartItem.product_name"></a>
                            </div>
                            <div class="header__cart-block second-block">
                                <a :href="link" class="header__cart-a">{{cartItem.product_name}}</a>
                                <div>
                                    <i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i
                                        class="far fa-star"></i><i class="far fa-star"></i>
                                </div>
                                <p class="header__cart-p">{{cartItem.quantity}}<span class="header__cart-x">x</span>$ {{cartItem.price}}</p>
                                <p class="header__cart-p">$ {{cartItem.quantity*cartItem.price}}</p>
                            </div>
                            <a href="#" class="header__cart-block" @click="$emit('remove', cartItem)"><i class="fas fa-trash-alt"></i></a>
                        </div>`
});