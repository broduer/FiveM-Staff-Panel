import Logger from '../Logger';

class playerDisconnected {
    handel(staffPanel: any, data: any) {
        const cache = staffPanel.cache.get("players");
        cache ? delete cache[data.id] : Logger(`${data.name} (${data.id}) wasn't found in the cache.`);
    };
};

export default playerDisconnected;