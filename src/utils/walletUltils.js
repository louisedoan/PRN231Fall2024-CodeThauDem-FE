export function initializeWallet() {
  if (!localStorage.getItem("virtualWallet")) {
    localStorage.setItem("virtualWallet", JSON.stringify({ balance: 1000000 }));
  }
}

export function getWalletBalance() {
  const wallet = JSON.parse(localStorage.getItem("virtualWallet"));
  return wallet ? wallet.balance : 0;
}
