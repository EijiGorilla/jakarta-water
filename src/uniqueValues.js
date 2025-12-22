import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import ColorVariable from "@arcgis/core/renderers/visualVariables/ColorVariable";
import { SimpleMarkerSymbol } from "@arcgis/core/symbols";

// Date Picker
export const monthList = [
  {
    value: 1,
    month: "Jan.",
  },
  {
    value: 2,
    month: "Feb.",
  },
  {
    value: 3,
    month: "Mar.",
  },
  {
    value: 4,
    month: "Apr.",
  },
  {
    value: 5,
    month: "May",
  },
  {
    value: 6,
    month: "Jun.",
  },
  {
    value: 7,
    month: "Jul.",
  },
  {
    value: 8,
    month: "Aug.",
  },
  {
    value: 9,
    month: "Sep.",
  },
  {
    value: 10,
    month: "Oct.",
  },
  {
    value: 11,
    month: "Nov.",
  },
  {
    value: 12,
    month: "Dec.",
  },
];

// Visible layers for segmented control
export const visible_layer_points = [
  "Total Displ.",
  "Hot Spot Analysis",
  "OFF",
];
export const visible_layer_subdiv = [
  "All",
  "Cempakaputih Barat",
  "Durensawit",
  "Kapukmuara",
  "Maphar",
  "Petukangan Selatan",
];

// Administrative boundary
export const admin_boudnary_layer_title = ["Kabupaten", "Kecamatan", "Desa"];

// Time series char filter
export const years_dropdown = [
  2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023,
];
export const latest_date_field = "x20231224";
export const date_sar_suffix = "x";
export const dates_sar = [
  "x20150410",
  "x20150504",
  "x20150715",
  "x20150808",
  "x20150901",
  "x20150925",
  "x20151019",
  "x20151112",
  "x20151206",
  "x20151230",
  "x20160123",
  "x20160216",
  "x20160311",
  "x20160404",
  "x20160428",
  "x20160522",
  "x20160615",
  "x20160709",
  "x20160802",
  "x20160826",
  "x20160919",
  "x20161013",
  "x20161106",
  "x20161130",
  "x20161224",
  "x20170117",
  "x20170222",
  "x20170306",
  "x20170318",
  "x20170330",
  "x20170411",
  "x20170423",
  "x20170505",
  "x20170517",
  "x20170529",
  "x20170610",
  "x20170622",
  "x20170704",
  "x20170809",
  "x20170821",
  "x20170902",
  "x20170914",
  "x20170926",
  "x20171008",
  "x20171020",
  "x20171101",
  "x20171113",
  "x20171125",
  "x20171207",
  "x20171219",
  "x20171231",
  "x20180112",
  "x20180124",
  "x20180205",
  "x20180217",
  "x20180301",
  "x20180313",
  "x20180325",
  "x20180406",
  "x20180418",
  "x20180430",
  "x20180512",
  "x20180524",
  "x20180605",
  "x20180617",
  "x20180711",
  "x20180723",
  "x20180804",
  "x20180816",
  "x20180828",
  "x20180909",
  "x20180921",
  "x20181003",
  "x20181015",
  "x20181027",
  "x20181108",
  "x20181120",
  "x20181202",
  "x20181214",
  "x20181226",
  "x20190101",
  "x20190107",
  "x20190119",
  "x20190131",
  "x20190212",
  "x20190224",
  "x20190308",
  "x20190320",
  "x20190401",
  "x20190413",
  "x20190425",
  "x20190507",
  "x20190519",
  "x20190531",
  "x20190612",
  "x20190624",
  "x20190706",
  "x20190718",
  "x20190730",
  "x20190811",
  "x20190823",
  "x20190904",
  "x20190916",
  "x20190928",
  "x20191010",
  "x20191022",
  "x20191103",
  "x20191115",
  "x20191127",
  "x20191209",
  "x20191221",
  "x20200102",
  "x20200114",
  "x20200126",
  "x20200207",
  "x20200219",
  "x20200302",
  "x20200314",
  "x20200326",
  "x20200407",
  "x20200419",
  "x20200501",
  "x20200513",
  "x20200525",
  "x20200606",
  "x20200618",
  "x20200630",
  "x20200712",
  "x20200724",
  "x20200805",
  "x20200817",
  "x20200829",
  "x20200910",
  "x20200922",
  "x20201004",
  "x20201016",
  "x20201028",
  "x20201109",
  "x20201121",
  "x20201203",
  "x20201215",
  "x20201227",
  "x20210108",
  "x20210120",
  "x20210201",
  "x20210213",
  "x20210225",
  "x20210321",
  "x20210402",
  "x20210414",
  "x20210426",
  "x20210508",
  "x20210520",
  "x20210601",
  "x20210613",
  "x20210625",
  "x20210707",
  "x20210719",
  "x20210731",
  "x20210812",
  "x20210824",
  "x20210905",
  "x20210917",
  "x20210929",
  "x20211011",
  "x20211023",
  "x20211104",
  "x20211128",
  "x20211210",
  "x20211222",
  "x20220103",
  "x20220115",
  "x20220127",
  "x20220208",
  "x20220220",
  "x20220304",
  "x20220316",
  "x20220328",
  "x20220409",
  "x20220421",
  "x20220503",
  "x20220515",
  "x20220527",
  "x20220608",
  "x20220620",
  "x20220702",
  "x20220714",
  "x20220726",
  "x20220807",
  "x20220819",
  "x20220831",
  "x20220912",
  "x20220924",
  "x20221006",
  "x20221018",
  "x20221030",
  "x20221111",
  "x20221123",
  "x20221205",
  "x20221217",
  "x20221229",
  "x20230110",
  "x20230122",
  "x20230203",
  "x20230215",
  "x20230227",
  "x20230311",
  "x20230323",
  "x20230404",
  "x20230416",
  "x20230428",
  "x20230510",
  "x20230522",
  "x20230603",
  "x20230615",
  "x20230627",
  "x20230709",
  "x20230721",
  "x20230802",
  "x20230814",
  "x20230826",
  "x20230907",
  "x20230919",
  "x20231001",
  "x20231013",
  "x20231025",
  "x20231106",
  "x20231118",
  "x20231130",
  "x20231212",
  "x20231224",
];

