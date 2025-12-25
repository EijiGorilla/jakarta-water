import "@esri/calcite-components/dist/components/calcite-switch";
import { CalciteSwitch } from "@esri/calcite-components-react";
import { use } from "react";
import { MyContext } from "../App";

export default function ViewSwitch() {
  const { updateViewchange } = use(MyContext);

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 10,
        backgroundColor: "#252525",
        marginLeft: "5px",
        marginTop: "5px",
        paddingLeft: "5px",
        paddingRight: "5px",
      }}
    >
      3D on
      <CalciteSwitch
        onCalciteSwitchChange={(event: any) => {
          updateViewchange(
            event.target.checked === true ? "arcgis-map" : "arcgis-scene"
          );
          // event.target.checked = !event.target.checked;
        }}
        style={{ padding: "5px" }}
      ></CalciteSwitch>{" "}
      3D off
    </div>
  );
}
