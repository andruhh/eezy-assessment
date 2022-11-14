import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TableCell,
  TableRow,
} from "@mui/material";
import { DogModel } from "../../models/DogModel";

interface IProps {
  breeds: string[];
  row: DogModel;
  subBreeds: string[];
  handleChange: (
    field: string,
    event: SelectChangeEvent<string>,
    id: number
  ) => void;
  handleRemove: (dog: DogModel) => void;
}

function DogListItem(props: IProps) {
  const renderBreedSelect = () => {
    const breeds = Object.keys(props?.breeds);
    return (
      <Select
        displayEmpty
        value={props.row.breed}
        onChange={(e) => props.handleChange("breed", e, props.row.id)}
        className="select"
        data-testid="breed-select"
      >
        <MenuItem hidden disabled value="" key="empty-select">
          Select a Breed:
        </MenuItem>
        {breeds?.map((breed: string, idx: number) => (
          <MenuItem value={breed} key={idx}>
            {breed}
          </MenuItem>
        ))}
      </Select>
    );
  };

  const renderSubBreedSelect = () => {
    const subBreeds = props?.subBreeds;

    if (!subBreeds || subBreeds?.length === 0) {
      return <label data-testid="no-sub-breeds">No Sub Breeds Available</label>;
    }

    return (
      <Select
        displayEmpty
        value={props.row.subBreed}
        onChange={(e) => props.handleChange("subBreed", e, props.row.id)}
        className="select"
        data-testid="breed-select"
      >
        <MenuItem value="" hidden disabled>
          Please select sub breed
        </MenuItem>
        {subBreeds?.map((subBreed: string, idx: number) => {
          return (
            <MenuItem value={subBreed} key={idx}>
              {subBreed}
            </MenuItem>
          );
        })}
      </Select>
    );
  };

  return (
    <TableRow
      data-testid="dog-row"
      key={`dog-row-${props?.row?.id}`}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell>{props.row.id}</TableCell>
      <TableCell component="th" scope="row">
        {renderBreedSelect()}
      </TableCell>
      <TableCell>{renderSubBreedSelect()}</TableCell>
      <TableCell>{props.row.imageCount}</TableCell>
      <TableCell>
        <Button
          variant="outlined"
          color="error"
          onClick={() => props.handleRemove(props.row)}
        >
          Remove
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default DogListItem;
