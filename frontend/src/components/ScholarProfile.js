import React from 'react';
import { useParams } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ScholarProfile = ({ scholars }) => {
  const { orcid } = useParams();
  const scholar = scholars.find((scholar) => scholar.orcid.toString() === orcid);

  if (!scholar) {
    return <div>Scholar not found</div>;
  }

  const data = {
    labels: ['Articles', 'Journals', 'Book Chapters', 'Conferences', 'Workshops'],
    datasets: [
      {
        label: `${scholar.name}'s Research Work`,
        data: [
          scholar.researchWorks.articles,
          scholar.researchWorks.journals,
          scholar.researchWorks.bookChapters,
          scholar.researchWorks.conferences,
          scholar.researchWorks.workshops,
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mt-4">
    <div className="card">
      <div className="card-header">
        <h2>{scholar.name}'s Profile</h2>
      </div>
      <div className="card-body">
        <p><strong>Department:</strong> {scholar.department}</p>
        <p><strong>ORCID ID:</strong> {scholar.orcid}</p>
        <p>
          <strong>Google Scholar Profile:</strong> 
          <a href={scholar.googleScholar} target="_blank" rel="noopener noreferrer"> View Google Scholar Profile</a>
        </p>
        <p>
          <strong>ScienceDirect ID:</strong>
          <a href={scholar.sciencedirect} target="_blank" rel="noopener noreferrer"> View ScienceDirect Profile</a>
        </p>
        <p>
          <strong>Scopus ID:</strong>
          <a href={scholar.scopus} target="_blank" rel="noopener noreferrer"> View Scopus Profile</a>
        </p>
      </div>
      <div className="card-footer">
        <h3>Research Work Overview</h3>
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
                ticks: {
                  callback: function (value) {
                    return value; 
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  </div>
  );
};

export default ScholarProfile;
