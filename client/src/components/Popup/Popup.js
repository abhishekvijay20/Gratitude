import React from "react";
import { Grid, Dialog, DialogTitle, DialogContent, IconButton } from "@material-ui/core";
import ClearOutlined from "@material-ui/icons/ClearOutlined";
import webSearch from "../WebSearch/WebSearch";

export default function Popup(props) {

    const { title, children, openPopup, setOpenPopup } = props;
    // console.log(children);
    return(
        
        <Dialog open={openPopup}>
                <DialogTitle >
                    <Grid container spacing={2}>
                        <Grid xs={11}>Upload Image </Grid>
                        <Grid xs={1}>
                            <IconButton onClick={() => setOpenPopup(false)}>
                                <ClearOutlined />
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>

                <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>{ children[0] }</Grid>
                    <Grid item xs={12}>{ children[1] }</Grid>
                    
                </Grid>
                </DialogContent>

        </Dialog>
    )

}