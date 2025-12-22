import { useRef, useState, useEffect, use } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import { generateScenarioChartData } from "../Query";
import {
  chart_div_height,
  chart_types_segmented_control,
  secondary_color,
} from "../uniqueValues";
import "@esri/calcite-components/dist/components/calcite-button";
import * as XLSX from "xlsx";
import { MyContext } from "../App";

// Dispose function
function maybeDisposeRoot(divId: any) {
  am5.array.each(am5.registry.rootElements, function (root) {
    if (root.dom.id === divId) {
      root.dispose();
    }
  });
}

// https://www.amcharts.com/docs/v5/tutorials/dynamically-switching-data-set-for-an-xychart/
export default function ChartFutureDisplacement() {
  const { charttype, clickedexportexcel, selectedareaforscenario } =
    use(MyContext);
  const lineSeriesRef = useRef<unknown | any | undefined>({});
  const xAxisRef = useRef<unknown | any | undefined>({});
  const yAxisRef = useRef<unknown | any | undefined>({});
  const chartRef = useRef<unknown | any | undefined>({});
  const [chartData, setChartData] = useState([]);
  const [exportExcel, setExportExcel] = useState<any>(false);

  const chartID = "lot-progress";
  useEffect(() => {
    generateScenarioChartData(selectedareaforscenario, charttype).then(
      (response: any) => {
        setChartData(response);
      }
    );
  }, [selectedareaforscenario, charttype]);

  // export to excel
  useEffect(() => {
    if (chartData.length > 0) {
      // Remove numerical date values
      const arr1 = chartData.map(
        ({
          Date,
          observed,
          statusQuo,
          scenario2,
          scenario3,
          scenario4,
          scenario5,
        }) => ({
          Date,
          observed,
          statusQuo,
          scenario2,
          scenario3,
          scenario4,
          scenario5,
        })
      );
      const worksheet = XLSX.utils.json_to_sheet(arr1);
      const workbook = XLSX.utils.book_new();
      const file_name = "Scenario_" + selectedareaforscenario + ".xlsx";
      XLSX.utils.book_append_sheet(workbook, worksheet, "Scenario");
      XLSX.writeFile(workbook, file_name);
    }
  }, [clickedexportexcel]);

  useEffect(() => {
    maybeDisposeRoot(chartID);
    var root = am5.Root.new(chartID);
    root.container.children.clear();
    root._logo?.dispose();

    // Set themesf
    const myTheme = am5.Theme.new(root);
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root),
      myTheme,
      am5themes_Responsive.new(root),
    ]);

    // Move minor label a bit down
    myTheme.rule("AxisLabel", ["minor"]).setAll({
      dy: 1,
    });

    // Tweak minor grid opacity
    myTheme.rule("Grid", ["minor"]).setAll({
      strokeOpacity: 0.08,
    });

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0,
        // layout: root.horizontalLayout, // this divids up columns into two spaces.
        // layout: root.verticalLayout,
      })
    );
    chartRef.current = chart;

    // Chart title
    // let label = chart.children.unshift(
    //   am5.Label.new(root, {
    //     text: 'Displacement (mm)',
    //     fontSize: 14,
    //     // fontWeight: 'bold',
    //     textAlign: 'center',
    //     fill: am5.color('#ffffff'),
    //     x: am5.percent(50),
    //     centerX: am5.percent(50),
    //     paddingTop: -5,
    //     paddingBottom: 0,
    //   }),
    // );

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "zoomX",
      })
    );
    cursor.lineY.set("visible", false);

    // Create axes //
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0,
        baseInterval: {
          timeUnit: "day",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: false,
          minGridDistance: 100,
          minorLabelsEnabled: false,
          strokeOpacity: 1,
          strokeWidth: 2,
          stroke: am5.color(secondary_color),
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    // Grid line inside the chart
    // Hide grid lines inside the chart
    // yAxis.get('renderer').grid.template.set('forceHidden', true);
    xAxis.get("renderer").grid.template.setAll({
      strokeWidth: 0.5,
      stroke: am5.color(secondary_color),
    });

    xAxis.get("renderer").labels.template.setAll({
      oversizedBehavior: "truncate",
      maxWidth: 150,
      fill: am5.color(secondary_color),
    });

    xAxis.set("minorDateFormats", {
      day: "dd",
      month: "MM",
    });

    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          minorGridEnabled: false,
          minGridDistance: 40,
          minorLabelsEnabled: false,
          strokeOpacity: 1,
          strokeWidth: 2,
          stroke: am5.color(secondary_color),
        }),
      })
    );

    // Grid line inside the chart
    // Hide grid lines inside the chart
    // yAxis.get('renderer').grid.template.set('forceHidden', true);
    yAxis.get("renderer").grid.template.setAll({
      strokeWidth: 0.5,
      stroke: am5.color(secondary_color),
    });

    yAxis.get("renderer").labels.template.setAll({
      oversizedBehavior: "truncate",
      maxWidth: 150,
      fill: am5.color(secondary_color),
    });

    yAxis.children.unshift(
      am5.Label.new(root, {
        rotation: -90,
        text: "[fontSize: 12.5px]Cumulative Subsidence (mm)[/]",
        fill: am5.color(secondary_color),
        y: am5.p50,
        centerX: am5.p50,
      })
    );

    xAxisRef.current = xAxis;
    yAxisRef.current = yAxis;

    // -------------- Add series -----------------
    // 1. Status Quo (scenario1, value1) Line
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Status Quo",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "statusQuo",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );
    lineSeriesRef.current = series;
    // Main line
    series.strokes.template.setAll({
      strokeWidth: 2,
    });

    series.data.setAll(chartData);

    // 2. Scenario 2 (simulation) Line
    if (charttype === chart_types_segmented_control[2]) {
      var series_scenario2 = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: "Scenario 2",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "scenario2",
          valueXField: "date",
          tooltip: am5.Tooltip.new(root, {
            labelText: "{valueY}",
          }),
          stroke: am5.color("#ffc800"),
        })
      );
      //   lineSeriesRef.current = series_scenario2;
      // Main line
      series_scenario2.strokes.template.setAll({
        strokeWidth: 2,
      });

      series_scenario2.data.setAll(chartData);
    }

    // Observation points
    var p_series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Observed",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "observed",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );

    p_series.strokes.template.setAll({
      strokeOpacity: 0,
    });

    // Actual bullet
    p_series.bullets.push(function () {
      var bulletCircle = am5.Circle.new(root, {
        radius: 5,
        fillOpacity: 0,
        fill: am5.color("#ff0000"), //p_series.get('fill'),
        stroke: am5.color("#ff0000"),
        strokeWidth: 1,
      });
      return am5.Bullet.new(root, {
        sprite: bulletCircle,
      });
    });

    // add data to series
    p_series.data.setAll(chartData);

    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    // chart.set("scrollbarX", am5.Scrollbar.new(root, {
    //   orientation: "horizontal"
    // }));

    // Legend -------------------------------------;
    let legend = chart.children.push(
      am5.Legend.new(root, {
        // centerX: am5.percent(50),
        x: am5.percent(70),
        layout: root.horizontalLayout,
      })
    );
    legend.data.setAll(chart.series.values);

    legend.labels.template.setAll({
      oversizedBehavior: "truncate",
      fill: am5.color(secondary_color),
    });

    legend.itemContainers.template.setAll({
      // set space between legend items
      paddingTop: 3,
      paddingBottom: 1,
      paddingLeft: -30,
    });

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    p_series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [chartID, chartData]);

  return (
    <>
      <div
        id="chartAlignDiv"
        style={{
          marginRight: "10px",
          marginLeft: "10px",
        }}
      >
        {/* Display a selected admin boundary name only when Scenario charts are chosen. */}
        <div
          style={{
            display: "flex",
            float: "right",
            marginTop: "-30px",
          }}
        >
          {charttype !== chart_types_segmented_control[0] && (
            <div
              style={{
                marginRight: "11vw",
              }}
            >
              Admin. Boundary:{" "}
              <b style={{ color: "#e8ff00ff" }}>{selectedareaforscenario}</b>
            </div>
          )}
        </div>

        {/* Add label when the chart is empty */}
        {chartData.length <= 1 && (
          <span
            style={{
              color: "white",
              position: "absolute",
              zIndex: "2",
              top: "40%",
              left: "10%",
            }}
          >
            Click an admin. boundary (Kabupaten) polygon to show a simulated
            groundwater displacement chart.
          </span>
        )}
        <div
          id={chartID}
          style={{
            height: chart_div_height, // default = 32vh
            width: "100%",
            backgroundColor: "#2b2b2b",
            color: "white",
            bottom: 50,
            marginLeft: "0.3vw",
            marginRight: "auto",
          }}
        ></div>
      </div>
    </>
  );
}
