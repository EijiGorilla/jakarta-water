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
  const { viewchange } = use(MyContext);
  const arcgisMap = document.querySelector(viewchange);
  const {
    updateSelectedid,
    updateSelectedkabupaten,
    updateSelectedareforscenario,
  } = use(MyContext);

  const [selectedId, setSelectedId] = useState<any | undefined | null>(null);
  const [selectedIdKabupaten, setSelectedIdKabupaten] = useState<
    any | undefined | null
  >(null);
  const [selectedAreaForScenario, setSelectedAreaForScenario] = useState<
    any | undefined | null
  >(null);

  // Layer laoded and get clicked point objectid
  useEffect(() => {
    sar_points_layer.when(() => {
      admin_boundary_kabupaten.when(() => {
        arcgisMap?.view.on("click", (event: any) => {
          arcgisMap?.view.hitTest(event).then((response: any) => {
            const result: any = response.results[0];

            const title = result?.graphic?.layer?.title;
            if (!title) {
              setSelectedId(null);
              updateSelectedid(null);
              setSelectedAreaForScenario(null);
              updateSelectedareforscenario(null);
            } else if (title === "Kabupaten") {
              setSelectedId(null);
              updateSelectedid(null);
              setSelectedAreaForScenario(result.graphic.attributes["namobj"]);
              updateSelectedareforscenario(result.graphic.attributes["namobj"]);

              // Highlight boundary
              setSelectedIdKabupaten(result.graphic.attributes[object_id]);
              updateSelectedkabupaten(result.graphic.attributes[object_id]);
            } else if (title === sar_point_layer_title) {
              setSelectedId(result.graphic.attributes[object_id]);
              updateSelectedid(result.graphic.attributes[object_id]);
              setSelectedAreaForScenario(null);
              updateSelectedareforscenario(null);
            }
          });
        });
      });
    });
  });

  // Highlight SAR points
  useEffect(() => {
    let highlight: any;
    selectedId &&
      arcgisMap?.whenLayerView(sar_points_layer).then((layerView: any) => {
        highlight = layerView.highlight(selectedId);
        arcgisMap?.view.on("click", function () {
          layerView.filter = new FeatureFilter({
            where: undefined,
          });
          highlight.remove();
        });
      });
  }, [selectedId]);

  // Highlight Administrative boundary
  useEffect(() => {
    let highlight: any;

    // need to get objectid for this layer
    selectedIdKabupaten &&
      arcgisMap
        ?.whenLayerView(admin_boundary_kabupaten)
        .then((layerView: any) => {
          highlight = layerView.highlight(selectedIdKabupaten);
          arcgisMap?.view.on("click", function () {
            layerView.filter = new FeatureFilter({
              where: undefined,
            });
            highlight.remove();
          });
        });
  }, [selectedIdKabupaten]);

  return <></>;
}
