import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Axios from '../../../axiosConfig/axiosInstance.js'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';

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
    componentDidMount = () => {
        this.refreshTemp()
        this.timer = setInterval(event => this.refreshTemp(), 5000)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }


    refreshTemp() {
        Axios.get('/temperatures/sensor/' + this.props.value.sensorId + '/current')
            .then( response => {
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
    
    isFloat = (n) => {
        return n === +n && n !== (n|0);
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
            <CardHeader
                action={
                    <IconButton>
                    <MoreVertIcon />
                    </IconButton>
                }
                title={this.props.value.name !== null && this.props.value.name !== '' ? this.props.value.name : this.props.value.sensorId }
            />
            <CardContent className="sensorCard">
                {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
                {this.props.value.name !== null && this.props.value.name !== '' ? this.props.value.name : this.props.value.sensorId }
                </Typography> */}
                <Typography className={classes.value}  variant="h5" component="h2">{this.isFloat(this.state.temp) ? this.state.temp.toFixed(2) : this.state.temp}&#x2103;</Typography>
                <Typography className={classes.time} color="textSecondary">{date}</Typography>
            </CardContent>
        </Card>);
    }
}

export default withStyles(styles)(SensorChart);