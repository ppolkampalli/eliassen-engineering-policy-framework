import { Paper, Typography } from '@mui/material';

interface StatTileProps {
  label: string;
  value: string;
  caption?: string;
}

/** A single glanceable number-plus-label card — the building block of every overview/dashboard stat row. */
export function StatTile({ label, value, caption }: StatTileProps): JSX.Element {
  return (
    <Paper variant="outlined" sx={{ padding: 2, minWidth: 160 }}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h5">{value}</Typography>
      {caption && (
        <Typography variant="caption" color="text.secondary" component="div">
          {caption}
        </Typography>
      )}
    </Paper>
  );
}
