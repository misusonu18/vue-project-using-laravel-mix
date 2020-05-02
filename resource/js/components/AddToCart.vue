<template>
  <div>
    <p class="h2">Add To Cart</p>
    <hr class="bg-success" />
    <div v-for="(cartItem, index) in cartitems" v-bind:key="index">
      <p><img v-bind:src="cartItem.image" alt="demo" style="width:100px;" /></p>
      <div class="d-flex justify-content-between">
        <p>
          {{ cartItem.name }}
        </p>
        <p>${{ cartItem.price }}</p>
      </div>
      <div class="d-flex justify-content-between">
        <p>
          {{ cartItem.quantity }}
        </p>
        <div>
          <button
            class="btn btn-success m-2"
            @click="addProductCartQuantity(index)"
          >
            +
          </button>
          <button
            class="btn btn-info m-2"
            @click="subtractProductCartQuantity(index)"
          >
            -
          </button>
          <button class="btn btn-danger m02" @click="deleteProductCart(index)">
            delete
          </button>
        </div>
      </div>
      <hr class="bg-info" />
    </div>
    <div class="d-block d-flex justify-content-between">
      <div class="justify-content-start">
        <p v-if="subTotal">Sub-Total</p>
        <p v-if="shippingCharge">Shipping Charge</p>
        <!-- <p v-if="discountAmount">Discount Amount</p> -->
        <p v-if="total">Total</p>
        <p v-if="tax">Tax</p>
        <p v-if="payable">Payable</p>
      </div>

      <div class="justify-content-end">
        <p>
          {{ subTotal }}
        </p>
        <p>
          {{ shippingCharge }}
        </p>
        <!-- <p v-if="discountAmount">
                        {{ DiscountAmount }}
                    </p> -->
        <p>
          {{ total }}
        </p>
        <p>
          {{ tax }}
        </p>
        <p>
          {{ payable }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cartitems: {
      type: Array,
      required: true
    }
  },
  template: "#addToCartTemplate",
  data() {
    return {
      finalSubTotal: "",
      finalShipping: "",
      finalTotal: "",
      finalTax: "",
      fianlPayable: "",
      shippingValue: ""
    };
  },
  created() {
    this.checkSubtotal();
  },
  computed: {
    subTotal() {
      let subTotal = 0;
      this.cartitems.forEach(item => {
        subTotal += item.price * item.quantity;
      });

      this.finalSubTotal = subTotal;

      return "$" + subTotal.toFixed(2);
    },
    shippingCharge() {
          let shipping = 0
          if (this.finalSubTotal > 0 && this.finalSubTotal <= 100) {
              this.shippingValue = true;
              shipping = this.finalSubTotal * 4 / 100;
              this.finalShipping = shipping;

              return '$' + shipping.toFixed(2);
          } else {
              this.finalShipping = 0;
              this.shippingValue = false;
          }
    },
    total() {
      let total = 0;

      if (this.finalSubTotal <= 100) {
        total = this.finalSubTotal;
      } else {
        total = this.finalSubTotal;
      }

      total = total + this.finalShipping;
      this.finalTotal = total;

      return "$" + total.toFixed(2);
    },
    tax() {
      let subTotal = 0;
      let tax = 0;

      this.cartitems.forEach(item => {
        subTotal += item.price * item.quantity;
      });

      if (subTotal <= 100) {
        tax = (this.finalTotal * 4) / 100;
        this.finalTax = tax;
      } else {
        tax = (subTotal * 4) / 100;
        this.finalTax = tax;
      }

      return "$" + tax.toFixed(2);
    },
    payable: function() {
      let payable = this.finalTax + this.finalTotal;
      return "$" + payable.toFixed(2);
    }
  },
  methods: {
    checkSubtotal() {
      if (this.subTotals) {
        this.shippingCharge = this.subTotal < 1000 ? 100 : 0;
        this.total = parseInt(this.shippingCharge) + parseInt(this.subTotal);
        this.tax = 18;
        this.payable = parseInt(this.total) + parseInt(this.tax);
      } else {
        this.subTotal = 0;
        this.shippingCharge = 0;
        this.total = 0;
        this.tax = 0;
        this.payable = 0;
      }
    },
    addProductCartQuantity: function(index) {
      let cartProductName = this.cartitems[index]["name"];
      let cartProductPrice = this.cartitems[index]["price"];
      let cartProductImage = this.cartitems[index]["image"];
      let cartProductQuantity = this.cartitems[index]["quantity"] + 1;

      this.$set(this.cartitems, index, {
        name: cartProductName,
        price: cartProductPrice,
        image: cartProductImage,
        quantity: cartProductQuantity
      });
      this.checkSubtotal();
    },

    subtractProductCartQuantity: function(index) {
      let cartProductName = this.cartitems[index]["name"];
      let cartProductPrice = this.cartitems[index]["price"];
      let cartProductImage = this.cartitems[index]["image"];
      let cartProductQuantity = this.cartitems[index]["quantity"] - 1;

      this.cartitems.filter(obj => {
        if (obj.name === cartProductName) {
          this.cartCheckQuantity = obj.quantity;
        }
      });
      if (this.cartCheckQuantity <= 1) {
        this.cartitems.splice(index, 1);
      } else {
        this.$set(this.cartitems, index, {
          name: cartProductName,
          price: cartProductPrice,
          image: cartProductImage,
          quantity: cartProductQuantity
        });
      }
    },

    deleteProductCart: function(index) {
      this.cartitems.splice(index, 1);
      alertMessage('Cart Product delete Successfully', 'success');
    },
  }
};
</script>