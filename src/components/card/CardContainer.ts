import { connect } from "react-redux";
import { Dispatch } from "redux";
import { addToLiked, removeFromLiked, removeFromImagesAndLiked } from "../../redux/actions";
import Card, { CardProps } from "./Card";

interface DispatchProps {
    addToLiked: (imageUrl: string) => void;
    removeFromLiked: (imageUrl: string) => void;
    removeFromImagesAndLiked: (imageUrl: string) => void;
}

const mapDispatchToPropsCard = (dispatch: Dispatch): DispatchProps => ({
    addToLiked: (imageUrl: string) => dispatch(addToLiked(imageUrl)),
    removeFromLiked: (imageUrl: string) => dispatch(removeFromLiked(imageUrl)),
    removeFromImagesAndLiked: (imageUrl: string) => dispatch(removeFromImagesAndLiked(imageUrl)),
});

const CardContainer = connect<any, DispatchProps, CardProps>(
    null,
    mapDispatchToPropsCard
)(Card);

export default CardContainer;
