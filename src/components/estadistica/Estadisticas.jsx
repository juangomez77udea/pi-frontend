import React from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);



const Estadisticas = () => {

  const data = {
    labels: ['01', '02', '03', '04', '05', '06', '07','08', '09', '10', '11', '12','13', '14', '15',
       '16', '17','18', '19', '20', '21', '22','23', '24', '25', '26', '27','28', '29', '30', '31'],
    datasets: [{
      label: 'Weekdays',
      data: [90, 182, 182, 127, 180, 79, 92, 130, 178, 164, 76, 188, 148, 197, 142, 78, 75, 129, 88, 115, 148, 105, 91, 169, 189, 179, 102, 95, 191, 165],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.1)',
      pointBackgroundColor: 'rgb(75, 192, 192)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(75, 192, 192)',
      tension: 0.5,
      fill: true,
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weekday Activity Chart',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Weekday Activity</h2>
      <div style={{ aspectRatio: '16/9', width: '100%' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  )
}

export default Estadisticas
