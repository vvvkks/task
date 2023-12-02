import React, {useCallback, useEffect, useRef} from 'react';
import s from './MainBoard.module.css';
import loadingImage from '../../assets/loading.svg';
import Card from '../card/Card';
import { useDispatch, useSelector } from 'react-redux';
import {
    addToLiked,
    removeFromImagesAndLiked,
    removeFromLiked,
    setFilterMode,
    fetchImages,
    selectImagesState,
} from '../../redux/imagesSlice';
import {ImageType} from "../../redux/imagesSlice";

const MainBoard: React.FC = () => {
    const dispatch = useDispatch();
    const { loading, showLikedOnly, images, likedImages } = useSelector(selectImagesState);
    const pageRef = useRef(1);

    const filteredImages = showLikedOnly
        ? likedImages.map((url: string) => images.find((img: ImageType) => img.url === url))
        : images;

    const handleAddToLiked = useCallback((url: string) => dispatch(addToLiked(url)), [dispatch]);
    const handleRemoveFromLiked = useCallback((url: string) => dispatch(removeFromLiked(url)), [dispatch]);
    const handleRemoveFromImagesAndLiked = useCallback((url: string) => dispatch(removeFromImagesAndLiked(url)), [dispatch]);


    useEffect(() => {
        dispatch(fetchImages(pageRef.current) as any);
    }, [dispatch]);


    return (
        <div className={s.wrapper}>
            <div className={s.filterButtonContainer}>
                <button className={s.filterButton} onClick={() => dispatch(setFilterMode(!showLikedOnly))}>
                    {showLikedOnly ? "Show All" : "Show Liked"}
                </button>
            </div>
            <div className={s.container}>
                {loading ? (
                    <div className={s.loaderContainer}>
                        <img src={loadingImage} alt="Loading" className={s.loaderImage}/>
                    </div>
                ) : (
                    filteredImages.map((image: ImageType | undefined, index: number) => (
                        image && (
                            <Card
                                key={`${image.id}-${index}`}
                                imageUrl={image.url}
                                addToLiked={() => handleAddToLiked(image.url)}
                                removeFromLiked={() => handleRemoveFromLiked(image.url)}
                                removeFromImagesAndLiked={() => handleRemoveFromImagesAndLiked(image.url)}
                                isLiked={likedImages.includes(image.url)}
                                name={image.name}
                                origin={image.origin}
                            />
                        )
                    ))
                )}
            </div>
        </div>
    );
};

export default MainBoard;