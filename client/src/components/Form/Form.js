import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';   
import Popup from '../Popup/Popup';
import WebSearch from '../WebSearch/WebSearch';
import SendIcon from '@material-ui/icons/Send';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import { useNavigate } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import Chip from "@material-ui/core/Chip";

const Form = ( {currentId, setCurrentId} ) => {
    const [postData, setPostData] = useState ({ title: '', message: '', tags: '', selectedFile: '' });
    const post = useSelector( (state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));    
    const [openPopup, setOpenPopup] = useState(false);
    const [titleError, setTitleError] = useState(false);
    const [messageError, setMessageError] = useState(false);
    const [gratPoints, setGratPoints] = useState('');
    const navigate = useNavigate();
    const [pointCnt, setPointCnt] = useState(1);

    useEffect(() => {
        // console.log("Post mein chnanges hue");
        if(post) setPostData(post);
    }, [post])

    const clear = () => {
        setCurrentId(null);
        setPostData({ title: '', message: '', tags: '', selectedFile: '' });

    }    

    const convertToBullet = () => {
        const s = postData.message.split(/\r?\n/);
        // console.log(s);
        setPostData({...postData, message: s});
        // console.log(postData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (postData.title === '') {
            setTitleError(true);
        } else {
            if (postData.message === "") {
                setMessageError(true);
            } else {
                if (pointCnt !== 3) {
                    setMessageError(true);
                } else {
                    convertToBullet();               

                    if(currentId) {
                        dispatch(updatePost(currentId, {...postData, name: user?.result?.name }));
                    } else {
                        dispatch(createPost({...postData, name: user?.result?.name }, navigate));
                    }
                    setTitleError(false);
                    setMessageError(false);
                    clear();
                }
            }
        }
    }

    function toDataUrl(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            var reader = new FileReader();
            reader.onloadend = function() {
                callback(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }    

    const getImageData = (imgData) => {
        toDataUrl(imgData, function(myBase64) {
            setPostData({...postData, selectedFile: myBase64});
            setOpenPopup(false);
        });        
    }

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper} elevation={6}>
                <Typography variant='h6' align='center'>
                    Please Sign in to create your own & like other's memories.
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
                <Typography className={classes.title} variant="h6">{currentId ? 'Editing' : 'Creating'} your gratitude card</Typography>
                <TextField 
                    name="title" 
                    variant="outlined" 
                    label="Grateful for?"  
                    fullWidth 
                    required
                    error={titleError}
                    value={postData.title} 
                    onChange={ (e) => setPostData({...postData, title: e.target.value}) }     
                />

                <TextField 
                    name="message" 
                    variant="outlined" 
                    label="Express exactly in 3 points"  
                    fullWidth 
                    multiline
                    error={messageError}
                    required
                    rows={6}
                    value={postData.message} 
                    // value = {gratPoints}
                    onKeyDown={ (e) => {
                        if (e.key === 'Enter') {
                            setPointCnt(pointCnt+1);
                            console.log(postData);
                            console.log(pointCnt);
                        }
                        if (e.keyCode === 8) {
                            console.log(postData);
                            const x = postData.message.split(/\r?\n/);
                            setPointCnt(x.length);
                            console.log(postData);
                            console.log(pointCnt);
                        }
                    }}
                    onChange={ (e) => {
                        if (pointCnt <= 3) {
                            setPostData({...postData, message: e.target.value})
                        }
                    }}     
                /> 
                                
                <TextField 
                    name="tags" 
                    variant="outlined" 
                    label="Tags"  
                    fullWidth 
                    value={postData.tags} 
                    onChange={ (e) => setPostData({...postData, tags: e.target.value.split(',')}) }     
                />

                <div className={classes.fileInput}>
                    <Button 
                        name="ImageSearch" 
                        className={classes.webSearchBtn} 
                        variant="contained" 
                        color="tertiary" 
                        size="small"
                        fullWidth
                        onClick={() => setOpenPopup(true)}
                        endIcon={<ImageOutlinedIcon fontSize='small'/>}
                    >
                        Upload image 
                    </Button>
{/* 
                    <Button 
                        name="webSearch" 
                        className={classes.FileSearchBtn} 
                        variant="contained" 
                        color="primary" 
                        size="small"
                    >
                     <FileBase                   
                        type="file"
                        inputProps={{ accept: 'image/*, .xlsx, .xls, .csv, .pdf, .pptx, .pptm, .ppt' }}
                        mutliple={false}
                        onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
                    />                        
                    </Button>  */}

                    {/* <FileBase                   
                        type="file"
                        mutliple={false}
                        onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
                    /> */}
                </div>
                
                <Grid container spacing={2}>
                <Grid item xs={6}>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    size="small" 
                    onClick={clear} 
                    fullWidth 
                    endIcon={<ClearOutlinedIcon fontSize='small'/>}
                >Clear
                </Button>
                </Grid>

                <Grid item xs={6}>
                <Button
                    className={classes.buttonSubmit} 
                    variant="contained" 
                    color="primary" 
                    size="small" 
                    type="submit" 
                    fullWidth 
                    endIcon={<SendIcon fontSize='small'/>}
                > Post
                </Button>
                </Grid>
                </Grid>

            </form>
            <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} >
                <FileBase   
                    className={classes.filebase}                
                    type="file"
                    inputProps={{ accept: 'image/*, .xlsx, .xls, .csv, .pdf, .pptx, .pptm, .ppt' }}
                    mutliple={false}
                    onDone={ ({base64}) =>  {
                        setPostData({...postData, selectedFile: base64}) 
                        setOpenPopup(false)
                        }}
                />  
                
                <WebSearch className={classes.webSearchBtn} imageData={getImageData}/>
            </Popup>
        </Paper>
    );
}

export default Form;