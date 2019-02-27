import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Add from '@material-ui/icons/Add'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Groups from '../list/groups';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';

import classNames from 'classnames';

const drawerWidth = 240;

const styles = theme => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
});

class IOTDrawer extends Component {
  render() {
    const { classes } = this.props;

    return <Drawer
        variant="permanent"
        classes={{
          paper: classNames(classes.drawerPaper, !this.props.open && classes.drawerPaperClose),
        }}
        open={this.props.open}>
        <div className={classes.toolbarIcon}>
          <IconButton onClick={this.props.drawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List><Groups groups={this.props.groups} /></List>
        <Divider />
        <List><ListItem button onClick={this.props.openAddGroupDialog}>
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText primary="Dodaj grupę" />
        </ListItem></List>
      </Drawer>;
  }
};


export default withStyles(styles)(IOTDrawer);