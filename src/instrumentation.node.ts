import {
  ParentBasedSampler,
  TraceIdRatioBasedSampler,
} from '@opentelemetry/sdk-trace-node';
import { registerOTel } from '@vercel/otel';
import { NextJSSampler } from 'utils/NextJSSampler';

export const setupNodeInstrumentation = (): void => {
  registerOTel({
    serviceName: process.env.OTEL_SERVICE_NAME ?? 'frontend',
    instrumentationConfig: {
      fetch: {
        // TODO: traceを追跡するバックエンドのURLを追加
        propagateContextUrls: [],
      },
    },
    traceSampler: new ParentBasedSampler({
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
};
