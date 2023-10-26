import React from "react";
import Select from "react-select";
import { TableRow } from "../../../utils/interface";
import { options } from "../../../utils/config";
import StarRating from "../../../Components/starRating";

const TableRowComponent: React.FC<{
  row: TableRow;
  onUpdate: (id: string, fieldName: string, fieldValue: unknown) => void;
  onDelete: (row: TableRow) => void;
}> = ({ row, onUpdate, onDelete }) => {
  const handleFieldChange = async (fieldName: string, fieldValue: unknown) => {
    onUpdate(row.id, fieldName, fieldValue);
  };

  return (
    <tr key={row.id}>
      <td>
        <input
          type="text"
          value={row.name}
          onChange={(e) => handleFieldChange("name", e.target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          value={row.feedback}
          onChange={(e) => handleFieldChange("feedback", e.target.value)}
        />
      </td>
      <td>
        <Select
          className="status-select"
          options={options}
          value={options.find((option) => option.value === row.status)}
          onChange={(selectedOption) =>
            handleFieldChange("status", selectedOption?.value)
          }
        />
      </td>
      <td>
        <StarRating
          rating={row.rating}
          onRatingChange={(newRating: number) =>
            handleFieldChange("rating", newRating)
          }
        />
      </td>
      <td>
        <button onClick={() => onDelete(row)}>Delete Row</button>
      </td>
    </tr>
  );
};

export default TableRowComponent;
