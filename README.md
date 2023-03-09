[![npm](https://img.shields.io/npm/v/@nasa-gcn/architect-plugin-tracing)](https://www.npmjs.com/package/@nasa-gcn/architect-plugin-tracing)

# Architect plugin for OpenTelemetry + AWS X-Ray

This is a [plugin](https://arc.codes/docs/en/guides/plugins/overview) for [Architect](https://arc.codes/) that automatically instruments your Node.js Lambdas with [OpenTelemetry](https://opentelemetry.io) and sends tracing data and metrics to [AWS X-Ray](https://aws.amazon.com/xray/).

It adds the [AWS Distro for OpenTelemetry Lambda layer](https://aws-otel.github.io/docs/getting-started/lambda) to all of your Lambdas for which you have enabled tracing.

## Usage

1.  Install this package using npm:

        npm i -D @nasa-gcn/architect-plugin-tracing

2.  Add the following to your project's `app.arc` configuration file:

        @plugins
        nasa-gcn/architect-plugin-tracing

3.  Enable tracing for all Lambdas by adding the folllowing lines to your `app.arc` file, or for [an individual Lambda](https://arc.codes/docs/en/reference/configuration/function-config) by adding it to the Lambda's `config.arc` file:

        @aws
        tracing true

4.  Optionally, you can inject additional OpenTelemetry configuration into a Lambda by adding a file called `tracing.js` to its source directory. Here is an example that adds [instrumentation for the Remix web framework](https://www.npmjs.com/package/opentelemetry-instrumentation-remix):

        ```js
        global.configureInstrumentations = () => {
          const { DnsInstrumentation } = require('@opentelemetry/instrumentation-dns')
          const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http')
          const { NetInstrumentation } = require('@opentelemetry/instrumentation-net')
          const {
            RemixInstrumentation,
          } = require('opentelemetry-instrumentation-remix')

          return [
            new DnsInstrumentation(),
            new HttpInstrumentation(),
            new NetInstrumentation(),
            new RemixInstrumentation(),
          ]
        }
        ```
