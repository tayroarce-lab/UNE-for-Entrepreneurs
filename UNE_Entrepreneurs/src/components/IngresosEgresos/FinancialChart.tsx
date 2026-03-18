import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface FinancialChartProps {
  filter: 'Ingresos' | 'Egresos' | 'Neto';
}

const FinancialChart: React.FC<FinancialChartProps> = ({ filter }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1f2937',
        padding: 12,
        titleFont: { size: 14, weight: 'bold' as const },
        bodyFont: { size: 13 },
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      y: {
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.03)',
        },
        ticks: {
          callback: (value: any) => '₡' + value.toLocaleString(),
          font: { size: 11 },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: { size: 11 },
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
  };

  const labels = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN'];

  const dataMap = {
    Ingresos: [3000000, 3500000, 3200000, 4000000, 3800000, 4250000],
    Egresos: [1500000, 1800000, 1600000, 2000000, 1900000, 1890000],
    Neto: [1500000, 1700000, 1600000, 2000000, 1900000, 2360000],
  };

  const colorMap = {
    Ingresos: {
      stroke: '#8b2d2d',
      fill: 'rgba(139, 45, 45, 0.05)',
    },
    Egresos: {
      stroke: '#006eb5',
      fill: 'rgba(0, 110, 181, 0.05)',
    },
    Neto: {
      stroke: '#10b981',
      fill: 'rgba(16, 185, 129, 0.05)',
    },
  };

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: filter,
        data: dataMap[filter],
        borderColor: colorMap[filter].stroke,
        backgroundColor: colorMap[filter].fill,
        borderWidth: 3,
        pointBackgroundColor: colorMap[filter].stroke,
        pointBorderColor: '#fff',
        pointHoverRadius: 6,
        pointRadius: 4,
      },
    ],
  };

  return (
    <div style={{ height: '350px', width: '100%' }}>
      <Line options={options} data={data} />
    </div>
  );
};

export default FinancialChart;
