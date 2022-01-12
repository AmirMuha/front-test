import {FC} from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {Post} from "../../util/types"

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90,align:"center",headerAlign: "center" },
  {
    field: "title",
    headerName: "Title",
    align:"center",
    width: 150,headerAlign: "center"
  },
  {
    field: "content",
    headerName: "Content",align:"center",
    width: 150,headerAlign: "center"
  },
  {
    field: "created_at",
    headerName: "Created At",
    type: "date",
    width: 150,headerAlign: "center"
  },
  {
    field: "updated_at",
    headerName: "Updated At",
    type: "date",
    width: 150,headerAlign: "center"
  },
];


interface Props {
  data: Post[]
}

const ThePostsTable:FC<Props> = ({data}) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={data}
        rowsPerPageOptions={[5]}
        pageSize={5}
        disableSelectionOnClick
      />
    </div>
  );
}
export default ThePostsTable
