import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SimpleLineChart from './SimpleLineChart';
import SimpleTable from './SimpleTable';
import AddGroupDialog from './addGroupDialog/addGroupDialog.js'
import CustomDrawer from './drawer/customDrawer'
import axios from 'axios';

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
    open: true,
    openGropAddDialog: false,
    groups: []
  };

  componentDidMount() {
    this.handleRefreshGroups();
  }

  handleRefreshGroups() {
    axios.get('http://localhost:8443/groups')
      .then(response => {
        console.log('refreshGroups')
        var groupNames = [];
        for (var e in response.data) {
          console.log(response.data[e].name);
          groupNames.push(response.data[e].name);
        }
        console.log(groupNames)
        this.setState({ groups: groupNames });
      });
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleClickOpenCloseGroupAddDialog = (state) => {

    this.setState({ openGropAddDialog: state });
  };

  render() {
    const { classes } = this.props;
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
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <CustomDrawer open={this.state.open} 
          groups={this.state.groups}
          drawerClose={this.handleDrawerClose}
          openAddGroupDialog={event => this.handleClickOpenCloseGroupAddDialog(true)} />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
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
            <SimpleTable />
          </div> */}
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
