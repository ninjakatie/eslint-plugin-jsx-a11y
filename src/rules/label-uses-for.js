/**
 * @fileoverview Enforce label tags have htmlFor attribute.
 * @author Ethan Cohen
 */
'use strict';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import hasAttribute from '../util/hasAttribute';
import getNodeType from '../util/getNodeType';

const errorMessage = 'Form controls using a label to identify them must be ' +
  'programmatically associated with the control using htmlFor';

module.exports = context => ({
  JSXOpeningElement: node => {
    const typeCheck = [ 'label' ].concat(context.options[0]);
    const nodeType = getNodeType(node);

    // Only check 'label' elements and custom types.
    if (typeCheck.indexOf(nodeType) === -1) {
      return;
    }

    const hasHtmlForAttr = hasAttribute(node.attributes, 'htmlFor');

    if (hasHtmlForAttr === false) {
      context.report({
        node,
        message: errorMessage
      });
    }
  }
});

module.exports.schema = [
  {
    "oneOf": [
      { "type": "string" },
      {
        "type": "array",
        "items": {
          "type": "string"
        },
        "minItems": 1,
        "uniqueItems": true
      }
    ]
  }
];
