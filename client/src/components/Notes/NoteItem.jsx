import React, { useContext, useState, useEffect } from 'react';
import noteContext from './Context/NoteContext';
import "./Noteitem.css";
import Header from '../../pages/homepage/Header';
import Chart from 'chart.js/auto'; // Import Chart.js

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const [notes, setNotes] = useState([]);
  const [searchUsername, setSearchUsername] = useState('');
  const [searchAccidentReason, setSearchAccidentReason] = useState('');
  const host = 'http://localhost:8080';
  const [pieChart, setPieChart] = useState(null); // State to store the pie chart instance
  const [barChart, setBarChart] = useState(null); // State to store the bar chart instance
  const [lineChart, setLineChart] = useState(null); // State to store the line chart instance

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
        });
        const json = await response.json();
        setNotes(json);
        // Calculate and render the charts
        renderCharts(json);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  // Function to calculate and render the charts
  const renderCharts = (data) => {
    // Pie Chart
    const accidentReasons = data.map(note => note.accidentreason);
    const uniqueReasons = Array.from(new Set(accidentReasons));
    const counts = uniqueReasons.map(reason => {
      return accidentReasons.filter(r => r === reason).length;
    });

    const pieCtx = document.getElementById('pie-chart');
    if (pieCtx && !pieChart) {
      const newPieChart = new Chart(pieCtx, {
        type: 'pie',
        data: {
          labels: uniqueReasons,
          datasets: [{
            label: 'Accident Reasons',
            data: counts,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true
        }
      });
      setPieChart(newPieChart);
    } else if (pieChart) {
      pieChart.data.labels = uniqueReasons;
      pieChart.data.datasets[0].data = counts;
      pieChart.update();
    }

    // Bar Chart
    const barCtx = document.getElementById('bar-chart');
    if (barCtx && !barChart) {
      const newBarChart = new Chart(barCtx, {
        type: 'bar',
        data: {
          labels: uniqueReasons,
          datasets: [{
            label: 'Accident Reasons',
            data: counts,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      setBarChart(newBarChart);
    } else if (barChart) {
      barChart.data.labels = uniqueReasons;
      barChart.data.datasets[0].data = counts;
      barChart.update();
    }

    // Line Chart
    // Assuming you have another field for date in the note object
    const dateLabels = data.map(note => new Date(note.date).toLocaleDateString());
    const dateCounts = dateLabels.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});

    const lineCtx = document.getElementById('line-chart');
    if (lineCtx && !lineChart) {
      const newLineChart = new Chart(lineCtx, {
        type: 'line',
        data: {
          labels: Object.keys(dateCounts),
          datasets: [{
            label: 'Accidents by Date',
            data: Object.values(dateCounts),
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      setLineChart(newLineChart);
    } else if (lineChart) {
      lineChart.data.labels = Object.keys(dateCounts);
      lineChart.data.datasets[0].data = Object.values(dateCounts);
      lineChart.update();
    }
  };

  // Filtering function...
  const filteredNotes = notes.filter(note => {
    return (
      note.username.toLowerCase().includes(searchUsername.toLowerCase()) &&
      note.accidentreason.toLowerCase().includes(searchAccidentReason.toLowerCase())
    );
  });
  
  return (
    <>
      <Header />
      <div className='gettable'>
        <div className="search-container">
          {/* Search inputs */}
         
        </div>
        <canvas id="pie-chart" width="200" height="200"></canvas>
        <canvas id="bar-chart" width="200" height="200"></canvas>
        <canvas id="line-chart" width="200" height="200"></canvas>
        <input
            type="text"
            placeholder="Search by username..."
            value={searchUsername}
            onChange={(e) => setSearchUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by accident reason..."
            value={searchAccidentReason}
            onChange={(e) => setSearchAccidentReason(e.target.value)}
          />
        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Accident Reason</th>
              <th>Feedback</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through filteredNotes and render each note */}
            {filteredNotes.map((note, index) => (
              <tr key={index}>
                <td>{note.username}</td>
                <td>{note.accidentreason}</td>
                <td>{note.feedback}</td>
                <td>{note.phone}</td>
                {/* Assuming date is stored in note.date, replace it with your actual date field */}
                <td>{new Date(note.date).toLocaleDateString()}</td>
                <td>
                  <i
                    className="fa-solid fa-pen-to-square mx-2"
                    onClick={() => {
                      updateNote(note);
                    }}
                  >
                    Edit
                  </i>
                </td>
                <td>
                  <i
                    className="fa-solid fa-trash mx-2"
                    onClick={() => {
                      deleteNote(note._id);
                      props.showAlert('Deleted Successfully', 'success');
                    }}
                  >
                    Delete
                  </i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Noteitem;
