import { use, useState } from "react";
import "@esri/calcite-components/dist/components/calcite-button";
import { CalciteButton } from "@esri/calcite-components-react";
import { MyContext } from "../App";

export default function ExportExcel() {
  const { updateClickedexportexcel } = use(MyContext);
  const [exportExcel, setExportExcel] = useState<boolean>(false);

  return (
    <CalciteButton
      onClick={() =>
        updateClickedexportexcel(exportExcel === false ? true : false)
      }
      slot="trigger"
      scale="s"
      appearance="solid"
      icon-start="file-excel"
      style={{
        "--calcite-button-background-color": "#0079C1",
        marginRight: "10px",
        marginTop: "5px",
      }}
    >
      Export to Excel
    </CalciteButton>
  );
}
