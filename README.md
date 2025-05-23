# ZePay - Akıllı Bordro Yönetim Sistemi

ZePay, Stellar blockchain üzerinde çalışan yenilikçi bir bordro yönetim sistemidir. İşverenlerin çalışanlarına güvenli ve zamanında ödeme yapmalarını sağlayan akıllı kontrat tabanlı çözümdür.

## 🚀 Özellikler

- **⏰ Zamanlanmış Ödemeler**: Belirli tarihlerde otomatik maaş ödemeleri
- **🔒 Güvenli Kasa Sistemi**: Stellar blockchain güvenliği
- **💰 Çoklu Token Desteği**: Farklı token türleriyle ödeme imkanı
- **📱 Modern Web Arayüzü**: React tabanlı kullanıcı dostu interface
- **🔍 Şeffaf Takip**: Ödeme durumlarının gerçek zamanlı kontrolü

## 🏗️ Teknoloji Stack

### Backend (Akıllı Kontrat)
- **Soroban**: Stellar'ın akıllı kontrat platformu
- **Rust**: Performanslı ve güvenli kontrat geliştirme
- **Stellar SDK**: Blockchain entegrasyonu

### Frontend
- **React 18**: Modern UI geliştirme
- **TypeScript**: Tip güvenli kod yazımı
- **Tailwind CSS**: Hızlı ve esnek styling
- **Vite**: Hızlı geliştirme ortamı

## 📁 Proje Yapısı

```
ZePay/
├── src/                    # Akıllı kontrat kaynak kodları
│   ├── lib.rs             # Ana kontrat implementasyonu
│   └── test.rs            # Unit testler
├── frontend/              # Web arayüzü
│   ├── src/               # React bileşenleri
│   ├── package.json       # Frontend bağımlılıkları
│   └── ...
├── Cargo.toml             # Rust proje yapılandırması
└── README.md              # Proje dokümantasyonu
```

## 🛠️ Kurulum ve Geliştirme

### Gereksinimler
- Rust (edition 2021)
- Node.js (v18+)
- Soroban CLI

### Akıllı Kontrat Geliştirme
```bash
# Kontratı derle
cargo build --target wasm32-unknown-unknown --release

# Testleri çalıştır
cargo test
```

### Frontend Geliştirme
```bash
cd frontend
npm install
npm run dev
```

## 📋 Ana Fonksiyonlar

### `assign_salary()`
İşverenin çalışanına maaş ataması yapması
- Maaş miktarı, token türü ve ödeme tarihini belirler
- Fonları güvenli kasaya kilitler

### `claim_salary()`
Çalışanın maaşını talep etmesi
- Ödeme zamanı kontrolü yapar
- Maaşı çalışan hesabına transfer eder

### `check_status()`
Maaş durumunu sorgulama
- Maaş miktarı ve ödeme tarihi bilgilerini döndürür

## 🔧 Kullanım Senaryosu

1. **İşveren**: Çalışanlarına maaş atar ve ödeme tarihini belirler
2. **Sistem**: Fonları güvenli kasada tutar
3. **Çalışan**: Ödeme tarihi geldiğinde maaşını talep eder
4. **Kontrat**: Otomatik olarak maaşı çalışana transfer eder

## 🤝 Katkıda Bulunma

Projeye katkıda bulunmak için:
1. Repository'yi fork edin
2. Feature branch oluşturun
3. Değişikliklerinizi commit edin
4. Pull request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---

**ZePay ile bordro yönetiminde yeni bir çağ başlıyor! 🚀**