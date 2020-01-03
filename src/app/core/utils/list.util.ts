export function groupByObjectNumberAttribute(data: object[], attributeKey: string): { [key: number]: object[] } | any {
  const groupByMapper: { [key: number]: object[] } = {};
  data.forEach(elem => {
    groupByMapper[elem[attributeKey]] = groupByMapper[elem[attributeKey]] ? (groupByMapper[elem[attributeKey]]).concat([elem]) : [elem];
  });
  return groupByMapper;
}

export function groupByObjectStringAttribute(data: object[], attributeKey: string): { [key: string]: object[] } | any {
  const groupByMapper: { [key: string]: object[] } = {};
  data.forEach(elem => {
    groupByMapper[elem[attributeKey]] = groupByMapper[elem[attributeKey]] ? (groupByMapper[elem[attributeKey]]).concat([elem]) : [elem];
  });
  return groupByMapper;
}
