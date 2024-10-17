import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registering Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OverallOverview = ({ departmentData }) => {
  const data = {
    labels: departmentData.map(department => department.name),
    datasets: [
      {
        label: 'Articles',
        data: departmentData.map(department => department.researchWorks.articles),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Journals',
        data: departmentData.map(department => department.researchWorks.journals),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
      {
        label: 'Book Chapters',
        data: departmentData.map(department => department.researchWorks.bookChapters),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
      {
        label: 'Conferences',
        data: departmentData.map(department => department.researchWorks.conferences),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'Workshops',
        data: departmentData.map(department => department.researchWorks.workshops),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  return (
    <div className="mt-4">
      <h2>Overall Research Work Overview</h2>
      <Bar
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const label = context.dataset.label || '';
                  if (label) {
                    return `${label}: ${context.raw}`;
                  }
                  return '';
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default OverallOverview;