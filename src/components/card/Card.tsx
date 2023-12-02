import React, { FC, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import styles from "./Card.module.css";
import { useDispatch } from "react-redux";
import { addToLiked, removeFromImagesAndLiked, removeFromLiked } from "../../redux/imagesSlice";

export interface CardProps {
    imageUrl: string;
    isLiked: boolean;
    name: string;
    origin: string;
    addToLiked: () => void;
    removeFromLiked: () => void;
    removeFromImagesAndLiked: () => void;
}

const Card: FC<CardProps> = ({ imageUrl, isLiked, name, origin }) => {
    const dispatch = useDispatch();

    const handleLikeClick = useCallback(() => {
        if (isLiked) {
            dispatch(removeFromLiked(imageUrl));
        } else {
            dispatch(addToLiked(imageUrl));
        }
    }, [dispatch, isLiked, imageUrl]);

    const handleRemoveClick = useCallback(() => {
        dispatch(removeFromImagesAndLiked(imageUrl));
    }, [dispatch, imageUrl]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <img src={imageUrl} alt="Kitty" />
                <div className={styles.btm}>
                    <div onClick={handleLikeClick} className={styles.like}>
                        {isLiked ? (
                            <FontAwesomeIcon icon={solidHeart} color="red" />
                        ) : (
                            <FontAwesomeIcon icon={regularHeart} color="gray" />
                        )}
                    </div>
                    <div onClick={handleRemoveClick} className={styles.remove}>
                        <FontAwesomeIcon icon={faTrash} color="gray" />
                    </div>
                </div>
            </div>
            <div className={styles.info}>
                <p>Name: {name}</p>
                <p>Origin: {origin}</p>
            </div>
        </div>
    );
};

export default Card;