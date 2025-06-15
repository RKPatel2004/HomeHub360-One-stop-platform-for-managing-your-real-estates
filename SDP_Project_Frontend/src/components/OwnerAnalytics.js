import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './OwnerAnalytics.css';

const OwnerAnalytics = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = useSelector(state => state.User);
    const [feedbacks, setFeedbacks] = useState([]);
    const [currentFeedbackIndex, setCurrentFeedbackIndex] = useState(0);

    const COLORS = [
        '#FF1493', // Deep Pink
        '#00FF00', // Lime
        '#FF4500', // Orange Red
        '#1E90FF', // Dodger Blue
        '#FFD700', // Gold
        '#7B68EE', // Medium Slate Blue
        '#00FFFF', // Cyan
        '#FF00FF', // Magenta
        '#32CD32', // Lime Green
        '#FF6347', // Tomato
        '#4169E1', // Royal Blue
        '#FFA500', // Orange
        '#9370DB', // Medium Purple
        '#00FA9A', // Medium Spring Green
        '#DC143C', // Crimson
        '#00BFFF', // Deep Sky Blue
        '#ADFF2F', // Green Yellow
        '#FF69B4', // Hot Pink
        '#BA55D3', // Medium Orchid
        '#00FF7F'  // Spring Green
    ];

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                setLoading(true);
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const response = await axios.get(/*'http://localhost:5000/api/analytics/owner-analytics'*/'https://homehub360.onrender.com/api/analytics/owner-analytics', config);
                setAnalytics(response.data.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching owner analytics:', err);
                setError('Failed to load analytics data. Please try again later.');
                setLoading(false);
            }
        };

        if (user.token) {
            fetchAnalytics();
        }
    }, [user.token]);

    useEffect(() => {
        const fetchFeedbacksData = async () => {
            try {
                const response = await axios.get(/*'http://localhost:5000/api/getAllFeedbacks'*/'https://homehub360.onrender.com/api/getAllFeedbacks', {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setFeedbacks(response.data.data || []);
            } catch (err) {
                console.error('Error fetching feedbacks data:', err);
            }
        };

        if (user.token) {
            fetchFeedbacksData();
        }
    }, [user.token]);

    useEffect(() => {
        // Auto-rotate feedback carousel every 5 seconds
        if (feedbacks.length > 0) {
            const interval = setInterval(() => {
                setCurrentFeedbackIndex((prevIndex) => 
                    prevIndex === feedbacks.length - 1 ? 0 : prevIndex + 1
                );
            }, 5000);
            
            return () => clearInterval(interval);
        }
    }, [feedbacks]);

    // Format price ranges for better display
    const formatPriceRanges = (priceRanges) => {
        return Object.entries(priceRanges).map(([range, count]) => ({
            name: range,
            value: count
        })).filter(item => item.value > 0);
    };

    // Custom tooltip for charts
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{`${label}: ${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
    };

    // Custom tooltip for pie chart
    const PieCustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{`${payload[0].name}: ${payload[0].value} (${payload[0].payload.percentage}%)`}</p>
                </div>
            );
        }
        return null;
    };

    // Custom label for pie slices
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, location, count }) => {
        const RADIAN = Math.PI / 180;
        const radius = 25 + innerRadius + (outerRadius - innerRadius);
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text 
                x={x} 
                y={y} 
                fill="#333333"
                textAnchor={x > cx ? 'start' : 'end'} 
                dominantBaseline="central"
                className="pie-label"
            >
                {`${location} (${(percent * 100).toFixed(0)}%)`}
            </text>
        );
    };

    if (loading) {
        return <div className="analytics-loading">Loading analytics data...</div>;
    }

    if (error) {
        return <div className="analytics-error">{error}</div>;
    }

    if (!analytics) {
        return <div className="analytics-error">No analytics data available.</div>;
    }

    // Prepare location data for pie chart
    const locationData = analytics.locationDistribution || [];
    
    // Add percentage field to location data for tooltip and labels
    const locationTotal = locationData.reduce((sum, item) => sum + item.count, 0);
    const enhancedLocationData = locationData.map(item => ({
        ...item,
        percentage: ((item.count / locationTotal) * 100).toFixed(1)
    }));
    
    // Prepare price range data
    const soldPriceData = analytics.soldProperties ? formatPriceRanges(analytics.soldProperties.priceRanges) : [];
    const rentPriceData = analytics.rentedProperties ? formatPriceRanges(analytics.rentedProperties.rentRanges) : [];

    // Current feedback to display
    const currentFeedback = feedbacks.length > 0 ? feedbacks[currentFeedbackIndex] : null;

    return (
        <div className="owner-analytics">
            <div className="analytics-header">
                <h1>Property Analytics Dashboard</h1>
                <div className="stats-overview">
                    <div className="stat-card">
                        <h3>Total Properties</h3>
                        <p className="stat-value">{analytics.totalProperties || 0}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Sold Properties</h3>
                        <p className="stat-value">{analytics.soldProperties?.count || 0}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Rented Properties</h3>
                        <p className="stat-value">{analytics.rentedProperties?.count || 0}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Total Revenue</h3>
                        <p className="stat-value">${analytics.totalRevenue ? analytics.totalRevenue.toLocaleString() : 0}</p>
                    </div>
                </div>
            </div>

            {/* Location Distribution Section - Enhanced 3D Pie Chart with Bright Colors */}
            <div className="analytics-section">
                <h2>Property Location Distribution</h2>
                {enhancedLocationData.length > 0 ? (
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart>
                                <Pie
                                    data={enhancedLocationData}
                                    dataKey="count"
                                    nameKey="location"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={140}
                                    paddingAngle={2}
                                    labelLine={true}
                                    label={renderCustomizedLabel}
                                    isAnimationActive={true}
                                    className="pie-3d"
                                >
                                    {enhancedLocationData.map((entry, index) => (
                                        <Cell 
                                            key={`cell-${index}`} 
                                            fill={COLORS[index % COLORS.length]} 
                                            className="pie-cell"
                                        />
                                    ))}
                                </Pie>
                                <Tooltip content={<PieCustomTooltip />} />
                                <Legend 
                                    layout="vertical" 
                                    verticalAlign="middle" 
                                    align="right"
                                    wrapperStyle={{ paddingLeft: "20px" }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <p className="no-data">No location data available.</p>
                )}
            </div>

            {/* Sold Properties Price Range Section */}
            <div className="analytics-section">
                <h2>Sold Properties Price Distribution</h2>
                {soldPriceData.length > 0 ? (
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={soldPriceData}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <Bar dataKey="value" name="Properties" fill="#0088FE" />
                            </BarChart>
                        </ResponsiveContainer>
                        <div className="price-insight">
                            <p><strong>Most Popular Price Range:</strong> {analytics.soldProperties?.maxSellingRange || 'N/A'} ({analytics.soldProperties?.maxSellingCount || 0} properties)</p>
                        </div>
                    </div>
                ) : (
                    <p className="no-data">No sold property data available.</p>
                )}
            </div>

            {/* Rented Properties Price Range Section */}
            <div className="analytics-section">
                <h2>Rented Properties Price Distribution</h2>
                {rentPriceData.length > 0 ? (
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={rentPriceData}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <Bar dataKey="value" name="Properties" fill="#00C49F" />
                            </BarChart>
                        </ResponsiveContainer>
                        <div className="price-insight">
                            <p><strong>Most Popular Rent Range:</strong> {analytics.rentedProperties?.maxRentRange || 'N/A'} ({analytics.rentedProperties?.maxRentCount || 0} properties)</p>
                        </div>
                    </div>
                ) : (
                    <p className="no-data">No rented property data available.</p>
                )}
            </div>

            {/* Customer Feedback Section */}
            <div className="analytics-section">
                <h2>Customer Feedback</h2>
                <div className="w-full max-w-4xl mx-auto mt-5">
                    {feedbacks.length === 0 ? (
                        <div className="bg-blue-50 rounded-lg p-5 text-center">
                            <p className="text-gray-600 italic">No feedback data available</p>
                        </div>
                    ) : (
                        <div className="bg-blue-50 rounded-lg shadow-md overflow-hidden">
                            <h3 className="text-center text-xl font-bold text-gray-800 py-3 border-b border-blue-100">
                                Customer Feedback
                            </h3>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <h4 className="text-blue-700 font-bold text-lg mb-1">
                                            {currentFeedback?.property?.title || 'J9 Centre'}
                                        </h4>
                                        <div className="flex items-center text-gray-600 mb-1">
                                            <svg className="h-4 w-4 text-blue-600 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span>{currentFeedback?.property?.address || 'Surat'}</span>
                                        </div>
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded uppercase font-semibold">
                                            {currentFeedback?.property?.type || 'OFFICE'}
                                        </span>
                                    </div>
                                    <div className="bg-yellow-100 px-3 py-2 rounded-lg text-center">
                                        <div className="text-yellow-800 text-sm font-medium">Rating</div>
                                        <div className="text-yellow-900 font-bold text-xl">
                                            {currentFeedback?.rating || '4'}<span className="text-sm font-normal">/5</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
                                    <p className="text-gray-700 italic text-center">
                                        &quot;{currentFeedback?.feedbackText || 'Very nice office interior and very spacious and neat & clean for working'}&quot;
                                    </p>
                                </div>
                                <div className="flex justify-center space-x-2">
                                    {feedbacks.map((_, index) => (
                                        <span 
                                            key={index} 
                                            className={`inline-block h-3 w-3 rounded-full ${
                                                index === currentFeedbackIndex ? 'bg-blue-600' : 'bg-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OwnerAnalytics;