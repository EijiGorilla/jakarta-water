import { useState, use } from "react";
import "../index.css";
import "../App.css";
import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/calcite/calcite.css";
import { CalcitePanel } from "@esri/calcite-components-react";
import {
  chart_panel_height_collapsed,
  chart_panel_height_default,
  chart_types_segmented_control,
} from "../uniqueValues";
import ChartType from "./ChartType";
import ExportExcel from "./ExportExcel";
import ChartDisplacementRecord from "./ChartDisplacementRecord";
import ChartFutureDisplacement from "./ChartFutureDisplacement";
import { MyContext } from "../App";

export default function ChartPanel() {
  const { charttype } = use(MyContext);
  const [chartPanelHeight, setChartPanelHeight] = useState<any>("7%");
  return (
    <CalcitePanel
      collapsible
      heading="Chart Panel"
      style={{
        height:
          chartPanelHeight === chart_panel_height_collapsed
            ? chart_panel_height_default
            : chart_panel_height_collapsed,
      }}
      onCalcitePanelToggle={(event: any) => {
        setChartPanelHeight(
          chartPanelHeight === chart_panel_height_default
            ? chart_panel_height_collapsed
            : chart_panel_height_default
        );
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <ChartType />
        <ExportExcel />
      </div>
      {charttype === chart_types_segmented_control[0] ? (
        <ChartDisplacementRecord />
      ) : (
        <ChartFutureDisplacement />
      )}
    </CalcitePanel>
  );
}
