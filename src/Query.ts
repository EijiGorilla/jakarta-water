import ColorVariable from "@arcgis/core/renderers/visualVariables/ColorVariable";
import { iqr_table, sar_points_layer, scenario_table } from "./layers";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import { SimpleMarkerSymbol } from "@arcgis/core/symbols";
import StatisticDefinition from "@arcgis/core/rest/support/StatisticDefinition";
import Query from "@arcgis/core/rest/support/Query";
import FeatureFilter from "@arcgis/core/layers/support/FeatureFilter";
import {
  date_sar_suffix,
  dates_sar,
  object_id,
  point_chart_y_variable,
  point_color,
} from "./uniqueValues";
import { ArcgisMap } from "@arcgis/map-components/dist/components/arcgis-map";

const arcgisMap = document.querySelector("arcgis-map") as ArcgisMap;

// total records for checking
// export async function totalRecords() {
//   var total_records = new StatisticDefinition({
//     onStatisticField: 'objectid',
//     statisticType: 'count',
//     outStatisticFieldName: 'total_records',
//   });
//   var query = sar_points_layer.createQuery();
//   query.where = '1=1';
//   query.outStatistics = [total_records];
//   query.outFields = ['objectid'];
//   const response = await sar_points_layer.queryFeatures(query);
//   var stats = response.features[0].attributes;
//   const count = stats.total_records;
//   return count;
// }
// totalRecords().then((result: any) => {
//   console.log(result);
// });

function onlyUnique(value: any, index: any, array: any) {
  return array.indexOf(value) === index;
}

// export async function getFieldNamesYears() {
//   const query = sar_points_layer.createQuery();
//   return sar_points_layer.queryFeatures(query).then((response: any) => {
//     const field_names: any = [];
//     const years_list: any = [];
//     var fields = response.fields;
//     fields.map((field: any, index: any) => {
//       if (field.name[0] === date_sar_suffix) {
//         field_names.push(field.name);
//         const year = Number(field.name.replace(date_sar_suffix, '').slice(0, 4));
//         years_list.push(year);
//       }
//     });
//     console.log(field_names);
//     const unique_years = years_list.filter(onlyUnique);
//     return [field_names, unique_years];
//   });
// }

// create data for scenario chart
export async function generateScenarioChartData(
  selectedarea: any,
  selectedcharttype: any
) {
  // scenario1 (status quo) is selected and this is always executed.
  if (selectedarea) {
    const query = scenario_table.createQuery();
    query.where = "area = '" + selectedarea + "'";
    return scenario_table.queryFeatures(query).then((response: any) => {
      var stats = response.features;
      const data = stats.map((result: any, index: any) => {
        const attributes = result.attributes;
        const obs = attributes.obs;
        const scenario1 = attributes.scenario1;
        const scenario2 = attributes.scenario2;
        const scenario3 = attributes.scenario3;
        const scenario4 = attributes.scenario4;
        const scenario5 = attributes.scenario5;
        const date = attributes.date;
        const date_n = new Date(date);
        const year = date_n.toLocaleString("default", { year: "numeric" });
        const month = date_n.toLocaleString("default", { month: "2-digit" });
        const day = date_n.toLocaleString("default", { day: "2-digit" });
        const date_label = `${year}-${month}-${day}`;
        return Object.assign({
          Date: date_label,
          date: date,
          observed: obs === null ? undefined : obs,
          statusQuo: scenario1, // status quo
          scenario2: scenario2, // simulated scenario 2
          scenario3: !scenario3 ? undefined : scenario3,
          scenario4: !scenario4 ? undefined : scenario4,
          scenario5: !scenario5 ? undefined : scenario5,
        });
      });
      return data;
    });
  } else {
    const default_data = [{}];
    return default_data;
  }
}

// Create data for time-series chart when a specific id is selected
// reference point values to extract from to account for displacement unrelated to subsidence.
export async function getReferencePointValueForSubtraction(ref_point_id: any) {
  const query = sar_points_layer.createQuery();
  if (ref_point_id) {
    query.where = `${object_id} = ` + ref_point_id;
  } else {
    query.where = "1=1";
  }

  return sar_points_layer.queryFeatures(query).then((results: any) => {
    // when ref_point_id entered does not exist, do nothing.
    // when a reference point is selected,
    // compile all values across all the date fields in an objectd array.
    if (ref_point_id) {
      var stats = results.features[0].attributes;
      const ref_data = dates_sar.map((date: any, index: any) => {
        const dateString = date.replace(date_sar_suffix, "");
        const year = dateString.substring(0, 4);
        const month = dateString.substring(4, 6);
        const day = dateString.substring(6, 8);
        const date_n = new Date(year, month - 1, day);
        date_n.setHours(0, 0, 0, 0);
        return Object.assign({
          date: date_n.getTime(),
          value: stats[date],
        });
      });
      return ref_data;
    }
  });
}

