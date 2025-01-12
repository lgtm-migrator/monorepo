import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import * as apigateway from '@pulumi/aws-apigateway';
import { APIGatewayEvent } from 'aws-lambda';
import {
  EventBridgeClient,
  PutEventsCommand,
} from '@aws-sdk/client-eventbridge';

const config = new pulumi.Config();

const bus = new aws.cloudwatch.EventBus('bus');

enum EventNames {
  GraphicsDriverRead = 'graphics-driver-read',
}

enum EventSource {
  Arbiter = 'Arbiter',
}

interface GraphicsDriverRead {
  YourVersion: string;
  LatestVersion: string;
  Source: string;
}

// Create an event rule to watch for events.
const rule = new aws.cloudwatch.EventRule('rule', {
  eventBusName: bus.name,

  // Specify the event pattern to watch for.
  eventPattern: JSON.stringify({
    source: [EventSource.Arbiter],
  }),
});

// Create a Lambda Function
const publishToQueueLambda = new aws.lambda.CallbackFunction(
  'publish-to-event-bridge-lambda',
  {
    policies: [
      aws.iam.ManagedPolicies.CloudWatchLogsFullAccess,
      'arn:aws:iam::aws:policy/AmazonEventBridgeFullAccess', // doesn't exist as an enum 🤷
    ],

    runtime: 'nodejs16.x',
    callback: async (ev: APIGatewayEvent) => {
      console.log('event', ev);

      if (!ev.body)
        return {
          statusCode: 400,
          body: 'No data submitted',
        };

      if (!ev.isBase64Encoded) {
        return {
          statusCode: 400,
          body: 'The body is not base 64, not sure what to do',
        };
      }

      const body: GraphicsDriverRead = JSON.parse(
        new Buffer(ev.body, 'base64').toString('ascii'),
      );

      const client = new EventBridgeClient({});
      const command = new PutEventsCommand({
        Entries: [
          {
            EventBusName: bus.name.get(),
            Detail: JSON.stringify(body),
            DetailType: EventNames.GraphicsDriverRead,
            Source: EventSource.Arbiter,
          },
        ],
      });
      const response = await client.send(command);
      console.log('response', response);
      return {
        statusCode: 200,
        body: JSON.stringify(response), // has to be string
      };
    },
  },
);

// Define an endpoint that invokes a lambda to handle requests
const api = new apigateway.RestAPI('api', {
  routes: [
    {
      path: `/${EventNames.GraphicsDriverRead}`,
      method: 'POST',
      eventHandler: publishToQueueLambda,
      apiKeyRequired: true,
    },
  ],
  apiKeySource: 'HEADER',
});

export const url = api.url;

// Create an API key to manage usage
const apiKey = new aws.apigateway.ApiKey('api-key');
// Define usage plan for an API stage
const usagePlan = new aws.apigateway.UsagePlan('usage-plan', {
  apiStages: [
    {
      apiId: api.api.id,
      stage: api.stage.stageName,
    },
  ],
});
// Associate the key to the plan
new aws.apigateway.UsagePlanKey('usage-plan-key', {
  keyId: apiKey.id,
  keyType: 'API_KEY',
  usagePlanId: usagePlan.id,
});

export const apiKeyValue = apiKey.value;

const topic = new aws.sns.Topic('mytopic');
const topicSubscription = new aws.sns.TopicSubscription('my-t-subscription', {
  topic: topic,
  protocol: 'email',
  endpoint: config.requireSecret('email'),
});
const sendEmailLambda = new aws.lambda.CallbackFunction('send-email', {
  runtime: 'nodejs16.x',
  policies: [
    aws.iam.ManagedPolicies.CloudWatchLogsFullAccess,
    aws.iam.ManagedPolicies.AmazonSNSFullAccess,
  ],
  callback: async (event: { detail: GraphicsDriverRead }) => {
    const { YourVersion, LatestVersion } = event.detail;
    if (YourVersion === LatestVersion) {
      console.log('Versions match, not doing anything');
      return;
    }

    const client = new SNSClient({});
    const arnToSend = topic.arn.get();
    const message = `Your Nvidia Graphics Driver (${YourVersion}) is Out of Date. Latest: ${LatestVersion}`;
    const command = new PublishCommand({
      Message: message,
      Subject: message,
      TopicArn: arnToSend,
    });
    const response = await client.send(command);
    console.log('response', response);
  },
});

const lambaTargetEmail = new aws.cloudwatch.EventTarget('lambda-email-target', {
  arn: sendEmailLambda.arn,
  rule: rule.name,
  eventBusName: bus.name,
});

const lambdaPermissionEmail = new aws.lambda.Permission(
  'lambda-permission-email',
  {
    action: 'lambda:InvokeFunction',
    principal: 'events.amazonaws.com',
    function: sendEmailLambda.arn,
    sourceArn: rule.arn,
  },
);
