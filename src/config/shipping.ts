/**
 * MANATAHOME Shipping Promotions Configuration
 * Configurable shipping thresholds and standard rates for US and European markets.
 */

export interface ShippingConfig {
  standardFreeThresholdUSD: number;
  expressFreeThresholdUSD: number;
  standardShippingRateUSD: number;
  expressShippingRateUSD: number;
  standardFreeThresholdEUR: number;
  expressFreeThresholdEUR: number;
  standardShippingRateEUR: number;
  expressShippingRateEUR: number;
}

export const SHIPPING_CONFIG: ShippingConfig = {
  // Configurable thresholds as requested:
  // - FREE STANDARD SHIPPING on orders over $150
  // - FREE EXPRESS SHIPPING on orders over $250
  standardFreeThresholdUSD: 150,
  expressFreeThresholdUSD: 250,
  standardShippingRateUSD: 9.0,
  expressShippingRateUSD: 18.0,

  // EUR equivalents:
  standardFreeThresholdEUR: 140,
  expressFreeThresholdEUR: 230,
  standardShippingRateEUR: 8.5,
  expressShippingRateEUR: 16.5,
};
