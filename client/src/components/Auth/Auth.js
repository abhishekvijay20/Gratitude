import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { signup, signin } from "../../actions/auth";
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import Icon from './icon';
import dotenv from 'dotenv';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }
dotenv.config();
console.log(process.env);
const Auth = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ref = useRef(null);

    const handleCallbackResponse = async (res) => {
        var userObject = jwt_decode(res.credential);
        // console.log(userObject);
        //console.log(res.credential);

        const result = userObject;
        // const token = res.credential;
        const token = res.credential;
        // console.log("Dekh bhai yaha pe");
        // console.log(token);

        // {a: c, b: c}
        try {
            dispatch({ type: 'AUTH', data: {result, token}});
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    useEffect (() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID ,
            callback: handleCallbackResponse
        })

        google.accounts.id.renderButton(
            ref.current,
            // document.getElementById("googleLogin"), 
            { 
                // theme: "outline", size: "large" 
            } 
        );

    }, []);

    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [loginError, setLoginError] = useState('');

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            dispatch(signup(formData, navigate));
        } else {
            dispatch(signin(formData, navigate));
        }
    };

    const handleChange= (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }; 

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5"> {isSignup ? 'Sign Up' : 'Sign In' } </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        { isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label = "Repeat Password" handleChange={handleChange} type="password" /> }
                    </Grid>
                    
                    <Typography>{loginError}</Typography>

                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button>

                    <div >
                    <Button 
                    ref={ref}
                        className={classes.googleButton} 
                        color="primary" 
                        fullWidth 
                        onClick={handleCallbackResponse}
                        // onClick={renderProps.onClick} 
                        // disabled={renderProps.disabled} 
                        startIcon={<Icon />} 
                        variant="contained" 
                        > Google Sign In 
                        </Button>                       
                    </div>

                    <Grid container justifyContent="center">
                            <Grid item>
                                <Button onClick={switchMode} > 
                                    {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                                </Button>
                            </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default Auth;