import { use, useEffect, useState } from "react";
import "../index.css";
import "../App.css";
import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/dist/components/arcgis-scene";
import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-zoom";
import "@arcgis/map-components/components/arcgis-legend";
import "@arcgis/map-components/components/arcgis-basemap-gallery";
import "@arcgis/map-components/components/arcgis-layer-list";
import "@arcgis/map-components/components/arcgis-expand";
import "@arcgis/map-components/components/arcgis-placement";
import "@arcgis/map-components/components/arcgis-search";
import "@arcgis/map-components/components/arcgis-compass";
import {
  hot_spot_layer,
  sar_points_layer,
  admin_boundary_kabupaten_for_scenario,
  admin_boundary_groupLayer,
  layerInfos_sar,
} from "../layers";
import "@esri/calcite-components/dist/components/calcite-button";
import { object_id } from "../uniqueValues";
import { MyContext } from "../App";

function MapDisplay() {
  const { viewchange } = use(MyContext);
  const [mapView, setMapView] = useState();
  const arcgisMap = document.querySelector(viewchange);
  // const arcgisMapLegend = document.querySelector("arcgis-legend");
  const arcgisSearch = document.querySelector("arcgis-search");

  useEffect(() => {
    if (mapView) {
      arcgisMap.map.add(admin_boundary_groupLayer);
      arcgisMap.map.add(admin_boundary_kabupaten_for_scenario);
      arcgisMap.map.add(sar_points_layer);
      arcgisMap.map.add(hot_spot_layer);
      arcgisMap.view.ui.components = [];
      arcgisMap.map.ground.navigationConstraint = "none";
      arcgisMap.map.ground.opacity = 0.6;

      arcgisSearch.sources = [
        {
          layer: sar_points_layer,
          searchFields: [object_id],
          displayField: object_id,
          exactMatch: false,
          outFields: [object_id],
          name: "ID",
          placeholder: "ID",
        },
      ];
      arcgisSearch.includeDefaultSourcesDisabled = true;
      arcgisSearch.locationDisabled = true;

      // Legend
      // arcgisMapLegend.layerInfos = layerInfos_sar;
      // arcgisMapLegend.hideLayersNotInCurrentView = false;
      // arcgisMapLegend.respectLayerVisibilityDisabled = true;
    }
  }, [mapView]);

  return (
    <>
      {viewchange === "arcgis-map" ? (
        <arcgis-map
          basemap="satellite"
          ground="world-elevation"
          //   viewingMode="local"
          zoom="11"
          center="106.8244387, -6.2392965"
          onarcgisViewReadyChange={(event) => {
            setMapView(event.target);
          }}
        >
          <arcgis-search slot="top-right"></arcgis-search>

          {/* Legend */}
          {/* <arcgis-legend
            slot="bottom-left"
            id="arcgis-map-legend"
          ></arcgis-legend> */}
        </arcgis-map>
      ) : (
        <arcgis-scene
          basemap="satellite"
          ground="world-elevation"
          viewingMode="local"
          zoom="11"
          center="106.8244387, -6.2392965"
          onarcgisViewReadyChange={(event) => {
            setMapView(event.target);
          }}
        >
          <arcgis-search slot="top-right"></arcgis-search>

          {/* Legend */}
          {/*<arcgis-legend
            slot="bottom-left"
            id="arcgis-map-legend"
          ></arcgis-legend>*/}
        </arcgis-scene>
      )}
    </>
  );
}

export default MapDisplay;
