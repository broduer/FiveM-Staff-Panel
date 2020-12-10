import playerSchema from '../../models/playerSchema';
import moment from 'moment';

class PlayerConnected {
    async handel(staffPanel: any, data: any) {
        // const player = await playerSchema.get({ identifiers: { license: data.identifiers.license }});
        
        // if (player) {
        //     playerSchema.update({ identifiers: { license: data.identifiers.license }}, {
        //         name: data.name,
        //         identifiers: data.identifiers,
        //         lastJoined: moment()
        //     });
        // } else {
        //     playerSchema.set({
        //         name: data.name,
        //         identifiers: data.identifiers,
        //         lastJoined: moment(),
        //         firstJoined: moment(),
        //         playtime: 0,
        //         trustScore: 50
        //     });
        // }

        // (staffPanel.cache.get("players") || staffPanel.cache.set("players", {}))[data.id] = data;
    };
};

export default PlayerConnected;
