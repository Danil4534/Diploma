import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const chartOptions = {
  series: [
    {
      name: "Developer Edition",
      data: [1500, 1418, 1456, 1526, 1356, 1256],
      color: "#1A56DB",
    },
    {
      name: "Designer Edition",
      data: [643, 413, 765, 412, 1423, 1731],
      color: "#7E3BF2",
    },
  ],
  chart: {
    height: "100%",
    maxWidth: "100%",
    type: "area",
    fontFamily: "Inter, sans-serif",
    dropShadow: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    enabled: true,
    x: {
      show: false,
    },
  },
  legend: {
    show: false,
  },
  fill: {
    type: "gradient",
    gradient: {
      opacityFrom: 0.55,
      opacityTo: 0,
      shade: "#1C64F2",
      gradientToColors: ["#1C64F2"],
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 6,
  },
  grid: {
    show: false,
    strokeDashArray: 4,
    padding: {
      left: 2,
      right: 2,
      top: 0,
    },
  },
  xaxis: {
    categories: [
      "01 February",
      "02 February",
      "03 February",
      "04 February",
      "05 February",
      "06 February",
      "07 February",
    ],
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
    labels: {
      formatter: function (value: string) {
        return "$" + value;
      },
    },
  },
};

const InfoPopover = ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) => (
  <div
    data-popover
    id={id}
    role="tooltip"
    className="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-xs opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
  >
    <div className="p-3 space-y-2">
      <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
      {children}
      <a
        href="#"
        className="flex items-center font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline"
      >
        Read more{" "}
        <svg
          className="w-2 h-2 ms-1.5 rtl:rotate-180"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
      </a>
    </div>
    <div data-popper-arrow></div>
  </div>
);

const MetricCard = ({
  label,
  value,
  infoId,
  popoverTitle,
}: {
  label: string;
  value: string;
  infoId: string;
  popoverTitle: string;
}) => (
  <div>
    <h3 className="inline-flex items-center text-gray-500 dark:text-gray-400 leading-none font-normal mb-2">
      {label}
      <svg
        data-popover-target={infoId}
        data-popover-placement="bottom"
        className="w-3 h-3 text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <InfoPopover id={infoId} title={popoverTitle}>
        <p>
          Report helps navigate cumulative growth of community activities.
          Ideally, the chart should have a growing trend.
        </p>
        <h3 className="font-semibold text-gray-900 dark:text-white">
          Calculation
        </h3>
        <p>
          For each date bucket, the all-time volume of activities is calculated.
          This means it contains all up to period n, plus new.
        </p>
      </InfoPopover>
    </h3>
    <p className="text-gray-900 dark:text-white text-2xl leading-none font-bold">
      {value}
    </p>
  </div>
);
type TeacherGroupStatisticsProps = {
  group: any;
  teachers: any;
};

const TeacherGroupStatistics: React.FC<TeacherGroupStatisticsProps> = ({
  group,
  teachers,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = new ApexCharts(chartRef.current, chartOptions);
    chart.render();

    return () => chart.destroy();
  }, []);

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-sm dark:bg-gray-800 p-1 md:p-6">
      <div className="flex justify-between mb-">
        <div className="grid gap-4 grid-cols-2">
          <MetricCard
            label="Groups"
            value={group.length}
            infoId="clicks-info"
            popoverTitle="Clicks growth - Incremental"
          />
          <MetricCard
            label="Teachers"
            value={teachers.length}
            infoId="cpc-info"
            popoverTitle="CPC growth - Incremental"
          />
        </div>
      </div>
      <div ref={chartRef} />
    </div>
  );
};

export default TeacherGroupStatistics;
