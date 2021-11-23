import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Grid } from '@mui/material';

const SnackBar=(props)=>{
   const {opensnackbar, message, severity,onModalClose } = props

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }

return(
    <Grid>
    <Snackbar open={opensnackbar} autoHideDuration={4000} onClose={onModalClose}>
        <Alert onClose={onModalClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      </Grid>
)
}
export default SnackBar