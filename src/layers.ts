import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import { SimpleMarkerSymbol, SimpleFillSymbol } from "@arcgis/core/symbols";
import {
  admin_boudnary_layer_title,
  color_hotspot,
  label_hotspot,
  values_hotspot,
  view_maxScale,
  view_minScale,
} from "./uniqueValues";
import GroupLayer from "@arcgis/core/layers/GroupLayer";

// layer title
export const sar_point_layer_title = "Land Displacement (mm)";
export const host_spot_analysis_layer_title = "Hot Spot Analysis";

export const sar_points_layer = new FeatureLayer({
  portalItem: {
    id: "f267cd68e2ce4c0b9d38e1b401d8b320",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 3,
  minScale: view_minScale,
  maxScale: view_maxScale,
  // renderer: point_default_renderer,
  // popupEnabled: false,
  popupTemplate: {
    title: "ID: <p>{objectid}</p>",
    lastEditInfoEnabled: false,
  },
  title: sar_point_layer_title,
  elevationInfo: {
    featureExpressionInfo: {
      expression: "$feature.dispr_mmyr",
    },
    mode: "relative-to-scene",
  },
});
sar_points_layer.listMode = "hide";
// sar_points_layer.popupTemplate = templatePopup;

// Optimized Hot Spot

const uniqueValueInfos_hotspot = values_hotspot.map(
  (value: any, index: any) => {
    return Object.assign({
      value: value,
      label: label_hotspot[index],
      symbol: new SimpleMarkerSymbol({
        style: "circle",
        color: color_hotspot[index],
        outline: {
          color: [0, 0, 0, 0],
          width: 0.5,
        },
        size: "6.5px",
      }),
    });
  }
);

export const hot_spot_renderer = new UniqueValueRenderer({
  field: "gi_bin",
  uniqueValueInfos: uniqueValueInfos_hotspot,
});

export const hot_spot_layer = new FeatureLayer({
  portalItem: {
    id: "f267cd68e2ce4c0b9d38e1b401d8b320",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 3,
  minScale: 80000,
  maxScale: 0,
  popupEnabled: false,
  renderer: hot_spot_renderer,
  // eslint-disable-next-line no-useless-concat
  outFields: ["gi_bin"],
  title: host_spot_analysis_layer_title,
});
hot_spot_layer.listMode = "hide";
// hot_spot_layer.popupTemplate = templatePopup;

// LayerInfos for SAR and Hot Spot layers
export const layerInfos_sar = [
  {
    layer: sar_points_layer,
    title: sar_point_layer_title,
  },
];

export const layerInfos_hotspot = [
  {
    layer: hot_spot_layer,
    title: host_spot_analysis_layer_title,
  },
];

export const layerInfos_null = [
  {
    layer: null,
  },
];

// Administrative Boundary
const kabupaten_renderer = new SimpleRenderer({
  symbol: new SimpleFillSymbol({
    color: "black",
    style: "none",
    outline: {
      color: "black",
      width: "2.5px",
    },
  }),
});

export const admin_boundary_kabupaten = new FeatureLayer({
  portalItem: {
    id: "e737a954b42641b9ac917b2657e9fe73",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 0,
  outFields: ["namobj"],
  renderer: kabupaten_renderer,
  // When renderer is defined, it does not get highlighted. why?
  // renderer: admin_line_renderer,
  popupEnabled: false,
  title: admin_boudnary_layer_title[0],
  elevationInfo: {
    mode: "on-the-ground",
  },
});

const kabupaten_renderer_scenario = new SimpleRenderer({
  symbol: new SimpleFillSymbol({
    color: [0, 0, 0, 0],
    outline: {
      color: [0, 0, 0, 0],
    },
  }),
});

export const admin_boundary_kabupaten_for_scenario = new FeatureLayer({
  portalItem: {
    id: "e737a954b42641b9ac917b2657e9fe73",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 0,
  outFields: ["namobj"],
  renderer: kabupaten_renderer_scenario,
  // When renderer is defined, it does not get highlighted. why?
  // renderer: admin_line_renderer,
  popupEnabled: false,
  title: admin_boudnary_layer_title[0],
  elevationInfo: {
    mode: "on-the-ground",
  },
});
admin_boundary_kabupaten_for_scenario.listMode = "hide";

// Kecamatan
export const admin_boundary_kecamatan = new FeatureLayer({
  portalItem: {
    id: "f267cd68e2ce4c0b9d38e1b401d8b320",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 1,
  popupEnabled: false,
  // renderer: admin_line_renderer,
  title: admin_boudnary_layer_title[1],
  elevationInfo: {
    mode: "on-the-ground",
  },
});

export const admin_boundary_desa = new FeatureLayer({
  portalItem: {
    id: "f267cd68e2ce4c0b9d38e1b401d8b320",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 2,
  popupEnabled: false,
  title: admin_boudnary_layer_title[2],
  elevationInfo: {
    mode: "on-the-ground",
  },
});

// Scenario feature table
export const scenario_table = new FeatureLayer({
  portalItem: {
    id: "37a7d7bc59ac4630bd9ece7b24a81c85",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  outFields: ["*"],
  popupEnabled: false,
});

// Interquartile Range value tables
export const iqr_table = new FeatureLayer({
  portalItem: {
    id: "bd1126c44f574ffbbdbdc75d855e9c40",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  outFields: ["dates", "max"],
  popupEnabled: false,
});

export const admin_boundary_groupLayer = new GroupLayer({
  title: "Admin. Boundary Layers",
  visible: true,
  visibilityMode: "independent",
  layers: [
    admin_boundary_desa,
    admin_boundary_kecamatan,
    admin_boundary_kabupaten,
  ],
});
