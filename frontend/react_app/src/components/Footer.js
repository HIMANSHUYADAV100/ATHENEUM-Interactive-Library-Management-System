import React from 'react';
import Typography from '@material-ui/core/Typography';



function Footer() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
             
          ATHENEUM_
        
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
export default Footer