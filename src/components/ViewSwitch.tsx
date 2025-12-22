import "@esri/calcite-components/dist/components/calcite-switch";
import { CalciteSwitch } from "@esri/calcite-components-react";
import { use } from "react";
import { MyContext } from "../App";

export default function ViewSwitch() {
  const { updateViewchange } = use(MyContext);
  return (
    <>
      3D off
      <CalciteSwitch
        onCalciteSwitchChange={(event: any) => {
          updateViewchange(
            event.target.checked === false ? "arcgis-map" : "arcgis-scene"
          );
        }}
      ></CalciteSwitch>
      3D on
    </>
  );
}
