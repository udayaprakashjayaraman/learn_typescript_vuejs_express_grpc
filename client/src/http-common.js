import axios from "axios";
const apiClient = axios.create({
    baseURL: "http://localhost:3010/api/",
    headers: {
        "Content-type": "application/json",
    },
});
export default apiClient;
//# sourceMappingURL=http-common.js.map