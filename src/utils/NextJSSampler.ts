// Based on https://github.com/vercel/otel/issues/143#issuecomment-2678260232

import type { Attributes } from '@opentelemetry/api';
import {
  AlwaysOnSampler,
  type Sampler,
  SamplingDecision,
  type SamplingResult,
} from '@opentelemetry/sdk-trace-node';
import {
  ATTR_HTTP_ROUTE,
  SEMATTRS_HTTP_TARGET,
} from '@opentelemetry/semantic-conventions';

export class NextJSSampler implements Sampler {
  static readonly DEFAULT_IGNORE_PATTERNS = [
    /^\/_next\//,
    /^\/images\//,
    /^\/health/,
  ];

  private readonly baseSampler: Sampler;
  private readonly ignorePatterns: RegExp[];

  constructor(props: { base?: Sampler; ignorePatterns?: RegExp[] } = {}) {
    this.baseSampler = props.base ?? new AlwaysOnSampler();

    this.ignorePatterns =
      props.ignorePatterns ?? NextJSSampler.DEFAULT_IGNORE_PATTERNS;
  }

  shouldSample(...args: Parameters<Sampler['shouldSample']>): SamplingResult {
    const attributes: Attributes = args[4];

    // TODO: keep an eye on https://github.com/vercel/otel/issues/143#issue-2874289175
    const route =
      // this is not populated at the moment of execution of the sampler
      this.getNextRoute(attributes) ??
      // this is not populated at the moment of execution of the sampler
      this.getHttpRoute(attributes) ??
      // this is populated
      this.getHttpTarget(attributes);

    return this.isIgnoredRoute(route)
      ? { decision: SamplingDecision.NOT_RECORD }
      : this.baseSampler.shouldSample(...args);
  }

  private isIgnoredRoute(route?: string): boolean {
    if (!route) return false;
    return this.ignorePatterns.some((re) => re.test(route));
  }

  getNextRoute = (attributes: Attributes): string | undefined => {
    const value = attributes['next.route'];
    if (typeof value === 'string') return value;
    return undefined;
  };

  getHttpRoute = (attributes: Attributes): string | undefined => {
    const value = attributes[ATTR_HTTP_ROUTE];
    if (typeof value === 'string') return value;
    return undefined;
  };

  getHttpTarget = (attributes: Attributes): string | undefined => {
    // TODO: replace SEMATTRS_HTTP_TARGET when better alternative is available
    //       https://github.com/vercel/otel/issues/143#issuecomment-2678223912
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const value = attributes[SEMATTRS_HTTP_TARGET];
    if (typeof value === 'string') return value;
    return undefined;
  };

  toString = (): string => 'Next JS Sampler - Exclude Health Route';
}
