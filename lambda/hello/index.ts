import "source-map-support/register";
import { DynamoDB } from "aws-sdk";

const db = new DynamoDB.DocumentClient();
const TableName = process.env.TABLE_NAME || "";

export const handler = async (event: any) => {
  console.log(`Calling /get all invitations`);
  const invitations = await db
    .scan({
      TableName,
    })
    .promise();

  console.log(invitations);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v1.0! Your function executed successfully!",
        input: event,
        invitations,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
