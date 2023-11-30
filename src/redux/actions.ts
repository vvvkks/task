export const addToLiked = (imageUrl: string) => ({
    type: 'ADD_TO_LIKED' as const,
    payload: { imageUrl },
});

export const removeFromLiked = (imageUrl: string) => ({
    type: 'REMOVE_FROM_LIKED' as const,
    payload: { imageUrl },
});

export const setFilterMode = (showLikedOnly: boolean) => ({
    type: 'SET_FILTER_MODE' as const,
    payload: { showLikedOnly },
});

export const setImages = (images: { id: number; url: string; name: string; origin: string }[]) => ({
    type: 'SET_IMAGES' as const,
    payload: { images },
});

export const removeFromImagesAndLiked = (imageUrl: string) => ({
    type: 'REMOVE_FROM_IMAGES_AND_LIKED' as const,
    payload: { imageUrl },
});