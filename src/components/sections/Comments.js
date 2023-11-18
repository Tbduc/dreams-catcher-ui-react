import { React, useState, useEffect } from "react";
import CommentAvatarService from "../../services/CommentAvatarService";
import LikeButton from "./like-dislike-buttons/LikeButton";
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRow,
    MDBTypography,
  } from "mdb-react-ui-kit";

const Comments = (props) => {
    const commentsUrl = `http://localhost:8080/api/v1/comments/dream/${props.dream.id}`;
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(commentsUrl)
        .then(response => {
          console.log(response);
          return response.json();
        })
        .then(data => {
            setComments(data)
        })
        .catch(error => console.log(error));
    }, []);

    console.log(comments)
    
    return (
        <div>
            <section className="vh-100">
                <MDBContainer className="py-5" style={{ maxWidth: "2000px" }}>
                    <MDBRow className="justify-content-center">
                        <MDBCol md="11" lg="" xl="8">
                        {comments.map((comment) => (
                            <div className="d-flex flex-start mb-4" key={comment.id}>
                                <MDBCard className="w-100">
                                <CommentAvatarService data={comment.userId} className="rounded-circle"/>
                                <MDBCardBody className="p-4">
                                    <div>
                                    <MDBTypography tag="h5">{comment.username}</MDBTypography>
                                    <p className="small">{comment.createdDate.split(".")}</p>
                                    <p>{comment.comment}</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                            <LikeButton comment={comment}/>
                                        </div>
                                        <a href="#!" className="link-muted">
                                        <MDBIcon fas icon="reply me-1" /> Reply
                                        </a>
                                    </div>
                                    </div>
                                </MDBCardBody>
                                </MDBCard>
                            </div>
                            ))}
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        </div>
    )
}

export default Comments