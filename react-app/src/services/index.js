import { cloneDeep } from "lodash";

const APIEndPoint = 'https://cgd2h41rrf.execute-api.us-east-1.amazonaws.com';
const getBody = (req) => {
    let buff = Buffer.from(req.body, "base64");
    let eventBodyStr = buff.toString('UTF-8');
    return JSON.parse(eventBodyStr);
}

const addFeatureFlag = async (ff, featureFlags) => {
    const { data, error } = await fetch(APIEndPoint + '/feature-flag', {
        headers: { accept: "application/json" },
        method: "POST",
        body: JSON.stringify({
        userId: "nick",
        featureKey: ff.featureKey,
        targeting: ff.targeting,
        value: ff.value
        })
    })
    if (error) { console.log(error) }
    if (data) {
        let newList = cloneDeep(featureFlags);
        newList.push(ff);
        return newList;
    }
}

const updateFeatureFlag = async (ff, i, featureFlags) => {
    const newFeatureFlags = cloneDeep(featureFlags);
    newFeatureFlags[i] = ff;

    const { data, error } = await fetch(APIEndPoint + '/feature-flag', {
        headers: { accept: "application/json" },
        method: "PUT",
        body: JSON.stringify({
        userId: "nick",
        featureKey: ff.featureKey,
        targeting: ff.targeting,
        value: ff.value
        })
    })
    if (error) { console.log(error) }
    if (data) {
        let newList = cloneDeep(featureFlags);
        newList[i] = ff;
        return newList;
    }
}

const getFeatureFlags = async () => {
    const res = await fetch(APIEndPoint + `/user/nick/feature-flag`, {
        headers: { accept: "application/json" },
        method: "GET",
    })
    const body = await res.json();
    console.log(body);
    // if (error) { console.log(error) }
    if (body) {
        return body;
    }
    return [];
}

export {
    addFeatureFlag,
    updateFeatureFlag,
    getFeatureFlags
}