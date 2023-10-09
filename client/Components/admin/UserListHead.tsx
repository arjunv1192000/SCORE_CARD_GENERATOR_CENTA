import React from 'react';
import { Box, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

interface HeadCell {
  id: string;
  label: string;
  alignRight?: boolean;
}

interface UserListHeadProps {
  order: 'asc' | 'desc';
  orderBy: string;
  rowCount: number;
  headLabel: HeadCell[];
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function UserListHead({
  order,
  orderBy,
  headLabel,
  
}: UserListHeadProps) {
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
  
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
         
        </TableCell>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default UserListHead;
