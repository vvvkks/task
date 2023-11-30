interface Image {
    id: number;
    url: string;
    name: string;
    origin: string;
}

export interface AppState {
    images: Image[];
    likedImages: string[];
    showLikedOnly: boolean;
}

const initialState: AppState = {
    images: [],
    likedImages: [],
    showLikedOnly: false,
};

export type AppAction =
    | { type: 'ADD_TO_LIKED'; payload: { imageUrl: string } }
    | { type: 'REMOVE_FROM_LIKED'; payload: { imageUrl: string } }
    | { type: 'SET_FILTER_MODE'; payload: { showLikedOnly: boolean } }
    | { type: 'SET_LIKED_IMAGES'; payload: { likedImages: string[] } }
    | { type: 'SET_IMAGES'; payload: { images: Image[] } }
    | { type: 'REMOVE_FROM_IMAGES_AND_LIKED'; payload: { imageUrl: string } };

const appReducer = (state: AppState = initialState, action: AppAction): AppState => {
    switch (action.type) {
        case 'ADD_TO_LIKED':
            return { ...state, likedImages: [...state.likedImages, action.payload.imageUrl] };
        case 'REMOVE_FROM_LIKED':
            return { ...state, likedImages: state.likedImages.filter((img) => img !== action.payload.imageUrl) };
        case 'SET_FILTER_MODE':
            return { ...state, showLikedOnly: action.payload.showLikedOnly };
        case 'SET_LIKED_IMAGES':
            return { ...state, likedImages: action.payload.likedImages };
        case 'SET_IMAGES':
            return { ...state, images: action.payload.images };
        case 'REMOVE_FROM_IMAGES_AND_LIKED':
            return {
                ...state,
                likedImages: state.likedImages.filter((img) => img !== action.payload.imageUrl),
                images: state.images.filter((img) => img.url !== action.payload.imageUrl),
            };
        default:
            return state;
    }
};

export default appReducer;
