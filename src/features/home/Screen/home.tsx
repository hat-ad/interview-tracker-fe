import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { TableRow } from "../../../utils/interface";

import {
  deleteServiceWithToken,
  getServiceWithToken,
  postServiceWithToken,
  putServiceWithToken,
} from "../../../services";
import { toast } from "react-toastify";
import { logout } from "../../auth/slice/auth.slice";
import TableRowComponent from "../Components/tableRow";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const [entries, setEntries] = useState<TableRow[]>([]);

  useEffect(() => {
    getEntries();
  }, []);

  const getEntries = async () => {
    const { status, data, message } = await getServiceWithToken("table");
    if (status) {
      setEntries(data);
    } else {
      toast.error(message);
    }
  };

  const updateEntry = async (
    id: string,
    fieldName: string,
    fieldValue: unknown
  ) => {
    setEntries((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, [fieldName]: fieldValue } : row
      )
    );
    const payload: Record<string, unknown> = { [fieldName]: fieldValue };
    const { status, message } = await putServiceWithToken(
      `table/${id}`,
      payload
    );

    if (!status) {
      toast.error(message);
    }
  };

  const handleAddRow = async () => {
    const newRow: Record<string, unknown> = {
      name: "",
      rating: 0,
      feedback: "",
      status: "PENDING",
    };
    const { status, data, message } = await postServiceWithToken(
      "table",
      newRow
    );
    if (status) {
      setEntries((prevData) => [...prevData, data]);
    } else {
      toast.error(message);
    }
  };

  const handleDeleteRow = async (row: TableRow) => {
    const { status, message } = await deleteServiceWithToken(`table/${row.id}`);
    if (status) {
      setEntries((prevData) => prevData.filter((r) => r.id !== row.id));
    } else {
      toast.error(message);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <button onClick={handleAddRow}>Add Row</button>
      <button onClick={handleLogout}>Logout</button>

      <table className="editable-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Interview Feedback</th>
            <th>Interview Status</th>
            <th>Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((row) => (
            <TableRowComponent
              key={row.id}
              row={row}
              onUpdate={updateEntry}
              onDelete={handleDeleteRow}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
