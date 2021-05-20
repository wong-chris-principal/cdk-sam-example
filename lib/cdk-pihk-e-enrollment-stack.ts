import * as cdk from "@aws-cdk/core";
import { Function, Runtime, AssetCode, Code } from "@aws-cdk/aws-lambda";
import {
  LambdaIntegration,
  MethodLoggingLevel,
  RestApi,
} from "@aws-cdk/aws-apigateway";
import { NodejsFunction } from "@aws-cdk/aws-lambda-nodejs";
import * as dynamodb from "@aws-cdk/aws-dynamodb";

export class CdkPihkEEnrollmentStack extends cdk.Stack {
  private lambdaFunction: Function;
  private restApi: RestApi;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const helloTable = new dynamodb.Table(this, "HelloTable", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
    });

    this.restApi = new RestApi(this, this.stackName + "RestApi", {
      deployOptions: {
        stageName: "dev",
        metricsEnabled: true,
        loggingLevel: MethodLoggingLevel.INFO,
        dataTraceEnabled: true,
      },
    });

    this.lambdaFunction = new NodejsFunction(this, "HelloHandler", {
      runtime: Runtime.NODEJS_14_X, // execution environment
      entry: __dirname + "/../lambda/hello/index.ts",
      handler: "handler",
      environment: {
        TABLE_NAME: helloTable.tableName,
        PRIMARY_KEY: "id",
      },
    });

    this.restApi.root.addMethod(
      "GET",
      new LambdaIntegration(this.lambdaFunction, {})
    );

    helloTable.grantReadData(this.lambdaFunction);
  }
}
