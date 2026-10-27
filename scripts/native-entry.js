// Tek bir Capacitor kopyası ile telefon eklentilerini ve Niimbot yazıcı kütüphanesini paketler.
import { Capacitor, registerPlugin } from "@capacitor/core";
import { BleClient } from "@capacitor-community/bluetooth-le";
import * as niimbluelib from "@mmote/niimbluelib";
window.Capacitor = Capacitor;
window.capRegisterPlugin = registerPlugin;
window.BleClient = BleClient;
window.niimbluelib = niimbluelib;
