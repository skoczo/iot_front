import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText'
import FormControl from '@material-ui/core/FormControl';
import Axios from '../../axiosConfig/axiosInstance.js'

class AddGroupDialog extends Component {
    state = {
        group: ''
    };

    addGroup = () => {
        Axios.post('/group/' + this.state.group)
            .catch( (error) => {
                console.log(error);
            })
            .then((response) => {
                this.props.refreshGroups();  
            });
        this.setState({ group: ''});
        this.props.handleClose();
    };

    handleGroupNameEdit = event => {
        this.setState({ group: event.target.value });
    };

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    aria-labelledby="form-dialog-title">
                    {/* <DialogTitle id="form-dialog-title">Dodaj grupę</DialogTitle> */}
                    <DialogContent>
                        <DialogContentText>
                            Podaj nazwę grupy którą chcesz utworzyć.
                        </DialogContentText>
                        <FormControl>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Nazwa grupy"
                                type="email"
                                value={this.state.group}
                                onChange={this.handleGroupNameEdit}
                                fullWidth
                            />
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">
                            Anuluj
                        </Button>
                        <Button onClick={this.addGroup} color="primary">
                            Zapisz
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default AddGroupDialog;