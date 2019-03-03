import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InsertChart from '@material-ui/icons/InsertChart';

const Groups = (props) => {
  var listItem = []

  console.log(props.groups)
  if(props.groups) {
    props.groups.forEach(group => {
      console.log(group)
      listItem.push(<ListItem button key={group.id} onClick={event => props.changeGroup(group.id)}>
        <ListItemIcon>
          <InsertChart />
        </ListItemIcon>
        <ListItemText primary={group.name} />
      </ListItem>);
    });
  }
  return (<div>
    {listItem}
  </div>);
};

export default Groups;
