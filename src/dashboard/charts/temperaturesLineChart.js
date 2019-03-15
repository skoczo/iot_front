import React, { Component } from 'react';
import Axios from '../../axiosConfig/axiosInstance.js'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import BillboardChart from "react-billboardjs";
import "react-billboardjs/lib/billboard.css";

class TemperaturesLineChart extends Component {
    state = {
        temperatures: null
    }

    componentDidMount() {
        this.getTemperatures(this.props.group);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.group !== this.props.group) {
            if (this.chartInstance !== null && this.chartInstance.chart !== null) {
                this.getTemperatures(nextProps.group);
            }
        }
    }

    getRef = (ChartInstance) => {
        this.chartInstance = ChartInstance;
    };

    getTemperatures = (group) => {
        this.setState({ temperatures: null })
        if (group) {
            let sensors = group.sensors.map(sensor => sensor.sensorId)
            let url = '/temperatures/today?sensorIds=' + sensors
            Axios.get(url)
                .then(response => {
                    this.setState({ temperatures: response.data })
                })
                .catch(error => { console.log(error) })
        }
    }

    render() {
        if (this.state.temperatures !== null) {
            var x = []
            var y = []
            var xs = {}

            var iterator = 1
            this.state.temperatures.forEach(element => {
                var timestamps = element.temperatures.map(
                    entity => new Date(entity.timestamp))
                timestamps.unshift('x' + iterator)
                x.push(timestamps)

                var values = element.temperatures.map(entity => entity.value)
                var dataName = element.sensor.name !== '' ? element.sensor.name : element.sensor.sensorId
                values.unshift(dataName)
                y.push(values)

                xs[dataName] = 'x' + iterator
                iterator++
            });

            var columns = []
            x.forEach(element => columns.push(element))
            y.forEach(element => columns.push(element))

            var d = {
                xs: xs,
                columns: columns
            }

            return <Card>
                <CardContent>
                    <BillboardChart
                        unloadBeforeLoad
                        data={d}
                        ref={this.getRef}
                        axis={{x: {
                                type: 'timeseries',
                                tick: {
                                    format: '%Y-%m-%d %H:%M:%S'
                                }
                            }}} />
                </CardContent>
            </Card>;
        }
        return <Card>
                    <CardContent>
                        <BillboardChart data={{ xs: [[]], columns: [[]] }} 
                                        axis={{x: {
                                            type: 'timeseries',
                                            tick: {
                                                format: '%Y-%m-%d %H:%M:%S'
                                            }
                                        }}}/>
                    </CardContent>
                </Card>;
    }
}

export default TemperaturesLineChart;   