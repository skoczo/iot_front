import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Axios from '../axiosConfig/axiosInstance.js'


const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class LoginPage extends Component {

    state = {
        login: '',
        password: '',
        error: false
    };

    login = (event) => {
        event.preventDefault();
        console.log("sending login data")
        var bodyFormData = new FormData();
        bodyFormData.set('username', this.state.login);
        bodyFormData.set('password', this.state.password);
        Axios.post( 'public/users/login', 
            bodyFormData,
            { headers: {'Content-Type': 'multipart/form-data' }})
        .then((response) => {
                console.log(response);
                this.setState({password: '', error: false})
                this.props.loginHook(response.data);
            })
        .catch((error) => {
            this.setState({password: '', error: true})
            console.error("Error during login. " + error)
        });
    }

    handleLoginEdit = event => {
        this.setState({ login: event.target.value });
    };

    handlePasswordEdit = event => {
        this.setState({ password: event.target.value });
    };

    render() {
        const { classes } = this.props;

        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Zaloguj się
                    </Typography>
                    <form className={classes.form} onSubmit={this.login}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="login">Login</InputLabel>
                            <Input id="login" name="login" autoComplete="login" autoFocus
                                value={this.state.login}
                                onChange={this.handleLoginEdit} />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Hasło</InputLabel>
                            <Input error={this.state.error} name="password" type="password" id="password"
                                autoComplete="current-password"
                                value={this.state.password}
                                onChange={this.handlePasswordEdit} />
                        </FormControl>
                        {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />  */}
          {/* <FormControlLabel control={this.state.error} label=""/> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Zaloguj
          </Button>
                    </form>
                </Paper>
            </main>
        );
    }
}

LoginPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);