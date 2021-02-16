const AWS = require("aws-sdk");
exports.handler = async(event: any)=>{
    console.log("EVENT: ", event);
    console.log("EVENT Data: ", event.data);
    const eventBridge = new AWS.EventBridge({ region: "us-west-2" });

    const jsonObject = {
        country: event.data
    }
    const eventRecordResult = await eventBridge.putEvents({
        Entries: [
        {
            EventBusName: "default",
            Source: "sourceacount.api",
            DetailType: "SourceOrderUpdated",
            Detail: JSON.stringify(jsonObject)
            //Detail: `{ "country": "${event.data}" }`,
        },
        ],
    })
    .promise();

    console.log("EVENT Record Result: \n", eventRecordResult);
    return {
        data: "Hello World",
        result: jsonObject
    }
}