# Servis Depo

Oto servis için depo ve iş emri uygulaması (Android). İnternetsiz çalışır; bütün kayıtlar telefonun hafızasında tutulur.

- QR ve kutu barkodu okuma (canlı kamera)
- Malzeme giriş / çıkış, raf takibi, raf sayımı
- QR etiket hazırlama ve etiket yazıcısının uygulamasına gönderme
- Kutudaki yazıları okuyup ürün kartını doldurma (internetsiz)
- Araç geçmişi, model tecrübesi, km'ye göre bakım önerisi
- KDV'li fiyat teklifi ve WhatsApp ile gönderme
- Yedek alma / yedekten yükleme

## APK

Her değişiklikte GitHub Actions APK'yı otomatik derler. En son sürüm: **Releases › servis-depo.apk**

## Geliştirme

```
npm ci
npm run build                 # kütüphaneleri www/vendor'a kopyalar ve Android'e aktarır
cd android && ./gradlew assembleRelease
```
