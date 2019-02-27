import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import Group from '@material-ui/icons/Place';

const Groups = (props) => {
  var listItem = []
  for (var e in props.groups) {
    listItem.push(<ListItem button key={props.groups[e]}>
      <ListItemIcon>
        <Group />
      </ListItemIcon>
      <ListItemText primary={props.groups[e]} />
    </ListItem>);
  }
  return (<div>
    {listItem}
  </div>);
};

export default Groups;
