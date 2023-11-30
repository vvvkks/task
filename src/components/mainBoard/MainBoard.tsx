import React, { useEffect, useRef, useState } from "react";
import s from "./MainBoard.module.css";
import { getKittyPhoto, CatImage } from "../../api/KittensApi";
import CardContainer from "../card/CardContainer";

interface MainBoardProps {
    likedImages: string[];
    showLikedOnly: boolean;
    images: { id: number; url: string; name: string; origin: string }[];
    setFilterMode: (showLikedOnly: boolean) => void;
    setImages: (images: { id: number; url: string; name: string; origin: string }[]) => void;
    addToLiked: (imageUrl: string) => void;
    removeFromLiked: (imageUrl: string) => void;
    removeFromImagesAndLiked: (imageUrl: string) => void;
}

const MainBoard: React.FC<MainBoardProps> = ({
                                                 likedImages,
                                                 showLikedOnly,
                                                 images,
                                                 setFilterMode,
                                                 setImages,
                                                 addToLiked,
                                                 removeFromLiked,
                                             }) => {
    const pageRef = useRef(1);

    const [filteredImages, setFilteredImages] = useState<{ id: number; url: string; name: string; origin: string }[]>([]);

    const getImages = async () => {
        try {
            const data: CatImage[] = await getKittyPhoto(pageRef.current);

            setImages(data.map((catImage) => ({
                id: parseInt(catImage.id),
                url: catImage.url,
                name: catImage.name,
                origin: catImage.origin,
            })));

            pageRef.current++;
        } catch (error) {
            console.error("Error loading images:", error);
        }
    };

    useEffect(() => {
        getImages();
    }, []);

    useEffect(() => {
        const newFilteredImages = showLikedOnly ? images.filter((image) => likedImages.includes(image.url)) : images;
        setFilteredImages(newFilteredImages);
    }, [showLikedOnly, images, likedImages]);

    return (
        <div className={s.wrapper}>
            <div className={s.filterButtonContainer}>
                <button className={s.filterButton} onClick={() => setFilterMode(!showLikedOnly)}>
                    {showLikedOnly ? "Show All" : "Show Liked"}
                </button>
            </div>
            <div className={s.container}>
                {filteredImages.map(({ id, url, name, origin }, index) => (
                    <CardContainer
                        key={`${id}-${index}`}
                        imageUrl={url}
                        addToLiked={() => addToLiked(url)}
                        removeFromLiked={() => removeFromLiked(url)}
                        removeFromImagesAndLiked={() => url}
                        isLiked={likedImages.includes(url)}
                        name={name}
                        origin={origin}
                    />
                ))}
            </div>
        </div>
    );
};

export default MainBoard;

