import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText'
import FormControl from '@material-ui/core/FormControl';
import Axios, {GetAuthHeader }from '../../../axiosConfig/axiosInstance.js'
import Select from '@material-ui/core/Select';
import { MenuItem } from '@material-ui/core';

class SetSensorName extends Component {
    state = {
        sensors: [],
        id: '',
        name: ''
    };

    handleChange = event => {
        this.state.sensors.forEach( sensor => {
            if(sensor.sensorId === event.target.value) {    
                if(sensor.name === null) {
                    this.setState({ name: '', [event.target.name]: event.target.value});
                } else {
                    this.setState({ name: sensor.name, [event.target.name]: event.target.value});
                }
            }
        })
    };

    handleSensorNameEdit = event => {
        this.setState({name: event.target.value})
    }

    componentDidMount() {
        this.getSensorData();
    }

    setSensorName = () => {
        Axios.patch("sensor/" + this.state.id + "/" + this.state.name, "", { headers: GetAuthHeader()})
            .catch((error) => {
                console.log(error);
                this.props.handleClose()
                this.props.refreshDashboard();
            }).then((result) => {
                this.getSensorData()
                this.props.handleClose()
                this.props.refreshDashboard();
            })
        
    }

    getSensorData() {
        Axios.get("/sensors", { headers: GetAuthHeader()})
            .then((result) => {
                console.log(result)
                this.setState({ sensors: result.data });
            }).catch((error) => {
                console.log(error)
            });
    }

    render() {
        let items = []

        this.state.sensors.forEach( (sensor, index) => {
            items.push(<MenuItem key={index} value={sensor.sensorId}>{ sensor.name != null && sensor.name !== '' ? sensor.name : sensor.sensorId}</MenuItem>);
        })

        return (
            <div>
                <Dialog
                    open={this.props.open}
                    aria-labelledby="form-dialog-title">
                    <DialogContent>
                        <DialogContentText>
                            Ustaw nazwę czujnika
                        </DialogContentText>
                        <form autoComplete="off">
                        <FormControl>
                            <Select value={this.state.id}
                                onChange={this.handleChange}
                                inputProps={{name: 'id'}}>
                            {items}
                            </Select>

                            <TextField
                                margin="dense"
                                label="Nazwa czujnika"
                                value={this.state.name}
                                onChange={this.handleSensorNameEdit}
                                fullWidth
                            />
                        </FormControl>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">
                            Anuluj
                        </Button>
                        <Button color="primary" onClick={this.setSensorName}>
                            Zapisz
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )};
};

export default SetSensorName;