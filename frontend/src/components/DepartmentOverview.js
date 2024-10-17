import React from 'react';
import { useParams } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';

const DepartmentOverview = ({ scholars }) => {
  const { name } = useParams();
  const departmentScholars = scholars.filter(scholar => scholar.department === name);

  if (departmentScholars.length === 0) {
    return <div>No scholars found in this department.</div>;
  }

  const departmentData = {
    labels: departmentScholars.map(scholar => scholar.name),
    datasets: [
      {
        label: 'Total Research Work',
        data: departmentScholars.map(scholar => 
          scholar.researchWorks.articles + 
          scholar.researchWorks.journals + 
          scholar.researchWorks.bookChapters + 
          scholar.researchWorks.conferences + 
          scholar.researchWorks.workshops
        ),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="mt-4">
      <h2 className="text-center">{name} Department Overview</h2>
      <Bar
        data={departmentData}
        options={{
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }}
      />
    </div>
  );
};

export default DepartmentOverview;