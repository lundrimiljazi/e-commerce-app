export async function simulatePurchase() {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const shouldSucceed = Math.random() < 0.7;
  
  if (!shouldSucceed) {
    throw new Error("Payment failed. Please try again.");
  }
  
  return { success: true, orderId: Math.random().toString(36) };
} 