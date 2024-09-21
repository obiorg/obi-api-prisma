/**
 * 
 * Available primereact matchmode
 *  - dateIs        : date is 
 *  - dateIsNot     : date is not
 *  - dateBefore    : date is before
 *  - dateAfter     : date is after
 * 
 * Available Prisma date match mode : 
 * equals?: DateTime | DateTimeFieldRefInput | Null,
       ?     in?: DateTime[] | Null,
       ?     notIn?: DateTime[] | Null,
       ?     lt?: DateTime | DateTimeFieldRefInput,
       ?     lte?: DateTime | DateTimeFieldRefInput,
       ?     gt?: DateTime | DateTimeFieldRefInput,
       ?     gte?: DateTime | DateTimeFieldRefInput,
       ?     not?: DateTime | NestedDateTimeNullableFilter | Null
 */
exports.PRMatchModeToPrisma = (MatchMode: string) => {
  if (MatchMode === "dateIs") {
    return "in";
  } else if (MatchMode === "dateIsNot") {
    return "notIn";
  } else if (MatchMode === "dateBefore") {
    return "lte";
  } else if (MatchMode === "dateAfter") {
    return "gte";
  }
};

exports.prismaDeclarationDateMatchMode = (MatchMode: string, date:any) => {
  if (MatchMode === "dateIs") {
    return [date];
  } else if (MatchMode === "dateIsNot") {
    return [date];
  } else if (MatchMode === "dateBefore") {
    return date;
  } else if (MatchMode === "dateAfter") {
    return date;
  }else{
    console.error("Invalid MatchMode", MatchMode);
    throw new Error(`Unsupported matchmode : ${MatchMode}`);
  }
};

exports.DateTimeAdjusteTimezone = (date:Date) => {
  let newDate = date;
  newDate.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return newDate;
};


exports.isValidDate = (stringDate:string):boolean => {
  return !isNaN(Date.parse(stringDate));
}