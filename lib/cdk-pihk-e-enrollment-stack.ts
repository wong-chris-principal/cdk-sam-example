import * as cdk from "@aws-cdk/core";
import { Function, Runtime, AssetCode, Code } from "@aws-cdk/aws-lambda";
import {
  LambdaIntegration,
  MethodLoggingLevel,
  RestApi,
} from "@aws-cdk/aws-apigateway";

export class CdkPihkEEnrollmentStack extends cdk.Stack {
  private lambdaFunction: Function;
  private restApi: RestApi;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.restApi = new RestApi(this, this.stackName + "RestApi", {
      deployOptions: {
        stageName: "dev",
        metricsEnabled: true,
        loggingLevel: MethodLoggingLevel.INFO,
        dataTraceEnabled: true,
      },
    });

    this.lambdaFunction = new Function(this, "HelloHandler", {
      runtime: Runtime.NODEJS_14_X, // execution environment
      code: Code.fromAsset("./lambda"), // code loaded from "lambda" directory
      handler: "hello.handler", // file is "hello", function is "handler"
    });

    this.restApi.root.addMethod(
      "GET",
      new LambdaIntegration(this.lambdaFunction, {})
    );
  }
}
