import { knownFolders } from "tns-core-modules/file-system";

export namespace MockDataService {

    export function getMockDataFor(moduleName: string): any {
        if (!moduleName) {
            return {};
        }
        return readMockData(`testdata/${moduleName}.json`);
    }

    function readMockData(fileName: string): any {
        let appFolder = knownFolders.currentApp();
        let mockData = appFolder.getFile(fileName);
        
        return JSON.parse(mockData.readTextSync());
    }

}