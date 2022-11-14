import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

interface IProps {
  columns: string[];
  data: any[];
  rowProps: any;
}

interface IState {
  hasData: boolean;
  columns: string[];
  data: any;
}

const SharedTable = (RowComponent: any, parentProps: IProps) => {
  return class extends React.Component<IProps, IState> {
    constructor(props: IProps) {
      super(props);
      this.state = {
        hasData: parentProps.data.length > 0,
        columns: parentProps?.columns ?? [],
        data: parentProps?.data ?? [],
      };
    }

    render() {
      const { columns, data } = this.state;
      return (
        <TableContainer component={Paper} sx={{ margin: "20px auto" }}>
          <Table
            sx={{ minWidth: 650 }}
            aria-label="simple table"
            data-testid="table"
          >
            <TableHead>
              <TableRow key="header">
                {columns.map((col, idx) => (
                  <TableCell key={col + idx}>{col}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody data-testid="table-body">
              {data.map((item: any, idx: number) => (
                <RowComponent key={idx} row={item} {...parentProps.rowProps} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
  };
};

export default SharedTable;
