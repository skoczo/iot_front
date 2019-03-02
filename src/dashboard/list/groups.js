import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Group from '@material-ui/icons/Place';
import InsertChart from '@material-ui/icons/InsertChart';

const Groups = (props) => {
  var listItem = []
  for (var e in props.groups) {
    listItem.push(<ListItem button key={props.groups[e].id}>
      <ListItemIcon>
        <InsertChart />
      </ListItemIcon>
      <ListItemText primary={props.groups[e].name} />
    </ListItem>);
  }
  return (<div>
    {listItem}
  </div>);
};

export default Groups;
