import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import axios from 'axios';
import './FeedbackBarGraph.css';

const FeedbackBarGraph = () => {
    const [data, setData] = useState([]);
    
    const COLORS = [
        '#4caf50', // green
        '#2196f3', // blue
        '#ff9800', // orange
        '#e91e63' // pink
    ];

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const token = localStorage.getItem('token'); // Get JWT token
                const response = await axios.get(/*'http://localhost:5000/api/average-ratings'*/'https://homehub360.onrender.com/api/average-ratings', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setData(response.data);
            } catch (error) {
                console.error('Error fetching ratings:', error);
            }
        };

        fetchRatings();
    }, []);

    // Function to get color index for each property type
    const getColorIndex = (propertyType, index) => {
        // If we have a small number of property types, we can use the index directly
        // This ensures consistent colors between renders
        return index % COLORS.length;
    };

    return (
        <div className="feedback-container">
            <div className="card">
                <div className="card-header">
                    <h2>Average Ratings Per Property Type</h2>
                </div>
                <div className="card-body">
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis 
                                dataKey="propertyType" 
                                tick={{ fill: '#666' }}
                                tickLine={{ stroke: '#666' }}
                            />
                            <YAxis 
                                domain={[0, 5]} 
                                ticks={[0, 1, 2, 3, 4, 5]} 
                                tick={{ fill: '#666' }}
                                tickLine={{ stroke: '#666' }}
                            />
                            <Tooltip 
                                contentStyle={{ 
                                    backgroundColor: '#fff',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                                }}
                            />
                            <Legend wrapperStyle={{ paddingTop: '20px' }} />
                            <Bar 
                                dataKey="averageRating" 
                                name="Average Rating"
                                barSize={60}
                                radius={[4, 4, 0, 0]}
                            >
                                {data.map((entry, index) => (
                                    <Cell 
                                        key={`cell-${index}`} 
                                        fill={COLORS[getColorIndex(entry.propertyType, index)]} 
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="card-footer">
                    <div className="color-legend">
                        {data.map((entry, index) => (
                            <div key={`legend-${index}`} className="legend-item">
                                <span 
                                    className="color-box" 
                                    style={{ backgroundColor: COLORS[getColorIndex(entry.propertyType, index)] }}
                                ></span>
                                <span className="property-name">{entry.propertyType}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedbackBarGraph;