export async function simulatePurchase() {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const shouldSucceed = Math.random() < 0.9;
  
  if (!shouldSucceed) {
    throw new Error("Payment failed. Please try again.");
  }
  
  return { success: true, orderId: Math.random().toString(36).substr(2, 9) };
} 