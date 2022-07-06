import React, { useState } from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from "@material-ui/core";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";

import useStyles from './styles';
    
const Post = ( {post, setCurrentId} ) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [likes, setLikes] = useState(post?.likes);

    const userId = user?.result.sub || user?.result._id;  
    const hasLikedPost = likes.find((like) => like === userId);

    const handleLike = async () => {
        dispatch(likePost(post._id));
        if (hasLikedPost) {
            setLikes(likes.filter((id) => id !== userId));
        } else {
            setLikes([...likes, userId]);
        }
    };

    const Likes = () => {
        if (likes.length > 0) {
          return likes.find((like) => like === userId)
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
      };
      
    const gratPoints = post.message.split(/\r?\n/);
    const fullMessage = post.message;
    const firstName = post.name.split(" ")[0];

    const openPost = () => {
        navigate(`/posts/${post._id}`);
    };

    return (
        <Card className={classes.card} raised elevation={6}>
                {/* <div> */}
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
                <div className={classes.overlay}>
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                </div>
                {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
                    <div className={classes.overlay2}>
                        <Button style={{color: 'white'}} size='small' onClick={() => {setCurrentId(post._id)}}>
                            <MoreHorizIcon fontSize="default"/>
                        </Button>
                    </div>
                )}
                <ButtonBase component="span" className={classes.cardAction} onClick={openPost}>
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary">{post.tags.map((tag)=> `#${tag} `)}</Typography>
                </div>
                <Typography className={classes.title} color="textSecondary" variant="p" gutterBottom>{`${firstName} is grateful for: `}</Typography>
                <Typography className={`${classes.title} ${classes.mainText}`} variant="h5" gutterBottom>{post.title}</Typography>
                <CardContent>
                    <Typography className={classes.content} variant="body2" color="textSecondary" component="p">
                        {gratPoints.map((point) => <ul><li>{point}</li></ul> )}
                        {/* {fullMessage} */}
                    </Typography>
                </CardContent>
                {/* </div> */}
            </ButtonBase>
            <CardActions className={classes.cardActions} >
                <Button size="small" color="primary" disabled={!user?.result}  onClick={handleLike} >
                   <Likes />
                    {/* <ThumbUpAltIcon fontSize="small" /> */}
                </Button>
                {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
                    <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id)) } >
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    );
}

export default Post;