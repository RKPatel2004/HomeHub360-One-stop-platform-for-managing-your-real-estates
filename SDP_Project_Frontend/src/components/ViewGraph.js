import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import './ViewGraph.css';

const ViewGraph = () => {
    const [propertyTypeData, setPropertyTypeData] = useState(null);
    const [locationData, setLocationData] = useState(null);
    const user = useSelector(state => state.User);

    // Colors for charts
    const PROPERTY_TYPE_COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];
    const LOCATION_COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF7F50', '#8B4513'];

    useEffect(() => {
        const fetchViewData = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };

                // Fetch views by property type
                const propertyTypeResponse = await axios.get(/*'http://localhost:5000/api/view-graph/views-by-property-type'*/'https://homehub360.onrender.com/api/view-graph/views-by-property-type', config);
                const propertyTypeDataProcessed = Object.entries(propertyTypeResponse.data.data).map(([type, data]) => ({
                    name: type,
                    totalViews: data.totalViews,
                    properties: data.properties
                }));
                setPropertyTypeData(propertyTypeDataProcessed);

                // Fetch views by location
                const locationResponse = await axios.get(/*'http://localhost:5000/api/view-graph/views-by-location'*/'https://homehub360.onrender.com/api/view-graph/views-by-location', config);
                
                // Ensure all locations are included, even with 0 views
                const allLocations = ['Chennai', 'Surat', 'Jaipur', 'Delhi', 'Pune', 'Ahmedabad', 'Banglore'];
                const locationDataProcessed = allLocations.map(location => {
                    const locationData = locationResponse.data.data[location] || { 
                        totalViews: 0, 
                        properties: [] 
                    };
                    return {
                        name: location,
                        totalViews: locationData.totalViews,
                        properties: locationData.properties || []
                    };
                });

                setLocationData(locationDataProcessed);
            } catch (error) {
                console.error('Error fetching view data:', error);
            }
        };

        fetchViewData();
    }, [user.token]);

    // Custom tooltip for property type chart
    const PropertyTypeTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            const allUniqueUsers = data.properties.flatMap(prop => prop.uniqueUsers);
            const uniqueUsersList = [...new Set(allUniqueUsers)];

            return (
                <div className="custom-tooltip">
                    <p><strong>{data.name}</strong></p>
                    <p>Views: {data.totalViews}</p>
                    <p>Users: {uniqueUsersList.join(', ')}</p>
                </div>
            );
        }
        return null;
    };

    // Custom tooltip for location chart
    const LocationTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            const allUniqueUsers = data.properties.flatMap(prop => prop.uniqueUsers);
            const uniqueUsersList = [...new Set(allUniqueUsers)];

            return (
                <div className="custom-tooltip">
                    <p><strong>{data.name}</strong></p>
                    <p>Views: {data.totalViews}</p>
                    <p>Users: {uniqueUsersList.join(', ')}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="view-graph-container">
            <div className="graph-section">
                <h2>Views by Property Type</h2>
                {propertyTypeData && (
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={propertyTypeData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip content={<PropertyTypeTooltip />} />
                            <Legend />
                            <Bar dataKey="totalViews" fill="#8884d8">
                                {propertyTypeData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={PROPERTY_TYPE_COLORS[index % PROPERTY_TYPE_COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
            <div className="graph-section">
                <h2>Views by Location</h2>
                {locationData && (
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart 
                            data={locationData} 
                            barSize={30} // Reduce bar width
                        >
                            <XAxis 
                                dataKey="name" 
                                angle={-45} // Rotate labels
                                textAnchor="end"
                                interval={0} // Show all labels
                                height={70} // Increase height to accommodate rotated labels
                            />
                            <YAxis />
                            <Tooltip content={<LocationTooltip />} />
                            <Legend />
                            <Bar dataKey="totalViews" fill="#82ca9d">
                                {locationData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={LOCATION_COLORS[index % LOCATION_COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};

export default ViewGraph;