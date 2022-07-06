import React from "react";
import axios from "axios";
import { Grid, IconButton, Typography, TextField, Button, Paper, Container } from "@material-ui/core";
import { useState } from "react";
import useStyles from './styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AccountCircle from '@material-ui/icons/AccountCircle';

function WebSearch (props) {
    const [keyword, setKeyword] = useState("");
    const [result, setResult] = useState([]);
    const classes = useStyles();
    const CLIENT_ID = process.env.REACT_APP_UNSPLASH_CLIENT_ID;
    const handleImage = () => {
        axios.get(`https://api.unsplash.com/search/photos?page=1&query=${keyword}&client_id=${CLIENT_ID}`)
        .then((res) => {
            // console.log(res.data); 
            setResult(res.data.results);
        })
    };

    const handleImageToPost = (url) => {
        props.imageData(url);
    };

    return(
    <>
        <Paper >
            <OutlinedInput   
                fullWidth 
                value={keyword}
                onChange = {(e) => setKeyword(e.target.value)}
                autoFocus
                label="Search for..."
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="search"
                        onClick={handleImage}
                        // onMouseDown={handleMouseDownPassword}
                        edge="end"
                        >
                            <SearchOutlinedIcon />
                        </IconButton>
                    </InputAdornment>
                }
                onKeyDown={ (e) => {
                    if (e.key === 'Enter') {
                        handleImage();
                    }
                }}
            />

            <Container >

            {/* <Grid container spacing={2}> <Grid item xs={12}></Grid> </Grid> */}
                {result.map((value) => {
                    return(
                        <Grid>
                       
                        <img src={value.urls.small} onClick={() => handleImageToPost(value.urls.regular)}/>
                        
                        </Grid>
                    )
                })}
            </Container>

        </Paper>
    </>
    );
};

export default WebSearch;