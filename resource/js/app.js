import Vue from 'vue';
import Create from './components/ProductCreate.vue';
import Retrive from './components/ProductRetrive.vue';
import Cart from './components/AddToCart.vue';


new Vue({
    el: '#app',
    data() {
        return {
            productItems: [],
            cartItems: []
        }
    },
    methods: {
        updateProduct: function(e) {
          let id = e[0]["id"];
          let name = e[0]["name"];
          let price = e[0]["price"];
          let image = e[0]["image"];
          this.productItems.push({
            id: id,
            name: name,
            price: price,
            image: image
          });
        }
    },
    components: 
    { 
        Create,
        Retrive,
        Cart
    }
});

