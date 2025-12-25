import { useEffect, useState, use } from "react";
import FeatureFilter from "@arcgis/core/layers/support/FeatureFilter";
import {
  admin_boundary_kabupaten,
  sar_point_layer_title,
  sar_points_layer,
} from "../layers";
import { object_id } from "../uniqueValues";
import { MyContext } from "../App";

export default function SelectedPointId() {
  const {
    selectedid,
    selectedkabupaten,
    updateSelectedid,
    updateSelectedkabupaten,
    updateSelectedareforscenario,
    viewchange,
  } = use(MyContext);

  useEffect(() => {
    const arcgisMap = document.querySelector(viewchange);
    sar_points_layer.when(() => {
      admin_boundary_kabupaten.when(() => {
        arcgisMap?.view.on("click", (event: any) => {
          arcgisMap?.view.hitTest(event).then((response: any) => {
            const result: any = response.results[0];

            const title = result?.graphic?.layer?.title;
            if (!title) {
              updateSelectedid(null);
              updateSelectedareforscenario(null);
            } else if (title === "Kabupaten") {
              updateSelectedid(null);
              updateSelectedareforscenario(result.graphic.attributes["namobj"]);

              // Highlight boundary
              updateSelectedkabupaten(result.graphic.attributes[object_id]);
            } else if (title === sar_point_layer_title) {
              updateSelectedid(result.graphic.attributes[object_id]);
              updateSelectedareforscenario(null);
            }
          });
        });
      });
    });
  });

  // Highlight SAR points
  useEffect(() => {
    const arcgisMap = document.querySelector(viewchange);
    let highlight: any;
    selectedid &&
      arcgisMap?.whenLayerView(sar_points_layer).then((layerView: any) => {
        highlight = layerView.highlight(selectedid);
        arcgisMap?.view.on("click", function () {
          layerView.filter = new FeatureFilter({
            where: undefined,
          });
          highlight.remove();
        });
      });
  }, [selectedid]);

  // Highlight Administrative boundary
  useEffect(() => {
    const arcgisMap = document.querySelector(viewchange);
    let highlight: any;

    // need to get objectid for this layer
    selectedkabupaten &&
      arcgisMap
        ?.whenLayerView(admin_boundary_kabupaten)
        .then((layerView: any) => {
          highlight = layerView.highlight(selectedkabupaten);
          arcgisMap?.view.on("click", function () {
            layerView.filter = new FeatureFilter({
              where: undefined,
            });
            highlight.remove();
          });
        });
  }, [selectedkabupaten]);

  return <></>;
}
