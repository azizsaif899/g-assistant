"use strict";
/**
 * Google Tag Manager Engine for AzizSys
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GTMEngine = void 0;
class GTMEngine {
    constructor(config) {
        this.isInitialized = false;
        this.config = config;
    }
    initialize() {
        if (this.isInitialized)
            return;
        const gtmScript = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','${this.config.dataLayerName || 'dataLayer'}','${this.config.containerId}');
    `;
        if (typeof document !== 'undefined') {
            const script = document.createElement('script');
            script.innerHTML = gtmScript;
            document.head.appendChild(script);
        }
        this.isInitialized = true;
        console.log('✅ GTM Engine initialized');
    }
    trackEvent(event) {
        if (!this.isInitialized) {
            console.warn('⚠️ GTM not initialized');
            return;
        }
        if (typeof window !== 'undefined') {
            const dataLayer = window[this.config.dataLayerName || 'dataLayer'] || [];
            dataLayer.push(event);
        }
        if (this.config.enableDebug) {
            console.log('📊 GTM Event:', event);
        }
    }
    trackWhatsAppInteraction(action, phone) {
        this.trackEvent({
            event: 'whatsapp_interaction',
            eventCategory: 'WhatsApp',
            eventAction: action,
            eventLabel: phone,
            customParameters: {
                source: 'azizsys_bot',
                timestamp: new Date().toISOString()
            }
        });
    }
    trackNewLead(leadData) {
        this.trackEvent({
            event: 'new_lead',
            eventCategory: 'CRM',
            eventAction: 'lead_created',
            eventLabel: leadData.source,
            value: 1,
            customParameters: {
                lead_id: leadData.id,
                source: leadData.source,
                phone: leadData.phone
            }
        });
    }
    trackConversion(conversionData) {
        this.trackEvent({
            event: 'conversion',
            eventCategory: 'Sales',
            eventAction: 'lead_converted',
            eventLabel: conversionData.source,
            value: conversionData.value || 0,
            customParameters: {
                customer_id: conversionData.id,
                conversion_type: conversionData.type
            }
        });
    }
}
exports.GTMEngine = GTMEngine;
//# sourceMappingURL=gtm-manager.js.map