<template>
  <div>
    <div class="form-group">
      <p class="h2">Add Product</p>
      <hr class="bg-success" />
      <div class="input-group">
        <input
          type="text"
          v-model="productName"
          placeholder="Product Name"
          class="form-control"
        />
      </div>
    </div>

    <div class="form-group">
      <div class="input-group">
        <input
          type="number"
          v-model="productPrice"
          placeholder="Product Price"
          class="form-control"
        />
      </div>
    </div>

    <div class="form-group">
      <div class="input-group">
        <input
          type="text"
          v-model="productImage"
          class="form-control"
          placeholder="Product Image"
        />
      </div>
    </div>
    <div class="form-group">
      <button class="btn btn-success" @click="addNewProduct" v-if="addProduct">
        Create
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productName: "",
      productPrice: "",
      productImage: "",
      Items: [],
      editProduct: false,
      addProduct: true
    };
  },
  methods: {
    addNewProduct() {
      let incrementValue = 0;
      if (this.productName && this.productPrice) {
        incrementValue = incrementValue + 1;
        this.errors = [];
        this.Items.push({
          id: incrementValue,
          name: this.productName,
          price: this.productPrice,
          image: this.productImage
        });
        this.$emit("productitem", this.Items);
        this.Items = [];
        this.productPrice = "";
        this.productName = "";
        this.productImage = "";
      } else {
        this.errors = [];

        if (!this.productName) {
          this.errors.push("Name Required....");
        }

        if (!this.productPrice) {
          this.errors.push("Price Required....");
        }

        if (!this.productImage) {
          this.errors.push("Image Required....");
        }
      }
    },
  }
};
</script>