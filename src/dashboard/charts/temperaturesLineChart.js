import React, { Component } from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Axios from '../../axiosConfig/axiosInstance.js'


class TemperaturesLineChart extends Component {
    state = {
        data: []
    }

    componentDidMount() {
        this.getTemperatures(this.props.group);
    }

    getTemperatures = (group) => {
        console.log(group)
        if (group) {
            group.sensors.forEach(sensor => {
                let url = '/temperatures/' + sensor.sensorId + '/today'
                console.log(url)
                Axios.get(url)
                    .then(result => {
                        this.setState({ [sensor.sensorId]: result.data })
                        console.log("today temps");
                        console.log(result);
                    })
                    .catch(error => {
                        console.log("Error when getting temp")
                        console.log(error)
                    });
            });

        }
    }

    render() {
        console.log('TemperaturesLineChart')
        console.log(this.state)

        let chart;

        if (this.props.group.sensors[0].sensorId in this.state) {
            let temps = this.state[this.props.group.sensors[0].sensorId];
            console.log('temps')
            console.log(temps)

            console.log(temps[1])

            chart = <LineChart data={temps}>
                <XAxis dataKey="timestamp" />
                <YAxis />
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#82ca9d" />
                {/* <Line type="monotone" dataKey="Orders" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
            </LineChart>
        } else {
            chart = <div>Waiting for data</div>;
        }

        return (
            <Card>
                <CardContent className="sensorCard">
                    <ResponsiveContainer width="99%" height={320}>
                        {chart}
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        );
    }
}

export default TemperaturesLineChart;