# Architect plugin for OpenSearch / ElasticSearch

This is a [plugin](https://arc.codes/docs/en/guides/plugins/overview) for [Architect](https://arc.codes/) that installs an [Amazon OpenSearch Serverless](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/serverless.html) collection for the application.

When you are using Architect's [sandbox](https://arc.codes/docs/en/reference/cli/sandbox) mode, the plugin [downloads and runs Elasticsearch locally](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html#elasticsearch-install-packages).

Pair this pacakge with [@nasa-gcn/architect-functions-search](https://github.com/nasa-gcn/architect-functions-search) to connect to the service from your Node.js Lambda function code.

## Usage

1.  Install this package using npm:

        npm i -D @nasa-gcn/architect-plugin-search

2.  Add the following to your project's `app.arc` configuration file:

        @plugins
        nasa-gcn/architect-plugin-search

3.  Optionally, create a file called `sandbox-search.json` or `sandbox-search.js` in your project and populate it with sample data to be passed to [`client.bulk()`](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/bulk_examples.html). Here are some examples.

    ## sandbox-search.json

        [
            {"index": {"_index": "movies", "_id": 1}},
            {"title": "The Hunt for the Red October"},
            {"index": {"_index": "movies", "_id": 2}},
            {"title": "Star Trek II: The Wrath of Khan"}
        ]

    ## sandbox-search.js (constant data)

        module.exports = [
            {"index": {"_index": "movies", "_id": 1}},
            {"title": "The Hunt for the Red October"},
            {"index": {"_index": "movies", "_id": 2}},
            {"title": "Star Trek II: The Wrath of Khan"}
        ]

    ## sandbox-search.js (function or async function)

        module.exports = function() {
            return [
                {"index": {"_index": "movies", "_id": 1}},
                {"title": "The Hunt for the Red October"},
                {"index": {"_index": "movies", "_id": 2}},
                {"title": "Star Trek II: The Wrath of Khan"}
            ]
        }
