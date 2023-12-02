import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {CatImage, getKittyPhoto} from '../api/KittensApi';
import { RootState } from './store';

export interface ImageType {
    id: number;
    url: string;
    name: string;
    origin: string;
}

export interface ImagesState {
    images: ImageType[];
    likedImages: string[];
    showLikedOnly: boolean;
    loading: boolean;
}

const initialState: ImagesState = {
    images: [],
    likedImages: [],
    showLikedOnly: false,
    loading: false,
};

export const fetchImages = createAsyncThunk('images/fetchImages', async (page: number) => {
    const data: CatImage[] = await getKittyPhoto(page);
    return data.map((catImage) => ({
        id: parseInt(catImage.id),
        url: catImage.url,
        name: catImage.name,
        origin: catImage.origin,
    }));
});

const imagesSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {
        addToLiked: (state, action: PayloadAction<string>) => {
            if (!state.likedImages.includes(action.payload)) {
                state.likedImages = [...state.likedImages, action.payload];
            }
        },
        removeFromLiked: (state, action: PayloadAction<string>) => {
            state.likedImages = state.likedImages.filter((img) => img !== action.payload);
        },
        setFilterMode: (state, action: PayloadAction<boolean>) => {
            state.showLikedOnly = action.payload;
        },
        removeFromImagesAndLiked: (state, action: PayloadAction<string>) => {
            state.likedImages = state.likedImages.filter((img) => img !== action.payload);
            state.images = state.images.filter((img) => img.url !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchImages.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchImages.fulfilled, (state, action) => {
                state.loading = false;
                state.images = action.payload;
            });
    },
});

export const { addToLiked, removeFromLiked, setFilterMode, removeFromImagesAndLiked } = imagesSlice.actions;

export const selectImagesState = (state: RootState) => state.images;

export default imagesSlice.reducer;