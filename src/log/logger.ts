import 'server-only';

import { trace } from '@opentelemetry/api';
import type { NextRequest } from 'next/server';
import { pino, Logger as PinoLogger } from 'pino';
import { env } from 'config/env';

type LogSerializable =
  | string
  | number
  | boolean
  | null
  | undefined
  | LogSerializable[]
  | { [key: string]: LogSerializable };

type LogFields = {
  data?: Record<string, LogSerializable>;
  error?: Error;
};

type TraceContext = {
  traceId?: string;
  spanId?: string;
};

export class Logger {
  private readonly logger: PinoLogger;

  constructor() {
    this.logger = pino({
      level: env.LOG_LEVEL,
      timestamp: pino.stdTimeFunctions.isoTime,
      formatters: {
        level: (label) => ({ level: label }),
      },
    });
  }

  trace(msg: string, fields?: LogFields): void {
    const { data, error } = fields ?? {};
    const { traceId, spanId } = this.getTraceContext();

    this.logger.trace(
      {
        log_type: 'app',
        ...(traceId && { trace_id: traceId }),
        ...(spanId && { span_id: spanId }),
        ...data,
        ...(error && { err: error }),
      },
      msg
    );
  }

  debug(msg: string, fields?: LogFields): void {
    const { data, error } = fields ?? {};
    const { traceId, spanId } = this.getTraceContext();

    this.logger.debug(
      {
        log_type: 'app',
        ...(traceId && { trace_id: traceId }),
        ...(spanId && { span_id: spanId }),
        ...data,
        ...(error && { err: error }),
      },
      msg
    );
  }

  info(msg: string, fields?: LogFields): void {
    const { data, error } = fields ?? {};
    const { traceId, spanId } = this.getTraceContext();

    this.logger.info(
      {
        log_type: 'app',
        ...(traceId && { trace_id: traceId }),
        ...(spanId && { span_id: spanId }),
        ...data,
        ...(error && { err: error }),
      },
      msg
    );
  }

  warn(msg: string, fields?: LogFields): void {
    const { data, error } = fields ?? {};
    const { traceId, spanId } = this.getTraceContext();

    this.logger.warn(
      {
        log_type: 'app',
        ...(traceId && { trace_id: traceId }),
        ...(spanId && { span_id: spanId }),
        ...data,
        ...(error && { err: error }),
      },
      msg
    );
  }

  error(msg: string, fields?: LogFields): void {
    const { data, error } = fields ?? {};
    const { traceId, spanId } = this.getTraceContext();

    this.logger.error(
      {
        log_type: 'app',
        ...(traceId && { trace_id: traceId }),
        ...(spanId && { span_id: spanId }),
        ...data,
        ...(error && { err: error }),
      },
      msg
    );
  }

  fatal(msg: string, fields?: LogFields): void {
    const { data, error } = fields ?? {};
    const { traceId, spanId } = this.getTraceContext();

    this.logger.fatal(
      {
        log_type: 'app',
        ...(traceId && { trace_id: traceId }),
        ...(spanId && { span_id: spanId }),
        ...data,
        ...(error && { err: error }),
      },
      msg
    );
  }

  access(req: NextRequest): void {
    const xForwardedFor = req.headers.get('x-forwarded-for');

    this.logger.info({
      log_type: 'access',
      url: req.nextUrl.pathname,
      query: Object.fromEntries(req.nextUrl.searchParams),
      method: req.method,
      ip: xForwardedFor ? xForwardedFor.split(',')[0].trim() : '',
      user_agent: req.headers.get('user-agent') ?? '',
      referrer: req.headers.get('referer') ?? '',
    });
  }

  getTraceContext = (): TraceContext => {
    const activeSpan = trace.getActiveSpan();
    if (!activeSpan) {
      return {};
    }

    const spanContext = activeSpan.spanContext();
    return {
      traceId: spanContext.traceId,
      spanId: spanContext.spanId,
    };
  };
}
