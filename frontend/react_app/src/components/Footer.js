import React from 'react';
import Typography from '@material-ui/core/Typography';



function Footer() {
    return (
      <Typography style={{marginTop:'-7px'}}variant="body2" color="textSecondary" align="center">
          <b>
          ATHENEUM_
          </b>
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
export default Footer