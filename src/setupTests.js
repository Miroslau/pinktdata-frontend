/* eslint-disable prefer-rest-params */
const createElementNSOrig = global.document.createElementNS;
global.document.createElementNS = (namespaceURI, qualifiedName) => {
  if (namespaceURI === 'http://www.w3.org/2000/svg') {
    if (qualifiedName === 'svg') {
      // eslint-disable-next-line no-undef
      const element = createElementNSOrig.apply(this, arguments);
      element.createSVGRect = () => {};
      return element;
    }
  }
  // eslint-disable-next-line no-undef
  return createElementNSOrig.apply(this, arguments);
};
