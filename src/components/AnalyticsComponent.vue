<template>
  <div class="hello" ref="chartdiv">
  </div>
</template>

<script>
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

export default {
  name: 'AnalyticsComponent',
  data: () => {
    // linearDiagramData: [
    //   { "date": "2020-07-01", "visits": 213 },
    //   { "date": "2020-07-02", "visits": 249 },
    //   { "date": "2020-07-03", "visits": 179 },
    //   { "date": "2020-07-04", "visits": 170 },
    //   { "date": "2020-07-05", "visits": 184 },
    //   { "date": "2020-07-06", "visits": 202 },
    //   { "date": "2020-07-07", "visits": 198 },
    //   { "date": "2020-07-08", "visits": 168 },
    //   { "date": "2020-07-09", "visits": 176 },
    //   { "date": "2020-07-10", "visits": 171 },
    //   { "date": "2020-07-11", "visits": 190 },
    //   { "date": "2020-07-12", "visits": 154 },
    //   { "date": "2020-07-13", "visits": 246 },
    //   { "date": "2020-07-14", "visits": 250 },
    //   { "date": "2020-07-15", "visits": 227 },
    //   { "date": "2020-07-16", "visits": 140 },
    //   { "date": "2020-07-17", "visits": 170 },
    //   { "date": "2020-07-18", "visits": 125 },
    //   { "date": "2020-07-19", "visits": 106 },
    //   { "date": "2020-07-20", "visits": 207 },
    //   { "date": "2020-07-21", "visits": 222 },
    //   { "date": "2020-07-22", "visits": 198 },
    //   { "date": "2020-07-23", "visits": 204 },
    //   { "date": "2020-07-24", "visits": 213 },
    //   { "date": "2020-07-25", "visits": 145 },
    //   { "date": "2020-07-26", "visits": 166 },
    //   { "date": "2020-07-27", "visits": 163 },
    //   { "date": "2020-07-28", "visits": 135 },
    //   { "date": "2020-07-29", "visits": 45 }
    // ]
  },
  methods: {
    increment() {
      this.$store.commit('increment')
      console.log(this.$store.state.count)
    }
  },
  mounted() {
    let root = am5.Root.new(this.$refs.chartdiv);

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        layout: root.verticalLayout
      })
    );

    // Define data
    let data = [{
        category: "Research",
        value1: 1000,
        value2: 588
      },
 {
        category: "Marketing",
        value1: 1200,
        value2: 1800
      }, {
        category: "Sales",
        value1: 850,
        value2: 1230
      }
    ];

    // Create Y-axis
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    // Create X-Axis
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {}),
        categoryField: "category"
      })
    );
    xAxis.data.setAll(data);

    // Create series
    let series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value1",
        categoryXField: "category"
      })
    );
    series1.data.setAll(data);

    let series2 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value2",
        categoryXField: "category"
      })
    );
    series2.data.setAll(data);

    // Add legend
    let legend = chart.children.push(am5.Legend.new(root, {}));
    legend.data.setAll(chart.series.values);

    // Add cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {}));

    this.root = root;
  },

  beforeUnmount() {
    if (this.root) {
      this.root.dispose();
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>