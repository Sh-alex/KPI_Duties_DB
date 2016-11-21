// direction
export const SORT_ASC = "SORT_ASC";
export const SORT_DESC = "SORT_DESC";

// field
export const OCCUPATION_GROUP = "OCCUPATION_GROUP";
export const OCCUPATION_NAME = "OCCUPATION_NAME";
export const START_IN_STATE_DATE = "START_IN_STATE_DATE";
export const STOP_IN_STATE_DATE = "STOP_IN_STATE_DATE";
export const START_IN_KPI_DATE = "START_IN_KPI_DATE";
export const STOP_IN_KPI_DATE = "STOP_IN_KPI_DATE";

export function sortSearchResData({data, field, direction, occupationGroupList}) {
    let val1, val2;
    switch (field) {
        case OCCUPATION_GROUP:
            let occupGrHashTbl = occupationGroupList.items.reduce((res, item) => {
                res[item.id] = item.textValue;
                return res;
            }, {});
            return {
                itemsById: data.itemsById,
                itemsList: data.itemsList.sort( (id1, id2) => {
                    val1 = occupGrHashTbl[ data.itemsById[id1].data.occupationGroup ] || "";
                    val2 = occupGrHashTbl[ data.itemsById[id2].data.occupationGroup ] || "";
                    if ( (direction == SORT_ASC && (val1 > val2)) || (direction == SORT_DESC && (val1 < val2)) )
                        return 1;
                    if ( (direction == SORT_ASC && (val1 < val2)) || (direction == SORT_DESC && (val1 > val2)) )
                        return -1;
                    return 0;
                })
            };
        case OCCUPATION_NAME:
            return {
                itemsById: data.itemsById,
                itemsList: data.itemsList.sort( (id1, id2) => {
                    val1 = data.itemsById[id1].data.occupationName;
                    val2 = data.itemsById[id2].data.occupationName;
                    if ( (direction == SORT_ASC && (val1 > val2)) || (direction == SORT_DESC && (val1 < val2)) )
                        return 1;
                    if ( (direction == SORT_ASC && (val1 < val2)) || (direction == SORT_DESC && (val1 > val2)) )
                        return -1;
                    return 0;
                })
            };
        case START_IN_STATE_DATE:
            return {
                itemsById: data.itemsById,
                itemsList: data.itemsList.sort( (id1, id2) => {
                    val1 = Math.min(
                        ...(data.itemsById[id1].data.durations.reduce((res, d) => {
                            if(!d.inKpi)
                                res.push(new Date(d.start) !== "Invalid Date" && new Date(d.start) || 0);
                            return res;
                        }, []) || [0] )
                    );
                    val2 = Math.min(
                        ...(data.itemsById[id2].data.durations.reduce((res, d) => {
                            if(!d.inKpi)
                                res.push(new Date(d.start) !== "Invalid Date" && new Date(d.start) || 0);
                            return res;
                        }, []) || [0] )
                    );
                    if ( (direction == SORT_ASC && (val1 > val2)) || (direction == SORT_DESC && (val1 < val2)) )
                        return 1;
                    if ( (direction == SORT_ASC && (val1 < val2)) || (direction == SORT_DESC && (val1 > val2)) )
                        return -1;
                    return 0;
                })
            };
        case STOP_IN_STATE_DATE:
            return {
                itemsById: data.itemsById,
                itemsList: data.itemsList.sort( (id1, id2) => {
                    val1 = Math.max(
                        ...(data.itemsById[id1].data.durations.reduce((res, d) => {
                            if(!d.inKpi)
                                res.push(new Date(d.stop) !== "Invalid Date" && new Date(d.stop) || 0);
                            return res;
                        }, []) || [0] )
                    );
                    val2 = Math.max(
                        ...(data.itemsById[id2].data.durations.reduce((res, d) => {
                            if(!d.inKpi)
                                res.push(new Date(d.stop) !== "Invalid Date" && new Date(d.stop) || 0);
                            return res;
                        }, []) || [0] )
                    );
                    if ( (direction == SORT_ASC && (val1 > val2)) || (direction == SORT_DESC && (val1 < val2)) )
                        return 1;
                    if ( (direction == SORT_ASC && (val1 < val2)) || (direction == SORT_DESC && (val1 > val2)) )
                        return -1;
                    return 0;
                })
            };
        case START_IN_KPI_DATE:
            return {
                itemsById: data.itemsById,
                itemsList: data.itemsList.sort( (id1, id2) => {
                    val1 = Math.min(
                        ...(data.itemsById[id1].data.durations.reduce((res, d) => {
                            if(d.inKpi)
                                res.push(new Date(d.start) !== "Invalid Date" && new Date(d.start) || 0);
                            return res;
                        }, []) || [0] )
                    );
                    val2 = Math.min(
                        ...(data.itemsById[id2].data.durations.reduce((res, d) => {
                            if(d.inKpi)
                                res.push(new Date(d.start) !== "Invalid Date" && new Date(d.start) || 0);
                            return res;
                        }, []) || [0] )
                    );
                    if ( (direction == SORT_ASC && (val1 > val2)) || (direction == SORT_DESC && (val1 < val2)) )
                        return 1;
                    if ( (direction == SORT_ASC && (val1 < val2)) || (direction == SORT_DESC && (val1 > val2)) )
                        return -1;
                    return 0;
                })
            };
        case STOP_IN_KPI_DATE:
            return {
                itemsById: data.itemsById,
                itemsList: data.itemsList.sort( (id1, id2) => {
                    val1 = Math.max(
                        ...(data.itemsById[id1].data.durations.reduce((res, d) => {
                            if(d.inKpi)
                                res.push(new Date(d.stop) !== "Invalid Date" && new Date(d.stop) || 0);
                            return res;
                        }, []) || [0] )
                    );
                    val2 = Math.max(
                        ...(data.itemsById[id2].data.durations.reduce((res, d) => {
                            if(d.inKpi)
                                res.push(new Date(d.stop) !== "Invalid Date" && new Date(d.stop) || 0);
                            return res;
                        }, []) || [0] )
                    );
                    if ( (direction == SORT_ASC && (val1 > val2)) || (direction == SORT_DESC && (val1 < val2)) )
                        return 1;
                    if ( (direction == SORT_ASC && (val1 < val2)) || (direction == SORT_DESC && (val1 > val2)) )
                        return -1;
                    return 0;
                })
            };
        default:
            return data;
    }
}