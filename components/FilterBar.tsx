import { Dispatch, SetStateAction } from "react";
import { ServerFilters } from "@/types/ServerFilters";
import { GameModes } from "@/types/GameModes";
import { Maps } from "@/types/Maps";
import { Regions } from "@/types/Regions";
import { MultiSelectItem } from "@/types/MultiSelectItem";
import FilterMultiSelect from "./FilterMultiSelect";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";

type Props = {
  filterText: string;
  onFilterTextChange: Dispatch<SetStateAction<string>>;
  serverFilters: ServerFilters;
  onMultiSelectChange: (event: SelectChangeEvent<string[]>) => void;
};

// Available items for each multiselect
const gameModeItems: MultiSelectItem[] = Object.entries(GameModes).map(
  ([key, value]) => ({
    key: key,
    value: value,
  })
);
const mapsItems: MultiSelectItem[] = Maps.map((item) => ({
  key: item,
  value: item,
}));
const regionsItems: MultiSelectItem[] = Object.entries(Regions).map(
  ([key]) => ({
    key: key,
    value: key.split("_")[0],
  })
);
const typesItems: MultiSelectItem[] = [
  { value: "Official", key: "true" },
  { value: "Community", key: "false" },
];

export default function FilterBar({
  filterText,
  onFilterTextChange,
  serverFilters,
  onMultiSelectChange,
}: Props) {
  return (
    <Stack direction="row" spacing={2}>
      <Box sx={{ width: "20%" }}>
        <TextField
          hiddenLabel
          type="text"
          name="searchName"
          size="small"
          placeholder="Search name... (slow)"
          variant="outlined"
          value={filterText}
          onChange={(e) => onFilterTextChange(e.target.value)}
        />
      </Box>
      <Box sx={{ width: "20%" }}>
        <FilterMultiSelect
          name="gameModes"
          placeholder="Game modes"
          renderValueText="mode(s)"
          items={gameModeItems}
          values={serverFilters.gameModes}
          onMultiSelectChange={onMultiSelectChange}
        />
      </Box>
      <Box sx={{ width: "20%" }}>
        <FilterMultiSelect
          name="maps"
          placeholder="Maps"
          renderValueText="maps(s)"
          items={mapsItems}
          values={serverFilters.maps}
          onMultiSelectChange={onMultiSelectChange}
        />
      </Box>
      <Box sx={{ width: "20%" }}>
        <FilterMultiSelect
          name="regions"
          placeholder="Regions"
          renderValueText="region(s)"
          items={regionsItems}
          values={serverFilters.regions}
          onMultiSelectChange={onMultiSelectChange}
        />
      </Box>
      <Box sx={{ width: "20%" }}>
        <FilterMultiSelect
          name="type"
          placeholder="Server type"
          renderValueText="type(s)"
          items={typesItems}
          values={serverFilters.type}
          onMultiSelectChange={onMultiSelectChange}
        />
      </Box>
    </Stack>
  );
}
