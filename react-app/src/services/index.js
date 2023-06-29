import { cloneDeep } from "lodash";

const APIEndPoint = 'https://cgd2h41rrf.execute-api.us-east-1.amazonaws.com';

const addFeatureFlag = async (ff, featureFlags) => {
    const res = await fetch(APIEndPoint + '/feature-flag', {
        headers: { accept: "application/json" },
        method: "POST",
        body: JSON.stringify({
        userId: "nick",
        featureKey: ff.featureKey,
        targeting: ff.targeting || false,
        value: ff.value || { default: false }
        })
    })

    if (res.ok) {
        let newList = cloneDeep(featureFlags);
        newList.push(ff);
        return newList;
    }
    return featureFlags;
}

const updateFeatureFlag = async (ff, i, featureFlags) => {
    const newFeatureFlags = cloneDeep(featureFlags);
    newFeatureFlags[i] = ff;

    const res = await fetch(APIEndPoint + '/feature-flag', {
        headers: { accept: "application/json" },
        method: "PUT",
        body: JSON.stringify({
        userId: "nick",
        featureKey: ff.featureKey,
        targeting: ff.targeting || false,
        value: ff.value || { default: false }
        })
    })

    if (res.ok) {
        let newList = cloneDeep(featureFlags);
        newList[i] = ff;
        return newList;
    }
    return featureFlags;
}

const deleteFeatureFlag = async (i, featureFlags) => {
    console.log(featureFlags[i].featureKey);
    const res = await fetch(APIEndPoint + '/user/nick/feature-flag/' + featureFlags[i].featureKey, {
        headers: { accept: "application/json" },
        method: "DELETE"
    })

    if (res.ok) {
        let newFeatureFlags = cloneDeep(featureFlags);
        newFeatureFlags.splice(i, 1);
        return newFeatureFlags;
    }
    return featureFlags;
}

const getFeatureFlags = async () => {
    const res = await fetch(APIEndPoint + `/user/nick/feature-flag`, {
        headers: { accept: "application/json" },
        method: "GET",
    })

    if (res.ok) {
        const body = await res.json();
        return body;
    }
    return [];
}

export {
    addFeatureFlag,
    updateFeatureFlag,
    getFeatureFlags,
    deleteFeatureFlag
}