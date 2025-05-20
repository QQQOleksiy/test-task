import axiosService from "./axiosService";
import {urls} from "../config";
import type {IApiResponse, IRes, IRecipeSummary, IRecipeTypes} from "../types";

const movieService = {
    getAll: (): IRes<IApiResponse<IRecipeTypes>> => axiosService.get(urls.getAll),
    getById: (id: string): IRes<IApiResponse<IRecipeTypes>> => axiosService.get(urls.getById(id)),
    getFiltered: (filterType: string, value: string): IRes<IApiResponse<IRecipeSummary[]>> => axiosService.get(urls.getFiltered(filterType, value))
}

export default movieService