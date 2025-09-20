const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { ZipkinExporter } = require('@opentelemetry/exporter-zipkin');
const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
require('dotenv').config();

try {
    const ZIPKIN_URL = process.env.ZIPKIN_URL;
    const SERVICE_NAME = process.env.SERVICE_NAME ;

    console.log('Initializing OpenTelemetry tracing...');
    console.log(`Zipkin URL: ${ZIPKIN_URL}`);
    console.log(`Service Name: ${SERVICE_NAME}`);

    const exporter = new ZipkinExporter({
        url: ZIPKIN_URL,
        serviceName: SERVICE_NAME,
    });

    const sdk = new NodeSDK({
        serviceName: SERVICE_NAME,
        spanProcessor: new SimpleSpanProcessor(exporter),
        instrumentations: [getNodeAutoInstrumentations()],
    });

    sdk.start();
    console.log('OpenTelemetry tracing initialized successfully');
    console.log(`Zipkin UI available at: ${ZIPKIN_URL.replace('/api/v2/spans', '')}`);

    process.on('SIGTERM', () => {
        try {
            sdk.shutdown();
            console.log('OpenTelemetry tracing shut down gracefully');
        } catch (error) {
            console.error('Error during OpenTelemetry shutdown:', error);
        }
    });

    module.exports = sdk;

} catch (error) {
    console.error('Failed to initialize tracing:', error);
    module.exports = {};
}
