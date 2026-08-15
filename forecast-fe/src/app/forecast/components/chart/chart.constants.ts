
export const AXIS_STYLES = {
  LEGEND_FONT_FAMILY: 'Inter, sans-serif',
  AXES_FONT_FAMILY: 'Roboto Mono, sans-serif',
  X_AXIS: {
    LABEL: 7,
    VALUES: 7,
  },
  Y_AXIS: {
    LABEL: 7,
    VALUES: 7,
  },
};

export const CHART_THEME = {
  color: ['#7dbaff', '#3399ff', '#1464ff', '#0051e0', '#3dd9d6', '#b38aff'],

  backgroundColor: 'transparent',

  textStyle: {
    fontFamily: AXIS_STYLES.AXES_FONT_FAMILY,
    fontSize: 10,
    color: '#ffffff',
  },

  tooltip: {
    backgroundColor: 'rgba(39, 39, 44, 1)',
    borderColor: 'rgba(39, 39, 44, 1)',
    textStyle: {
      color: '#ffffff',
    },
  },

  legend: {
    textStyle: {
      color: '#ffffff',
    },
  },

  xAxis: {
    axisLabel: {
      color: '#ffffff',
      interval: 'auto',
    },

    nameTextStyle: {
      fontFamily: AXIS_STYLES.AXES_FONT_FAMILY,
      color: '#ffffff',
    },
    nameLocation: 'middle',
  },

  yAxis: {
    axisLabel: {
      color: '#ffffff',
    },
    nameTextStyle: {
      fontFamily: AXIS_STYLES.AXES_FONT_FAMILY,
      color: '#ffffff',
    },
    nameLocation: 'middle',
  },
};
