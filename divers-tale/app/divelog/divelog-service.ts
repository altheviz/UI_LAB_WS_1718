import {DivelogListItem} from "./divelog-list/divelog-list-item";
import * as localStorage from "nativescript-localstorage";
import {DivelogViewModel} from "../../platforms/android/build/intermediates/assets/F0F1F2F3F4F5F6/debug/app/divelog/divelog-view/divelog-view-model";

export class DivelogService {
    private logData;

    constructor() {
    }

    loadDivelogs() {

        let divelogs = localStorage.getItem('divelogs');

        if (divelogs == null) {
            divelogs = new Array<DivelogViewModel> ();
        } else {
            divelogs = JSON.parse(divelogs);
        }

        return divelogs;
    }
}