import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import dayjs from "dayjs";

function Training() {
  const [trainings, setTrainings] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
    fetchTrainings();
  }, []);

  const [columnDefs] = useState([
    {
      field: "date",
      sortable: true,
      filter: true,
      cellRenderer: (params) => dayjs(params.value).format("DD.MM.YYYY HH:mm"),
    },
    { field: "duration", sortable: true, filter: true, valueFormatter: (params) => params.value + " minutes" },
    { field: "activity", sortable: true, filter: true },
    {
      field: "customerName",
      headerName: "Customer Name",
      sortable: true,
      filter: true,
    },
  ]);

  const fetchCustomers = () => {
    fetch("http://traineeapp.azurewebsites.net/api/customers")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error(
            "Error in fetch:",
            response.status,
            response.statusText
          );
          throw new Error("Failed to fetch");
        }
      })
      .then((data) => {
        const embeddedCustomers = data.content;
        if (embeddedCustomers) {
          setCustomers(embeddedCustomers);
        } else {
          console.error(
            "API response does not contain customer data as expected."
          );
        }
      })
      .catch((err) => console.error(err));
  };

  const getTrainings = (customerId) => {
    const customer = customers.find((c) => c.customerId === customerId);
    return customer ? `${customer.firstname} ${customer.lastname}` : undefined;
  };
  

  const fetchTrainings = () => {
    fetch("http://traineeapp.azurewebsites.net/api/trainings")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error(
            "Error in fetch:",
            response.status,
            response.statusText
          );
          throw new Error("Failed to fetch");
        }
      })
      .then((data) => {
        const embeddedTrainings = data.content;
        if (embeddedTrainings) {
          const enrichedTrainings = embeddedTrainings.map((training) => {
            return {
              ...training,
              customerName: getTrainings(training.customerId),
            };
          });
          setTrainings(enrichedTrainings);
        } else {
          console.error(
            "API response does not contain training data as expected."
          );
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
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
