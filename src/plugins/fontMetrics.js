const _ = require("lodash");

module.exports = function ({ ascender, capitalHeight, descender, emSquare }) {
  // convert metric to relative emSquare
  function remsq(metric) {
    return (Math.abs(metric) / emSquare).toPrecision(2);
  }

  // convert rem to capital height (px)
  function capHeight(rem) {
    return (parseFloat(rem) * 16 * remsq(capitalHeight)).toPrecision(2);
  }

  function fontSize(capHeight) {
    return (capHeight / remsq(capitalHeight)).toPrecision(2);
  }

  function lineHeight(lineHeight, capHeight) {
    return (lineHeight * capHeight - valign(capHeight)).toPrecision(2);
  }

  function valign(capHeight) {
    const distanceBottom = remsq(descender);
    const distanceTop = remsq(ascender) - remsq(capitalHeight);
    return ((distanceBottom - distanceTop) * fontSize(capHeight)).toPrecision(
      2
    );
  }

  function capitalHeights(fontSizes) {
    return _.map(fontSizes, (value, modifier) => {
      return [modifier, capHeight(value)];
    });
  }

  return function ({ addUtilities, e, theme, variants }) {
    const capHeights = capitalHeights(theme("fontSize"));

    const fontSizes = _.fromPairs(
      _.map(capHeights, ([modifier, capHeight]) => {
        const selector = ["text", modifier];
        return [
          "." + e(selector.join("-")),
          {
            "font-size": fontSize(capHeight) + "px",
          },
        ];
      })
    );
    addUtilities(fontSizes, variants("fontSize"));

    // line-heights are custom per font-size
    const lineHeights = _.fromPairs(
      _.flatMap(theme("lineHeight"), (value, modifier) => {
        return _.map(capHeights, ([fontSizeModifier, capHeight]) => {
          const selector = ["leading", fontSizeModifier, modifier];
          return [
            "." + e(selector.join("-")),
            {
              "line-height": lineHeight(value, capHeight) + "px",
            },
          ];
        });
      })
    );
    addUtilities(lineHeights, variants("lineHeight"));

    const verticalAligns = _.fromPairs(
      _.map(capHeights, ([modifier, capHeight]) => {
        const selector = ["align", modifier];
        return [
          "." + e(selector.join("-")),
          {
            "vertical-align": `-${valign(capHeight)}px`,
          },
        ];
      })
    );
    addUtilities(verticalAligns, variants("verticalAlign"));

    const heights = _.fromPairs(
      _.map(capHeights, ([modifier, capHeight]) => {
        const selector = ["h", modifier];
        return [
          "." + e(selector.join("-")),
          {
            height: capHeight + "px",
          },
        ];
      })
    );
    addUtilities(heights, variants("height"));

    const widths = _.fromPairs(
      _.map(capHeights, ([modifier, capHeight]) => {
        const selector = ["w", modifier];
        return [
          "." + e(selector.join("-")),
          {
            width: capHeight + "px",
          },
        ];
      })
    );
    addUtilities(widths, variants("width"));
  };
};
