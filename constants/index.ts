export const PROTECTED_ROUTES = ["/dashboard"];
export const codeInit = `import { TrackerStorageClient } from "tracker-storage";

const TrackerStorage = new TrackerStorageClient(API_KEY);
export default TrackerStorage;
`
export const trackMethod = `
TrackerStorage.track()
/*
It takes 2 parameters

The first one is an object that you want to store, 
for example an error (see below)

The second is an object in which you pass a name of what you 
are currently tracking and the type (see below)
*/
`
export const codeExample = `...
import TrackerStorage from "@/tracker-storage.ts"

try {
    ...
    const res = await fetch(url);
    ...
}catch(err){
    ...
    TrackerStorage.track({page:"/dashboard", err}, {name:"Error on fetch", "FAIL"});
}
`