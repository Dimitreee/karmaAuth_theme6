export const getAbsolutePosition = (element) => {
  const r = { x: element.offsetLeft, y: element.offsetTop };
  if (element.offsetParent) {
    const tmp = getAbsolutePosition(element.offsetParent);
    r.x += tmp.x;
    r.y += tmp.y;
  }
  return r;
};

export const getRelativeCoordinates = (
  event,
  reference
): { x: number; y: number } => {
  const pos = getAbsolutePosition(reference);
  return { x: event.pageX - pos.x, y: event.pageY - pos.y };
};