import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddGroupDialog from './addGroupDialog/addGroupDialog.js'
import CustomDrawer from './drawer/customDrawer'
import axios, {GetAuthHeader} from '../axiosConfig/axiosInstance.js';
import SensorCard from './cards/sensorCard/sensorCard.js'
import EmptyCard from './cards/emptyCard/emptyCard.js'
import Grid from '@material-ui/core/Grid';
import TemperaturesLineChart from './charts/temperaturesLineChart.js'
import MainMenu from '../dashboard/mainMenu/mainMenu.js'

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
    selectedGroup: null,
    temperatures: {},
    error: null
  };

  componentDidMount() {
    this.handleRefreshGroups();
    // this.readSensorsTemp(this.state.selectedGroup.sensors)
  }

  handleRefreshGroups = () => {
    axios.get('/groups', { headers: GetAuthHeader()})
      .then(response => {
        if(response.data.length > 0) {
          if (this.state.selectedGroup !== null) {
            this.setState({ groups: response.data });
            for (var i = 0; i < response.data.length; i++) {
              if (response.data[i].id === this.state.selectedGroup.id) {
                this.setState({ groups: response.data, selectedGroup: response.data[i] });
                this.readSensorsTemp(response.data[i].sensors)
              }
            }
          } else {
            this.setState({ groups: response.data, selectedGroup: response.data[0] });
            this.readSensorsTemp(response.data[0].sensors)
          }
        }
      }).catch(error => {
        this.setState({ error: error })
      });
  }

  handleRemoveFromGroup = (sensorId) => {
    var url = '/group/' + this.state.selectedGroup.id + '/delete/' + sensorId;
    axios.delete(url, {headers: GetAuthHeader() })
      .then(response => { this.handleRefreshGroups() })
      .catch(error => { console.log(error) });
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChangeGroup = (groupId) => {
    this.state.groups.forEach(group => {
      if (group.id === groupId) {
        this.setState({ selectedGroup: group });
      }
    });
  }
  handleOpenSettingsMenu = event => {
      this.setState({ anchorEl: event.currentTarget });
    };
  
    handleCloseSettingsMenu = () => {
      this.setState({ anchorEl: null });
    };
  
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

    let sensors = []
    let chart
    console.log(this.state.selectedGroup)
    if (this.state.selectedGroup !== null)  {
      console.log(this.state.selectedGroup)
      if (this.state.selectedGroup.sensors.length > 0) {
        this.state.selectedGroup.sensors.forEach(element => {
          sensors.push(
            <Grid item xs={3} key={element.id}>
              <SensorCard value={element} group={this.state.selectedGroup.id}
                removeFromGroupHandler={this.handleRemoveFromGroup} />
            </Grid>);
        });
        chart = <Grid item xs key='1'>
          <TemperaturesLineChart group={this.state.selectedGroup} />
        </Grid>;
      } else {
        sensors.push(
          <Grid item xs key='1'>
            <EmptyCard />
          </Grid>);
      }
    }

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
              className={classes.title}>
              IOT Skoczo
            </Typography>
            <MainMenu refreshDashboard={event => this.handleRefreshGroups()} />
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
          <Grid container spacing={24}>
            {chart}
          </Grid>
        </main>
        <AddGroupDialog
          open={this.state.openGropAddDialog}
          handleClose={event => this.handleClickOpenCloseGroupAddDialog(false)}
          refreshGroups={event => this.handleRefreshGroups()} />
        
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
