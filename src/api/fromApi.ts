import { HTTP_METHODS } from "../globals";
import { createApiRequest } from "./axios";

class ApiCallCreator {
  getTypes() {
    return createApiRequest(
      '/type',
      HTTP_METHODS.GET,
      {}
    );
  }
  getPokemonsByTypes(type: string) {
    return createApiRequest(
      `/type/${type}`,
      HTTP_METHODS.GET,
      {}
    );
  }
  getPokemonByNameOrId(id: number | string) {
    return createApiRequest(`/pokemon/${id}/`, HTTP_METHODS.GET, {});
  }
  
}

const fromApi = new ApiCallCreator();
export default fromApi;
