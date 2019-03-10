import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import AddGroupDialog from './addGroupDialog/addGroupDialog.js'
import CustomDrawer from './drawer/customDrawer'
import SetSensorNameDialog from './sensorManagement/setSensorName/setSensorName.js'
import AssignSensorToGroup from './sensorManagement/assignSensorToGroup/assignSensorToGroup.js'
import axios from '../axiosConfig/axiosInstance.js';
import SensorChart from './charts/sensorChart/sensorChart.js'
import EmptyChart from './charts/emptyChart/emptyChart.js'
import Grid from '@material-ui/core/Grid';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
});

class Dashboard extends React.Component {
  state = {
    setSensorName: false,
    open: true,
    openGropAddDialog: false,
    assignSensorToGroupDialog: false,
    groups: [],
    anchorEl: null,
    selectedGroup: null
  };

  componentDidMount() {
    this.handleRefreshGroups();
  }

  handleRefreshGroups() {
    axios.get('/groups')
      .then(response => {
        console.log('refreshGroups')
        console.log(response.data)
        if(this.state.selectedGroup !== null) {
          this.setState({ groups: response.data});
          for(var i=0; i< response.data.length; i++ ) {
            if(response.data[i].id == this.state.selectedGroup.id) {
              this.setState({ groups: response.data, selectedGroup: response.data[i] });    
            }
          }
        } else {
          this.setState({ groups: response.data, selectedGroup: response.data[0] });
        }
      });
  }

  handleRemoveFromGroup = (sensorId) => {
    var url = '/group/' + this.state.selectedGroup.id + '/delete/' + sensorId;
    console.log(url)
    axios.delete(url)
    .then(response => { this.handleRefreshGroups()})
    .catch(error => {console.log(error)});
  }

  handleOpenSettingsMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseSettingsMenu = () => {
    this.setState({ anchorEl: null });
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChangeGroup = (groupId) => {
    console.log(groupId)

    this.state.groups.forEach(group => {
      if(group.id === groupId) {
        console.log('group found')
        this.setState({ selectedGroup: group });
      }
    });
  }

  handleOpenCloseSetSensorNameDialog = (state) => {
    this.setState({ setSensorName: state });
    this.handleRefreshGroups()
    if (state) {
      this.handleCloseSettingsMenu()
    }
  };

  handleOpenCloseAssignSensorToGroupDialog = (state) => {
    this.setState({ assignSensorToGroupDialog: state });
    this.handleRefreshGroups()
    if (state) {
      this.handleCloseSettingsMenu()
    }
  }

  handleClickOpenCloseGroupAddDialog = (state) => {
    this.setState({ openGropAddDialog: state });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    let sensors = []
    console.log(this.state.selectedGroup)
    if (this.state.selectedGroup) {
      console.log(this.state.selectedGroup.sensors)
      if(this.state.selectedGroup.sensors.length > 0) {
        this.state.selectedGroup.sensors.forEach(element => {
          sensors.push(
            <Grid item xs={6} key={element.id}>
              <SensorChart value={element} group={this.state.selectedGroup.id} 
                removeFromGroupHandler={this.handleRemoveFromGroup}/>
            </Grid>);
        });
      } else {
        sensors.push(
          <Grid item xs key='1'>
            <EmptyChart />
          </Grid>);
      }
    }

    console.log(this.listItems);

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden,
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              IOT Skoczo
            </Typography>
            {/* <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
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
          </Toolbar>
        </AppBar>
        <CustomDrawer open={this.state.open}
          groups={this.state.groups}
          drawerClose={this.handleDrawerClose}
          changeGroup={this.handleChangeGroup}
          openAddGroupDialog={event => this.handleClickOpenCloseGroupAddDialog(true)} />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Grid container spacing={24}>
            {sensors}
          </Grid>

          {/* <Typography variant="h4" gutterBottom component="h2">
            Orders
          </Typography>
          <Typography component="div" className={classes.chartContainer}>
            <SimpleLineChart />
          </Typography>
          <Typography variant="h4" gutterBottom component="h2">
            Products
          </Typography>
          <div className={classes.tableContainer}>
            <SimpleTable /> */}
          {/* </div> */}
        </main>
        <AddGroupDialog
          open={this.state.openGropAddDialog}
          handleClose={event => this.handleClickOpenCloseGroupAddDialog(false)}
          refreshGroups={event => this.handleRefreshGroups()} />
        <SetSensorNameDialog
          open={this.state.setSensorName}
          handleClose={event => this.handleOpenCloseSetSensorNameDialog(false)} />
        <AssignSensorToGroup
          open={this.state.assignSensorToGroupDialog}
          handleClose={event => this.handleOpenCloseAssignSensorToGroupDialog(false)} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
