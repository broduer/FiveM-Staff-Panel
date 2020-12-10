class PanelCache {
    public data: any;
    public get: any;
    public set: any;
    public delete: any

    constructor() {
        this.data = {};

        this.get = function(key: string) {
            return this.data[key]
        };
    
        this.set = function(key: string, value: any) {
            return this.data[key] = value;
        };
    
        this.delete = function(key: string) {
            return delete this.data[key];
        };
    };
};

export default PanelCache;