export async function generateChartData(
  selectedid: any,
  newdates: any,
  refData: any
) {
  if (selectedid) {
    const query = sar_points_layer.createQuery();
    query.where = `${object_id} = ` + selectedid;
    return sar_points_layer.queryFeatures(query).then((results: any) => {
      var stats = results.features[0].attributes;
      const map = newdates.map((date: any, index: any) => {
        const dateString = date.replace(date_sar_suffix, "");
        const year = dateString.substring(0, 4);
        const month = dateString.substring(4, 6);
        const day = dateString.substring(6, 8);
        const date_label = `${year.toString()}-${month.toString()}-${day.toString()}`;
        const date_n = new Date(year, month - 1, day);
        date_n.setHours(0, 0, 0, 0);

        // get reference point data
        const find = refData?.filter(
          (elem: any) => elem.date === date_n.getTime()
        );
        const ref_value = find ? find[0].value : 0;

        //
        return Object.assign({
          Date: date_label,
          date: date_n.getTime(), //date.replace('f', ''),
          // value: stats[newdates[index]],
          value: stats[newdates[index]] - ref_value, // subtract to account for displacement unrelated to subsidence
        });
      });
      const displ_mmyr = stats[point_chart_y_variable];
      return [map, displ_mmyr];
    });
  } else {
    const default_data = [{}];
    return default_data;
  }
}

export async function updateRendererForSymbology(last_date: any) {
  const query = iqr_table.createQuery();
  const last_date_X = last_date.replace("x", "X");
  query.where = "dates = '" + last_date_X + "'";
  query.outFields = ["dates", "max", "q1", "min"];
  const response = await iqr_table.queryFeatures(query);
  var attributes = response.features[0].attributes;
  // const max = attributes['max'];
  const max = Math.ceil(attributes["max"] * 0.8);
  const q1 = attributes["q1"];
  const min = Math.ceil(q1 * 2);

  // object array for visualVariables
  const values = [min, q1, q1 / 3, 0, max];
  const stops = values.map((value: any, index: any) => {
    return Object.assign({
      value: value,
      color: point_color[index],
      label:
        index === 0
          ? "< " + value.toString()
          : index === 3
          ? "0"
          : index === 4
          ? "> " + max
          : "",
    });
  });

  const new_visualVariable = [
    new ColorVariable({
      field: last_date_X,
      stops: stops,
      legendOptions: {
        title: "",
      },
    }),
  ];

  const new_point_renderer = new SimpleRenderer({
    symbol: new SimpleMarkerSymbol({
      style: "circle",
      color: [0, 0, 0],
      outline: {
        color: [0, 0, 0, 0],
        width: 0.5,
      },
      size: "6.5px",
    }),
    visualVariables: new_visualVariable,

    // https://developers.arcgis.com/javascript/latest/visualization/symbols-color-ramps/esri-color-ramps/
  });

  return new_point_renderer;
}

// Get minimum and maximum records and zoom
export async function getMinMaxRecords(newdates: any) {
  // Regardless of start years, min and max records are extracted from the end year.
  // So query based on the end year only.
  const end_year_date = newdates[newdates.length - 1];
  const query = sar_points_layer.createQuery();

  var min_value = new StatisticDefinition({
    onStatisticField: end_year_date,
    outStatisticFieldName: "min_value",
    statisticType: "min",
  });

  var max_value = new StatisticDefinition({
    onStatisticField: end_year_date,
    outStatisticFieldName: "max_value",
    statisticType: "max",
  });

  query.outFields = [end_year_date, object_id];
  query.outStatistics = [min_value, max_value];

  return sar_points_layer.queryFeatures(query).then((results: any) => {
    var stats = results.features[0].attributes;
    return stats;
  });
}

export function zoomToMinMaxRecord(view: any, value: any, end_year_date: any) {
  let highlightSelect: any;
  var query = sar_points_layer.createQuery();
  query.outFields = [end_year_date, object_id];
  query.where = `${end_year_date} = ` + value;
  view?.whenLayerView(sar_points_layer).then((layerView: any) => {
    sar_points_layer.queryFeatures(query).then((results: any) => {
      const objectID = results.features[0].attributes[object_id];
      var queryExt = new Query({
        objectIds: [objectID],
      });
      sar_points_layer.queryExtent(queryExt).then((result: any) => {
        result.extent &&
          view?.goTo({
            target: result.extent,
            speedFactor: 2,
            zoom: 17,
          });
      });

      highlightSelect && highlightSelect.remove();
      highlightSelect = layerView.highlight([objectID]);
      view?.view.on("click", () => {
        layerView.filter = new FeatureFilter({
          where: undefined,
        });
        highlightSelect.remove();
      });
    });
  });
}

export function zoomToLayer(layer: any) {
  return layer.queryExtent().then((response: any) => {
    arcgisMap?.view
      .goTo(response.extent, {
        //response.extent
        //speedFactor: 2,
      })
      .catch(function (error) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      });
  });
}

// Thousand separators function
export function thousands_separators(num: any) {
  if (num) {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }
}
