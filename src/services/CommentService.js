import { useEffect } from "react";
import AuthService from "./AuthService";

const CommentService = (props) => {
    const COMMENT_URL = `http://localhost:8080/api/v1/comment`;
    const currentUser = AuthService.getCurrentUser();

    useEffect(() => {

        const likeComment = async () => {
            try {
                await fetch(COMMENT_URL + `/${props.comment.id}/like/${props.comment.userId}`, { method: 'PUT' })
                .then((response) => {
                    if (response.status == 200)
                        return response.status
                })
            } catch (error) {
                console.log("error", error);
            }
        };

        const dislikeComment = async () => {
            try {
                await fetch(COMMENT_URL + `/${props.comment.id}/dislike/${props.comment.userId}`, { method: 'PUT' })
                .then((response) => {
                    if (response.status == 200)
                        return response.status
                })
            } catch (error) {
                console.log("error", error);
            }
        };
        
        if (props.comment.userId == currentUser.id)
            likeComment()
        else
            dislikeComment()

    }, [props]);
}

export default CommentService