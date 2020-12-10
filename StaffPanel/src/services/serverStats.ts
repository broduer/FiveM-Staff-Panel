import serverStats from '../models/serverStats';
import moment from 'moment';

class PlayerStats {
    static async start(staffPanel: any) {
        async function loop() {
            const lastStat = await serverStats.model.find({}).sort({ _id: -1 }).limit(1);

            if (lastStat.length == 1) {

            } else {
                serverStats.set({
                    newPlayers: 0,
                    regularPlayers: 0,
                    totalWarnings: 0,
                    totalKicks: 0,
                    totalBans: 0,
                    date: moment()
                });
            };

            setTimeout(() => loop(), 5000);
        };

        loop()
    };
};

export default PlayerStats.start;