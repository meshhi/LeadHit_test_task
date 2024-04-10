<template>
  <v-container class='bg-red-lighten-5' fluid style="height: 99.9vh;">
    <v-row class="fill-height">
      <v-col>
        <div class="linearChart" ref="chartdiv"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5locales_ru_RU from "@amcharts/amcharts5/locales/ru_RU";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

export default {
  name: 'AnalyticsComponent',
  mounted() {
    let root = am5.Root.new(this.$refs.chartdiv);

    root.setThemes([am5themes_Animated.new(root)]);
    root.locale = am5locales_ru_RU;

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft: 0
      })
    );

    chart.children.unshift(am5.Label.new(root, {
      text: "Аналитика по визитам",
      fontSize: 25,
      fontWeight: "500",
      textAlign: "center",
      x: am5.percent(50),
      centerX: am5.percent(50),
      paddingTop: 0,
      paddingBottom: 0
    }));

    // Define data
    let data = this.$store.state.visitsData.map(item => {
      return {
        date: new Date(item.date).getTime(),
        visits: item.visits
      }
    });

    // Create X-Axis
    let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      maxDeviation: 0.2,
      baseInterval: {
        timeUnit: "day",
        count: 1
      },
      renderer: am5xy.AxisRendererX.new(root, {
        minorGridEnabled: true
      }),
      tooltip: am5.Tooltip.new(root, {})
    }));
    xAxis.data.setAll(data);

    // Create Y-axis
    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {
        pan: "zoom"
      })
    }));

    // Create series
    let series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: "date",
        valueYField: "visits",
        tooltip: am5.Tooltip.new(root, {
          labelText: "[bold]Дата: {date.formatDate(\"dd.MM.YYYY\")}[/]\n[bold]Визитов: {visits}[/]"
        })
      })
    );
    series.data.setAll(data);

    // Add cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {}));

    series.appear(1000);
    chart.appear(1000, 100);

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
<style scoped>
.linearChart {
  height: 100%;
  width: 100%;
}
</style>