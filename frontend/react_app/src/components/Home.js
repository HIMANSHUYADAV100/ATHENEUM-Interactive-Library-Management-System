import React, {useState} from 'react'
import axios from 'axios';
import * as settings from '../settings';

import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper, Typography, Slider, Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import MaterialTable from 'material-table'


// ########################################################
// Material UI inline styles
// ########################################################
const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: "75%",
        marginTop: "15vh",
        marginBottom: "10vh",
        borderRadius: '6px',
        backgroundColor: theme.palette.action.disabledBackground,
    },
    title: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2), paddingLeft: theme.spacing(4),
        color: theme.palette.primary.main,
    }
}));

// ########################################################
// The main Home component returned by this Module
// ########################################################
function Home(props) {
    // Material UI Classes 
    const classes = useStyles();

    const columns = [
        {title: "ID", field: "id"},
        {title: "Title", field: "title"},
        {title: "Author ID", field: "author_id"},
        {title: "Status", field: "Status"},
    ]
    
    // React hook state variable
    const [prediction, setPrediction] = useState([]);
    
    // Function to make the predict API call and update the state variable - Prediction 
    const getBooks = event => {
         //Axios variables required to call the API
        let headers = { 'Authorization': `Token ${props.token}`, 'Content-Type':'multipart/form-data; boundary=<calculated when request is sent>', 'Content-Length':'<calculated when request is sent>', 'Host':'<calculated when request is sent>', 'Accept':'*/*','Accept-Encoding':'gzip, deflate, br' };
    //    let url = settings.API_SERVER + '/api/predict/';
    let url = 'http://127.0.0.1:8000/api/lib/books/';
        let method = 'post';
        let config = { headers, method, url };

        //Axios predict API call
        axios(config).then(
            res => {setPrediction(res.data['Books'])
            }).catch(
                error => {alert(error)})

    }

    return (  
        <React.Fragment>
            <CssBaseline />
            <Container fixed className={classes.container}>
                <Grid container alignItems="center" spacing={3}>
                    <Grid item xs={6}>
                        <Button variant="contained" color="primary" onClick={getBooks}>
                            Get List
                        </Button>
                        <Paper className={classes.title} elevation={0}>
                            <Typography variant="h5">
                                Books in Library
                            </Typography>
                           
                        </Paper>
                    </Grid>
                    
                   
                </Grid>
                
            </Container>
            <Grid item >
                        <Paper className={classes.title} elevation={0}>
                        <div>
                         <MaterialTable backgroundColor="creme"
                            title="Books"
                            data={prediction}
                            columns={columns}
                            />
                            </div>

                        </Paper>
                    </Grid>
        </React.Fragment>
    )
}

export default Home