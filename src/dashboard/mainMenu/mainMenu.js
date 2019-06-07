import React, { Component } from 'react'
import SetSensorNameDialog from '../sensorManagement/setSensorName/setSensorName.js'
import AssignSensorToGroup from '../sensorManagement/assignSensorToGroup/assignSensorToGroup.js'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';

class MainMenu extends Component {
    state = {
        anchorEl: null,
        assignSensorToGroupDialog: false,
        setSensorName: false,
        openGropAddDialog: false
    }

    componentDidCatch(error, info) {
        console.log(error)
    }

    handleOpenSettingsMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleCloseSettingsMenu = () => {
        this.setState({ anchorEl: null });
    };

    handleOpenCloseSetSensorNameDialog = (state) => {
        this.setState({ setSensorName: state });
        if (state) {
            this.handleCloseSettingsMenu()
        }
    };

    handleOpenCloseAssignSensorToGroupDialog = (state) => {
        this.setState({ assignSensorToGroupDialog: state });
        if (state) {
            this.handleCloseSettingsMenu()
        }
    }

    handleClickOpenCloseGroupAddDialog = (state) => {
        this.setState({ openGropAddDialog: state });
    };

    render() {
        const { anchorEl } = this.state;

        return <div>
            <IconButton color="inherit" onClick={this.handleOpenSettingsMenu}>
                <SettingsIcon />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleCloseSettingsMenu}>
                <MenuItem onClick={event => this.handleOpenCloseAssignSensorToGroupDialog(true)}>Przypisz czujnik do grupy</MenuItem>
                <MenuItem onClick={event => this.handleOpenCloseSetSensorNameDialog(true)}>Ustaw nazwę czujnika</MenuItem>
            </Menu>
            <SetSensorNameDialog
                open={this.state.setSensorName}
                refreshDashboard={this.props.refreshDashboard}
                handleClose={event => this.handleOpenCloseSetSensorNameDialog(false)} />
            <AssignSensorToGroup
                open={this.state.assignSensorToGroupDialog}
                refreshDashboard={this.props.refreshDashboard}
                handleClose={event => this.handleOpenCloseAssignSensorToGroupDialog(false)} />
        </div>;
    }
}

export default MainMenu;