// Font and color
export const secondary_color = "#f7f5f7ff";
export const action_pane_title_font_size = "16px";
export const margin_left_pane_title = "7px";
export const margin_left_pane_item = "20px";
export const margin_right_pane_item = "5px";
export const margin_bottom_title_item = "0.6vh";

// Chart Panel
export const chart_div_height = "30vh";
export const scenario_type_field_name = "scenario";
export const point_chart_y_variable = "dispr_mmyr";
export const chart_panel_height_default = "72%";
export const chart_panel_height_collapsed = "7%";
export const chart_inside_label_color_down_mmyr = "red";
export const chart_inside_label_color_up_mmyr = "#0095ffff";
export const chart_types_segmented_control = [
  "Total displ.(mm)",
  "0% reduced (future water extraction)",
  "25% reduced",
  "50% reduced",
  "75% reduced",
  "100% reduced",
];

// Symbology Renderer
// SAR Points renderer
export const view_minScale = 80000;
export const view_minScale_zoom = 7500;
export const view_maxScale = 0;
export const point_color = [
  "#d7191c",
  "#fdae61",
  "#ffffbf",
  "#ffffff",
  "#3C9BE6",
];
export const point_default_renderer = new SimpleRenderer({
  symbol: new SimpleMarkerSymbol({
    style: "circle",
    color: [0, 0, 0],
    outline: {
      color: [0, 0, 0, 0],
      width: 0.5,
    },
    size: "6.5px",
  }),
  visualVariables: [
    new ColorVariable({
      field: latest_date_field,
      stops: [
        { value: -200, color: "#d7191c", label: "< -200" }, // dark red
        { value: -120, color: "#fdae61" }, // orange
        { value: -15, color: "#ffffbf" }, // yellow
        { value: 0, color: "#ffffff", label: "0" },
        { value: 80, color: "#3C9BE6", label: "> 80" },
      ],
    }),
  ],

  // https://developers.arcgis.com/javascript/latest/visualization/symbols-color-ramps/esri-color-ramps/
});

// Hot Spot renderer
export const values_hotspot = [-3, -2, -1, 0, 1, 2, 3];
export const color_hotspot = [
  "#D62F27",
  "#ED7551",
  "#FAB984",
  [0, 0, 0, 0], //'#9C9C9C', // Not Significant
  "#C0CCBE",
  "#849EBA",
  "#4575B5",
];

export const label_hotspot = [
  "Downward with 99% Confidence", // significant land subsidence
  "Downward with 95% Confidence",
  "Downward with 90% Confidence",
  "Not Significant",
  "Upward with 90% Confidence",
  "Upward with 95% Confidence",
  "Upward with 99% Confidence",
];

// Minimum and maximum record
export const ref_point_id = 1988268;

// object id field
export const object_id = "objectid";

export async function defineActions(event) {
  const { item } = event;

  // Expand the GroupLayer as default
  if (item.layer.type === "group") {
    item.open = true;
  }

  item.title === admin_boudnary_layer_title[1] ||
  item.title === admin_boudnary_layer_title[2]
    ? (item.visible = false)
    : (item.visible = true);
}
