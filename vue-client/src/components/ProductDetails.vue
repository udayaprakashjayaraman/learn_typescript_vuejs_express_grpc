<template>
  <div v-if="currentProduct._id" class="edit-form">
    <h4>Product</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentProduct.title"
        />
      </div>
      <div class="form-group">
        <label for="body">Body</label>
        <input
          type="text"
          class="form-control"
          id="body"
          v-model="currentProduct.body"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentProduct.status }}
      </div>
    </form>

    <button type="submit" class="badge btn btn-success" @click="updateProduct">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Unable to fetch product...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductDataService from "@/services/ProductDataService";
import Product from "@/types/Product";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "products-details",
  data() {
    return {
      currentProduct: {} as Product,
      message: "",
    };
  },
  methods: {
    getProduct(_id: any) {
      ProductDataService.get(_id)
        .then((response: ResponseData) => {
          this.currentProduct = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    updateProduct() {
      this.currentProduct.status = "pending";
      ProductDataService.update(this.currentProduct)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.message = "The product was updated successfully!";
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getProduct(this.$route.params.id);
  },
});
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
