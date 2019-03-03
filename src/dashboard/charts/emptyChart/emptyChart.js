import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
    value: {
        textAlign: 'center'
    },
    title: {
        fontSize: 14,
        textAlign: 'center'
    },
    time: {
        fontSize: 9,
        marginTop: 15
    }
};

class EmptyChart extends Component {
    render() {
        const { classes } = this.props;

        return (<Card>
            {/* <CardHeader
                title={this.props.value.name !== null && this.props.value.name !== '' ? this.props.value.name : this.props.value.sensorId }
            /> */}
            <CardContent className="sensorCard">
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                Nie ma czujników do wyświetlenia
                </Typography>
            </CardContent>
        </Card>);
    }
}

export default withStyles(styles)(EmptyChart);