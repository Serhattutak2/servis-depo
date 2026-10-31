// Firebase (telefonlar arası eşitleme). Sadece eşitleme açıksa yüklenir.
import { initializeApp } from "firebase/app";
import { initializeAuth, indexedDBLocalPersistence, signInAnonymously } from "firebase/auth";
import {
  initializeFirestore, persistentLocalCache, persistentSingleTabManager,
  doc, collection, setDoc, getDoc, getDocs, deleteDoc, onSnapshot, query, orderBy, limit,
  writeBatch, increment, waitForPendingWrites
} from "firebase/firestore";
window.FB = {
  initializeApp, initializeAuth, indexedDBLocalPersistence, signInAnonymously,
  initializeFirestore, persistentLocalCache, persistentSingleTabManager,
  doc, collection, setDoc, getDoc, getDocs, deleteDoc, onSnapshot, query, orderBy, limit,
  writeBatch, increment, waitForPendingWrites
};
