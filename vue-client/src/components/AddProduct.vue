<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="product.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="body">Body</label>
        <input
          class="form-control"
          id="body"
          required
          v-model="product.body"
          name="body"
        />
      </div>

      <button @click="saveProduct" class="btn btn-success mt-2">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newProduct">Add</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductDataService from "@/services/ProductDataService";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "add-product",
  data() {
    return {
      product: {
        _id: null,
        title: "",
        body: "",
        published: false,
      } as any,
      submitted: false,
    };
  },
  methods: {
    saveProduct() {
      let data = {
        title: this.product.title,
        body: this.product.body,
        status: "pending",
      };

      ProductDataService.create(data)
        .then((response: ResponseData) => {
          this.product._id = response.data._id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    newProduct() {
      this.submitted = false;
      this.product = {} as any;
    },
  },
});
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
