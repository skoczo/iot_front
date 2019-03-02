import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Axios from '../../../axiosConfig/axiosInstance.js'

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

class SensorChart extends Component {
    componentDidMount() {
        Axios.get('/temperatures/sensor/' + this.props.value.sensorId + '/current')
            .then( response => {
                console.log(response)
                this.setState({temp: response.data.value, lastRefresh: response.data.timestamp})
            })
            .catch( error => {
                console.log(error)
            });
    }

    state = {
        lastRefresh: '',
        temp: ''
    }

    render() {
        const { classes } = this.props;

        var date;
        if(this.state.lastRefresh) {
            date = new Date(this.state.lastRefresh)
            date = date.toLocaleString()
        } else {
            date = 'N/A'
        }
        return (<Card>
            <CardContent className="sensorCard">
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {this.props.value.name !== null && this.props.value.name !== '' ? this.props.value.name : this.props.value.sensorId }
                </Typography>
                <Typography className={classes.value}  variant="h5" component="h2">{this.state.temp}&#x2103;</Typography>
                <Typography className={classes.time} color="textSecondary">{date}</Typography>
            </CardContent>
        </Card>);
    }
}

export default withStyles(styles)(SensorChart);