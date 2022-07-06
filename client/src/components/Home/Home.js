import React, { useState, useEffect } from "react";
import { Paper, Container, Grow, Grid, AppBar, TextField, Button, Typography } from '@material-ui/core';
import { useNavigate, useLocation } from "react-router-dom";
import ChipInput from 'material-ui-chip-input';

import Posts from "..//Posts/Posts";
import Form from "../Form/Form";
import { useDispatch } from 'react-redux';
import { getPosts, getPostsBySearch } from "../../actions/posts";
import Pagination from "../Pagination";
import App from "../../App";

import useStyles from './styles';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const classes = useStyles();

    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            // search posts
            searchPost();
        }
    }

    const handleAdd = (tag) => {
        setTags([...tags, tag]);
    }

    const handleDelete = (tagToDelete) => {
        setTags(tags.filter((tag) => tag !== tagToDelete));
    }

    const searchPost = () => {
        if (search.trim() || tags) {
            // dispatch -> fetch search posts
            dispatch(getPostsBySearch({search, tags: tags.join(',')}));
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            navigate('/');
        }
    }

    return (
        <div>
            <Grow in>
                <Container maxWidth="xl">
                    <Grid container className={classes.gridContainer} justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={6} md={8}>
                            <Posts setCurrentId={setCurrentId}/>
                        </Grid>
                        
                        <Grid item xs={12} sm={6} md={4} >
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField 
                                name="search" 
                                variant="outlined"
                                label="Search"
                                fullWidth
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={handleKeyPress}
                            />
                            <ChipInput 
                                style={{margin: '10px 0', height: "100%"}}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label="Search Tags"
                                variant="outlined"
                            />

                            <Button 
                                onClick={searchPost} 
                                className={classes.searchButton} 
                                color="primary" 
                                variant="contained"
                            >Search</Button>
                        </AppBar>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                            {(!searchQuery && !tags.length) && (
                            <Paper elevation={6} className={classes.pagination}>
                                <Pagination page={page}/>
                            </Paper>
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </div>
    )
}

export default Home;