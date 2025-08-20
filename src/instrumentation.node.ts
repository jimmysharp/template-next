import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { UndiciInstrumentation } from '@opentelemetry/instrumentation-undici';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';

import {
  ParentBasedSampler,
  TraceIdRatioBasedSampler,
} from '@opentelemetry/sdk-trace-node';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { NextJSSampler } from 'utils/NextJSSampler';

export const setupNodeInstrumentation = (): void => {
  const sdk = new NodeSDK({
    resource: resourceFromAttributes({
      [ATTR_SERVICE_NAME]: process.env.OTEL_SERVICE_NAME ?? 'frontend',
    }),
    traceExporter: new OTLPTraceExporter(),
    instrumentations: [new UndiciInstrumentation()],
    sampler: new ParentBasedSampler({
      root: new NextJSSampler({
        base: new TraceIdRatioBasedSampler(
          Number(process.env.OTEL_SAMPLING_RATE ?? '1.0')
        ),
        ignorePatterns: [
          /^\/_next\/static\//,
          /^\/images\//,
          /^\/api\/healthcheck/,
        ],
      }),
    }),
  });

  sdk.start();
};
