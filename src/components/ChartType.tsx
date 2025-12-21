import "@esri/calcite-components/dist/components/calcite-segmented-control";
import "@esri/calcite-components/dist/components/calcite-segmented-control-item";
import "@esri/calcite-components/dist/calcite/calcite.css";
import {
  CalciteSegmentedControl,
  CalciteSegmentedControlItem,
} from "@esri/calcite-components-react";
import {
  chart_types_segmented_control,
  margin_left_pane_item,
  margin_right_pane_item,
} from "../uniqueValues";
import { use, useState } from "react";
import { MyContext } from "../App";

export default function ChartType() {
  const { updateCharttype } = use(MyContext);
  const [chartTypeSelected, setChartTypeSelected] = useState<any>(
    chart_types_segmented_control[0]
  );

  const handleChartTypeSelected = (obj: any) => {
    setChartTypeSelected(obj);
    updateCharttype(obj);
  };

  return (
    <div style={{ display: "flex" }}>
      <CalciteSegmentedControl
        style={{
          marginTop: "5px",
          marginBottom: "5px",
          marginLeft: margin_left_pane_item,
          marginRight: margin_right_pane_item,
        }}
        scale="s"
        onCalciteSegmentedControlChange={(event: any) => {
          handleChartTypeSelected(event.target.selectedItem.id);
        }}
      >
        {chartTypeSelected &&
          chart_types_segmented_control.map((chart: any, index: any) => {
            return (
              <CalciteSegmentedControlItem
                {...(chartTypeSelected === chart ? { checked: true } : {})}
                key={index}
                value={chart}
                id={chart}
              >
                {chart}
              </CalciteSegmentedControlItem>
            );
          })}
      </CalciteSegmentedControl>
    </div>
  );
}
