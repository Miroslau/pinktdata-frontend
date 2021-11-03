/* eslint-disable prefer-rest-params */
const createElementNSOrig = global.document.createElementNS;
global.document.createElementNS = function (namespaceURI, qualifiedName) {
  if (namespaceURI === 'http://www.w3.org/2000/svg') {
    if (qualifiedName === 'svg') {
      const element = createElementNSOrig.apply(this, arguments);
      element.createSVGRect = () => {};
      return element;
    }
  }
  return createElementNSOrig.apply(this, arguments);
};
