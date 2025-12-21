import { useState, use } from "react";
import "../index.css";
import "../App.css";
import "@esri/calcite-components/dist/components/calcite-input-number";
import "@esri/calcite-components/dist/calcite/calcite.css";
import { CalciteInputNumber } from "@esri/calcite-components-react";
import {
  secondary_color,
  action_pane_title_font_size,
  margin_left_pane_title,
  margin_bottom_title_item,
  margin_right_pane_item,
} from "../uniqueValues";
import { MyContext } from "../App";

export default function ReferencePointSubtraction() {
  const { updateReferenceid } = use(MyContext);
  const [referenceid, setReferenceid] = useState<any>(undefined);

  const handleReferencePoint = (obj: any) => {
    setReferenceid(obj);
    updateReferenceid(obj);
  };

  return (
    <div
      style={{
        fontSize: action_pane_title_font_size,
        marginLeft: margin_left_pane_title,
        marginRight: margin_right_pane_item,
        marginTop: "20px",
        marginBottom: margin_bottom_title_item,
        color: secondary_color,
      }}
    >
      Reference ID for Subtraction:
      <CalciteInputNumber
        placeholder="Enter a reference point ID"
        clearable
        scale="m"
        step={"any"}
        onCalciteInputNumberChange={(event: any) =>
          handleReferencePoint(event.target.value)
        }
      ></CalciteInputNumber>
    </div>
  );
}
