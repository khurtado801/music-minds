import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = {
    root: {
        flexGrow: 1,
        backgroundColor: '#6D6E70',
        fullScreen: true,
        fullWidth: true,
        maxWidth: 'md'
    },
}

class ContactForm extends Component {
    state = {
        open: false,
    };
    
    handleOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = () => {
        this.setState({
            open: false,
        });
    };

	render() {
		return (
			<div>
                <Button onClick={this.handleOpen} variant="outlined" color="primary"><h5>Click here to open form:</h5></Button>
                <Dialog 
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    style={styles.root}
                >
                    <DialogTitle id="form-dialog-title"><h3>Verification:</h3></DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <h4>Please enter your email address.</h4>
                            </DialogContentText>
                            <TextField 
                                autoFocus
                                margin="dense"
                                id="name"
                                type="text"
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} variant="outlined" color="primary">Submit</Button>
                            <Button onClick={this.handleClose} variant="outlined" color="secondary">Cancel</Button>
                        </DialogActions>
                    </Dialog>
			</div>
		);
	}
}

export default ContactForm;