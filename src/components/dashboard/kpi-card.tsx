'use client';

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface KPICardProps {
  title: string;
  value: string;
  trend: number[];
}

export function KPICard({ title, value, trend }: KPICardProps) {
  const data = {
    labels: trend.map((_, index) => index + 1),
    datasets: [
      {
        label: 'Trend',
        data: trend,
        fill: false,
        borderColor: '#4BC0C0',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-medium text-gray-500">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
      <div className="h-20 mt-4">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
