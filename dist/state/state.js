export class StateManagement {
    constructor() {
        this.checkStatus = 'active';
        this.pushInput = [];
        this.getList = [];
        this.addInput = (title, description, people, status) => {
            let dataPacket = {
                id: Math.random().toString(),
                title: title,
                description: description,
                people: people,
                status: status
            };
            this.checkStatus = status;
            this.pushInput.push(dataPacket);
            console.log(...this.pushInput);
        };
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new StateManagement();
        return this.instance;
    }
    getListOfProject() {
        return [...this.pushInput];
    }
}
export const projectState = StateManagement.getInstance();
//# sourceMappingURL=state.js.map