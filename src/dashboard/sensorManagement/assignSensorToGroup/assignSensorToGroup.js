import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl';
import Axios, {GetAuthHeader}from '../../../axiosConfig/axiosInstance.js'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel'
import { ListItem, MenuItem, List } from '@material-ui/core';
import './assignSensorToGroup.css'

class AssignSensorToGroup extends Component {
    state = {
        sensors: [],
        groups: [],
        sensorId: '',
        groupId: ''
    }

    componentDidMount() {
        this.getGroupData()
        this.getSensorData()
    }

    getSensorData() {
        Axios.get("sensors", { headers: GetAuthHeader()})
            .then((result) => {
                console.log(result)
                this.setState({ sensors: result.data });
            }).catch((error) => {
                console.log(error);
            });
    }

    getGroupData() {
        Axios.get("groups", { headers: GetAuthHeader()})
            .then((result) => {
                this.setState({ groups: result.data, groupId: result.data[0].id });
            }).catch((error) => {
                console.log(error);
            });
    }

    assignSensorToGroup = () => {
        var url = '/group/' + this.state.groupId + "/add/" + this.state.sensorId;
        Axios.post(url, '', { headers: GetAuthHeader()})
        .then((result) => {
            this.props.handleClose()
            this.props.refreshDashboard();
        }).catch((error) => {
            console.log(error)
            this.props.handleClose()
            this.props.refreshDashboard();
        })
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        let groupItems = []

        this.state.groups.forEach( (group, index) => {
            groupItems.push(<MenuItem key={index} value={group.id}>{group.name}</MenuItem>);
        })

        let sensorItems = []

        this.state.sensors.forEach( (sensor, index) => {
            if(sensor)
            sensorItems.push(<MenuItem key={index} value={sensor.sensorId}>{ sensor.name != null && sensor.name !== '' ? sensor.name : sensor.sensorId}</MenuItem>);
        })

        return (
            <div>
                <Dialog
                    open={this.props.open}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Przypisz czujnik do grupy</DialogTitle>
                    <DialogContent>
                        {/* <DialogContentText>
                            Przypisz czujnik do grupy
                        </DialogContentText> */}
                        <form autoComplete="off">
                        <List>
                            <ListItem>
                            <FormControl>
                                <InputLabel htmlFor="group-select">Grupa</InputLabel>
                                <Select className='assignSensorSelect'
                                value={this.state.groupId}
                                onChange={this.handleChange}
                                inputProps={{name: 'groupId', id: 'group-select'}}>
                                {groupItems}
                                </Select>
                            </FormControl>
                            </ListItem>
                            <ListItem>
                            <FormControl>
                            <InputLabel htmlFor="sensor-select">Czujnik</InputLabel>
                                <Select className='assignSensorSelect'
                                value={this.state.sensorId}
                                onChange={this.handleChange}
                                inputProps={{name: 'sensorId', id: 'sensor-select'}}
                                >
                                    {sensorItems}
                                </Select>
                            </FormControl>
                            </ListItem>
                        </List>
                        </form>
                        

                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.props.handleClose}>
                            Anuluj
                        </Button>
                        <Button color="primary" onClick={this.assignSensorToGroup}>
                            Zapisz
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    };
}

export default AssignSensorToGroup;