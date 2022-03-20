import http from "@/http-common";
class ProductDataService {
    getAll() {
        return http.get("/products");
    }
    get(id) {
        return http.get(`/products/${id}`);
    }
    create(data) {
        return http.put("/products/add", data);
    }
    update(data) {
        return http.post(`/products/update`, data);
    }
    approve(id) {
        return http.get(`/products/approve/${id}`);
    }
    findByTitle(title) {
        return http.get(`/products?title=${title}`);
    }
}
export default new ProductDataService();
//# sourceMappingURL=ProductDataService.js.map