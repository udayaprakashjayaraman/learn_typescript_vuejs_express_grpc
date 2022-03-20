import http from "@/http-common";

class ProductDataService {
  getAll(): Promise<any> {
    return http.get("/products");
  }

  get(id: any): Promise<any> {
    return http.get(`/products/${id}`);
  }

  create(data: any): Promise<any> {
    return http.put("/products/add", data);
  }

  update(data: any): Promise<any> {
    return http.post(`/products/update`, data);
  }

  approve(id: any): Promise<any> {
    return http.get(`/products/approve/${id}`);
  }

  findByTitle(title: string): Promise<any> {
    return http.get(`/products?title=${title}`);
  }
}

export default new ProductDataService();
