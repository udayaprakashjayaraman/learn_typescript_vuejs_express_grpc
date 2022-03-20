<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by title"
          v-model="title"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Products List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(products, index) in products"
          :key="index"
          @click="setActiveProduct(products, index)"
        >
          {{ products.title }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentProduct._id">
        <h4>Product</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentProduct.title }}
        </div>
        <div>
          <label><strong>Body:</strong></label>
          {{ currentProduct.body }}
        </div>
        <div>
          <label><strong>Status:</strong></label>
          {{ currentProduct.status }}
        </div>

        <button type="submit" class="badge btn btn-warning ml-2">
          <router-link
            :to="'/products/' + currentProduct._id"
            class="badge badge-warning"
            >Edit</router-link
          >
        </button>
        <button
          type="submit"
          class="badge btn btn-success m-1"
          @click="approveProduct"
        >
          Approve
        </button>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Product...</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductDataService from "@/services/ProductDataService";
import Product from "@/types/Product";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "products-list",
  data() {
    return {
      products: [] as Product[],
      currentProduct: {} as Product,
      currentIndex: -1,
      title: "",
      message: "",
    };
  },
  methods: {
    retrieveProducts() {
      ProductDataService.getAll()
        .then((response: ResponseData) => {
          this.products = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveProducts();
      this.currentProduct = {} as Product;
      this.currentIndex = -1;
    },

    setActiveProduct(product: Product, index = -1) {
      this.currentProduct = product;
      this.currentIndex = index;
    },

    approveProduct() {
      ProductDataService.approve(this.currentProduct._id)
        .then((response: ResponseData) => {
          alert("The product was approved successfully!");
          window.location.reload();
        })
        .catch((e: Error) => {
          alert("Unable to Approve product!");
          console.error(e);
        });
    },

    searchTitle() {
      ProductDataService.findByTitle(this.title)
        .then((response: ResponseData) => {
          this.products = response.data;
          this.setActiveProduct({} as Product);
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveProducts();
  },
});
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
