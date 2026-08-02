import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const data = [
  { date: "Aug 1", visitors: 120 },
  { date: "Aug 2", visitors: 132 },
  { date: "Aug 3", visitors: 101 },
  { date: "Aug 4", visitors: 164 },
  { date: "Aug 5", visitors: 200 },
  { date: "Aug 6", visitors: 180 },
  { date: "Aug 7", visitors: 220 },
];

export function VisitorsChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: -20,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-primary)"
                stopOpacity={0.3}
              />
              <stop
                offset="95%"
                stopColor="var(--color-primary)"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-popover)",
              borderColor: "var(--color-border)",
              color: "var(--color-popover-foreground)",
              borderRadius: "var(--radius)",
            }}
            itemStyle={{ color: "var(--color-primary)" }}
          />
          <Area
            type="monotone"
            dataKey="visitors"
            stroke="var(--color-primary)"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorVisitors)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
