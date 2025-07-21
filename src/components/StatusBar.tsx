import { memo } from "react";
import { Cell, Pie, PieChart } from "recharts";

interface StatusBarProps {
  chartData: { name: string; value: number; color: string }[];
  width: number;
  height: number;
  dataKey: string;
  stroke: string;
  innerRadius: number;
  outerRadius: number;
}
export const StatusBar = memo(function StatusBar({
  chartData,
  width,
  height,
  dataKey,
  stroke,
  innerRadius,
  outerRadius,
}: StatusBarProps) {
  return (
    <PieChart width={width} height={height}>
      <Pie
        data={chartData}
        dataKey={dataKey}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        stroke={stroke}
      >
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
    </PieChart>
  );
})
