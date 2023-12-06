import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import dayjs from "dayjs";
import AddTraining from "./AddTraining";

function Training() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const columnDefs = [
    {
      field: "date",
      sortable: true,
      filter: true,
      cellRenderer: (params) => dayjs(params.value).format("DD.MM.YYYY HH:mm"),
    },
    { field: "duration", sortable: true, filter: true, valueFormatter: (params) => params.value + " minutes" },
    { field: "activity", sortable: true, filter: true },
    { field: "customer.firstname", headerName: "Customer Name", sortable: true, filter: true }
  ];

  const fetchTrainings = () => {
    fetch('http://traineeapp.azurewebsites.net/gettrainings')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.error("Error in fetch:", response.status, response.statusText);
          throw new Error("Failed to fetch");
        }
      })
      .then(data => {
        const modifiedData = data.map(item => ({
          ...item
        }));
        setTrainings(modifiedData);
      })
      .catch(err => console.error(err));
  };


  return (
    <>
          <AddTraining fetchTrainings
          ={fetchTrainings} />
      <div className="ag-theme-material" style={{ width: "100%", height: 600 }}>
        <AgGridReact
          rowData={trainings}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoPageSize={true}
        />
      </div>
    </>
  );
}

export default Training;
