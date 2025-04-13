import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { CardContent } from "./card";
import { type ChartConfig, ChartContainer } from "./chart";
import { useEffect, useState } from "react";
import axios from "axios";

const chartConfig = {
  groups: {
    label: "Groups",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;
type RadialChartProps = {
  item: any;
};

export const RadialChart: React.FC<RadialChartProps> = ({ item }) => {
  const [count, setCount] = useState(0);
  const chartData = [
    {
      name: item,
      visitors: count,
      fill: "var(--color-safari)",
    },
  ];

  const maxCount = 100;
  const dynamicAngle = Math.min((count / maxCount) * 360, 360);
  useEffect(() => {
    const handleData = async () => {
      if (item === "teacher") {
        const where = encodeURIComponent(
          JSON.stringify({ roles: { has: "Teacher" } })
        );
        const response = await axios.get(
          `http://localhost:3000/user?where=${where}&orderBy=%7B%7D&skip=0&take=100000`
        );
        setCount(response.data.length);
      } else {
        const response = await axios.get(
          `http://localhost:3000/${item}?where=%7B%7D&orderBy=%7B%7D&skip=0&take=100000`
        );
        console.log(response.data);
        setCount(response.data.length);
      }
    };
    handleData();
  }, [item]);

  const getLabel = (key: string) => {
    const map: Record<string, string> = {
      group: "Groups",
      user: "Users",
      subject: "Subjects",
      teacher: "Teachers",
    };
    return map[key] || key;
  };
  return (
    <CardContent className="pb-0">
      <ChartContainer
        config={chartConfig}
        style={{ width: 250, height: 250 }}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <RadialBarChart
          data={chartData}
          startAngle={0}
          endAngle={dynamicAngle}
          innerRadius={80}
          outerRadius={110}
        >
          <PolarGrid
            gridType="circle"
            radialLines={false}
            stroke="none"
            className="first:fill-muted last:fill-background"
            polarRadius={[86, 74]}
          />
          <RadialBar dataKey="visitors" background cornerRadius={10} />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-4xl font-bold font-k2d"
                      >
                        {chartData[0]?.visitors}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground font-k2d"
                      >
                        {getLabel(item)}
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </PolarRadiusAxis>
        </RadialBarChart>
      </ChartContainer>
    </CardContent>
  );
};
