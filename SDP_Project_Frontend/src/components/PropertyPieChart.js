import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";
import "./PropertyPieChart.css";

// Base colors for 3D effect
const BASE_COLORS = ["#28a745", "#dc3545", "#ffc107", "#17a2b8"]; // Green, Red, Yellow, Blue

const PropertyPieChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalProperties, setTotalProperties] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/analytics/property-stats", {
          headers: { Authorization: `Bearer ${token}` }
        });

        const { apartments, farmhouses, lands, offices } = res.data;

        // Combine all property counts
        const total = {
          available: apartments.available + farmhouses.available + lands.available + offices.available,
          sold: apartments.sold + farmhouses.sold + lands.sold + offices.sold,
          rented: apartments.rented + farmhouses.rented + lands.rented + offices.rented,
        };

        const chartData = [
          { name: "Available", value: total.available },
          { name: "Sold", value: total.sold },
          { name: "Rented", value: total.rented },
        ];

        setData(chartData);
        setTotalProperties(total.available + total.sold + total.rented);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching property analytics", error);
        setError("Failed to load property data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      const percentage = ((item.value / totalProperties) * 100).toFixed(1);
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{`${item.name}: ${item.value}`}</p>
          <p className="tooltip-percentage">{`${percentage}% of total`}</p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return <div className="loading-container">Loading property data...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="property-pie-chart-wrapper">
      <div className="property-pie-chart-container">
        <div className="chart-header">
          <h2>Property Status Overview</h2>
          <p className="total-properties">Total Properties: {totalProperties}</p>
        </div>
        
        <div className="chart-wrapper">
          <div className="pie-3d-container">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                {/* Main 3D pie chart */}
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  labelLine={true}
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  className="pie-3d"
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={BASE_COLORS[index % BASE_COLORS.length]} 
                      className="pie-segment"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend layout="vertical" verticalAlign="middle" align="right" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="property-stats-summary">
          {data.map((item, index) => (
            <div 
              key={index} 
              className="stat-item"
              style={{ borderColor: BASE_COLORS[index % BASE_COLORS.length] }}
            >
              <div className="stat-color" style={{ backgroundColor: BASE_COLORS[index % BASE_COLORS.length] }}></div>
              <div className="stat-info">
                <h3>{item.name}</h3>
                <p>{item.value} properties</p>
                <p className="stat-percentage">
                  {((item.value / totalProperties) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyPieChart;