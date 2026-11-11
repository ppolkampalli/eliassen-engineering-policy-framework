import { StatTile } from './stat-tile';

interface TokenCostStatTileProps {
  label: string;
  value: string;
}

export function TokenCostStatTile({ label, value }: TokenCostStatTileProps): JSX.Element {
  return <StatTile label={label} value={value} />;
}
