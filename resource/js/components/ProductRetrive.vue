<template>
  <div>
    <div class="table-responsive">
      <p class="h2">Product Display</p>
      <hr class="bg-success" />
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image Path</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in productitems" v-bind:key="index">
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>${{ product.price }}</td>
            <td>
              <img v-bind:src="product.image" alt="demo" style="width:100px;" />
            </td>
            <td>
              <button class="btn btn-warning m-2" @click="updateProductItem(index)">
                Edit
              </button>
              <button class="btn btn-danger m--2" @click="deleteProduct(index)">
                Delete
              </button>
              <button class="btn btn-success m-2" @click="addToCart(index)">
                Add to cart
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="editProduct">
      <div class="form-group">
        <p class="h2">Update Product</p>
        <hr class="bg-success" />
        <div class="input-group">
          <input
            type="text"
            v-model="editProductName"
            placeholder="Product Name"
            class="form-control"
          />
        </div>
      </div>

      <div class="form-group">
        <div class="input-group">
          <input
            type="number"
            v-model="editProductPrice"
            placeholder="Product Price"
            class="form-control"
          />
        </div>
      </div>

      <div class="form-group">
        <div class="input-group">
          <input
            type="text"
            v-model="editProductImage"
            class="form-control"
            placeholder="Product Image"
          />
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-warning" @click="productButtonEdit">
          update
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    productitems: {
      type: Array,
      Required: true
    },
    cartitems: {
      type: Array
    }
  },
  template: "#productRetriveTemplate",
  data() {
    return {
      id: "",
      editProduct: false,
      editProductPrice: "",
      editProductName: "",
      editProductImage: "",
      cartCheckVariable: "",
      cartCheckQuantity: "",
      // cartItems: [],
      finalSubTotal: ""
    };
  },
  created() {
    this.totalAmountDisplay();
  },
  methods: {
    deleteProduct: function(index) {
      this.productitems.splice(index, 1);
    },

    updateProductItem(index) {
      this.arrayIndex = index;
      this.id = this.productitems[index]["id"];
      this.editProductName = this.productitems[index]["name"];
      this.editProductPrice = this.productitems[index]["price"];
      this.editProductImage = this.productitems[index]["image"];
      this.editProduct = true;
    },

    productButtonEdit: function() {
      this.$set(this.productitems, this.arrayIndex, {
        id: this.id,
        name: this.editProductName,
        price: this.editProductPrice,
        image: this.editProductImage
      });
      this.editProductName = "";
      this.editProductPrice = "";
      this.editproductImage = "";
      this.editProduct = false;
    },

    addToCart: function(index) {
      let cartProductName = this.productitems[index]["name"];
      let cartProductPrice = this.productitems[index]["price"];
      let cartProductImage = this.productitems[index]["image"];
      let cartProductQuantity = 1;

      this.cartitems.filter(obj => {
        if (obj.name === cartProductName) {
          this.cartCheckVariable = obj.name;
        }
      });

      if (this.cartCheckVariable) {
        for (let i = 0; i < this.cartitems.length; i++) {
          if (this.cartitems[i].name == this.cartCheckVariable) {
            var tempCartProductQuantity = this.cartitems[i].quantity + 1;
            this.$set(this.cartitems, i, {
              name: cartProductName,
              price: cartProductPrice,
              image: cartProductImage,
              quantity: tempCartProductQuantity
            });
          }
        }
        this.cartCheckVariable = "";
      } else {
        this.cartitems.push({
          name: cartProductName,
          price: cartProductPrice,
          image: cartProductImage,
          quantity: cartProductQuantity
        });
      }
      this.totalAmountDisplay();
    },
    totalAmountDisplay: function() {
      if (this.cartitems.length) {
        this.finalSubTotal = 0;
        for (let i = 0; i < this.cartitems.length; i++) {
          this.finalSubTotal +=
            this.cartitems[i].quantity * this.cartitems[i].price;
        }
      }
    }
  }
};
</script>