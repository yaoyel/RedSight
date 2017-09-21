import { Instance } from "./Instance";
declare function getDocs(): void;
declare function scheduleSave(instance: Instance): void;
declare function getInstance(id: string, ip: string): any;
declare function instanceInfo(): {
    id: string;
    users: any;
}[];
export { getDocs, getInstance, instanceInfo, scheduleSave };
