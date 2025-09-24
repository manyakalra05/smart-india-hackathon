import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Pie, Doughnut, Radar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Default chart options
const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          family: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
          size: 12
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      cornerRadius: 8,
      padding: 12,
      displayColors: true,
      usePointStyle: true
    }
  },
  scales: {
    x: {
      grid: {
        display: true,
        color: 'rgba(0, 0, 0, 0.05)'
      },
      ticks: {
        font: {
          family: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
          size: 11
        },
        color: '#6b7280'
      }
    },
    y: {
      grid: {
        display: true,
        color: 'rgba(0, 0, 0, 0.05)'
      },
      ticks: {
        font: {
          family: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
          size: 11
        },
        color: '#6b7280'
      }
    }
  }
};

// Mac-inspired color palette
export const MAC_CHART_COLORS = {
  red: '#ef4444',
  yellow: '#f59e0b',
  green: '#10b981',
  blue: '#3b82f6',
  purple: '#8b5cf6',
  pink: '#ec4899',
  indigo: '#6366f1',
  gray: '#6b7280'
};

// Line Chart Component
export const LineChart = ({ 
  data, 
  options = {}, 
  height = 300, 
  className = '',
  gradient = false 
}) => {
  const mergedOptions = {
    ...defaultOptions,
    ...options
  };

  // Add gradient if requested
  if (gradient && data.datasets) {
    data.datasets = data.datasets.map((dataset, index) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const gradientFill = ctx.createLinearGradient(0, 0, 0, height);
      
      const color = dataset.borderColor || MAC_CHART_COLORS.blue;
      gradientFill.addColorStop(0, `${color}40`);
      gradientFill.addColorStop(1, `${color}00`);
      
      return {
        ...dataset,
        backgroundColor: gradientFill,
        fill: true
      };
    });
  }

  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <Line data={data} options={mergedOptions} />
    </div>
  );
};

// Bar Chart Component
export const BarChart = ({ 
  data, 
  options = {}, 
  height = 300, 
  className = '',
  horizontal = false 
}) => {
  const mergedOptions = {
    ...defaultOptions,
    indexAxis: horizontal ? 'y' : 'x',
    ...options
  };

  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <Bar data={data} options={mergedOptions} />
    </div>
  );
};

// Pie Chart Component
export const PieChart = ({ 
  data, 
  options = {}, 
  height = 300, 
  className = '' 
}) => {
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            family: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ${percentage}%`;
          }
        }
      }
    },
    ...options
  };

  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <Pie data={data} options={pieOptions} />
    </div>
  );
};

// Doughnut Chart Component
export const DoughnutChart = ({ 
  data, 
  options = {}, 
  height = 300, 
  className = '' 
}) => {
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            family: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ${percentage}%`;
          }
        }
      }
    },
    cutout: '60%',
    ...options
  };

  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <Doughnut data={data} options={doughnutOptions} />
    </div>
  );
};

// IAY Metric Chart Component
export const IAYChart = ({ 
  data, 
  height = 400, 
  className = '' 
}) => {
  const iayData = {
    labels: data.labels,
    datasets: [
      {
        label: 'IAY Score (%)',
        data: data.values,
        borderColor: MAC_CHART_COLORS.green,
        backgroundColor: `${MAC_CHART_COLORS.green}20`,
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: MAC_CHART_COLORS.green,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8
      }
    ]
  };

  const iayOptions = {
    ...defaultOptions,
    plugins: {
      ...defaultOptions.plugins,
      title: {
        display: true,
        text: 'Intervention Action Yield (IAY) - 30 Day Tracking',
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: 20
      }
    },
    scales: {
      ...defaultOptions.scales,
      y: {
        ...defaultOptions.scales.y,
        min: 0,
        max: 100,
        ticks: {
          ...defaultOptions.scales.y.ticks,
          callback: function(value) {
            return value + '%';
          }
        }
      }
    }
  };

  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <Line data={iayData} options={iayOptions} />
    </div>
  );
};

// Risk Distribution Chart Component
export const RiskDistributionChart = ({ 
  data, 
  height = 300, 
  className = '' 
}) => {
  const riskData = {
    labels: ['Low Risk', 'Medium Risk', 'High Risk'],
    datasets: [
      {
        data: [data.low, data.medium, data.high],
        backgroundColor: [
          MAC_CHART_COLORS.green,
          MAC_CHART_COLORS.yellow,
          MAC_CHART_COLORS.red
        ],
        borderWidth: 2,
        borderColor: '#fff',
        hoverBorderWidth: 3
      }
    ]
  };

  return (
    <DoughnutChart 
      data={riskData} 
      height={height} 
      className={className}
      options={{
        plugins: {
          title: {
            display: true,
            text: 'Student Risk Distribution',
            font: {
              size: 16,
              weight: 'bold'
            },
            padding: 20
          }
        }
      }}
    />
  );
};

// Multi-metric Dashboard Chart
export const MultiMetricChart = ({ 
  data, 
  height = 400, 
  className = '' 
}) => {
  const multiData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Predictions',
        type: 'line',
        data: data.predictions,
        borderColor: MAC_CHART_COLORS.blue,
        backgroundColor: `${MAC_CHART_COLORS.blue}20`,
        borderWidth: 2,
        fill: false,
        yAxisID: 'y'
      },
      {
        label: 'Accuracy (%)',
        type: 'line',
        data: data.accuracy,
        borderColor: MAC_CHART_COLORS.green,
        backgroundColor: `${MAC_CHART_COLORS.green}20`,
        borderWidth: 2,
        fill: false,
        yAxisID: 'y1'
      },
      {
        label: 'Interventions',
        type: 'bar',
        data: data.interventions,
        backgroundColor: MAC_CHART_COLORS.yellow,
        borderColor: MAC_CHART_COLORS.yellow,
        borderWidth: 1,
        yAxisID: 'y'
      }
    ]
  };

  const multiOptions = {
    ...defaultOptions,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      ...defaultOptions.plugins,
      title: {
        display: true,
        text: 'System Performance Overview',
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: 20
      }
    },
    scales: {
      x: defaultOptions.scales.x,
      y: {
        ...defaultOptions.scales.y,
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        ...defaultOptions.scales.y,
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          ...defaultOptions.scales.y.ticks,
          callback: function(value) {
            return value + '%';
          }
        }
      }
    }
  };

  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <Bar data={multiData} options={multiOptions} />
    </div>
  );
};

// Export default Chart wrapper
const Chart = {
  Line: LineChart,
  Bar: BarChart,
  Pie: PieChart,
  Doughnut: DoughnutChart,
  IAY: IAYChart,
  RiskDistribution: RiskDistributionChart,
  MultiMetric: MultiMetricChart,
  COLORS: MAC_CHART_COLORS
};

export default Chart;