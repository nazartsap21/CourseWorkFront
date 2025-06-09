import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    ResponsiveContainer,
    ReferenceArea
} from 'recharts';
import { GaugeComponent } from 'react-gauge-component';
import DeviceDataService from "../../../services/DeviceDataService.ts";
import { DeviceData } from "../../../interfaces/globalInterfaces.ts";
import { getTemperatureZones, getHumidityZones } from '../../../utils/zones.ts';
import ModalUpdateDevice from "../../entities/ModalUpdateDevice/ModalUpdateDevice.tsx";
import './DevicePage.scss';
import update from "../../entities/Device/update.svg";

const DevicePage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [deviceData, setDeviceData] = useState<DeviceData[]>([]);
    const [overallAirQuality, setOverallAirQuality] = useState<number | null>(null);
    const [averages, setAverages] = useState({
        tempAvg: 0,
        humidityAvg: 0,
        ppmAvg: 0,
    });
    const [deviceDetails, setDeviceDetails] = useState({
        id: '',
        name: '',
        description: '',
    });
    const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'all'>('day');
    const [showLines, setShowLines] = useState({
        temp: { min: false, avg: true, max: false },
        humidity: { min: false, avg: true, max: false },
        ppm: { min: false, avg: true, max: false },
    });

    const [showZones, setShowZones] = useState({
        tempZones: false,
        humidityZones: false,
        ppmZones: false,
    });

    const [activeUpdate, setActiveUpdate] = useState(false);
    const [updatedDevice, setUpdatedDevice] = useState({
        id: '',
        name: '',
        description: '',
        device: { uniqueDeviceId: '' }
    });

    const now = new Date();

    const handleZoneToggle = (zone: keyof typeof showZones) => {
        setShowZones((prev) => ({ ...prev, [zone]: !prev[zone] }));
    };
    const handleLineToggle = (type: keyof typeof showLines, line: 'min' | 'avg' | 'max') => {
        setShowLines((prev) => ({
            ...prev,
            [type]: {
                ...prev[type],
                [line]: !prev[type][line],
            }
        }));
    };

    const handleUpdatedDevice = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!updatedDevice.name || !updatedDevice.description) {
            alert('All fields are required');
            return;
        }

        await ProfileServices.updateDevice(
            updatedDevice.device.uniqueDeviceId,
            updatedDevice.name,
            updatedDevice.description
        );

        fetchDeviceData();
        setActiveUpdate(false);
    };


    useEffect(() => {
        if (!id) return;

        DeviceDataService.getDeviceData(id).then((response) => {
            const data = response.data;
            setDeviceData(data);

            setDeviceDetails({
                id,
                name: "Device Name",
                description: "Device Description",
            });

            if (data.length > 0) {
                const latestData = data[data.length - 1];
                setOverallAirQuality(latestData.airQuality);
                setAverages({
                    tempAvg: latestData.tempAvg,
                    humidityAvg: latestData.humidityAvg,
                    ppmAvg: latestData.ppmAvg,
                });
            }
        });
    }, [id]);

    const getFilteredData = () => {
        const now = new Date();
        let startDate: Date;

        switch (timeRange) {
            case 'day':
                startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
                break;
            case 'week':
                startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                break;
            case 'month':
                startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                break;
            case 'all':
                startDate = new Date(0); // Start from epoch for 'all'
                break;
            default:
                startDate = new Date(0);
        }

        return deviceData.filter(d => new Date(d.datetime) >= startDate);
    };

    const renderChart = (
        type: 'temp' | 'humidity' | 'ppm',
        label: string,
        zones: { y1: number, y2: number, fill: string }[],
        showZonesKey: keyof typeof showZones
    ) => {
        const data = getFilteredData().map(d => ({
            ...d,
            datetime: new Date(d.datetime).toLocaleString()
        }));

        const colors = {
            min: '#1f77b4',
            avg: '#000000',
            max: '#d62728',
        };

        const keys = {
            temp: { min: 'tempMin', avg: 'tempAvg', max: 'tempMax' },
            humidity: { min: 'humidityMin', avg: 'humidityAvg', max: 'humidityMax' },
            ppm: { min: 'ppmMin', avg: 'ppmAvg', max: 'ppmMax' },
        };

        return (
            <div className="chart-container">
                <h2>{label}</h2>
                <div className="line-toggles">
                    <label>
                        <input
                            type="checkbox"
                            checked={showLines[type].min}
                            onChange={() => handleLineToggle(type, 'min')}
                        /> Min
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={showLines[type].avg}
                            onChange={() => handleLineToggle(type, 'avg')}
                        /> Avg
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={showLines[type].max}
                            onChange={() => handleLineToggle(type, 'max')}
                        /> Max
                    </label>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="datetime" tick={{ fontSize: 12 }} />
                        <YAxis />
                        <Tooltip />
                        <Legend />

                        {showZones[showZonesKey] &&
                            zones.map((zone, index) => (
                                <ReferenceArea
                                    key={index}
                                    y1={zone.y1}
                                    y2={zone.y2}
                                    fill={zone.fill}
                                    strokeOpacity={0.1}
                                    ifOverflow="extendDomain"
                                />
                            ))}

                        {(['max', 'avg', 'min'] as const).map((lineType) =>
                            showLines[type][lineType] ? (
                                <Line
                                    key={lineType}
                                    type="monotone"
                                    dataKey={keys[type][lineType]}
                                    stroke={colors[lineType]}
                                    strokeWidth={2}
                                    dot={false}
                                />
                            ) : null
                        )}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    };



    const downloadXLSX = () => {
        const headers = ['Datetime', 'Temperature', 'Humidity', 'PPM', 'Air Quality'];
        const rows = deviceData.map(d => [
            d.datetime,
            d.tempAvg,
            d.humidityAvg,
            d.ppmAvg,
            d.airQuality
        ]);

        const xlsxContent = [headers, ...rows]
            .map(row => row.join(','))
            .join('\n');

        const blob = new Blob([xlsxContent], { type: 'text/xlsx;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `device_data_${id}.xlsx`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="device-page">
            <button className="back-button" onClick={() => navigate(-1)}>Back</button>

            <div className="device-details">
                <div className="device-header">
                    <h2>Device Details</h2>
                    <button
                        onClick={() => {
                            setActiveUpdate(true);
                            setUpdatedDevice({
                                id: deviceDetails.id,
                                name: deviceDetails.name,
                                description: deviceDetails.description,
                                device: { uniqueDeviceId: id || '' }
                            });
                        }}
                        className="edit-button"
                    >
                        <img src={update} alt={"edit device"} style={{width: "30px", height: "30px"}}/>
                    </button>
                </div>
                <p><strong>ID:</strong> {deviceDetails.id}</p>
                <p><strong>Name:</strong> {deviceDetails.name}</p>
                <p><strong>Description:</strong> {deviceDetails.description}</p>
            </div>
            <div className="data-section">
                {overallAirQuality !== null && (
                    <div className="gauge air-quality-gauge">
                        <GaugeComponent
                            arc={{
                                subArcs: [
                                    { limit: 20, color: '#EA4228', tooltip: { text: "Very poor" } },
                                    { limit: 40, color: '#F58B19', tooltip: { text: "Poor" } },
                                    { limit: 60, color: '#F5CD19', tooltip: { text: "Moderate" } },
                                    { limit: 80, color: '#B5E61D', tooltip: { text: "Good" } },
                                    { color: '#5BE12C', tooltip: { text: "Excellent" } },
                                ],
                            }}
                            value={overallAirQuality}
                        />
                        <p>Overall Air Quality</p>
                    </div>
                )}
                <div className="gauge-row">
                    <div className="gauge">
                        <GaugeComponent
                            type="semicircle"
                            arc={{
                                width: 0.2,
                                padding: 0.005,
                                cornerRadius: 1,
                                subArcs: [
                                    {
                                        limit: 15,
                                        color: '#EA4228',
                                        showTick: true,
                                        tooltip: {
                                            text: 'Too low temperature!'
                                        },
                                        onClick: () => console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"),
                                        onMouseMove: () => console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"),
                                        onMouseLeave: () => console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC"),
                                    },
                                    {
                                        limit: 17,
                                        color: '#F5CD19',
                                        showTick: true,
                                        tooltip: {
                                            text: 'Low temperature!'
                                        }
                                    },
                                    {
                                        limit: 28,
                                        color: '#5BE12C',
                                        showTick: true,
                                        tooltip: {
                                            text: 'OK temperature!'
                                        }
                                    },
                                    {
                                        limit: 30, color: '#F5CD19', showTick: true,
                                        tooltip: {
                                            text: 'High temperature!'
                                        }
                                    },
                                    {
                                        color: '#EA4228',
                                        tooltip: {
                                            text: 'Too high temperature!'
                                        }
                                    }
                                ]
                            }}
                            pointer={{
                                color: '#345243',
                                length: 0.80,
                                width: 15,
                                // elastic: true,
                            }}
                            labels={{
                                valueLabel: { formatTextValue: value => value + 'ºC' },
                                tickLabels: {
                                    type: 'outer',
                                    defaultTickValueConfig: {
                                        formatTextValue: (value) => value + 'ºC' ,
                                        style: {fontSize: 10}
                                    },
                                    ticks: [
                                        { value: 13 },
                                        { value: 22.5 },
                                        { value: 32 }
                                    ],
                                }
                            }}
                            value={averages.tempAvg}
                            minValue={10}
                            maxValue={35}
                        />
                        <p>Temperature (Avg)</p>
                    </div>
                    <div className="gauge">
                        <GaugeComponent
                            value={averages.humidityAvg}
                            minValue={0}
                            maxValue={100}
                            arc={{
                                subArcs: [
                                    { limit: 30, color: '#EA4228', tooltip: { text: 'Too dry' }, showTick: true },
                                    { limit: 40, color: '#F5CD19', tooltip: { text: 'Dry' }, showTick: true },
                                    { limit: 60, color: '#5BE12C', tooltip: { text: 'Optimal' }, showTick: true },
                                    { limit: 80, color: '#F5CD19', tooltip: { text: 'Humid' }, showTick: true },
                                    { color: '#EA4228', tooltip: { text: 'Too humid' }, showTick: true },
                                ],
                            }}
                            labels={{
                                valueLabel: {
                                    formatTextValue: (v: number) => `${v}%`,
                                },
                            }}
                        />
                        <p>Humidity (Avg)</p>
                    </div>
                    <div className="gauge">
                        <GaugeComponent
                            value={averages.ppmAvg}
                            minValue={400}
                            maxValue={2100}
                            arc={{
                                subArcs: [
                                    { limit: 500, color: '#00cc44', tooltip: { text: 'Excellent' }, showTick: true },
                                    { limit: 700, color: '#33cc33', tooltip: { text: 'Good' }, showTick: true },
                                    { limit: 1000, color: '#99cc00', tooltip: { text: 'Fair' }, showTick: true },
                                    { limit: 1400, color: '#ffcc00', tooltip: { text: 'Mediocre' }, showTick: true },
                                    { limit: 1800, color: '#ff6600', tooltip: { text: 'Bad' }, showTick: true },
                                    { color: '#cc0000', tooltip: { text: 'Very Bad' }, showTick: false },
                                ],
                            }}
                            labels={{
                                valueLabel: {
                                    formatTextValue: (v: number) => `${v} ppm`,
                                },
                            }}
                        />
                        <p>CO₂ (Avg)</p>
                    </div>
                </div>

            </div>
            <div className="time-range-selector">
                <label htmlFor="timeRange">Period: </label>
                <select
                    id="timeRange"
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value as 'day' | 'week' | 'month' | 'all')}
                >
                    <option value="day">1 Day</option>
                    <option value="week">1 Week</option>
                    <option value="month">1 Month</option>
                    <option value="all">All Time</option>
                </select>
            </div>
            <div className="graphs-section">
                <div className="zone-toggles">
                    <label>
                        <input
                            type="checkbox"
                            checked={showZones.tempZones}
                            onChange={() => handleZoneToggle('tempZones')}
                        />
                        Show Temperature Zones
                    </label>
                </div>
                {renderChart('temp', 'Температура', getTemperatureZones(now), 'tempZones')}
                <div className="zone-toggles">
                    <label>
                        <input
                            type="checkbox"
                            checked={showZones.humidityZones}
                            onChange={() => handleZoneToggle('humidityZones')}
                        />
                        Show Humidity Zones
                    </label>
                </div>
                {renderChart('humidity', 'Вологість', getHumidityZones(now), 'humidityZones')}
                <div className="zone-toggles">
                    <label>
                        <input
                            type="checkbox"
                            checked={showZones.ppmZones}
                            onChange={() => handleZoneToggle('ppmZones')}
                        />
                        Show CO₂ Zones
                    </label>
                </div>
                {renderChart('ppm', 'CO₂ (PPM)', [
                    { y1: 0, y2: 500, fill: '#00cc44' },
                    { y1: 500, y2: 700, fill: '#33cc33' },
                    { y1: 700, y2: 1000, fill: '#99cc00' },
                    { y1: 1000, y2: 1400, fill: '#ffcc00' },
                    { y1: 1400, y2: 1800, fill: '#ff6600' },
                    { y1: 1800, y2: 2100, fill: '#cc0000' },
                ], 'ppmZones')}
            </div>

            <button onClick={downloadXLSX} className="download-button">Download Data as XLSX</button>
            <ModalUpdateDevice
                device={updatedDevice}
                setDevice={setUpdatedDevice}
                handleSubmit={handleUpdatedDevice}
                headerText="Update device"
                active={activeUpdate}
                setActive={setActiveUpdate}
            />
        </div>
    );
};

export default DevicePage;

