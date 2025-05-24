# 🏛 ZePay – Cross-Border Payroll Vault on Stellar

[![Website](https://img.shields.io/badge/Website-Live-brightgreen)](https://atayigit.my.canva.site/)
[![Stellar](https://img.shields.io/badge/Stellar-Soroban-blue)](https://soroban.stellar.org/)
[![Rust](https://img.shields.io/badge/Rust-1.87.0-orange)](https://www.rust-lang.org/)
[![WASM](https://img.shields.io/badge/WebAssembly-Ready-purple)](https://webassembly.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

ZePay is a decentralized, time-locked payroll system built with **Soroban SDK** on the **Stellar Blockchain**. It enables employers to pre-deposit salaries into smart contract vaults that unlock at a specific time, allowing employees to claim their payments **securely, transparently, and without intermediaries**. ZePay is designed for DAOs, remote teams, and Web3-native organizations aiming to streamline international salary disbursements.

## 🌐 Live Demo & Website

**🔗 [Visit ZePay Live Website](https://atayigit.my.canva.site/)**

Experience ZePay in action with our interactive demo and comprehensive project showcase.

---

## 📱 User Interface Preview

### Dashboard Overview
![ZePay Dashboard](./images/Ekran%20görüntüsü%202025-05-23%20165027.png)

### Payroll Management
![Payroll Interface](./images/Ekran%20görüntüsü%202025-05-23%20165015.png)

### Employee Portal
![Employee Dashboard](./images/Ekran%20görüntüsü%202025-05-23%20164949.png)

### Smart Contract Interaction
![Contract Interface](./images/Ekran%20görüntüsü%202025-05-23%20164924.png)

### Transaction History
![Transaction View](./images/Ekran%20görüntüsü%202025-05-23%20162958.png)

### Settings & Configuration
![Settings Panel](./images/Ekran%20görüntüsü%202025-05-23%20162855.png)

### Analytics Dashboard
![Analytics](./images/Ekran%20görüntüsü%202025-05-23%20162726.png)

---

## 👨‍💻 Developers

- **Ata Kılıç**  
  3rd year Computer Engineering student  
  Web3 Hackathon Winner | Smart Contract Developer  

- **Yiğit Güneş**  
  3rd year Computer Engineering student  
  Web3 Hackathon Winner | Systems & Infrastructure  

---

## 🧠 Project Vision

> ZePay is built to power the future of remote work, where payrolls are **instant**, **global**, and **trustless**.  
> By eliminating the need for banks and payment processors, ZePay empowers both employers and workers with a borderless financial tool that just works — on time, every time.

---

## 🎯 Key Use Cases

### 🌍 **Global Remote Teams**
- Instant cross-border salary payments
- No banking intermediaries or high fees
- Automatic time-locked salary releases

### 🏛 **Decentralized Organizations (DAOs)**
- Transparent contributor compensation
- Smart contract-based escrow system
- Community-verifiable payment schedules

### 💼 **Freelance & Contract Work**
- Secure milestone-based payments
- Automated release upon completion
- Dispute-free payment guarantee

### 🚀 **Crypto-Native Startups**
- Multi-token salary support
- Programmable payment logic
- Integration with DeFi protocols

---

## 🔧 Smart Contract Features

- **`assign_salary(employer, worker, token, amount, release_time)`**  
  Pre-load a payroll vault with funds locked until a given timestamp.

- **`claim_salary(worker)`**  
  Allows the employee to withdraw funds once the release time has passed.

- **`check_status(worker)`**  
  Returns the salary amount and release timestamp for a given address.

---

## 🏗 Technical Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend UI   │────│  Soroban Smart   │────│  Stellar Core   │
│  (React/TS)     │    │    Contract      │    │   Blockchain    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌──────────────────┐
                    │   Token Layer    │
                    │ (Multi-Currency) │
                    └──────────────────┘
```

---

## 📁 Project Structure

```
ZePay/
├── 📱 Frontend UI Mockups
│   ├── Dashboard Design
│   ├── Payroll Management
│   ├── Employee Portal
│   └── Analytics Interface
├── 🔧 Smart Contracts
│   ├── Cargo.toml
│   └── src/
│       ├── lib.rs (Core Contract)
│       └── test.rs (Unit Tests)
├── 🌐 Web Interface
│   ├── Live Demo Site
│   └── Interactive Prototype
└── 📚 Documentation
    ├── Technical Specs
    └── User Guides
```

---

## ⚙️ Installation Guide

### Requirements

- [Rust](https://www.rust-lang.org/tools/install) (v1.87.0+)
- [Soroban CLI](https://soroban.stellar.org/docs/getting-started/setup) (`cargo install soroban-cli`)
- [Stellar Account](https://developers.stellar.org/docs/learn/testnet/) & Testnet Tokens
- [Node.js](https://nodejs.org/) (v18+ for frontend)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/ZePay.git
cd ZePay

# Install Rust WASM target
rustup target add wasm32-unknown-unknown

# Build the smart contract
cargo build --target wasm32-unknown-unknown --release

# Run tests
cargo test

# Deploy to Stellar Testnet
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/zepay.wasm \
  --network testnet \
  --source <your_stellar_account>
```

---

## 🚀 Live Deployment

### Testnet Contract Address
```
Contract ID: [Coming Soon - Deploy to Testnet]
Network: Stellar Testnet
Status: ✅ Ready for Testing
```

### Interactive CLI Commands

```bash
# Assign salary to a worker
soroban contract invoke \
  --id <CONTRACT_ID> \
  --function assign_salary \
  --arg <EMPLOYER_ADDR> \
  --arg <WORKER_ADDR> \
  --arg <TOKEN_ADDR> \
  --arg 1000 \
  --arg 1735689600

# Check worker status
soroban contract invoke \
  --id <CONTRACT_ID> \
  --function check_status \
  --arg <WORKER_ADDR>

# Claim salary (after release time)
soroban contract invoke \
  --id <CONTRACT_ID> \
  --function claim_salary \
  --arg <WORKER_ADDR>
```

---

## 🎨 Design Philosophy

**🎯 User-First Experience**  
Every interaction is designed for simplicity, from one-click payments to instant status checks.

**⚡ Performance Optimized**  
Built with Rust and WebAssembly for lightning-fast execution on Stellar's network.

**🔒 Security by Design**  
Time-locked vaults, immutable smart contracts, and cryptographic verification ensure fund safety.

**🌍 Global Accessibility**  
Multi-language support and cross-border functionality from day one.

---

## 🌈 Visual Identity

> **Design Concept**: Futuristic digital finance with a **bull mascot** representing strength, trust, and prosperity in decentralized markets. The UI features bright, optimistic colors symbolizing **abundance** and **new frontiers** in Web3 finance.

---

## 🔮 Roadmap

### Phase 1: Core Implementation ✅
- [x] Smart contract development
- [x] Basic UI mockups
- [x] Unit testing suite
- [x] WASM compilation

### Phase 2: Advanced Features 🚧
- [ ] Multi-signature support
- [ ] Batch payment processing
- [ ] DeFi protocol integration
- [ ] Mobile application

### Phase 3: Enterprise Ready 📅
- [ ] White-label solutions
- [ ] API documentation
- [ ] Enterprise dashboard
- [ ] Compliance tools

---

## 🏆 Why ZePay Will Win

### 💡 **Innovation Factor**
First-of-its-kind time-locked payroll system on Stellar, solving real problems for Web3 organizations.

### 🎯 **Market Timing**
Perfect alignment with the growing remote work trend and DAO proliferation.

### 👨‍💻 **Technical Excellence**
Built by experienced hackathon winners with proven Web3 development skills.

### 🌐 **Complete Solution**
Full-stack approach from smart contracts to polished user interface.

### 📈 **Scalability**
Stellar's low fees and fast transactions make global adoption feasible.

---

## 📊 Competitive Analysis

| Feature | ZePay | Traditional Payroll | Other Crypto Solutions |
|---------|-------|-------------------|----------------------|
| **Global Reach** | ✅ Instant | ❌ Days/Weeks | ⚠️ Limited |
| **Transaction Fees** | ✅ <$0.01 | ❌ $15-50 | ⚠️ $5-20 |
| **Transparency** | ✅ Full | ❌ None | ⚠️ Partial |
| **Time-Lock Security** | ✅ Built-in | ❌ Manual | ❌ Not Available |
| **User Experience** | ✅ Web3 Native | ❌ Legacy | ⚠️ Technical |

---

## 🤝 Acknowledgements

* **Built with** [Soroban SDK](https://soroban.stellar.org/)
* **Powered by** [Stellar Network](https://developers.stellar.org/docs/learn/testnet/)
* **Designed at** [Canva Design Platform](https://www.canva.com/)
* **Inspired by** the future of borderless work

---

## 📞 Contact & Demo

**🌐 Website**: [https://atayigit.my.canva.site/](https://atayigit.my.canva.site/)  
**📧 Email**: Contact us through the website  
**💬 Demo**: Live interactive demo available on our website  

---

## 📝 License

MIT License - Feel free to build upon our work!

---

<div align="center">

**🚀 Ready to revolutionize payroll? [Try ZePay Now!](https://atayigit.my.canva.site/) 🚀**

*Making global payments as easy as sending a message.*

</div>