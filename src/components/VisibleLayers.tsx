import {
  CalciteSegmentedControl,
  CalciteSegmentedControlItem,
} from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-segmented-control";
import "@esri/calcite-components/dist/components/calcite-segmented-control-item";
import "@arcgis/map-components/components/arcgis-legend";
import { margin_left_pane_item, visible_layer_points } from "../uniqueValues";
import { useEffect, useState } from "react";
import {
  hot_spot_layer,
  layerInfos_hotspot,
  layerInfos_null,
  layerInfos_sar,
  sar_points_layer,
} from "../layers";

export default function VisibleLayers() {
  const [sarPointlayerSelected, setSarPointLayerSelected] = useState<any>(
    visible_layer_points[0]
  );

  // Legend
  const arcgisMapLegend: any = document.querySelector("arcgis-legend");

  useEffect(() => {
    sar_points_layer.visible = true;
    hot_spot_layer.visible = false;
  }, []);

  useEffect(() => {
    sarPointlayerSelected === visible_layer_points[1]
      ? (hot_spot_layer.visible = true) &&
        (arcgisMapLegend
          ? (arcgisMapLegend.layerInfos = layerInfos_hotspot)
          : "") &&
        (sar_points_layer.visible = false)
      : sarPointlayerSelected === visible_layer_points[0]
      ? (sar_points_layer.visible = true) &&
        (arcgisMapLegend
          ? (arcgisMapLegend.layerInfos = layerInfos_sar)
          : "") &&
        (hot_spot_layer.visible = false)
      : sarPointlayerSelected === visible_layer_points[2]
      ? (sar_points_layer.visible = false) ||
        (hot_spot_layer.visible = false) ||
        (arcgisMapLegend.layerInfos = layerInfos_null)
      : console.log("");
  }, [sarPointlayerSelected]);

  return (
    <CalciteSegmentedControl
      style={{
        marginLeft: margin_left_pane_item,
      }}
      scale="m"
      onCalciteSegmentedControlChange={(event: any) => {
        setSarPointLayerSelected(event.target.selectedItem.id);
      }}
    >
      {sarPointlayerSelected &&
        visible_layer_points.map((layer: any, index: any) => {
          return (
            <CalciteSegmentedControlItem
              {...(sarPointlayerSelected === layer ? { checked: true } : {})}
              key={index}
              value={layer}
              id={layer}
            >
              {layer}
            </CalciteSegmentedControlItem>
          );
        })}
    </CalciteSegmentedControl>
  );
}
