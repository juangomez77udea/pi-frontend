import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Estadisticas = () => {
  const [dataType, setDataType] = useState('mortality');
  const [timeFrame, setTimeFrame] = useState('week');
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [dataType, timeFrame]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/fg-app/registros/${dataType}/${timeFrame}`);
      setChartData(processData(response.data));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const processData = (rawData) => {
    return {
      labels: rawData.labels,
      datasets: [
        {
          label: dataType === 'mortality' ? 'Mortalidad' : 'Consumo de Alimentos',
          data: rawData.values,
          borderColor: dataType === 'mortality' ? 'rgb(255, 99, 132)' : 'rgb(75, 192, 192)',
          backgroundColor: dataType === 'mortality' ? 'rgba(255, 99, 132, 0.5)' : 'rgba(75, 192, 192, 0.5)',
        },
      ],
    };
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${dataType === 'mortality' ? 'Mortalidad' : 'Consumo de Alimentos'} - ${timeFrame === 'week' ? 'Última Semana' : 'Este Mes'}`,
      },
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Estadísticas</h2>
      
      <div className="mb-6 flex justify-center space-x-4">
        <select 
          value={dataType} 
          onChange={(e) => setDataType(e.target.value)}
          className="p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="mortality">Mortalidad</option>
          <option value="feedingAmount">Consumo de Alimentos</option>
        </select>
        
        <select 
          value={timeFrame} 
          onChange={(e) => setTimeFrame(e.target.value)}
          className="p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="week">Última Semana</option>
          <option value="month">Este Mes</option>
        </select>
      </div>

      {chartData ? (
        <div className="aspect-w-16 aspect-h-9">
          <Line options={options} data={chartData} />
        </div>
      ) : (
        <p className="text-center text-gray-600">Cargando datos...</p>
      )}
    </div>
  );
};

export default Estadisticas;