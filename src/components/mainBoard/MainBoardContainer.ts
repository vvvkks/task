import { connect } from "react-redux";
import MainBoard from "./MainBoard";
import {
    setFilterMode,
    setImages,
    addToLiked,
    removeFromLiked,
    removeFromImagesAndLiked,
} from "../../redux/actions";

interface StateProps {
    likedImages: string[];
    showLikedOnly: boolean;
    images: { id: number; url: string; name: string; origin: string }[];
}

const mapStateToProps = (state: any): StateProps => ({
    likedImages: state.likedImages,
    showLikedOnly: state.showLikedOnly,
    images: state.images,
});

const mapDispatchToProps = {
    setFilterMode,
    setImages,
    addToLiked,
    removeFromLiked,
    removeFromImagesAndLiked,
};

const MainBoardContainer = connect(mapStateToProps, mapDispatchToProps)(MainBoard);

export default MainBoardContainer;