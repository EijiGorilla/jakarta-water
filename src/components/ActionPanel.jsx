import { useEffect, useState } from "react";
import "../App.css";
import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-list-item";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import "@esri/calcite-components/dist/components/calcite-action";
import "@esri/calcite-components/dist/components/calcite-action-bar";
import "@arcgis/map-components/components/arcgis-legend";
import {
  CalciteShellPanel,
  CalciteActionBar,
  CalciteAction,
  CalcitePanel,
} from "@esri/calcite-components-react";
import {
  secondary_color,
  action_pane_title_font_size,
  margin_left_pane_title,
  margin_bottom_title_item,
  defineActions,
} from "../uniqueValues";
import DatePicker from "./DatePicker";
import VisibleLayers from "./VisibleLayers";
import MinMaxRecord from "./MinMaxRecord";
import ReferencePointSubtraction from "./ReferencePointSubtraction";
import { layerInfos_sar } from "../layers";

function ActionPanel() {
  // const arcgisMapLegend = document.querySelector("arcgis-legend");
  const [activeWidget, setActiveWidget] = useState(null);
  const [nextWidget, setNextWidget] = useState(null);

  useEffect(() => {
    setNextWidget("mainq");
  }, []);

  // useEffect(() => {
  //   if (arcgisMapLegend) {
  //     arcgisMapLegend.layerInfos = layerInfos_sar;
  //     arcgisMapLegend.hideLayersNotInCurrentView = false;
  //     arcgisMapLegend.respectLayerVisibilityDisabled = true;
  //   }
  // });

  useEffect(() => {
    if (activeWidget) {
      const actionActiveWidget = document.querySelector(
        `[data-panel-id=${activeWidget}]`
      );
      actionActiveWidget.hidden = true;
    }

    if (nextWidget !== activeWidget) {
      const actionNextWidget = document.querySelector(
        `[data-panel-id=${nextWidget}]`
      );
      actionNextWidget.hidden = false;
    }
  });

  return (
    <CalciteShellPanel
      // if width is not set to '1', the panel will not be closed when action widget is clicekd.
      width="1"
      slot="panel-start"
      position="start"
      id="left-shell-panel"
    >
      <CalciteActionBar slot="action-bar">
        <CalciteAction
          data-action-id="mainq"
          icon="layers"
          text="main panel"
          id="mainq"
          //textEnabled={true}
          onClick={(event) => {
            setNextWidget(event.target.id);
            setActiveWidget(nextWidget === activeWidget ? null : nextWidget);
          }}
        ></CalciteAction>

        <CalciteAction
          data-action-id="basemaps"
          icon="basemap"
          text="basemaps"
          id="basemaps"
          onClick={(event) => {
            setNextWidget(event.target.id);
            setActiveWidget(nextWidget === activeWidget ? null : nextWidget);
          }}
        ></CalciteAction>

        <CalciteAction
          data-action-id="information"
          icon="information"
          text="Information"
          id="information"
          onClick={(event) => {
            setNextWidget(event.target.id);
            setActiveWidget(nextWidget === activeWidget ? null : nextWidget);
          }}
        ></CalciteAction>
      </CalciteActionBar>

      <CalcitePanel
        heading="Main Pane"
        data-panel-id="mainq"
        style={{ width: "20.8vw" }}
        hidden
      >
        <div
          style={{
            fontSize: action_pane_title_font_size,
            color: secondary_color,
            marginBottom: margin_bottom_title_item,
            marginLeft: margin_left_pane_title,
            marginTop: "10px",
          }}
        >
          Time Period:
        </div>
        <DatePicker />

        <div
          style={{
            fontSize: action_pane_title_font_size,
            color: secondary_color,
            marginBottom: margin_bottom_title_item,
            marginLeft: margin_left_pane_title,
            marginTop: "20px",
          }}
        >
          Admin. Boundary Layers:
        </div>
        <arcgis-layer-list
          referenceElement="arcgis-map"
          selectionMode="multiple"
          visibilityAppearance="checkbox"
          show-filter
          filter-placeholder="Filter layers"
          listItemCreatedFunction={defineActions}
        ></arcgis-layer-list>

        <div
          style={{
            fontSize: action_pane_title_font_size,
            marginLeft: margin_left_pane_title,
            marginTop: "20px",
            marginBottom: margin_bottom_title_item,
            color: secondary_color,
          }}
        >
          Visible Displacement Layer:
        </div>

        {/* Visible layers */}
        <VisibleLayers />

        {/* Min and Max Record */}
        <MinMaxRecord />

        {/* Subtract displacement from the reference point */}
        <ReferencePointSubtraction />

        {/* Add Legend */}
        {/* <arcgis-legend
          referenceElement="arcgis-map"
          id="arcgis-map-legend"
        ></arcgis-legend> */}
      </CalcitePanel>

      <CalcitePanel
        heading="Basemaps"
        data-panel-id="basemaps"
        style={{ width: "20.8vw" }}
        hidden
      >
        <arcgis-basemap-gallery referenceElement="arcgis-map"></arcgis-basemap-gallery>
      </CalcitePanel>

      <CalcitePanel heading="Description" data-panel-id="information" hidden>
        {nextWidget === "information" && (
          <div className="informationDiv">
            <div
              style={{
                fontSize: "16px",
                color: secondary_color,
                marginTop: "10px",
                marginLeft: "10px",
              }}
            >
              Overview
            </div>
            <div>
              <img
                src="https://EijiGorilla.github.io/Symbols/Land_Subsidence/Overview.svg"
                alt="Overview"
                height={"100%"}
                width={"100%"}
                style={{ marginBottom: "auto" }}
              />
            </div>
            <div>
              <div
                style={{
                  fontSize: "16px",
                  color: secondary_color,
                  marginTop: "10px",
                  marginLeft: "10px",
                }}
              >
                Chart:
              </div>
              <img
                src="https://EijiGorilla.github.io/Symbols/Land_Subsidence/Chart_displacement.svg"
                alt="Overview"
                height={"100%"}
                width={"100%"}
                style={{ marginBottom: "auto", marginTop: "auto" }}
              />
            </div>
            <div>
              <img
                src="https://EijiGorilla.github.io/Symbols/Land_Subsidence/Chart_scenario_status_quo.svg"
                alt="Overview"
                height={"100%"}
                width={"100%"}
                style={{ marginBottom: "auto", marginTop: "auto" }}
              />
            </div>
            <div>
              <img
                src="https://EijiGorilla.github.io/Symbols/Land_Subsidence/Chart_scenarios.svg"
                alt="Overview"
                height={"100%"}
                width={"100%"}
                style={{ marginBottom: "auto", marginTop: "auto" }}
              />
            </div>
            <div>
              <div
                style={{
                  fontSize: "16px",
                  color: secondary_color,
                  marginTop: "10px",
                  marginLeft: "10px",
                }}
              >
                Hot Spot Analysis:
              </div>
              <img
                src="https://EijiGorilla.github.io/Symbols/Land_Subsidence/Hot_spot_analysis.svg"
                alt="Overview"
                height={"100%"}
                width={"100%"}
                style={{ marginBottom: "auto", marginTop: "auto" }}
              />
            </div>
          </div>
        )}
      </CalcitePanel>
    </CalciteShellPanel>
  );
}

export default ActionPanel;
