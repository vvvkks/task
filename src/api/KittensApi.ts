import axiosInstance from "./Api";

export interface CatApiResponse {
    id: string;
    url: string;
    width: number;
    height: number;
    breeds: {
        name: string;
        origin: string;
    }[];
}

export interface CatImage {
    id: string;
    url: string;
    width: number;
    height: number;
    name: string;
    origin: string;
}

export const getKittyPhoto = async (page: number = 1, limit: number = 30): Promise<CatImage[]> => {
    try {
        const response = await axiosInstance.get<CatApiResponse[]>('search', {
            params: {
                page,
                limit,
            },
        });

        const images: CatImage[] = response.data.map((cat) => ({
            id: cat.id,
            url: cat.url,
            width: cat.width,
            height: cat.height,
            name: cat.breeds.length > 0 ? cat.breeds[0].name : "Unknown",
            origin: cat.breeds.length > 0 ? cat.breeds[0].origin : "Unknown",
        }));

        console.log(images);
        return images;
    } catch (error) {
        throw error;
    }
};
