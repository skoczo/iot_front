import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Axios, {GetAuthHeader} from '../../../axiosConfig/axiosInstance.js'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

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

const ITEM_HEIGHT = 48;

class SensorCard extends Component {
    state = {
        anchorEl: null,
        temp: 'N/A',
        lastRefresh: '',
        openDialog: false
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = event => {
        this.setState({ anchorEl: undefined });
    }

    componentDidMount = () => {
        this.refreshTemp()
        this.timer = setInterval(event => this.refreshTemp(), 5000)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    refreshTemp() {
        Axios.get('/data/temperatures/sensor/' + this.props.value.sensorId + '/current', { headers: GetAuthHeader()})
            .then(response => {
                this.setState({ temp: response.data.value, lastRefresh: response.data.timestamp })
            })
            .catch(error => {
                console.log(error)
            });
    }

    showDialog = (show) => {
        this.setState({ openDialog: show });
        this.handleClose()
    }

    isFloat = (n) => {
        return n === +n && n !== (n | 0);
    }

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;

        var sensorName = this.props.value.name !== null && this.props.value.name !== '' ? this.props.value.name : this.props.value.sensorId;

        var date;
        if (this.state.lastRefresh) {
            date = new Date(this.state.lastRefresh)
            date = date.toLocaleString()
        } else {
            date = 'N/A'
        }
        return (<div><Card>
            <CardHeader
                action={
                    <div>
                        <IconButton
                            aria-haspopup="true"
                            aria-owns={'long-menu'}
                            onClick={this.handleClick}>
                            <MoreVertIcon />
                        </IconButton>

                        <Menu
                            PaperProps={{
                                style: {
                                    maxHeight: ITEM_HEIGHT * 4.5,
                                    width: 200,
                                },
                            }}
                            id="long-menu"
                            open={Boolean(anchorEl)}
                            anchorEl={anchorEl}
                            onClose={this.handleClose}>
                            <MenuItem
                                onClick={event => this.showDialog(true)}
                            >Usuń z grupy</MenuItem>
                        </Menu>
                    </div>
                }
                title={sensorName}
            />
            <CardContent className="sensorCard">
                <Typography className={classes.value} variant="h5" component="h2">{this.isFloat(this.state.temp) ? this.state.temp.toFixed(2) : this.state.temp} &#x2103;</Typography>
                <Typography className={classes.time} color="textSecondary">{date}</Typography>
            </CardContent>
        </Card>
            <Dialog
                open={this.state.openDialog}
                onClose={event => this.showDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Usunąć z grupy?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">Czy chcesz usunąć czujnik <b><i>{sensorName}</i></b> z grupy?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={event => this.showDialog(false)} color="primary">
                        Nie
                    </Button>
                    <Button onClick={event => this.props.removeFromGroupHandler(this.props.value.sensorId)} color="primary" autoFocus>
                        Tak
                    </Button>
                </DialogActions>
            </Dialog>
        </div>);
    }
}

export default withStyles(styles)(SensorCard);